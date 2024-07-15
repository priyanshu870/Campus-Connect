<template>
  <div
    class="flex flex-col items-start sm:flex-row sm:space-y-0 sm:space-x-6 px-3 py-6 border-1 border-gray-400 dark:border-gray-400 shadow-xl rounded-lg"
  >
    <div class="rounded-full w-20">
      <img :src="props?.following?.data?.attributes?.avatar" class="rounded-full" />
    </div>
    <div class="flex justify-between w-full md:items-center flex-col sm:space-y-2 md:flex-row">
      <div class="hover:cursor-pointer" @click="goToProfile(props?.following?.data?.user_id)">
        <div class="flex-col">
          <div class="text-sm font-semibold">{{ props?.following?.data?.attributes?.name }}</div>
          <div class="text-[12px] text-slate-600 mb-1">
            {{ props?.following?.data?.attributes?.email }}
          </div>
          <div
            class="w-14 text-sm bg-green-200 ring-1 ring-green-100 rounded-md text-center text-green-500"
          >
            Year
          </div>
        </div>
      </div>
      <div v-if="User.user_id == route.params.id">
        <Button
          class="-mt-1 w-12 text-[10px] h-8 bg-white text-black border-[1.5px] hover:bg-gray-100 hover:border-black"
          @click="unfollowUser"
          >Unfollow</Button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Button from '@/components/ui/button/Button.vue'
import { useRoute } from 'vue-router'
import router from '@/router'

const route = useRoute()
const store = useStore()

const User = computed(() => store.state.User.user)

const emits = defineEmits(['unfollow'])
const props = defineProps(['following'])

const unfollowUser = () => {
  emits('unfollow', {
    userId: User.value.user_id,
    followerId: props.following.data.user_id
  })
}
const goToProfile = (userId) => {
  store.dispatch('SelectedTab/updateSelectedTab', 1)
  router.push({ name: 'profile-page-id', params: { id: userId } })
}
</script>
