<template>
  <div class="antialiased dark:bg-gray-900 flex items-center justify-center">
    <AppHeader />
    <SideBar />
    <RightSideBar />

    <!-- main post section -->
    <main
    class="p-2 w-full md:w-[650px] pt-0 md:ml-64 md:mr-64 h-auto mt-16 rounded-lg overflow-y-auto"
    >
      <div>
        <div class="bg-white mb-5 flex justify-between">
          <div class="text-xl font-semibold text-slate-700">Feeds</div>
          <div class="flex">
            <ul class="flex justify-between space-x-5 text-sm text-slate-700">
              <li><a href="#">Recent</a></li>
              <li><a href="#">Friends</a></li>
              <li><a href="#">Popular</a></li>
            </ul>
          </div>
        </div>

        <!-- POSTS -->
        <div v-if="post">
          <ShowFullPost :post="post" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import SideBar from '@/components/layout/SideBar.vue'
import RightSideBar from '@/components/layout/RightSideBar.vue'
import { useRoute } from 'vue-router'
import ShowFullPost from '@/components/Posts/ShowFullPost.vue'
import { useStore } from 'vuex'
const post = ref('')
const route = useRoute()
const store = useStore()

onMounted(async () => {
  try {
    console.log(route.params.id)
    const res = computed(() => store.getters['Post/postById'](route.params.id))
    post.value = res?.value.data
  } catch (error) {
    console.log(error)
  }
})
</script>
