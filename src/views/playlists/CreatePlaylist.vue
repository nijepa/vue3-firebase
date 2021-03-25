<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>
    <input type="text" placeholder="Playlist title" v-model="title">
    <textarea placeholder="Playlist description..." v-model="description"></textarea>
    <label for="">Upload playlist cover image</label>
    <input type="file" @change="handleChange">
    <div v-if="fileError" class="error">{{ fileError }}</div>
    <!-- <div class="error">{{ error }}</div> -->
    <Error :err="error" />
    <button v-if="!isPending">Create</button>
    <button v-else disabled>Saving...</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import isEmpty from '@/composables/isEmpty'
import getUser from '@/composables/getUser'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'
import Error from '../../components/Error'

export default {
  components: { Error },
  setup() {
    const { filePath, url, uploadImage } = useStorage('covers')
    const { error, addDoc } = useCollection('playlists')
    const { user } = getUser()
    const router = useRouter()

    const title = ref('')
    const description = ref('')
    const file = ref(null)
    const fileError = ref(null)
    const isPending = ref(false)

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true
        await uploadImage(file.value)
      }
      try {
        const res = await addDoc({
          title: isEmpty(title.value, 'title'),
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timestamp()
        })
        isPending.value = false
        if (!error.value) {
          router.push({ name: 'PlaylistDetails', params: { id: res.id }})
        }
      } catch(err) {
        error.value = err.message
      }
    }

    // allowed file types
    const types = ['image/png', 'image/jpeg']

    const handleChange = (e) => {
      const selected = e.target.files[0]

      if (selected && types.includes(selected.type)) {
        file.value = selected
        fileError.value = null
      } else {
        file.value = null
        fileError.value = 'Please select image file (png or jpg)'
      }
    }

    return { title, description, file, handleSubmit, handleChange, fileError, isPending, error }
  }
}
</script>

<style>
  input[type="file"] {
    border: 0;
    padding: 0;
  }
</style>