import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex'

import LoginPage from '@/views/Auth/LoginPage.vue'
import RegisterPage from '@/views/Auth/RegisterPage.vue'
import HomePage from '@/views/HomePage.vue'
import AddPost from '@/components/Posts/AddPost.vue'
import ShowPost from '@/components/Posts/ShowPost.vue'
import ProfilePage from '@/components/Profile/ProfilePage.vue'
import ProfileCard from '@/components/Profile/ProfileCard.vue'
import SettingPage from '@/components/Setting/SettingPage.vue'
import UploadMedia from '@/components/Posts/UploadMedia.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/add',
      name: 'add-post',
      component: AddPost
    },
    {
      path: '/posts/:id',
      name: 'show-post',
      component: ShowPost
    },
    {
      path: '/profile',
      name: 'profile-page',
      component: ProfilePage,
      children: [
        {
          path: ':id',
          name: 'profile-page-id',
          component: ProfileCard,
          // before entering the route dispatch the selectedtab as 1
          beforeEnter: (to, from, next) => {
            const store = useStore()
            store.dispatch('SelectedTab/updateSelectedTab', 1)
            next()
          }
        }
      ]
    },
    {
      path: '/upload',
      name: 'media-upload',
      component: UploadMedia
    },
    {
      path: '/setting',
      name: 'setting',
      component: SettingPage
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router

//TODO: make a before route navigation before /profile route
