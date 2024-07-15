<template>
  <div
    class="mt-5 h-full w-full bg-white rounded-xl text-gray-900 flex flex-col justify-start shadow-lg"
  >
    <div v-if="apiProgress">
      <ProfileCardSkelton />
    </div>

    <div v-else class="relative bg-white">
      <div class="rounded-t-lg h-48 overflow-hidden">
        <img
          class="object-cover object-top w-full"
          :src="currentUser?.data?.attributes?.banner"
          alt=""
        />
      </div>
      <div class="w-full mx-auto absolute left-5 top-20 flex items-center space-x-3">
        <div class="w-32 h-32 border-2 border-white rounded-full overflow-hidden">
          <img class="rounded-full" :src="currentUser?.data?.attributes?.avatar" alt="" />
        </div>
        <div>
          <div>
            <h1 class="text-xl font-bold text-white">{{ currentUser?.data?.attributes?.name }}</h1>
            <p class="text-slate-400 text-md">{{ branch }}</p>
          </div>
        </div>
      </div>
      <div
        v-if="User.user_id != route.params.id"
        class="right-0 top-36 w-15 absolute lg:right-10 lg:top-32"
      >
        <div v-if="buttonText == 'follow'">
          <Button
            class="text-sm h-8 bg-white text-black border-[1.5px] hover:bg-gray-100 hover:border-black"
            @click="handleFollowActions('follow')"
            >Follow</Button
          >
        </div>
        <div v-if="buttonText == 'unfollow'">
          <Button
            class="text-sm h-8 bg-white hover:bg-green-100"
            @click="handleFollowActions('unfollow')"
          >
            <IconTick class="text-green-500" />
            <h1 class="text-green-500">Followed</h1>
          </Button>
        </div>
      </div>
    </div>

    <div class="bg-white h-full rounded-xl">
      <ProfileTabs />
    </div>
  </div>

  <div class="mt-2">
    <div v-if="selectedTab === 1"><ProfileAbout /></div>
    <div v-if="selectedTab === 2"><ProfileFollowers /></div>
    <div v-if="selectedTab === 3"><ProfileFriends /></div>
  </div>
</template>

<script setup>
import { computed, ref, onBeforeMount, watch } from 'vue'
import ProfileAbout from '@/components/Profile/ProfileAbout.vue'
import ProfileFollowers from '@/components/Profile/ProfileFollowers.vue'
import ProfileFriends from '@/components/Profile/ProfileFollowings.vue'
import ProfileTabs from '@/components/Profile/ProfileTabs.vue'
import Button from '@/components/ui/button/Button.vue'
import axios from '@/api.js'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import IconTick from '@/components/icons/IconTick.vue'
import ProfileCardSkelton from '@/components/Skelton/ProfileCardSkelton.vue'

const route = useRoute()
const store = useStore()

const User = computed(() => store.state.User.user)
const currentUser = ref(null)
const selectedTab = computed(() => store.state.SelectedTab.selectedTab)

const branches = {
  cse: 'Computer Science and Engineering',
  it: 'Information Technology',
  ece: 'Electronics and Communication Engineering',
  el: 'Electrical Engineering',
  me: 'Mechanical Engineering',
  civ: 'Civil Engineering'
}

const branch = computed(() => {
  const val = currentUser?.value?.data?.attributes?.branch
  return branches[val]
})

const buttonText = ref(null)
const apiProgress = ref(false)

const fetchData = async () => {
  apiProgress.value = true
  try {
    const userData = await axios.get(`/api/user/${route.params.id}`)
    const res = await axios.get(`/api/user/isfollowing/${route.params.id}`)
    buttonText.value = res.data.data
    currentUser.value = userData.data
  } catch (error) {
    console.log(error)
  } finally {
    apiProgress.value = false
  }
}

onBeforeMount(fetchData)

watch(
  () => route.params.id,
  async (newId, oldId) => {
    if (newId !== oldId) {
      await fetchData()
    }
  }
)

const handleFollowActions = async (data) => {
  try {
    if (data === 'follow') {
      await axios.put(`/api/user/following/${route.params.id}`)
      buttonText.value = 'unfollow'
    } else if (data === 'unfollow') {
      await axios.delete(`/api/user/following/${route.params.id}`)
      buttonText.value = 'follow'
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
