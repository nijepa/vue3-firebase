<template>
  <div class="add-song">
    <transition name="switch" mode="out-in">
      <button v-if="!showForm" @click="showForm = true">Add Songs</button>
      <form v-else-if="showForm" @submit.prevent="handleSubmit">
        <h4>Add a new song</h4>
        <input type="text" placeholder="Song title" required v-model="title">
        <input type="text" placeholder="Artist" required v-model="artist">
        <button>Add</button>
        <button @click="showForm = false" class="btn-cancel">Cancel</button>
      </form>
    </transition>
  </div>
</template>

<script>
import { ref } from 'vue'
import useDocument from '../composables/useDocument'
export default {
  props: ['playlist'],
  setup(props) {
    const title = ref('')
    const artist = ref('')
    const showForm = ref(false)
    const { updateDoc } = useDocument('playlists', props.playlist.id)

    const handleSubmit = async () => {
      const newSong = {
        title: title.value,
        artist: artist.value,
        id: Math.floor(Math.random() * 1000000)
      }
      await updateDoc({
        songs: [...props.playlist.songs, newSong]
      })
      title.value = ''
      artist.value = ''
    }

    return { title, artist, showForm, handleSubmit }
  }
}
</script>

<style scoped>
  .switch-enter-from,
  .switch-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
  .switch-enter-to,
  .switch-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
  .switch-enter-active,
  .switch-leave-active {
    transition: all 1s ease;
  }
  .add-song {
    text-align: center;
    margin-top: 40px;
  }
  form {
    max-width: 100%;
    text-align: left;
  }
  .btn-cancel {
    margin-left: 10px;
  }
</style>