import Promise from '../promise.js'
import { objectExtend, parseQueryString, getFullUrlPath, isUndefined } from '../utils.js'

/**
 * OAuth2 popup management class
 * 
 * @author Sahat Yalkabov <https://github.com/sahat>
 * @copyright Class mostly taken from https://github.com/sahat/satellizer 
 * and adjusted to fit vue-authenticate library
 */
export default class OAuthPopup {
  constructor(url, name, popupOptions) {
    this.popup = null
    this.url = url
    this.name = name
    this.popupOptions = popupOptions
  }

  // Create popup window
  // TODO: Call electron window instead of native window
  open(redirectUri, skipPooling) {
    try {
      this.popup = window.open(this.url, this.name, this._stringifyOptions())
      if (this.popup && this.popup.focus) {
        this.popup.focus()
      }

      if (skipPooling) {
        return Promise.resolve()
      } else {
        return this.pooling(redirectUri)
      }
    } catch(e) {
      return Promise.reject(new Error('OAuth popup error occurred'))
    }
  }

  // Check if Authentication has completed
  pooling(redirectUri) {
    return new Promise((resolve, reject) => {
      const redirectUriParser = document.createElement('a')
      redirectUriParser.href = redirectUri
      // const redirectUriPath = getFullUrlPath(redirectUriParser)
      const redirectUriPath = redirectUri

      let poolingInterval = setInterval(() => {
        if (!this.popup || this.popup.closed || this.popup.closed === undefined) {
          clearInterval(poolingInterval)
          poolingInterval = null
          reject(new Error('Auth popup window closed'))
        }

        try {
          const pLocation = document.createElement('a')
          pLocation.href = this.popup.location

          const popupWindowPath = getFullUrlPath(pLocation.href)

          if (popupWindowPath === redirectUriPath) {
            if (pLocation.search || pLocation.hash) {
              const query = parseQueryString(pLocation.search.substring(1).replace(/\/$/, ''));
              const hash = parseQueryString(pLocation.hash.substring(1).replace(/[\/$]/, ''));
              let params = objectExtend({}, query);
              params = objectExtend(params, hash)

              if (params.error) {
                reject(new Error(params.error));
              } else {
                resolve(params);
              }
            } else {
              reject(new Error('OAuth redirect has occurred but no query or hash parameters were found.'))
            }

            clearInterval(poolingInterval)
            poolingInterval = null
            this.popup.close()
          }
        } catch(e) {
          // Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
        }
      }, 250)
    })
  }

  _stringifyOptions() {
    let options = []
    for (var optionKey in this.popupOptions) {
      if (!isUndefined(this.popupOptions[optionKey])) {
        options.push(`${optionKey}=${this.popupOptions[optionKey]}`)
      }
    }
    return options.join(',')
  }
}