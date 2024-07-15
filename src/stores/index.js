import { createStore } from 'vuex'
import UserModule from '@/stores/modules/user'
import PostModule from '@/stores/modules/post'
import SelectedTabModule from '@/stores/modules/selectedTab'

import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const store = createStore({
  modules: {
    User: UserModule,
    Post: PostModule,
    SelectedTab: SelectedTabModule
  },
  plugins: [vuexLocal.plugin]
})

export default store
