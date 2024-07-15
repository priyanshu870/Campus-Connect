<template>
  <div class="h-screen md:flex">
    <!-- Image side -->
    <div class="relative overflow-hidden md:flex w-1/2 justify-around items-center hidden">
      <img src="@/assets/login-page.jpg" alt="" class="object-cover w-full h-full" />
    </div>

    <!-- Form Side -->
    <div class="flex md:w-1/2 justify-center py-10 items-center bg-white">
      <form class="flex flex-col py-10 ml-1" @submit="onSubmit">
        <!-- TODO: FIX THIS LOGO HERE -->
        <!-- logo -->
        <router-link to="/" class="flex mb-7">
          <!-- <img src="@/assets/campus connect logo.png" alt="" class="h-22 w-52" /> -->
          <img src="@/assets/logo-campus-connect.png" alt="" class="h-14" />
          <img src="@/assets/logo with name.png" alt="" class="h-16" />
        </router-link>
        <!-- <h1 class="font-bold text-3xl mb-5">Login</h1> -->
        <h1 class="text-gray-800 font-bold text-3xl mb-1">Hello Again!</h1>
        <p class="text-md font-normal text-gray-600 mb-7">Welcome Back</p>

        <div class="flex flex-col w-80">
          <div class="mb-4">
            <!-- Email -->
            <FormField v-slot="{ componentField }" name="email">
              <FormItem v-auto-animate>
                <FormControl>
                  <div class="relative w-full max-w-sm items-center">
                    <Input
                      type="text"
                      placeholder="Email"
                      class="border-2 pl-10 py-5 w-full rounded-2xl text-[16px]"
                      v-bind="componentField"
                    />
                    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                      <IconEmail />
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="mb-4">
            <!-- Password -->
            <FormField v-slot="{ componentField }" name="password">
              <FormItem v-auto-animate>
                <FormControl>
                  <div class="relative w-full max-w-sm items-center">
                    <Input
                      type="password"
                      placeholder="Password"
                      class="border-2 pl-10 py-5 w-full rounded-2xl outline-none text-[16px]"
                      v-bind="componentField"
                    />
                    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                      <IconLock />
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </div>

        <!-- Submit Button -->
        <Button type="submit" :disabled="apiProgress" class="w-full rounded-2xl font-semibold">
          <div
            v-if="apiProgress"
            class="animate-spin inline-block size-4 mr-2 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
            role="status"
            aria-label="loading"
          >
            <span class="sr-only">Loading...</span>
          </div>
          <div>Login</div>
        </Button>

        <p class="text-sm text-gray-400 space-x-2 mt-2">
          Don't have an account?
          <span class="text-indigo-500 text-sm"><a href="/register">Register</a></span>
        </p>
        <p class="text-sm text-gray-400">
          Forgot Password?
          <span class="text-indigo-500 text-sm"><a href="/forgotpassword">Reset Password</a></span>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import IconEmail from '@/components/icons/IconEmail.vue'
import IconLock from '@/components/icons/IconLock.vue'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast/use-toast'

import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'

const store = useStore()
const { toast } = useToast()

const formSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .email({ message: 'Invalid email format' })
      .refine((value) => value.endsWith('@knit.ac.in'), {
        message: 'Email must have the domain knit.ac.in'
      }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .max(50, { message: 'Password cannot exceed 50 characters' })
  })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema
})

const isLoggedIn = computed(() => store.getters['User/isLoggedIn'])
console.log(isLoggedIn.value)

onMounted(async () => {
  if (isLoggedIn.value) {
    router.push('/')
  }
})
 
const apiProgress = ref(false)

const onSubmit = handleSubmit(async (values) => {
  apiProgress.value = true
  try {
    await store.dispatch('User/login', values)
    toast({
      title: `<div class="flex space-x-2 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-green-300">
        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
        </svg> 
        <h1>Logged in successfully!</h1>
      </div>
    `,
      variant: 'success',
      class: 'text-center bg-white w-full text-[10px]',
      duration: 1000,
    })
    setTimeout(() => {
      router.push('/')
    }, 2000)
  } catch (error) {
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
