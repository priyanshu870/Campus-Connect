<template>
  <div class="relative rounded-lg">
    <div class="rounded-t-lg h-48 overflow-hidden">
      <Skeleton class="h-48 object-cover object-top w-full bg-gray-300" />
    </div>
    <div class="w-full mx-auto absolute left-5 top-20 flex items-center space-x-3">
      <div class="w-32 h-32 border-2 border-white rounded-full overflow-hidden">
        <AvatarSkelton class="w-32 h-32 rounded-full bg-white" />
      </div>
      <div class="space-y-2">
        <Skeleton class="h-6 w-[250px] bg-white" />
        <Skeleton class="h-4 w-[200px] bg-white" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Skeleton } from '@/components/ui/skeleton'
import AvatarSkelton from '@/components/Skelton/AvatarSkelton.vue'
</script>
