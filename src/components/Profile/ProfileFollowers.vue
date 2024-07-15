<template>
  <div class="mt-10">
    <div v-if="apiProgress">
      <Loading />
    </div>
    <div v-else>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="follower in followers" :key="follower">
          <FollowerCard :follower="follower" @follow="handleFollowActions" />
        </div>
      </div>
      <div v-if="!followers?.length" class="text-center mt-8 text-gray-500">
        No followers yet. 🙁
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/api.js'
import FollowerCard from '@/components/Profile/FollowerCard.vue'
import { useRoute } from 'vue-router'
import Loading from '@/components/Skelton/Loading.vue'

const route = useRoute()
const followers = ref(null)
const apiProgress = ref(true)

onMounted(async () => {
  apiProgress.value = true
  try {
    const res = await axios.get(`/api/user/followers/${route.params.id}`)
    followers.value = res.data.data
  } catch (error) {
    console.log(error)
  } finally {
    apiProgress.value = false
  }
})

const handleFollowActions = async (data) => {
  try {
    if (data.action === 'follow') {
      await axios.put(`/api/user/following/${data.followerId}`)
    } else if (data.action === 'unfollow') {
      await axios.delete(`/api/user/following/${data.followerId}`)
    }
    const res = await axios.get(`/api/user/followers/${route.params.id}`)
    followers.value = res.data.data
  } catch (error) {
    console.log(error)
  }
}
</script>
