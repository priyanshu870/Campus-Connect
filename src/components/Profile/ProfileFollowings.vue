<template>
  <div class="mt-10">
    <div v-if="apiProgress">
      <Loading />
    </div>
    <div v-else>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="following in followings" :key="following">
          <FollowingCard :following="following" @unfollow="handleFollowActions" />
        </div>
      </div>
      <div v-if="!followings?.length" class="text-center mt-8 text-gray-500">
        No followings yet. 🙁
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/api.js'
import FollowingCard from '@/components/Profile/FollowingCard.vue'
import Loading from '@/components/Skelton/Loading.vue'

const route = useRoute()

const followings = ref(null)
const apiProgress = ref(false)

onMounted(async () => {
  apiProgress.value = true
  try {
    const res = await axios.get(`/api/user/following/${route.params.id}`)
    followings.value = res.data.data
  } catch (error) {
    console.log(error)
  } finally {
    apiProgress.value = false
  }
})

const handleFollowActions = async (data) => {
  try {
    await axios.delete(`/api/user/following/${data.followerId}`)
    const res = await axios.get(`/api/user/following/${route.params.id}`)
    followings.value = res.data.data
  } catch (error) {
    console.log(error)
  }
}
</script>
