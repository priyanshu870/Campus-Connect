<template>
  <div class="antialiased dark:bg-gray-900 flex items-center justify-center">
    <AppHeader />
    <SideBar />
    <RightSideBar />

    <!-- main post section -->
    <main class="p-2 pt-0 md:ml-64 md:mr-64 lg:w-[650px] h-full bg-white mt-16 rounded-lg">
      <h1 class="text-xl font-medium">Profile</h1>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import SideBar from '@/components/layout/SideBar.vue'
import RightSideBar from '@/components/layout/RightSideBar.vue'
</script>
