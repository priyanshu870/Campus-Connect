<template>
  <div class="relative max-w-7xl mx-auto rounded-2xl mb-4">
    <div class="flex flex-col space-y-3 h-[600px] w-full rounded-xl bg-gray-200">
      <!-- Avatar Portion -->
      <div class="flex items-center space-x-4 p-8">
        <Skeleton class="h-12 w-12 rounded-full bg-white" />
        <div class="space-y-2">
          <Skeleton class="h-4 w-[250px] bg-white" />
          <Skeleton class="h-4 w-[200px] bg-white" />
        </div>
      </div>

      <!-- Message Body -->
      <Skeleton class="h-[400px] p-8 m-8 rounded-xl bg-white" />
    </div>
  </div>
</template>

<script setup>
import { Skeleton } from '@/components/ui/skeleton'
</script>
