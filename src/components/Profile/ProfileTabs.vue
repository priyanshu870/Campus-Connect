<template>
  <div class="flex space-x-5 p-4 sm:ml-2 sm:justify-center md:justify-end">
    <button @click="selectTab(1)">
      <div
        class="flex items-center justify-center p-1 text-gray-600"
        :class="{ 'border-b-2 border-b-gray-900 text-gray-900': selectedTab === 1 }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="h-6 w-6 mr-1 hidden md:block"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M10 4h4c3.771 0 5.657 0 6.828 1.172C22 6.343 22 8.229 22 12c0 3.771 0 5.657-1.172 6.828C19.657 20 17.771 20 14 20h-4c-3.771 0-5.657 0-6.828-1.172C2 17.657 2 15.771 2 12c0-3.771 0-5.657 1.172-6.828C4.343 4 6.229 4 10 4m3.25 5a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75m1 3a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75m1 3a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75M11 9a2 2 0 1 1-4 0a2 2 0 0 1 4 0m-2 8c4 0 4-.895 4-2s-1.79-2-4-2s-4 .895-4 2s0 2 4 2"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="text-semibold"> Profile </span>
      </div>
    </button>
    <button @click="selectTab(2)">
      <div
        class="flex items-center justify-center p-1 text-gray-600"
        :class="{ 'border-b-2 border-b-gray-900 text-gray-900': selectedTab === 2 }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="h-6 w-6 mr-1 hidden md:block"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M2 9.137C2 14 6.02 16.591 8.962 18.911C10 19.729 11 20.5 12 20.5s2-.77 3.038-1.59C17.981 16.592 22 14 22 9.138c0-4.863-5.5-8.312-10-3.636C7.5.825 2 4.274 2 9.137"
          ></path>
        </svg>

        Followers
      </div>
    </button>
    <button @click="selectTab(3)">
      <div
        class="flex items-center justify-center p-1 text-gray-600"
        :class="{ 'border-b-2 border-b-gray-900 text-gray-900': selectedTab === 3 }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="h-6 w-6 mr-1 hidden md:block"
          viewBox="0 0 24 24"
        >
          <circle cx="9.001" cy="6" r="4" fill="currentColor"></circle>
          <ellipse cx="9.001" cy="17.001" fill="currentColor" rx="7" ry="4"></ellipse>
          <path
            fill="currentColor"
            d="M21 17c0 1.657-2.036 3-4.521 3c.732-.8 1.236-1.805 1.236-2.998c0-1.195-.505-2.2-1.239-3.001C18.962 14 21 15.344 21 17M18 6a3 3 0 0 1-4.029 2.82A5.688 5.688 0 0 0 14.714 6c0-1.025-.27-1.987-.742-2.819A3 3 0 0 1 18 6.001"
          ></path>
        </svg>

        Followings
      </div>
    </button>
    <button @click="selectTab(4)">
      <div
        class="flex items-center justify-center p-1 text-gray-600"
        :class="{ 'border-b-2 border-b-gray-900 text-gray-900': selectedTab === 4 }"
      >
        <IconGallery class="hidden md:block" />
        Gallery
      </div>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import IconGallery from '@/components/icons/IconGallery.vue'
import { useStore } from 'vuex'

const store = useStore()
const selectedTab = computed(() => store.state.SelectedTab.selectedTab)

const selectTab = (index) => {
  store.dispatch('SelectedTab/updateSelectedTab', index)
}
</script>
