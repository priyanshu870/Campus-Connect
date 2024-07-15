<template>
  <div class="mt-6 px-2">
    <form class="space-y-8" @submit.prevent="onSubmit" enctype="multipart/form-data">
      <div class="flex flex-col md:flex-row-reverse">
        <div class="p-10">
          <!-- Avatar -->
          <FormField name="avatar">
            <FormItem>
              <FormLabel>Your avatar</FormLabel>
              <FormControl>
                <div class="flex flex-col items-center relative">
                  <div class="w-40 h-40 rounded-full">
                    <img :src="avatar" class="rounded-full" alt="" />
                  </div>
                  <div class="flex items-center absolute -bottom-1 left-1">
                    <Dialog>
                      <DialogTrigger as-child>
                        <span class="bg-primary text-white p-3 rounded-md text-sm cursor-pointer"
                          >Edit</span
                        >
                      </DialogTrigger>
                      <DialogContent class="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Choose avatar</DialogTitle>
                          <DialogDescription>
                            You can choose from this list or you can upload by clicking on plus.
                          </DialogDescription>
                        </DialogHeader>
                        <AvatarList @closeDialog="updateAvatar" />
                        <DialogFooter>
                          <DialogClose as-child>
                            <Button type="button" variant="secondary"> Close </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <div class="mr-3 w-full mt-5 flex-grow space-y-6">
          <!-- Name -->
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Your name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  :defaultValue="formData.name"
                  placeholder="Name"
                  v-bind="componentField"
                  v-model="formData.name"
                  class="border-2 pl-3 py-3 w-full rounded-md text-[14px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <!-- About -->
          <FormField v-slot="{ componentField }" name="about">
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself ..."
                  v-bind="componentField"
                  :defaultValue="formData.about"
                  v-model="formData.about"
                  class="border-2 pl-3 py-3 h-32 w-full rounded-md text-[14px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
      </div>

      <!-- Course -->
      <div class="flex justify-around space-x-3">
        <FormField v-slot="{ componentField }" name="course">
          <FormItem class="w-full">
            <FormLabel>Course</FormLabel>
            <FormControl>
              <Select
                class="w-full"
                v-bind="componentField"
                :defaultValue="formData.course"
                v-model="formData.course"
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder="Select your course"
                    class="text-gray-500"
                    v-bind="componentField"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="btech"> Bachelor of Technology </SelectItem>
                    <SelectItem value="mca"> Master of Computer Applications </SelectItem>
                    <SelectItem value="mtech"> Master of Technology </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="year">
          <FormItem class="w-full">
            <FormLabel>Year</FormLabel>
            <FormControl>
              <Select
                class="w-full"
                v-bind="componentField"
                :defaultValue="formData.year"
                v-model="formData.year"
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder="Select your year"
                    class="text-slate-500"
                    v-bind="componentField"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1"> 1st Year </SelectItem>
                    <SelectItem value="2"> 2nd Year </SelectItem>
                    <SelectItem value="3"> 3rd Year </SelectItem>
                    <SelectItem value="4"> 4th Year </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <!-- Branch -->
      <FormField v-slot="{ componentField }" name="branch">
        <FormItem>
          <FormLabel>Branch</FormLabel>
          <FormControl>
            <Select
              class="w-full"
              v-bind="componentField"
              :defaultValue="formData.branch"
              v-model="formData.branch"
            >
              <SelectTrigger>
                <SelectValue
                  placeholder="Select your branch"
                  class="text-slate-500"
                  v-bind="componentField"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="cse"> Computer Science and Engineering </SelectItem>
                  <SelectItem value="it"> Information Technology </SelectItem>
                  <SelectItem value="ece"> Electronics and Communication Engineering </SelectItem>
                  <SelectItem value="el"> Electrical Engineering </SelectItem>
                  <SelectItem value="me"> Mechanical Engineering </SelectItem>
                  <SelectItem value="civ"> Civil Engineering </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Social Links -->
      <FormField v-slot="{ componentField }" name="facebook">
        <FormItem>
          <FormLabel>Social Links</FormLabel>
          <FormControl>
            <div class="relative w-full items-center">
              <Input
                id="search"
                type="text"
                placeholder="Facebook"
                :defaultValue="formData.facebook"
                v-bind="componentField"
                v-model="formData.facebook"
                class="pl-10 border-2 py-3 w-full rounded-md text-[14px]"
              />
              <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                <IconFacebook class="h-8 w-8"/>
              </span>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="instagram">
        <FormItem>
          <FormControl>
            <div class="relative w-full items-center">
              <Input
                id="search"
                type="text"
                placeholder="Instagram"
                :defaultValue="formData.instagram"
                v-bind="componentField"
                v-model="formData.instagram"
                class="pl-10 border-2 py-3 w-full rounded-md text-[14px]"
              />
              <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                <IconInstagram class="h-8 w-8"/>
              </span>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="linkedin">
        <FormItem>
          <FormControl>
            <div class="relative w-full items-center">
              <Input
                id="search"
                type="text"
                placeholder="Linkedin"
                :defaultValue="formData.linkedin"
                v-bind="componentField"
                v-model="formData.linkedin"
                class="pl-10 border-2 py-3 w-full rounded-md text-[14px]"
              />
              <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                <IconLinkedin class="h-8 w-8"/>
              </span>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="twitter">
        <FormItem>
          <FormControl>
            <div class="relative w-full items-center">
              <Input
                id="search"
                type="text"
                placeholder="Twitter"
                :defaultValue="formData.twitter"
                v-bind="componentField"
                v-model="formData.twitter"
                class="pl-10 border-2 py-3 w-full rounded-md text-[14px]"
              />
              <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                <IconTwitter class="h-8 w-8"/>
              </span>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit" :disabled="apiProgress" class="rounded-2xl font-semibold">
        <div
          v-if="apiProgress"
          class="animate-spin inline-block size-4 mr-2 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
          role="status"
          aria-label="loading"
        >
          <span class="sr-only">Loading...</span>
        </div>
        <div>Update profile</div>
      </Button>
    </form>
  </div>
</template>

<script setup>
import { computed, ref, reactive, onBeforeMount } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useStore } from 'vuex'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import axios from '@/api.js'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import AvatarList from '@/components/Setting/AvatarList.vue'
import IconTwitter from '@/components/icons/IconTwitter.vue'
import IconInstagram from '@/components/icons/IconInstagram.vue'
import IconLinkedin from '@/components/icons/IconLinkedin.vue'
import IconFacebook from '@/components/icons/IconFacebook.vue'

const profileFormSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, 'The name must contain at least one letter'),
    about: z.string().optional(),
    course: z.string().optional(),
    branch: z.string().optional(),
    year: z.string().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional()
  })
)

const { handleSubmit } = useForm({
  validationSchema: profileFormSchema
})

const formData = reactive({
  name: '',
  about: '',
  course: '',
  branch: '',
  year: '',
  facebook: '',
  instagram: '',
  linkedin: '',
  twitter: ''
})

const avatar = ref(
  'https://res.cloudinary.com/duwukinfy/image/upload/v1712124578/xgvsgttasxyfndx3kh4a.jpg'
)

const apiProgress = ref(false)

const updateAvatar = (imageUrl) => {
  avatar.value = imageUrl
}

const store = useStore()
const User = computed(() => store.state.User.user)

const onSubmit = async () => {
  apiProgress.value = true

  try {
    handleSubmit(formData)
    const payload = { ...formData, avatar: avatar.value }
    console.log(payload)
    const res = await axios.post(`/api/user/${User.value.user_id}`, payload)
    store.commit('User/setUser', res.data.data)
  } catch (error) {
    console.log(error)
  } finally {
    apiProgress.value = false
  }
}

onBeforeMount(async () => {
  try {
    const User = computed(() => store.state.User.user)
    const userData = User.value.attributes
    const socialLinks = User.value.attributes.social_links

    Object.keys(formData).forEach((key) => {
      if (userData[key]) {
        formData[key] = userData[key]
      }
    })

    formData['facebook'] = socialLinks['facebook'] || ''
    formData['linkedin'] = socialLinks['linkedin'] || ''
    formData['instagram'] = socialLinks['instagram'] || ''
    formData['twitter'] = socialLinks['twitter'] || ''

    if (userData.avatar) {
      avatar.value = userData.avatar
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
})
</script>
