<template>
  <div class="antialiased dark:bg-gray-900 flex items-center justify-center">
    <AppHeader />
    <SideBar />
    <RightSideBar />

    <!-- main post section -->
    <main
      class="p-2 w-full lg:w-[650px] pt-0 lg:ml-64 lg:mr-64 h-auto mt-16 rounded-lg overflow-y-auto"
    >
      <div>
        <div class="bg-white mb-5 flex justify-between">
          <div class="text-2xl font-display font-semibold">Feeds</div>
          <div class="flex">
            <ul class="flex justify-between space-x-5 text-sm text-slate-700">
              <li
                :class="{ 'text-gray-900': selectedTab === 1, 'text-gray-300': selectedTab !== 1 }"
                @click="selectedTab = 1"
              >
                <a href="#">Recent</a>
              </li>
              <li
                :class="{ 'text-gray-900': selectedTab === 2, 'text-gray-300': selectedTab !== 2 }"
                @click="selectedTab = 2"
              >
                <a href="#">Friends</a>
              </li>
              <li
                :class="{ 'text-gray-900': selectedTab === 3, 'text-gray-300': selectedTab !== 3 }"
                @click="selectedTab = 3"
              >
                <a href="#">Popular</a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Add a post -->
        <ShareSomething :avatar="User?.attributes?.avatar"/>

        <!-- Post -->
        <div v-if="apiProgress">
          <div v-for="index in 5" :key="index">
            <PostSkelton />
          </div>
        </div>
        <div v-else>
          <PostCard v-for="post in posts" :post="post" :key="post" />
          <div v-if="!posts?.length" class="text-center mt-8 text-gray-500">No posts available. 😭</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import SideBar from '@/components/layout/SideBar.vue'
import RightSideBar from '@/components/layout/RightSideBar.vue'
import PostCard from '@/components/Posts/PostCard.vue'
import ShareSomething from '@/components/Posts/ShareSomething.vue'
import PostSkelton from '@/components/Skelton/PostSkelton.vue' 

import { useStore } from 'vuex'

const store = useStore()
const posts = computed(() => store.getters['Post/posts'])
const selectedTab = ref(1)

const apiProgress = ref(false)
const User = computed(() => store.state.User.user)

onMounted(async () => {
  apiProgress.value = true
  try {
    await store.dispatch('Post/fetchPosts')
  } catch (error) {
    console.log(error)
  } finally {
    apiProgress.value = false
  }
})
</script>
