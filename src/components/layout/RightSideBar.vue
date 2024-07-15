<template>
  <aside
    class="fixed top-0 hidden lg:block right-0 z-40 w-64 h-screen pt-12 transition-transform -translate-x-full border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidenav"
  >
    <!-- Dialog for Search users  -->
    <div class="overflow-y-auto px-3 h-full dark:bg-gray-800 flex flex-col gap-5">
      <div class="h-14 p-3">
        <Dialog>
          <DialogTrigger as-child>
            <div class="relative w-full max-w-sm items-center">
              <Input id="search" type="text" placeholder="Search friends" class="pl-10 bg-gray-100" />
              <span
                class="absolute start-0 inset-y-0 flex items-center justify-center px-2 hover:scale-110"
              >
                <IconSearch />
              </span>
            </div>
          </DialogTrigger>
          <DialogContent
            class="bg-gray-200 sm:max-w-[425px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[60dvh]"
          >
            <DialogHeader class="pb-0 w-full">
              <DialogTitle class="pt-8 pl-5 w-full"
                ><div class="relative w-full max-w-sm -mt-5">
                  <Input
                    id="search"
                    type="text"
                    v-model="searchQuery"
                    placeholder="Search..."
                    class="pl-10 bg-white ring-0 rounded-lg"
                  />
                  <span
                    class="absolute start-0 inset-y-0 flex items-center justify-center px-2 hover:scale-110"
                  >
                    <IconSearch />
                  </span></div
              ></DialogTitle>
            </DialogHeader>
            <div class="grid overflow-y-auto overflow-x-hidden max-w-[400px]">
              <div v-if="!filteredUsers || filteredUsers.length == 0" class="ml-6">
                No results found.
              </div>
              <div
                v-else
                class="bg-white p-2 mx-4 items-center justify-center mt-1 rounded-lg"
                v-for="user in filteredUsers"
                :key="user"
              >
                <div class="flex mx-4 w-full rounded-lg">
                  <div
                    class="flex w-full items-center justify-center hover:cursor-pointer rounded-2xl"
                    @click="goToProfile(user.data.user_id)"
                  >
                    <div
                      class="w-full rounded-lg flex items-center hover:scale-105 ease-in-out duration-200"
                    >
                      <div class="rounded-full w-16">
                        <img :src="user.data.attributes.avatar" class="rounded-full" />
                      </div>
                      <div
                        class="flex justify-between md:items-center flex-col sm:space-y-2 md:flex-row"
                      >
                        <div class="flex-col ml-5">
                          <div class="text-sm font-semibold">{{ user.data.attributes.name }}</div>
                          <div class="text-[12px] text-slate-600 mb-1">
                            {{ user.data.attributes.email }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <!-- Suggestions -->
      <div class="h-44 p-3">
        <h1 class="text-lg font-display font-semibold mb-2">Suggestions</h1>

        <div v-if="apiProgress">
          <ul v-for="index in 3" :key="index" class="flex flex-col mb-2">
            <SuggestionSkelton />
          </ul>
        </div>

        <ul class="flex flex-col mb-2" v-for="user in users" :key="user">
          <li>
            <a :href="`/profile/${user?.data?.user_id}`">
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <div class="rounded-full h-10 w-10 mr-1">
                  <img
                    :src="user?.data?.attributes?.avatar"
                    class="rounded-full h-10 w-10"
                    alt=""
                  />
                </div>
                <div class="text-[12px]">{{ user?.data?.attributes?.name }}</div>
              </div>
              <div class="text-sm">
                <Button class="w-full rounded-2xl h-4 p-3 text-[10px]">follow</Button>
              </div>
            </div>
          </a>
          </li>
        </ul>
      </div>

      <!-- Recommendations -->
      <div class="h-58 flex flex-col gap-2 p-3">
        <h1 class="font-display text-lg font-semibold">Recommendations</h1>
        <div class="flex flex-col gap-2">
          <div class="flex gap-3">
            <div
              class="rounded-full h-20 w-20 bg-gray-100 hover:scale-110 ease-in-out duration-100 cursor-pointer"
            >
              <img src="@/assets/logos/programmingclub.png" class="rounded-full h-20 w-20" />
            </div>
            <div
              class="rounded-full h-20 w-20 hover:scale-110 ease-in-out duration-100 cursor-pointer"
            >
              <img src="@/assets/logos/dhrist.png" class="rounded-full h-20 w-20" />
            </div>
          </div>
          <div class="flex gap-3">
            <div
              class="rounded-full h-20 w-20 bg-gray-100 hover:scale-110 ease-in-out duration-100 cursor-pointer"
            >
              <img src="@/assets/logos/knit.jpg" class="rounded-full h-20 w-20" />
            </div>
            <div
              class="rounded-full h-20 w-20 bg-gray-100 hover:scale-110 ease-in-out duration-100 cursor-pointer"
            >
              <img src="@/assets/logos/pfac.jpg" class="rounded-full h-20 w-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ref, computed, onMounted } from 'vue'
import axios from '@/api.js'
import router from '@/router'

import { IconSearch } from '@/components/icons'
import SuggestionSkelton from '@/components/Skelton/SuggestionSkelton.vue'

const users = ref(null)
const allUsers = ref(null)
const searchQuery = ref(null)
const apiProgress = ref(false)

const filteredUsers = computed(() => {
  const query = searchQuery?.value?.toLowerCase()
  if (!query) {
    return allUsers.value
  }
  return allUsers.value?.filter((user) => {
    const name = user?.data?.attributes?.name?.toLowerCase() || ''
    return name.includes(query)
  })
})

onMounted(async () => {
  apiProgress.value = true
  try {
    const res = await axios.get(`/api/user/suggestions`)
    const res2 = await axios.get(`/api/user`)
    users.value = res?.data.data
    allUsers.value = res2?.data.data
  } catch (error) {
    console.log(error)
  } finally {
    apiProgress.value = false
  }
})

const goToProfile = (userId) => {
  router.push({ name: 'profile-page-id', params: { id: userId } })
}
</script>
