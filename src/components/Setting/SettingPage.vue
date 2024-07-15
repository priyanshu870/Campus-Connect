<template>
  <div class="antialiased dark:bg-gray-900 flex items-center justify-center">
    <AppHeader />
    <SideBar />
    <RightSideBar />

    <!-- main post section -->
    <main
      class="p-2 w-full md:w-[650px] pt-0 md:ml-64 md:mr-64 h-auto mt-16 rounded-lg overflow-y-auto"
    >
      <div class="flex items-start flex-col">
        <h1 class="text-xl font-medium mb-4">Settings</h1>
        <Tabs default-value="profile" class="w-full">
          <TabsList class="grid w-full grid-cols-2">
            <TabsTrigger value="profile" @click="changeTab('profile')">
              <div :class="{ 'bg-white rounded-md p-1 py-1 w-full': selectedTab === 'profile' }">
                <div class="flex justify-center">
                  <IconProfileBlock class="mr-2" /> Update profile
                </div>
              </div>
            </TabsTrigger>
            <TabsTrigger value="notification" @click="changeTab('notification')">
              <div
                :class="{
                  'bg-white rounded-md p-1 py-1 w-full': selectedTab === 'notification'
                }"
              >
                <div class="flex justify-center"><IconBell class="mr-2" /> Notifications</div>
              </div>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile" class="mt-4">
            <UpdateProfile />
          </TabsContent>
          <TabsContent value="notification" class="mt-4">
            <NotificationSetting />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import SideBar from '@/components/layout/SideBar.vue'
import RightSideBar from '@/components/layout/RightSideBar.vue'
import IconProfileBlock from '@/components/icons/IconProfileBlock.vue'
import IconBell from '@/components/icons/IconBell.vue'
import UpdateProfile from '@/components/Setting/UpdateProfile.vue'
import NotificationSetting from '@/components/Setting/NotificationSetting.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const selectedTab = ref('profile')

const changeTab = (tab) => {
  selectedTab.value = tab
}
</script>
