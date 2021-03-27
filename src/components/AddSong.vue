<template>
  <div class="add-song">
    <transition name="switch" mode="out-in">
      <button 
        v-if="!showForm" 
        @click.prevent="handleAdd"
      >
        Add Songs
      </button>
      <form 
        v-else-if="showForm" 
        @submit.prevent="handleSubmit"
      >
        <h4>{{ btnName }} song</h4>
        <input type="text" placeholder="Song title" v-model="title">
        <input type="text" placeholder="Artist" v-model="artist">
        <Error :err="error" />
        <button>{{ btnName }}</button>
        <button @click.prevent="handleCancel" class="btn-cancel">Cancel</button>
      </form>
    </transition>
  </div>
</template>

<script>
import { onUpdated, ref, watchEffect } from 'vue'
import useDocument from '../composables/useDocument'
import isEmpty from '@/composables/isEmpty'
import Error from '../components/Error'

export default {
  props: ['playlist', 'song'],
  components: { Error },

  setup(props) {
    const title = ref('')
    const artist = ref('')
    const showForm = ref(false)
    const { updateDoc } = useDocument('playlists', props.playlist.id)
    const error = ref(null)
    const btnName = ref('Add')

    let track 
    if (track) {
      watchEffect(() => {
        track = props.song
        title.value = track.title
        artist.value = track.artist
      })
    }

    onUpdated(() => {
      if (props.song) {
        track = props.song
        title.value = track.title
        artist.value = track.artist
        showForm.value = true
        btnName.value = 'Update'
      }
    })

    const handleAdd = () => {
      showForm.value = true
      title.value = ''
      artist.value = ''
      btnName.value = 'Add'
    }

    const handleSubmit = async () => {
      try {
        const newSong = {
          title: isEmpty(title.value, 'title'),
          artist: isEmpty(artist.value, 'artist'),
          //id: Math.floor(Math.random() * 1000000)
        }
        if (btnName.value === 'Add') {
          newSong.id = Math.floor(Math.random() * 1000000)
          await updateDoc({
            songs: [...props.playlist.songs, newSong]
          })
        } else {
          const oldSongs = props.playlist.songs.filter((item) => item.id !== props.song.id)
          await updateDoc({
            songs: [...oldSongs, newSong]
          })
        }
        error.value = null
      } catch(err) {
        error.value = err.message
      }
      title.value = ''
      artist.value = ''
      showForm.value = false
    }

    const handleCancel = () => {
      //props.song = null
      showForm.value = false
    }

    return { title, artist, showForm, handleSubmit, error, handleCancel, btnName, handleAdd }
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