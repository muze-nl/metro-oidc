import * as metro from '@muze-nl/metro/src/metro.mjs'
import oauth2mw, * as oauth2 from '@muze-nl/metro-oauth2/src/oauth2.mjs'
import dpopmw from '@muze-nl/metro-oauth2/src/oauth2.dpop.mjs'
import { assert, Required, Optional, validURL, instanceOf } from '@muze-nl/assert'
import discover from './oidc.discovery.mjs'
import register from './oidc.register.mjs'
import oidcStore from './oidc.store.mjs'

export default function oidcmw(options={}) {

	const defaultOptions = {
		client: metro.client(),
		force_authorization: false,
		use_dpop: true,
		authorize_callback: async url => {
			if (window.location.href != url.href) {
				window.location.replace(url.href)
			}
			return false
		}
	}

	options = Object.assign({}, defaultOptions, options)

	assert(options, {
		client: Required(instanceOf(metro.client().constructor)), // required because it is set in defaultOptions
		client_info: Required(),
		issuer: Required(validURL),
		oauth2: Optional({}),
		openid_configuration: Optional()
	})

	if (!options.store) {
		options.store = oidcStore(options.issuer)
	}
	if (!options.openid_configuration && options.store.has('openid_configuration')) {
		options.openid_configuration = options.store.get('openid_configuration')
	}
	if (!options.client_info?.client_id && options.store.has('client_info')) {
		options.client_info = options.store.get('client_info')
	}

	return async (req, next) => {
		let res
		if (!options.force_authorization) {
			try {
				res = await next(req)
			} catch(err) {
				if (res.status!=401 && res.status!=403) {
					throw err
				}
			}
			if (res.ok || (res.status!=401 && res.status!=403)) {
				return res
			}
		}
		if (!options.openid_configuration) {
			options.openid_configuration = await discover({
				issuer: options.issuer
			})
			options.store.set('openid_configuration', options.openid_configuration)
		}

		if (!options.client_info?.client_id) {
			if (!options.openid_configuration.registration_endpoint) {
				throw metro.metroError('metro.oidcmw: Error: issuer '+options.issuer+' does not support dynamic client registration, but you haven\'t specified a client_id')
			}
			options.client_info = await register({
				registration_endpoint: options.openid_configuration.registration_endpoint,
				client_info: options.client_info
			})
			options.store.set('client_info', options.client_info)
		}

		// now initialize an oauth2 client stack, using options.client as default
		// with forceAuthentication: true
		const scope = options.scope || 'openid'

		const oauth2Options = Object.assign(
			{
				site: options.issuer,
				client: options.client,
				force_authorization: true,
				authorize_callback: options.authorize_callback,
				oauth2_configuration: {
					client_id: options.client_info?.client_id,
					client_secret: options.client_info?.client_secret,
					grant_type: 'authorization_code',
					response_type: 'code',
					response_mode: 'query',
					authorization_endpoint: options.openid_configuration.authorization_endpoint,
					token_endpoint: options.openid_configuration.token_endpoint,
					scope, //FIXME: should only use scopes supported by server
					redirect_uri: options.client_info.redirect_uris[0]
				}
			}
			//...
		)
		
		const storeIdToken = async (req, next) => {
			const res = await next(req)
			const contentType = res.headers.get('content-type')
			if (contentType?.startsWith('application/json')) {
				//FIXME: check that this is actually the token endpoint
				let id_token = res.data?.id_token
				if (!id_token) {
					const res2 = res.clone() // otherwise res.body can't be read again
					try {
						let data = await res2.json()
						if (data && data.id_token) {
							id_token = data.id_token
						}
					} catch(e) {
						// ignore errors
					}
				}
				if (id_token) {
					options.store.set('id_token', id_token)
				}
			}
			return res
		}

		let oauth2client = options.client.with(options.issuer).with(storeIdToken)

		if (options.use_dpop) {
			const dpopOptions = {
				site: options.issuer,
				authorization_endpoint: options.openid_configuration.authorization_endpoint,
				token_endpoint: options.openid_configuration.token_endpoint,
				dpop_signing_alg_values_supported: options.openid_configuration.dpop_signing_alg_values_supported
			}
			oauth2client = oauth2client.with(dpopmw(dpopOptions)) // add DPoP headers in requests with Authorization headers
			oauth2Options.client = oauth2client // make sure oath2 token request use dpop
		}

		oauth2client = oauth2client.with(oauth2mw(oauth2Options))

		res = await oauth2client.fetch(req)

		return res
	}

}

export function isRedirected() {
	return oauth2.isRedirected()
}

export function idToken(options) {
	if (!options.store) {
		if (!options.issuer) {
			throw metro.metroError('Must supply options.issuer or options.store to get the id_token')
		}
		options.store = oidcStore(options.issuer)
	}
	return options.store.get('id_token')
}
