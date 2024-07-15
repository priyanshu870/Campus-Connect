<template>
  <div class="mt-4 h-auto w-full flex flex-col">
    <div v-if="notifications?.length > 0">
      <NotificationContent :notifications="notifications" />
    </div>
    <div v-else><NoNotification /></div>
    <button
      v-if="notifications?.length > 0"
      class="flex items-center justify-center p-2 rounded-xl hover:bg-green-200 m-2 bg-green-100"
      @click="clearNotifications"
    >
      <IconTick class="text-green-500 mr-2" />
      <div class="font-display">Mark all as read</div>
    </button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

import IconTick from '@/components/icons/IconTick.vue'
import NotificationContent from '@/components/Notifications/NotificationContent.vue'
import NoNotification from '@/components/Notifications/NoNotification.vue'

const store = useStore()
const emits = defineEmits(['clear'])

const User = computed(() => store.state.User.user)
console.log(User.value)

const notifications = ref(null)

const props = defineProps(['notifications'])
notifications.value = props.notifications

const clearNotifications = () => {
  notifications.value = []
  emits('clear')
}
</script>
