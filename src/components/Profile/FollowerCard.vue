<template>
  <div
    class="flex flex-col items-start sm:flex-row sm:space-y-0 sm:space-x-6 px-4 py-8 border-1 border-gray-400 dark:border-gray-400 shadow-xl rounded-lg"
  >
    <div class="rounded-full w-20">
      <img :src="props?.follower?.data?.attributes?.avatar" class="rounded-full" />
    </div>
    <div class="flex justify-between w-full md:items-center flex-col sm:space-y-2 md:flex-row">
      <div class="hover:cursor-pointer" @click="goToProfile(props?.follower?.data?.user_id)">
        <div class="flex-col">
          <div class="text-sm font-semibold">{{ props?.follower?.data?.attributes?.name }}</div>
          <div class="text-[12px] text-slate-600 mb-1">
            {{ props?.follower?.data?.attributes?.email }}
          </div>
          <div
            class="w-14 text-sm bg-green-200 ring-1 ring-green-100 rounded-md text-center text-green-500"
          >
            Year
          </div>
        </div>
      </div>
      <div v-if="User.user_id == route.params.id">
        <div v-if="!props?.follower?.data?.attributes?.is_followed">
          <Button
            class="mt-2 w-14 text-[12px] h-8 bg-white text-black border-[1.5px] hover:bg-gray-100 hover:border-black"
            @click="followUser"
            >Follow</Button
          >
        </div>
        <div v-else>
          <Button
            class="mt-2 text-[12px] bg-white p-0 pl-1 pr-1 hover:bg-green-100"
            @click="unfollowUser"
          >
            <IconTick class="text-green-400" />
            <h1 class="text-green-400">Followed</h1>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Button from '@/components/ui/button/Button.vue'
import { useRoute } from 'vue-router'
import IconTick from '@/components/icons/IconTick.vue'
import router from '@/router'

const route = useRoute()
const store = useStore()

const User = computed(() => store.state.User.user)
const emits = defineEmits(['follow'])

const props = defineProps(['follower'])

const followUser = () => {
  emits('follow', {
    userId: User.value.id,
    followerId: props.follower.data.user_id,
    action: 'follow'
  })
}

const unfollowUser = () => {
  emits('follow', {
    userId: User.value.id,
    followerId: props.follower.data.user_id,
    action: 'unfollow'
  })
}

const goToProfile = (userId) => {
  store.dispatch('SelectedTab/updateSelectedTab', 1)
  router.push({ name: 'profile-page-id', params: { id: userId } })
}
</script>
