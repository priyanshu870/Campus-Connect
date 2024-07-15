<template>
  <div class="border rounded-2xl border-gray-100 shadow dark:border-gray-600 mb-4">
    <div class="relative max-w-7xl mx-auto rounded-2xl">
      <div
        class="absolute -inset-1 bg-gradient-to-r from-purple-300 to-pink-300 blur opacity-25 rounded-2xl"
      ></div>

      <div
        class="relative h-full bg-white ring-1 ring-gray-900/5 rounded-2xl leading-none flex items-top justify-start space-x-6"
      >
        <div class="hover:bg-gray-50 bg-white p-8 rounded-2xl shadow-md w-full h-full">
          <!-- User Info with Three-Dot Menu -->
          <div class="flex items-center justify-between mb-4 w-full h-full">
            <div
              class="hover:cursor-pointer"
              @click="goToProfile(postInfo?.data?.attributes.posted_by.data.user_id)"
            >
              <div class="flex items-center space-x-2">
                <img
                  :src="postInfo?.data?.attributes?.posted_by?.data?.attributes?.avatar"
                  class="rounded-full w-10 h-10"
                />
                <div>
                  <p class="text-gray-800 font-semibold hover:text-gray-600 mb-1">
                    {{ postInfo?.data?.attributes.posted_by.data.attributes.name }}
                  </p>
                  <p class="text-gray-600 text-[12px]">
                    Posted {{ postInfo?.data?.attributes.posted_at }}
                  </p>
                </div>
              </div>
            </div>
            <div class="text-gray-500 cursor-pointer">
              <!-- Three-dot menu icon -->
              <div v-if="postInfo?.data?.attributes.posted_by.data.user_id === User.user_id">
              <AlertDialog>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <button class="hover:bg-gray-50 rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="12" cy="7" r="1" />
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="17" r="1" />
                      </svg>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent class="left-0">
                    <DropdownMenuItem @click="editPost">
                      <IconEdit class="text-green-500 mr-5" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <AlertDialogTrigger class="w-full">
                      <DropdownMenuItem>
                        <IconDelete class="text-red-500 mr-5" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                  </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      <div class="sm:flex sm:items-start">
                        <div
                          class="mx-auto flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                        >
                          <svg
                            class="h-7 w-7 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                            />
                          </svg>
                        </div>
                        <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <h3
                            class="text-lg font-semibold leading-6 text-gray-900"
                            id="modal-title"
                          >
                            Remove Post
                          </h3>
                          <div class="mt-2">
                            <p class="text-sm text-gray-500">
                              Are you sure you want to remove your post? This action cannot be
                              undone.
                            </p>
                          </div>
                        </div>
                      </div>
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      @click="deletePost"
                      class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      >Continue</AlertDialogAction
                    >
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            </div>
          </div>

          <router-link :to="'/posts/' + postInfo?.data?.post_id">
            <!-- Message -->
            <div v-if="!edit" class="mb-4 prose" v-html="messageBodyTrim"></div>
          </router-link>
          <span v-if="edit">
            <EditPost
              :defaultValue="postInfo?.data"
              @edit-cancel="editPost"
              @edit-completed="editPost"
            />
          </span>
          <!-- Image -->
          <div v-if="mediaFiles?.length > 0 && !edit" class="h-full">
            <div class="w-full flex items-center justify-center rounded-lg">
              <Carousel 
                :plugins="[Autoplay({
                  delay: 5000,
                })]"
               class="relative w-full max-w-xl">
                <CarouselContent>
                  <CarouselItem v-for="(media, index) in mediaFiles" :key="index">
                    <div class="w-full flex h-full items-center justify-center rounded-2xl">
                      <img :src="media" class="w-full rounded-2xl" />
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <div v-if="mediaFiles?.length > 1">
                  <CarouselPrevious
                    class="ml-12 text-gray-400 bg-gray-50 hover:text-gray-400 hover:bg-gray-100"
                  />
                  <CarouselNext
                    class="mr-12 text-gray-400 bg-gray-50 hover:text-gray-400 hover:bg-gray-100"
                  />
                </div>
              </Carousel>
            </div>
          </div>
          <!-- Like and Comment Section -->
          <div class="flex items-center justify-between text-gray-500">
            <div class="flex items-center hover:text-red-500">
              <button
                class="flex justify-center items-center gap-2 p-2 hover:bg-pink-200 hover:rounded-full"
                @click="toggleReaction()"
              >
                <svg
                  class="w-7 h-7 p-1 hover:scale-110"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  :class="
                    postInfo?.data?.attributes.user_has_reaction ? 'fill-red-500' : 'fill-white'
                  "
                  @click="toggleAnimation"
                >
                  <path
                    d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z"
                    class="stroke-red-500"
                    :class="{ 'scale-100': isAnimating }"
                  />
                </svg>
              </button>
              <div>
                <span>{{ postInfo?.data?.attributes.cnt_of_reactions }}</span>
              </div>
            </div>
            <!-- TODO: add same for comment thing like like one -->
          
            <div class="flex">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <button
                      class="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 hover:rounded-full"
                    >
                      <div class="flex p-2">
                        <svg
                          class="mr-1"
                          viewBox="0 0 24 24"
                          width="20px"
                          height="20px"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <line x1="22" y1="2" x2="11" y2="13"></line>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                        <span>Share</span>
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent class="left-0">
                    <DropdownMenuItem class="focus:bg-white">
                      <div class="flex justify-between cursor-pointer">
                        <a href="/" @click.prevent="shareJobUrls(postInfo?.data?.attributes.body, mediaFiles)">
                          <IconLinkedin class="h-6 w-6 mr-5" />
                        </a>
                        <IconTwitter class="h-6 w-6 mr-5"/>
                        <IconInstagram class="h-6 w-6"/>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
           
              <button
                class="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 hover:rounded-full"
              >
                <svg
                  width="22px"
                  height="22px"
                  viewBox="0 0 24 24"
                  class="w-5 h-5 fill-current hovered"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"
                    ></path>
                  </g>
                </svg>
                <router-link :to="'/posts/' + postInfo?.data?.post_id">
                  <span>{{ postInfo?.data?.attributes.comments.comment_count }} Comments</span>
                </router-link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'


import EditPost from '@/components/Posts/EditPost.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import { IconLinkedin, IconTwitter, IconInstagram } from '@/components/icons/index.js'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useToast } from '@/components/ui/toast/use-toast'
import router from '@/router'
import axios from '@/api.js'

const User = computed(() => store.state.User.user)
const store = useStore()
const { toast } = useToast()

const postInfo = ref('')
const isAnimating = ref(true)
const edit = ref(false)
const props = defineProps(['post'])
postInfo.value = props.post

const linkedinLink = ref('')

const removeHtmlTags = (str) => {
  if((str === null) || (str === ''))
    return false;
  else
    str = str.toString();

  console.log(str.replace(/(<([^>]+)>)/ig, ''));
  return str.replace(/(<([^>]+)>)/ig, '');
}

const shareJobUrls = (body, media) => {
  body = body.toString();
  body = body.replace(/(<([^>]+)>)/ig, '');
  linkedinLink.value = "https://www.linkedin.com/shareArticle?mini=true&text="+body+"&url="+media;
  setTimeout(() => {
      window.location.href = linkedinLink.value;
    }, 1000);
}

const mediaFiles = computed(() => {
  if (postInfo.value?.data?.attributes?.media?.data) {
    const mediaData = postInfo.value?.data?.attributes?.media?.data
    return mediaData.map((mediaItem) => mediaItem.data.file_url)
  } else {
    return []
  }
})

const messageBodyTrim = computed(() => {
  const body = postInfo.value?.data?.attributes.body || ''
  const maxWords = 40
  const words = body.trim().split(/\s+/)
  if (words.length <= maxWords) {
    return body
  } else {
    const truncatedText = words.slice(0, maxWords).join(' ')
    return `${truncatedText} <br/> <span class="text-blue-500 text-md cursor-pointer">Show more</span>`
  }
})

const editPost = async () => {
  edit.value = !edit.value
}

const goToProfile = (userId) => {
  router.push({ name: 'profile-page-id', params: { id: userId } })
}

const deletePost = async () => {
  await store.dispatch('Post/removePost', {
    postId: postInfo.value.data.post_id
  })
  toast({
    title: 'Post Deleted Successfully'
  })
}

const toggleReaction = async () => {
  try {
    const res = await axios.post(`/api/posts/${postInfo.value?.data?.post_id}/reaction`, {
      reaction: 'like'
    })
    postInfo.value.data.attributes.cnt_of_reactions = res.data.reactions
    postInfo.value.data.attributes.user_has_reaction = res.data.user_has_reaction
  } catch (error) {
    console.log(error)
  }
}

const toggleAnimation = () => {
  isAnimating.value = true
  setTimeout(() => {
    isAnimating.value = false
  }, 1000) // Adjust the duration based on your animation duration
}
</script>
