import { isUndefined } from './utils';

// TODO: This is likely the wrong window location
export function getCookieDomainUrl() {
  try {
    return window.location.hostname
  } catch (e) {}

  return '';
}

// TODO: This is likely the wrong window location
export function getRedirectUri(uri) {
  try {
    return (!isUndefined(uri))
      ? `${window.location.origin}${uri}`
      : window.location.origin
  } catch (e) {}

  return uri || null;
}

/**
 * Default configuration
 */
export default {
  baseUrl: null,
  tokenName: 'token',
  tokenPrefix: 'vueauth',
  tokenHeader: 'Authorization',
  tokenType: 'Bearer',
  loginUrl: '/auth/login',
  registerUrl: '/auth/register',
  logoutUrl: null,
  storageType: 'localStorage',
  storageNamespace: 'vue-authenticate',
  cookieStorage: {
    domain: getCookieDomainUrl(),
    path: '/',
    secure: false
  },
  requestDataKey: 'data',
  responseDataKey: 'data',

  /**
   * Default request interceptor for Axios library
   * @context {VueAuthenticate}
   */
  bindRequestInterceptor: function ($auth) {
    const tokenHeader = $auth.options.tokenHeader;

    $auth.$http.interceptors.request.use((config) => {
      if ($auth.isAuthenticated()) {
        config.headers[tokenHeader] = [
          $auth.options.tokenType, $auth.getToken()
        ].join(' ')
      } else {
        delete config.headers[tokenHeader]
      }
      return config
    })
  },

  providers: {
    facebook: {
      name: 'facebook',
      url: '/auth/facebook',
      authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
      redirectUri: getRedirectUri('/'),
      requiredUrlParams: ['display', 'scope'],
      scope: ['email'],
      scopeDelimiter: ',',
      display: 'popup',
      oauthType: '2.0',
      popupOptions: { width: 580, height: 400 }
    },

    google: {
      name: 'google',
      url: '/auth/google',
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
      redirectUri: getRedirectUri(),
      requiredUrlParams: ['scope'],
      optionalUrlParams: ['display'],
      scope: ['profile', 'email'],
      scopePrefix: 'openid',
      scopeDelimiter: ' ',
      display: 'popup',
      oauthType: '2.0',
      popupOptions: { width: 452, height: 633 }
    },

    github: {
      name: 'github',
      url: '/auth/github',
      authorizationEndpoint: 'https://github.com/login/oauth/authorize',
      redirectUri: getRedirectUri(),
      optionalUrlParams: ['scope'],
      scope: ['user:email'],
      scopeDelimiter: ' ',
      oauthType: '2.0',
      popupOptions: { width: 1020, height: 618 }
    },

    instagram: {
      name: 'instagram',
      url: '/auth/instagram',
      authorizationEndpoint: 'https://api.instagram.com/oauth/authorize',
      redirectUri: getRedirectUri(),
      requiredUrlParams: ['scope'],
      scope: ['basic'],
      scopeDelimiter: '+',
      oauthType: '2.0',
      popupOptions: { width: null, height: null }
    },

    twitter: {
      name: 'twitter',
      url: '/auth/twitter',
      authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
      redirectUri: getRedirectUri(),
      oauthType: '1.0',
      popupOptions: { width: 495, height: 645 }
    },

    bitbucket: {
      name: 'bitbucket',
      url: '/auth/bitbucket',
      authorizationEndpoint: 'https://bitbucket.org/site/oauth2/authorize',
      redirectUri: getRedirectUri('/'),
      optionalUrlParams: ['scope'],
      scope: ['email'],
      scopeDelimiter: ' ',
      oauthType: '2.0',
      popupOptions: { width: 1020, height: 618 }
    },

    linkedin: {
      name: 'linkedin',
      url: '/auth/linkedin',
      authorizationEndpoint: 'https://www.linkedin.com/oauth/v2/authorization',
      redirectUri: getRedirectUri(),
      requiredUrlParams: ['state'],
      scope: ['r_emailaddress'],
      scopeDelimiter: ' ',
      state: 'STATE',
      oauthType: '2.0',
      popupOptions: { width: 527, height: 582 }
    },

    live: {
      name: 'live',
      url: '/auth/live',
      authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
      redirectUri: getRedirectUri(),
      requiredUrlParams: ['display', 'scope'],
      scope: ['wl.emails'],
      scopeDelimiter: ' ',
      display: 'popup',
      oauthType: '2.0',
      popupOptions: { width: 500, height: 560 }
    },

    twitch: {
      name: 'twitch',
      url: '/auth/twitch',
      authorizationEndpoint: 'https://api.twitch.tv/kraken/oauth2/authorize',
      redirectUri: window.location.origin,
      requiredUrlParams: ['scope'],
      scope: ['user:read:email', 'user_follows_edit', 'user_subscriptions'],
      scopeDelimiter: '+',
      oauthType: '2.0',
      popupOptions: { width: 500, height: 560 }
    },

    youtube: {
      name: 'youtube',
      url: '/auth/youtube',
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
      redirectUri: window.location.origin,
      requiredUrlParams: ['scope'],
      optionalUrlParams: ['display', 'access_type'],
      scope: ['https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/userinfo.email'],
      scopePrefix: 'openid',
      scopeDelimiter: ' ',
      accessType: 'offline',
      display: 'popup',
      oauthType: '2.0',
      popupOptions: { width: 452, height: 633 }
    },

    streamlabs: {
      name: 'streamlabs',
      url: '/auth/streamlabs',
      authorizationEndpoint: 'https://streamlabs.com/api/v1.0/authorize',
      redirectUri: window.location.origin,
      requiredUrlParams: ['scope'],
      scope: ['donations.create', 'donations.read'],
      scopeDelimiter: ' ',
      oauthType: '2.0',
      popupOptions: { width: 1020, height: 700 }
    },

    streamtip: {
      name: 'streamtip',
      url: '/auth/streamtip',
      authorizationEndpoint: 'https://streamtip.com/api/oauth2/authorize',
      redirectUri: window.location.origin,
      oauthType: '2.0',
      popupOptions: { width: 1020, height: 700 }
    },

    stripe: {
      name: 'stripe',
      url: '/auth/stripe',
      authorizationEndpoint: 'https://connect.stripe.com/oauth/authorize',
      redirectUri: window.location.origin,
      requiredUrlParams: ['response_type', 'client_id', 'scope'],
      display: 'popup',
      oauthType: '2.0',
      popupOptions: { width: 500, height: 560 }
    },

    oauth1: {
      name: null,
      url: '/auth/oauth1',
      authorizationEndpoint: null,
      redirectUri: getRedirectUri(),
      oauthType: '1.0',
      popupOptions: null
    },

    oauth2: {
      name: null,
      url: '/auth/oauth2',
      clientId: null,
      redirectUri: getRedirectUri(),
      authorizationEndpoint: null,
      defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
      requiredUrlParams: null,
      optionalUrlParams: null,
      scope: null,
      scopePrefix: null,
      scopeDelimiter: null,
      state: null,
      oauthType: '2.0',
      popupOptions: null,
      responseType: 'code',
      responseParams: {
        code: 'code',
        clientId: 'clientId',
        redirectUri: 'redirectUri'
      }
    }
  }
}
