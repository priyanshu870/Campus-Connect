<template>
  <div class="w-full">
    <ScrollArea class="h-[400px] w-full rounded-md p-0">
      <div v-for="notification in props.notifications" :key="notification">
        <div v-if="notification.data.type === 'like'">
          <NotificationLike :notification="notification" />
        </div>
        <div v-if="notification.data.type === 'comment'">
          <NotificationComment :notification="notification" />
        </div>
        <div v-if="notification.data.type === 'follow'">
          <NotificationFollow :notification="notification" />
        </div>
      </div>
    </ScrollArea>
  </div>
</template>

<script setup>
import { ScrollArea } from '@/components/ui/scroll-area'

import NotificationLike from '@/components/Notifications/NotificationLike.vue'
import NotificationComment from '@/components/Notifications/NotificationComment.vue'
import NotificationFollow from '@/components/Notifications/NotificationFollow.vue'

const props = defineProps(['notifications'])

console.log(props.notifications)
</script>
