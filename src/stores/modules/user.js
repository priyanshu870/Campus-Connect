import axios from 'axios'

const UserModule = {
  namespaced: true,
  state() {
    return {
      user: null,
      token: null
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setToken(state, token) {
      state.token = token
    },
    setProfilePic(state, pic) {
      state.user.profile_pic = pic
    }
  },
  actions: {
    async login(context, payload) {
      const email = payload.email
      const password = payload.password
      let res = null

      axios.defaults.withCredentials = true
      axios.defaults.withXSRFToken = true

      res = await axios.post('/api/login', {
        email: email,
        password: password
      })

      console.log(res)
      context.commit('setUser', res.data.data)
      context.commit('setToken', res.data.data.token)
      localStorage.setItem('access-token', res.data.data.token)
      return 'Logged In Successfully'
    },

    async register(context, payload) {
      const name = payload.name
      const email = payload.email
      const password = payload.password
      let res = null

      axios.defaults.withCredentials = true
      axios.defaults.withXSRFToken = true

      res = await axios.post('/api/register', {
        name: name,
        email: email,
        password: password,
        password_confirmation: password
      })
      //TODO: for now i m using this but after using email-verification we can send emails too and then i will change this.
      context.commit('setUser', res.data.data.data)
      context.commit('setToken', res.data.data.data.token)
      localStorage.setItem('access-token', res.data.data.data.token)
      return 'Registered Successfully'
    },
    async logout(context) {
      await axios.post('/api/logout')
      localStorage.clear()
      context.commit('setUser', null)
      context.commit('setToken', null)
      return 'Logged Out Successfully'
    }
  },
  getters: {
    isLoggedIn: (state) => {
      return state.user !== null
    },
    User: (state) => {
      return state.user
    },
    Token: (state) => {
      return state.token
    }
  }
}

export default UserModule
