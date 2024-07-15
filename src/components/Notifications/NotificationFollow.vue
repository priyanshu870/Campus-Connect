<template>
  <div
    class="w-full h-auto border-dashed border-b-[2px] p-3 pt-5 pb-5 hover:bg-gray-100 transition duration-0 hover:duration-150"
  >
    <div class="rounded-lg max-w-sm mx-auto flex flex-col">
      <div class="flex-col justify-center items-center rounded-lg px-1 py-1 cursor-pointer">
        <div class="flex items-center">
          <img class="h-12 w-12 rounded-full" :src="props.notification?.data?.user?.avatar" />
          <div class="flex flex-col text-sm text-slate-400 ml-3">
            <h1 class="text-[14px] font-sm text-slate-700">
              <a
                :href="`/profile/${props.notification?.data?.user?.id}`"
                class="font-semibold text-slate-800"
              >
                {{ props.notification?.data?.user?.name }}
              </a>

              {{ props.notification?.data?.title }}
            </h1>
            <span class="text-[11px]">{{ props.notification?.data.created_at }}</span>
          </div>
        </div>
        <div class="flex items-center ml-[58px]">
          <Button
            v-if="!props.notification?.data?.is_following"
            class="mt-2 w-16 text-[12px] h-8 bg-white text-black border-[1.5px] hover:bg-gray-100 hover:border-black"
            @click="unfollowUser"
            >Follow</Button
          >
          <Button
            v-else
            class="mt-2 w-16 text-[12px] h-8 bg-green-100 hover:bg-green-200"
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
import { Button } from '@/components/ui/button'
const props = defineProps(['notification'])
console.log(props)
</script>
