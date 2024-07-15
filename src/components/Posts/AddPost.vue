<template>
  <form
    class="flex flex-col ml-1 w-full md:max-w-[400px] lg:max-w-[600px] rounded-lg"
    @submit="onSubmit"
    enctype="multipart/form-data"
  >
    <div class="flex flex-col w-full">
      <div class="mb-4 w-full">
        <!-- Email -->
        <FormField v-slot="{ componentField }" name="body">
          <FormItem v-auto-animate>
            <FormControl class="w-full">
              <div class="relative items-center flex w-full overflow-hidden whitespace-normal">
                <MyEditor v-bind="componentField" class="w-full rounded-lg" />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
    </div>

    <div class="flex justify-between m-2 items-center">
      <div class="flex space-x-3">
        <div class="flex items-center rounded-full bg-gray-100 pl-3.5 pr-3.5 p-2 hover:bg-gray-200">
          <label for="upload" class="cursor-pointer">
            <div class="flex items-center rounded-full pl-1 pr-1">
              <IconGallery class="text-green-500" />
              <h1 class="text-slate-500">Image</h1>
            </div>
          </label>
          <input
            id="upload"
            type="file"
            class="hidden"
            multiple
            @change="handleImageUpload"
            accept="image/jpeg,image/jpg,image/png"
          />
        </div>
        <div
          class="flex items-center rounded-full bg-gray-100 p-1.5 pl-3.5 pr-3.5 hover:bg-gray-200"
        >
          <label for="upload-video" class="cursor-pointer">
            <div class="flex items-center rounded-full pl-1 pr-1">
              <IconVideo class="text-red-500" />
              <h1 class="text-slate-500">Gifs</h1>
            </div>
          </label>
          <input
            id="upload-video"
            type="file"
            class="hidden"
            multiple
            @change="handleImageUpload"
            accept=".mp4,.gif"
          />
          <input id="upload" type="file" class="hidden" multiple />
        </div>
      </div>
      <div></div>

      <!-- Submit Button -->
      <Button
        type="submit"
        :disabled="apiProgress"
        class="bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-semibold right-0 flex items-center"
      >
        <div
          v-if="apiProgress"
          class="animate-spin inline-block size-4 mr-2 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
          role="status"
          aria-label="loading"
        >
          <span class="sr-only">Loading...</span>
        </div>
        <div v-else>
          <svg
            class="mr-1"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </div>
        Submit Post
      </Button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { toTypedSchema } from '@vee-validate/zod'
import IconGallery from '@/components/icons/IconGallery.vue'
import IconVideo from '@/components/icons/IconVideo.vue'
import * as z from 'zod'
import Button from '@/components/ui/button/Button.vue'
import MyEditor from '@/components/Posts/MyEditor.vue'
import { useToast } from '@/components/ui/toast/use-toast'
import router from '@/router'

const { toast } = useToast()
import { useStore } from 'vuex'

const formSchema = toTypedSchema(
  z.object({
    body: z.string()
  })
)

const imageFiles = ref()
const apiProgress = ref(false)

const { handleSubmit } = useForm({
  validationSchema: formSchema
})
const store = useStore()

const handleImageUpload = (event) => {
  const files = event.target.files
  console.log(files)
  imageFiles.value = Array.from(files).filter((file) => file.type.startsWith('image/'))
  console.log(imageFiles.value)
}

const onSubmit = handleSubmit(async (values) => {
  apiProgress.value = true
  try {
    await store.dispatch('Post/addPost', {
      ...values,
      media: imageFiles.value
    })
    toast({
      title: 'Post added successfully'
    })

    router.push('/')
    setTimeout(() => {
      window.location.reload()
    }, 500)
  } catch (error) {
    console.log(error)
    if (error.response?.status === 401) {
      toast({
        title: error.response.data.error,
        variant: 'destructive'
      })
    } else {
      toast({
        title: 'Internal Server Error',
        variant: 'destructive'
      })
    }
  } finally {
    apiProgress.value = false
  }
})
</script>
