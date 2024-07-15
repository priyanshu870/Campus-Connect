import axios from 'axios'
import store from '@/stores/index.js'

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Get the token from Vuex store
    const token = store.getters['User/Token']

    // If token exists, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

export default axios
