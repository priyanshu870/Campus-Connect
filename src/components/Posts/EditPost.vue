<template>
  <form class="flex flex-col ml-1 w-full" @submit="onSubmit">
    <div class="flex flex-col w-full">
      <div class="mb-4 w-full">
        <FormField v-slot="{ componentField }" name="body">
          <FormItem v-auto-animate>
            <FormControl>
              <div class="relative items-center flex">
                <MyEditor
                  v-bind="{ ...componentField, modelValue: props.defaultValue.attributes.body }"
                  class="w-full"
                />
              </div>
            </FormControl>
            <FormMessage message="Changes are required for edit" />
          </FormItem>
        </FormField>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="flex justify-between m-2 items-center">
      <div class="flex space-x-8">
        <!-- TODO: have to correct this part if we will give them adding image fun -->
        <!-- <div>2</div>
        <div>2</div> -->
      </div>

      <div class="flex flex-row space-x-2 items-center">
        <Button @click="cancel" type="submit" class="rounded-2xl font-semibold right-0"
          >Cancel</Button
        >
        <Button
          type="submit"
          class="bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-semibold right-0 flex items-center"
        >
          <div>
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
    </div>
  </form>
</template>

<script setup>
import { useForm } from 'vee-validate'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import Button from '@/components/ui/button/Button.vue'
import MyEditor from '@/components/Posts/MyEditor.vue'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()
import { useStore } from 'vuex'

const props = defineProps({
  defaultValue: String
})

const emits = defineEmits(['edit-cancel', 'edit-completed'])

const cancel = () => {
  emits('edit-cancel')
}

const formSchema = toTypedSchema(
  z.object({
    body: z.string({
      required_error: 'Changes are required to make an edit'
    })
  })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema
})
const store = useStore()

const onSubmit = handleSubmit(async (values) => {
  try {
    await store.dispatch('Post/editPost', {
      ...values,
      postId: props.defaultValue.post_id
    })
    toast({
      title: 'Post has been successfully updated',
      duration: 1000
    })
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
    emits('edit-completed')
  }
})
</script>
