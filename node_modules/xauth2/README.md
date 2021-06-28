## XAuth2 - Electron OAuth2 Client


![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)

A Fork of vue-authenticate that (hopefully) works in Electron. 

---

**XAuth2** is easily configurable solution for [Vue.js](https://vuejs.org/) that provides local login/registration as well as Social login using Github, Facebook, Google and other OAuth providers (see below).


The best part about this library is that it is not strictly coupled to one request handling library like [vue-axios](https://github.com/imcvampire/vue-axios). You will be able to use it with different libraries. 

For now it is tested to work with  [vue-resource](https://github.com/pagekit/vue-resource) and [axios](https://github.com/mzabriskie/axios) (using [vue-axios](https://github.com/imcvampire/vue-axios) wrapper).

**NOTE:** Version 1.3.0+ default request library is `axios` with the `vue-axios` wrapper plugin.

This library was inspired by well known authentication library for Angular called [Satellizer](https://github.com/sahat/satellizer) developed by [Sahat Yalkabov](http://sahatyalkabov.com). They share almost identical configuration and API so you can easily switch from Angular to Vue.js project.

## Supported OAuth providers and configurations

1. Facebook (https://github.com/dgrubelic/vue-authenticate/blob/master/src/options.js#L21)
2. Google (https://github.com/dgrubelic/vue-authenticate/blob/master/src/options.js#L34)
3. Github (https://github.com/dgrubelic/vue-authenticate/blob/master/src/options.js#L49)
4. Instagram (https://github.com/dgrubelic/vue-authenticate/blob/master/src/options.js#L61)
5. Twitter (https://github.com/dgrubelic/vue-authenticate/blob/master/src/options.js#L72)
6. Bitbucket (https://github.com/dgrubelic/vue-authenticate/blob/master/src/options.js#L81)
7. LinkedIn (https://github.com/dgrubelic/vue-authenticate/blob/master/src/options.js#L93)
8. Microsoft Live (https://github.com/dgrubelic/vue-authenticate/blob/master/src/options.js#L106)
9. YouTube by [kieraneglin](https://github.com/kieraneglin)
10. Twitch by [kieraneglin](https://github.com/kieraneglin)
11. StreamLabs by [kieraneglin](https://github.com/kieraneglin)
12. StreamTip by [kieraneglin](https://github.com/kieraneglin)
13. Stripe by [kieraneglin](https://github.com/kieraneglin)

## Installation
```bash
npm install xauth2
```

## Usage

```javascript
import Vue from 'vue';
import VueAxios from 'vue-axios';
import VueAuthenticate from 'vue-authenticate'; 
import axios from 'axios';

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:3000', // Your API domain
  
  providers: {
    github: {
      clientId: '',
      redirectUri: 'http://localhost:8080/auth/callback', // Your client app URL
    },
  },
})
```

### Email & password login and registration

```javascript
new Vue({
  methods: {
    login: function () {
      this.$auth.login({ this.email, this.password }).then(() => {
        // Execute application logic after successful login
      })
    },

    register: function () {
      this.$auth.register({ this.name, this.email, this.password }).then(() => {
        // Execute application logic after successful registration
      });
    }
  }
})
```

```html
<button @click="login">Login</button>
<button @click="register">Register</button>
```

### Social account authentication

```javascript
new Vue({
  methods: {
    authenticate: function (provider) {
      this.$auth.authenticate(provider).then(() => {
        // Execute application logic after successful social authentication
      });
    }
  }
})
```

```html
<button @click="authenticate('github')">auth Github</button>
<button @click="authenticate('facebook')">auth Facebook</button>
<button @click="authenticate('google')">auth Google</button>
<button @click="authenticate('twitter')">auth Twitter</button>
```

### Vuex authentication

#### Import and initialize all required libraries

```javascript
// ES6 example
import Vue from 'vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import { VueAuthenticate } from 'vue-authenticate'
import axios from 'axios';

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const vueAuth = new VueAuthenticate(Vue.prototype.$http, {
  baseUrl: 'http://localhost:4000'
})
```

```javascript
// CommonJS example
var Vue = require('vue')
var Vuex = require('vuex')
var VueAxios = require('vue-axios')
var VueAuthenticate = require('vue-authenticate')
var axios = require('axios');

Vue.use(Vuex)
Vue.use(VueAxios, axios)

// ES5, CommonJS example
var vueAuth = VueAuthenticate.factory(Vue.prototype.$http, {
  baseUrl: 'http://localhost:4000'
})
```

Once you have created VueAuthenticate instance, you can use it in Vuex store like this:

```javascript
export default new Vuex.Store({
  
  // You can use it as state property
  state: {
    isAuthenticated: false
  },

  // You can use it as a state getter function (probably the best solution)
  getters: {
    isAuthenticated () {
      return vueAuth.isAuthenticated()
    }
  },

  // Mutation for when you use it as state property
  mutations: {
    isAuthenticated (state, payload) {
      state.isAuthenticated = payload.isAuthenticated
    }
  },

  actions: {

    // Perform VueAuthenticate login using Vuex actions
    login (context, payload) {

      vueAuth.login(payload.user, payload.requestOptions).then((response) => {
        context.commit('isAuthenticated', {
          isAuthenticated: vueAuth.isAuthenticated()
        })
      })

    }
  }
})
```

Later in Vue component, you can dispatch Vuex state action like this:

```javascript
// You define your store logic here
import store from './store.js'

new Vue({
  store,

  computed: {
    isAuthenticated: function () {
      return this.$store.getters.isAuthenticated()
    }
  },

  methods: {
    login () {
      this.$store.dispatch('login', { user, requestOptions })
    }
  }
})
```

### Custom request and response interceptors

You can easily setup custom request and response interceptors if you use different request handling library.

**Important**: You must always set both `request` and `response` interceptors.

```javascript
/**
* This is an example request & response interceptors for axios library
*/

Vue.use(VueAuthenticate, {
  bindRequestInterceptor: function () {
    this.$http.interceptors.request.use((config) => {
      if (this.isAuthenticated()) {
        config.headers['Authorization'] = [
          this.options.tokenType, this.getToken()
        ].join(' ')
      } else {
        delete config.headers['Authorization']
      }
      return config
    })
  },
  
  bindResponseInterceptor: function () {
    this.$http.interceptors.response.use((response) => {
      this.setToken(response)
      return response
    })
  }
})

```
