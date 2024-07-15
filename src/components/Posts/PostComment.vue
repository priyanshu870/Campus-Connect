<template>
  <article class="p-3 text-base rounded-lg dark:bg-gray-900">
    <footer class="flex justify-between items-center mb-2">
      <div class="flex items-center">
        <p
          class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"
        >
          <img
            :src="commentValue?.data?.attributes?.commented_by.data.attributes.avatar"
            class="rounded-full w-8 h-8 mr-3"
          />
          {{ commentValue?.data?.attributes?.commented_by.data.attributes.name }}
        </p>
        <p class="hidden md:block text-sm text-gray-500 dark:text-gray-400">
          {{ commentValue?.data?.commented_at }}
        </p>
      </div>

      <!-- Dropdown menu -->
      <div class="text-gray-500 cursor-pointer">
        <!-- Three-dot menu icon -->
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button class="hover:bg-gray-50 rounded-full p-1" type="button">
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
            <DropdownMenuItem>
              <IconEdit class="text-green-500 mr-5" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem @click="deleteComment">
              <IconDelete class="text-red-500 mr-5" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </footer>
    <div
      class="mb-4 prose text-gray-500 dark:text-gray-400 text-sm"
      v-html="commentValue?.data?.body"
    ></div>
    <div class="flex items-center text-gray-500">
      <div class="flex items-center hover:text-pink-500">
        <button
          class="flex justify-center items-center gap-2 p-2 hover:bg-pink-200 hover:rounded-full"
          @click="toggleReaction()"
        >
          <svg
            class="w-6 h-6 p-1 hover:scale-110"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke-width="2"
            :class="commentValue?.data?.user_has_reaction ? 'fill-pink-500' : 'fill-white'"
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
          <span>{{ commentValue?.data?.cnt_of_reactions }}</span>
        </div>
      </div>

      <button class="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
        <svg
          viewBox="0 0 24 24"
          class="w-4 h-4 fill-current hovered"
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
        <span class="text-sm">Reply</span>
      </button>
    </div>
  </article>
</template>

<script setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import axios from '@/api.js'

const commentValue = ref(null)
const props = defineProps(['comment'])
commentValue.value = props.comment

const route = useRoute()
const store = useStore()

const deleteComment = async () => {
  await store.dispatch('Post/removeComment', {
    postId: route.params.id,
    commentId: commentValue.value.data.comment_id
  })
}

const toggleReaction = async () => {
  try {
    const res = await axios.post(`/api/comments/${commentValue.value.data.comment_id}/reaction`, {
      reaction: 'like'
    })
    commentValue.value.data.cnt_of_reactions = res.data.reactions
    commentValue.value.data.user_has_reaction = res.data.user_has_reaction
  } catch (error) {
    console.log(error)
  }
}
</script>
