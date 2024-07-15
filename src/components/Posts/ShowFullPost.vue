<template>
  <div>
    <div class="border rounded-2xl border-gray-100 shadow dark:border-gray-600 mb-4">
      <div class="hover:bg-gray-50 bg-white p-8 rounded-2xl shadow-md w-full">
        <!-- User Info with Three-Dot Menu -->
        <div class="flex items-center justify-between mb-4 w-full">
          <div
            class="hover:cursor-pointer"
            @click="goToProfile(post?.data.attributes.posted_by.data.user_id)"
          >
            <div class="flex items-center space-x-2">
              <img
                :src="post?.data.attributes.posted_by.data.attributes.avatar"
                class="rounded-full w-10 h-10"
              />
              <div>
                <p class="text-gray-800 font-semibold">
                  {{ post?.data.attributes.posted_by.data.attributes.name }}
                </p>
                <p class="text-gray-600 text-[12px]">Posted {{ post?.data.attributes.posted_at }}</p>
              </div>
            </div>
          </div>
          <div class="text-gray-500 cursor-pointer">
            <!-- Three-dot menu icon -->
            <div v-if="post?.data.attributes.posted_by.data.user_id === User.user_id">
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
                          class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
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
                          <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                            Remove Post
                          </h3>
                          <div class="mt-2">
                            <p class="text-sm text-gray-500">
                              Are you sure you want to remove your post? This action cannot be undone.
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
        <!-- Message -->
        <div v-if="!edit" class="mb-4 prose" v-html="post?.data.attributes.body"></div>
        <span v-if="edit">
          <EditPost :defaultValue="post?.data" @edit-cancel="editPost" @edit-completed="editPost" />
        </span>
        <!-- Image -->
        <div v-if="mediaFiles?.length > 0 && !edit">
          <div class="w-full flex items-center justify-center rounded-lg">
            <Carousel 
                :plugins="[Autoplay({
                  delay: 4000,
                })]" 
            class="relative w-full max-w-xl max-h-sm">
              <CarouselContent>
                <CarouselItem v-for="(media, index) in mediaFiles" :key="index">
                  <div class="w-full flex h-full items-center justify-center rounded-2xl">
                    <img :src="media" class="w-full rounded-2xl" />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <div v-if="mediaFiles?.length > 1">
                <CarouselPrevious
                  class="ml-12 text-gray-800 bg-gray-50 hover:text-gray-900 hover:bg-gray-100"
                />
                <CarouselNext
                class="mr-12 text-gray-800 bg-gray-50 hover:text-gray-900 hover:bg-gray-100"
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
                :class="post?.data?.attributes.user_has_reaction ? 'fill-red-500' : 'fill-white'"
                @click="toggleAnimation"
              >
                <path
                  d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z"
                  class="stroke-pink-500"
                  :class="{ 'scale-100': isAnimating }"
                />
              </svg>
            </button>
            <div>
              <span>{{ post?.data?.attributes.cnt_of_reactions }}</span>
            </div>
          </div>
          <button
            class="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1"
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
            <span>{{ post?.data.attributes.comments.comment_count }} Comment</span>
          </button>
        </div>
      </div>
    </div>
    <section class="bg-white dark:bg-gray-900 py-5 lg:py-5 antialiased">
      <div class="max-w-2xl mx-auto px-4">
        <form @submit.prevent="onSubmit">
          <div class="flex justify-between space-x-2">
            <div
              class="flex-grow py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border-2 border-gray-300 dark:bg-gray-800 dark:border-gray-700"
            >
              <FormField name="comment">
                <FormItem>
                  <FormControl>
                    <input
                      class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                      placeholder="Write a comment..."
                      v-model="commentValue"
                    />
                  </FormControl>
                </FormItem>
              </FormField>
            </div>
            <Button type="submit" class="rounded-lg bg-slate-800 hover:bg-slate-700">Post </Button>
          </div>
        </form>
        <!-- Comments -->
        <span v-if="post?.data?.attributes?.comments">
          <div v-for="comment in post?.data?.attributes.comments.data" :key="comment">
            <PostComment :comment="comment" />
            <hr class="mb-3" />
          </div>
        </span>
      </div>
    </section>
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
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { ref, computed } from 'vue'
import router from '@/router'
import { Button } from '@/components/ui/button'
import PostComment from '@/components/Posts/PostComment.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useToast } from '@/components/ui/toast/use-toast'
import axios from '@/api.js'

const store = useStore()
const route = useRoute()
const User = computed(() => store.state.User.user)
const { toast } = useToast()

const commentValue = ref('')
const isAnimating = ref(true)
const edit = ref(false)
const post = computed(() => store.getters['Post/postById'](route.params.id))
const mediaFiles = computed(() => {
  if (post.value?.data?.attributes?.media?.data) {
    const mediaData = post.value?.data?.attributes?.media?.data
    return mediaData.map((mediaItem) => mediaItem.data.file_url)
  } else {
    return []
  }
})

const goToProfile = (userId) => {
  router.push({ name: 'profile-page-id', params: { id: userId } })
}

const editPost = async () => {
  edit.value = !edit.value
}

const deletePost = async () => {
  await store.dispatch('Post/removePost', {
    postId: post.value.data.post_id
  })
  router.push('/')
  toast({
    title: 'Failed to create project',
    // class: 'bg-red-200', add colors and all for designs
    duration: 1000
  })
}

const toggleReaction = async () => {
  try {
    const res = await axios.post(`/api/posts/${post.value?.data?.post_id}/reaction`, {
      reaction: 'like'
    })
    post.value.data.attributes.cnt_of_reactions = res.data.reactions
    post.value.data.attributes.user_has_reaction = res.data.user_has_reaction
  } catch (error) {
    console.log(error)
  }
}

const onSubmit = async () => {
  try {
    await store.dispatch('Post/addComment', {
      postId: post.value.data.post_id,
      commentData: commentValue.value
    })
    commentValue.value = ''
  } catch (error) {
    console.log(error)
  }
}

const toggleAnimation = () => {
  isAnimating.value = true
  setTimeout(() => {
    isAnimating.value = false
  }, 500)
}
</script>

<style scoped>
/* ----------------------------------------------
  Generated by AnimatiSS
  Licensed under FreeBSD License
  URL: https://xsgames.co/animatiss
  Twitter: @xsgames_
---------------------------------------------- */

.jello-horizontal {
  animation: jello-horizontal 0.9s linear both;
}
@keyframes jello-horizontal {
  0% {
    transform: scale3d(1, 1, 1);
  }
  30% {
    transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    transform: scale3d(1.05, 0.95, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}
</style>
