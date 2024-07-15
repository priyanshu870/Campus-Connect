<template>
  <li>
    <div class="flex justify-between items-center">
      <div class="flex items-center justify-center space-x-2">
        <Skeleton class="h-10 w-10 rounded-full bg-gray-300" />
        <div class="flex justify-center items-center space-x-8">
          <Skeleton class="h-4 w-[80px] bg-gray-300" />
          <Skeleton class="h-6 w-[44px] bg-gray-300 rounded-2xl" />
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
import { Skeleton } from '@/components/ui/skeleton'
</script>
