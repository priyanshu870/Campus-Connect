<template>
  <div>
    <router-view></router-view>
    <Toaster />
  </div>
</template>

<script setup>
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>
