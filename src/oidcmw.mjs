import metro from '@muze-nl/metro'
import oauth2 from '@muze-nl/metro-oauth2'
import { assert, Required, Optional, validURL, instanceOf } from '@muze-nl/assert'
import discover from './oidc.discovery.mjs'
import register from './oidc.register.mjs'
import oidcStore from './oidc.store.mjs'

export default function oidcmw(options={}) {

	const defaultOptions = {
		client: metro.client(),
		force_authorization: false
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
	if (!options.client_info.client_id && options.store.has('client_info')) {
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
			assert(options.client_info?.client_name, Required())
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
		const oauth2Options = Object.assign(
			{
				site: options.issuer,
				client: options.client,
				force_authorization: true,
				oauth2_configuration: {
					client_id: options.client_info.client_id,
					client_secret: options.client_info.client_secret,
					code_verifier: false, //FIXME: detect pkce support
					grant_type: 'authorization_code',
					authorization_endpoint: options.openid_configuration.authorization_endpoint,
					token_endpoint: options.openid_configuration.token_endpoint,
					scope: options.openid_configuration.scope || 'openid',
					redirect_uri: options.client_info.redirect_uris[0] //FIXME: find the best match?
				}
			}
			//...
		)

		const dpopOptions = {
			authorization_endpoint: options.openid_configuration.authorization_endpoint,
			token_endpoint: options.openid_configuration.token_endpoint,
			dpop_signing_alg_values_supported: options.openid_configuration.dpop_signing_alg_values_supported
		}

		const dPopClient = options.client
			.with(options.issuer)
			.with(oauth2.DPoPmw(dpopOptions))

		oauth2Options.client = dPopClient

		const oauth2client = dPopClient
			.with(oauth2(oauth2Options))

		res = await oauth2client.fetch(req)
		// ...

		return res
	}

}

export function isRedirected() {
	return oauth2isRedirected()
}