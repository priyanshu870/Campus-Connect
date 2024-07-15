<template>
  <div class="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
    <div class="flex justify-center items-center">
      <img
        src="https://res.cloudinary.com/duwukinfy/image/upload/v1712040463/sln413jgrutjtqqlqkse.jpg"
        alt="avatar1"
        class="w-16 h-16 rounded-full cursor-pointer hover:scale-110"
        @click="
          updateAvatar(
            'https://res.cloudinary.com/duwukinfy/image/upload/v1712040463/sln413jgrutjtqqlqkse.jpg'
          )
        "
      />
    </div>
    <div class="flex justify-center items-center">
      <img
        src="https://res.cloudinary.com/duwukinfy/image/upload/v1712040482/cmfbyxvmnbwjp1dplq9o.jpg"
        alt="avatar2"
        class="w-16 h-16 rounded-full cursor-pointer hover:scale-110"
        @click="
          updateAvatar(
            'https://res.cloudinary.com/duwukinfy/image/upload/v1712040482/cmfbyxvmnbwjp1dplq9o.jpg'
          )
        "
      />
    </div>
    <div class="flex justify-center items-center">
      <img
        src="https://res.cloudinary.com/duwukinfy/image/upload/v1712040519/ky1ir33aegfxaxmdr4hh.jpg"
        alt="avatar3"
        class="w-16 h-16 rounded-full cursor-pointer hover:scale-110"
        @click="
          updateAvatar(
            'https://res.cloudinary.com/duwukinfy/image/upload/v1712040519/ky1ir33aegfxaxmdr4hh.jpg'
          )
        "
      />
    </div>
    <div class="flex justify-center items-center">
      <img
        src="https://res.cloudinary.com/duwukinfy/image/upload/v1712124578/xgvsgttasxyfndx3kh4a.jpg"
        alt="avatar4"
        class="w-16 h-16 rounded-full cursor-pointer hover:scale-110"
        @click="
          updateAvatar(
            'https://res.cloudinary.com/duwukinfy/image/upload/v1712124578/xgvsgttasxyfndx3kh4a.jpg'
          )
        "
      />
    </div>
    <div class="flex justify-center items-center">
      <img
        src="https://res.cloudinary.com/duwukinfy/image/upload/v1712039271/mi4wd85ncvwgwqutjvw7.jpg"
        alt="avatar5"
        class="w-16 h-16 rounded-full cursor-pointer hover:scale-110"
        @click="
          updateAvatar(
            'https://res.cloudinary.com/duwukinfy/image/upload/v1712039271/mi4wd85ncvwgwqutjvw7.jpg'
          )
        "
      />
    </div>
    <div class="flex justify-center items-center">
      <img
        src="https://res.cloudinary.com/duwukinfy/image/upload/v1712040648/wcnopwl0tepuzcsdnfr9.jpg"
        alt="avatar6"
        class="w-16 h-16 rounded-full cursor-pointer hover:scale-110"
        @click="
          updateAvatar(
            'https://res.cloudinary.com/duwukinfy/image/upload/v1712040648/wcnopwl0tepuzcsdnfr9.jpg'
          )
        "
      />
    </div>
    <div class="flex justify-center items-center">
      <img
        src="https://res.cloudinary.com/duwukinfy/image/upload/v1712040699/jkyjrm53fiqzyqluemns.jpg"
        alt="avatar7"
        class="w-16 h-16 rounded-full cursor-pointer hover:scale-110"
        @click="
          updateAvatar(
            'https://res.cloudinary.com/duwukinfy/image/upload/v1712040699/jkyjrm53fiqzyqluemns.jpg'
          )
        "
      />
    </div>
    <div class="flex justify-center items-center">
      <img
        src="https://res.cloudinary.com/duwukinfy/image/upload/v1712124652/uunlnpyiaflmuexpkx7j.jpg"
        alt="avatar8"
        class="w-16 h-16 rounded-full cursor-pointer hover:scale-110"
        @click="
          updateAvatar(
            'https://res.cloudinary.com/duwukinfy/image/upload/v1712124652/uunlnpyiaflmuexpkx7j.jpg'
          )
        "
      />
    </div>
    <div class="flex justify-center items-center">
      <div
        class="w-16 h-16 rounded-full bg-white hover:scale-110 cursor-pointer flex justify-center items-center"
      >
        <label for="upload" class="cursor-pointer">
          <IconPlus class="w-16 h-16" />
        </label>
        <input
          id="upload"
          type="file"
          class="hidden"
          @change="handleImageUpload"
          accept="image/jpeg,image/jpg,image/png"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import axios from '@/api.js'

const avatar = ref(
  'https://res.cloudinary.com/duwukinfy/image/upload/v1712124578/xgvsgttasxyfndx3kh4a.jpg'
)

const emit = defineEmits(['closeDialog'])

const handleImageUpload = async (event) => {
  avatar.value = event.target.files[0]
  console.log(avatar.value)

  const res = await axios.post(
    '/api/upload',
    { media: avatar.value },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  emit('closeDialog', res?.data?.data?.file_url)
  console.log('Res', res?.data?.data?.file_url)
}

const updateAvatar = (imageUrl) => {
  avatar.value = imageUrl
  emit('closeDialog', imageUrl)
}
</script>
