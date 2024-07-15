<template>
  <div
    class="w-full h-auto border-dashed border-b-[2px] p-3 pt-5 pb-5 hover:bg-gray-100 transition duration-0 hover:duration-150"
  >
    <div class="rounded-lg max-w-sm mx-auto flex flex-col">
      <div class="flex items-center rounded-lg px-1 py-1 cursor-pointer">
        <div class="flex items-center">
          <img class="h-12 w-12 rounded-full" :src="props.notification?.data?.user?.avatar" />
          <div class="flex flex-col text-sm text-slate-400 ml-3">
            <h1 class="text-[14px] font-sm text-slate-700">
              <a
                :href="`/profile/${props.notification?.data?.user?.id}`"
                class="font-semibold text-slate-900"
              >
                {{ props.notification?.data?.user?.name }}
              </a>

              liked your post.
            </h1>
            <span class="text-[11px]">{{ props.notification?.data.created_at }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['notification'])
console.log(props)
</script>
