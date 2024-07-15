<template>
  <div class="mt-1 px-2 flex items-center justify-center">
    <form class="w-full space-y-6 flex flex-col p-10" @submit="onSubmit">
      <FormField v-slot="{ componentField }" type="radio" name="like">
        <FormItem class="space-y-3">
          <FormLabel class="text-lg">Likes </FormLabel>
          <FormControl>
            <RadioGroup
              class="flex flex-col space-y-1"
              v-bind="componentField"
              :defaultValue="formData.like"
            >
              <FormItem class="flex items-center space-y-0 gap-x-3">
                <FormControl>
                  <RadioGroupItem value="none" />
                </FormControl>
                <FormLabel class="font-normal"> Disable </FormLabel>
              </FormItem>
              <FormItem class="flex items-center space-y-0 gap-x-3">
                <FormControl>
                  <RadioGroupItem value="mentions" v-model="formData.like" />
                </FormControl>
                <FormLabel class="font-normal"> From profiles I follow </FormLabel>
              </FormItem>
              <FormItem class="flex items-center space-y-0 gap-x-3">
                <FormControl>
                  <RadioGroupItem value="all" v-model="formData.like" />
                </FormControl>
                <FormLabel class="font-normal"> From everyone </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" type="radio" name="comment">
        <FormItem class="space-y-3">
          <FormLabel class="text-lg">Comments </FormLabel>
          <FormControl>
            <RadioGroup
              class="flex flex-col space-y-1"
              v-bind="componentField"
              :defaultValue="formData.comment"
            >
              <FormItem class="flex items-center space-y-0 gap-x-3">
                <FormControl>
                  <RadioGroupItem value="none" />
                </FormControl>
                <FormLabel class="font-normal"> Disable </FormLabel>
              </FormItem>
              <FormItem class="flex items-center space-y-0 gap-x-3">
                <FormControl>
                  <RadioGroupItem value="mentions" />
                </FormControl>
                <FormLabel class="font-normal"> From profiles I follow </FormLabel>
              </FormItem>
              <FormItem class="flex items-center space-y-0 gap-x-3">
                <FormControl>
                  <RadioGroupItem value="all" />
                </FormControl>
                <FormLabel class="font-normal"> From everyone </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" type="radio" name="follow">
        <FormItem class="space-y-3">
          <FormLabel class="text-lg">Follow / Unfollow </FormLabel>
          <FormControl>
            <RadioGroup
              class="flex flex-col space-y-1"
              v-bind="componentField"
              :defaultValue="formData.follow"
            >
              <FormItem class="flex items-center space-y-0 gap-x-3">
                <FormControl>
                  <RadioGroupItem value="none" />
                </FormControl>
                <FormLabel class="font-normal"> Disable </FormLabel>
              </FormItem>
              <FormItem class="flex items-center space-y-0 gap-x-3">
                <FormControl>
                  <RadioGroupItem value="all" />
                </FormControl>
                <FormLabel class="font-normal"> Enable </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit"> Save </Button>
    </form>
  </div>
</template>

<script setup>
import { h, ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from '@/components/ui/toast'

const formData = ref({
  like: 'none',
  comment: 'all',
  follow: 'all'
})

const formSchema = toTypedSchema(
  z.object({
    like: z.enum(['all', 'mentions', 'none'], {
      required_error: 'You need to select a notification type for like.'
    }),
    comment: z.enum(['all', 'mentions', 'none'], {
      required_error: 'You need to select a notification type for comment.'
    }),
    follow: z.enum(['all', 'none'], {
      required_error: 'You need to select a notification type for followers.'
    })
  })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema
})

const onSubmit = handleSubmit((values) => {
  console.log(values)
  //   toast({
  //     title: 'You submitted the following values:',
  //     description: h(
  //       'pre',
  //       { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' },
  //       h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))
  //     )
  //   })
})
</script>
