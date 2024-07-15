<template>
  <div class="mt-10 w-full">
    <div class="grid gap-5 w-full">
      <div class="grid grid-cols-6 gap-6">
        <div class="col-span-2">
          <!-- Followers / Following Counts Block -->
          <div class="relative">
            <div
              class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25"
            ></div>

            <div
              class="relative p-4 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex flex-col md:flex-row items-center justify-evenly"
            >
              <div class="rounded-xl flex flex-col md:flex-row items-center justify-evenly">
                <div class="lg:mr-4 items-center justify-center flex flex-col hover:scale-110">
                  <div class="text-xl font-semibold">{{ User?.attributes?.followers_count }}</div>
                  <div class="text-sm text-slate-500">Followers</div>
                </div>

                <div class="hidden lg:block">
                  <Separator orientation="vertical" class="text-black w-0.5 h-20" />
                </div>
                <div class="lg:ml-4 items-center justify-center flex flex-col hover:scale-110">
                  <div class="text-xl font-semibold">{{ User?.attributes?.following_count }}</div>
                  <div class="text-sm text-slate-500">Following</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Links Block -->
          <div class="flex items-center justify-center mt-5 rounded-xl p-3 shadow-lg border-[1px]">
            <div class="hidden md:block">
              <ul class="flex items-center justify-center">
                <!-- Facebook -->
                <li class="flex items-center">
                  <a href="/" class="cursor-pointer">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <IconFacebook class="h-8 w-8"/>
                        </TooltipTrigger>
                        <TooltipContent class="bg-blue-100 border border-blue-300 text-blue-600">
                          <p>Facebook</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </a>
                </li>

                <!-- Instagram -->
                <li class="flex items-center">
                  <a href="/" class="cursor-pointer">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <IconInstagram class="h-8 w-8 mr-3"/>
                        </TooltipTrigger>
                        <TooltipContent class="bg-pink-100 border border-pink-300 text-pink-600">
                          <p>Instagram</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </a>
                </li>

                <!-- Linkedin -->
                <li class="flex items-center">
                  <a href="/" class="cursor-pointer">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <IconLinkedin class="h-8 w-8"/>
                        </TooltipTrigger>
                        <TooltipContent class="bg-blue-100 border border-blue-300 text-blue-600">
                          <p>Linkedin</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </a>
                </li>

                <!-- Twitter -->
                <li class="flex items-center">
                  <a href="/" class="cursor-pointer">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <IconTwitter class="h-8 w-8"/>
                        </TooltipTrigger>
                        <TooltipContent class="bg-blue-100 border border-blue-300 text-blue-600">
                          <p>Twitter</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-span-4">
          <div class="relative max-w-7xl mx-auto">
            <div
              class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25"
            ></div>

            <div
              class="relative p-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6"
            >
              <ul class="">
                <li class="text-md">
                  {{ User?.attributes?.about }}
                </li>
                <li class="flex items-center mt-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 hover:scale-110 text-indigo-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                    />
                  </svg>
                  <span class="ml-1">{{ User?.attributes?.email }}</span>
                </li>
                <li class="flex mt-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-5 h-5 hover:scale-110 text-purple-600"
                  >
                    <path
                      d="M11.584 2.376a.75.75 0 0 1 .832 0l9 6a.75.75 0 1 1-.832 1.248L12 3.901 3.416 9.624a.75.75 0 0 1-.832-1.248l9-6Z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M20.25 10.332v9.918H21a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5h.75v-9.918a.75.75 0 0 1 .634-.74A49.109 49.109 0 0 1 12 9c2.59 0 5.134.202 7.616.592a.75.75 0 0 1 .634.74Zm-7.5 2.418a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Zm3-.75a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0v-6.75a.75.75 0 0 1 .75-.75ZM9 12.75a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Z"
                      clip-rule="evenodd"
                    />
                    <path d="M12 7.875a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" />
                  </svg>

                  <span class="ml-1" v-html="course"></span>
                </li>
                <li class="flex mt-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 hover:scale-110 text-indigo-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                    />
                  </svg>
                  <span class="ml-1" v-html="year"></span>
                </li>
                <li class="flex mt-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-5 h-5 hover:scale-110 text-purple-600"
                  >
                    <path
                      d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z"
                    />
                    <path
                      d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z"
                    />
                    <path
                      d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z"
                    />
                  </svg>
                  <span class="ml-1" v-html="branch"></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col justify-center items-center">
      <main class="p-2 w-full md:w-[650px] pt-0 h-auto mt-6 rounded-lg overflow-y-auto">
        <!-- Add a post block -->
        <div v-if="AuthenticatedUser.user_id == route.params.id">
          <ShareSomething class="mt-5" :avatar="AuthenticatedUser?.attributes?.avatar" />
        </div>
        <div v-if="apiProgress">
          <div v-for="index in 5" :key="index">
            <PostSkelton />
          </div>
        </div>
        <div v-else>
          <PostCard v-for="post in posts" :post="post" :key="post" />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { Separator } from '@/components/ui/separator'
import { ref, computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import axios from '@/api.js'
import ShareSomething from '@/components/Posts/ShareSomething.vue'
import PostCard from '@/components/Posts/PostCard.vue'
import { IconFacebook, IconInstagram, IconTwitter, IconLinkedin } from '@/components/icons'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import PostSkelton from '@/components/Skelton/PostSkelton.vue'

const route = useRoute()
const store = useStore()
const User = ref(null)
const posts = ref(null)
const socialMedia = ref(null)
const apiProgress = ref(false)

onMounted(async () => {
  fetchData()
})

watch(
  () => route,
  () => {
    fetchData()
  }
)

const branches = {
  cse: 'Computer Science and Engineering',
  it: 'Information Technology',
  ece: 'Electronics and Communication Engineering',
  el: 'Electrical Engineering',
  me: 'Mechanical Engineering',
  civ: 'Civil Engineering'
}

const years = {
  1: '1st year',
  2: '2nd year',
  3: '3rd year',
  4: '4th year'
}

const courses = {
  btech: 'BTECH',
  mca: 'MCA',
  mtech: 'MTECH'
}

const branch = computed(() => {
  const val = User.value?.attributes?.branch
  return (
    branches[val] ||
    `<a href='/setting' class="text-red-500 hover:text-red-800">Waiting for updates 😵</a>`
  )
})

const year = computed(() => {
  const val = User.value?.attributes?.year
  return (
    years[val] ||
    `<a href='/setting' class="text-red-500 hover:text-red-800">Waiting for updates 😵</a>`
  )
})

const course = computed(() => {
  const val = User.value?.attributes?.course
  return (
    courses[val] ||
    `<a href='/setting' class="text-red-500 hover:text-red-800">Waiting for updates 😵</a>`
  )
})

const AuthenticatedUser = computed(() => store.state.User.user)

const fetchData = async () => {
  apiProgress.value = true
  try {
    const res = await axios.get(`/api/user/${route.params.id}`)
    console.log(res)
    const postres = await axios.get(`/api/user/${route.params.id}/posts`)
    posts.value = postres.data.data
    User.value = res.data.data
    socialMedia.value = JSON.parse(User.value.attributes.social_links)
  } catch (error) {
    console.log(error)
  } finally {
    apiProgress.value = false
  }
}
</script>
