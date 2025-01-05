import oidcDiscover from './oidc.discovery.mjs'
import oidcRegister from './oidc.register.mjs'
import oidcmw, {isRedirected} from './oidcmw.mjs'

export const oidc = {
	discover: oidcDiscover,
	register: oidcRegister,
	oidcmw,
	isRedirected
}

globalThis.oidc = oidc