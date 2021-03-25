<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-else-if="playlist" class="playlist-details">
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" alt="">
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button v-if="ownership" @click="handleDelete">Delete playlist</button>
    </div>
    <div class="song-list">
      <div v-if="!playlist.songs.length">No songs have been added to this playlist yet.</div>
      <transition-group tag="ul" name="list" appear>
        <div v-for="song in playlist.songs" :key="song.id" class="single-song">
          <div class="details">
            <h3>{{ song.title }}</h3>
            <p>{{ song.artist }}</p>
          </div>
          <button v-if="ownership" @click="(handleClick(song.id))">Delete</button>
        </div>
      </transition-group>
      <AddSong v-if="ownership" :playlist="playlist" />
    </div>
  </div>
</template>

<script>
import AddSong from '../../components/AddSong'
import getDocument from '@/composables/getDocument'
import getUser from '@/composables/getUser'
import useDocument from '@/composables/useDocument'
import useStorage from '@/composables/useStorage'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  props: ['id'],
  components: { AddSong },
  setup(props) {
    const { error, document: playlist } = getDocument('playlists', props.id)
    const { user } = getUser()
    const { deleteDoc, updateDoc } = useDocument('playlists', props.id)
    const { deleteImage } = useStorage('covers')
    const router = useRouter()

    const ownership = computed(() => {
      return playlist.value && user.value && user.value.uid === playlist.value.userId
    })

    const handleDelete = async () => {
      await deleteImage(playlist.value.filePath)
      await deleteDoc()
      router.push({ name: 'Playlists' })
    }

    const handleClick = async (id) => {
      const songs = playlist.value.songs.filter(song => song.id !== id)
      await updateDoc({ songs })
    }

    return { error, playlist, ownership, handleDelete, handleClick }
  }
}
</script>

<style>
  .list-enter-from {
    opacity: 0;
    transform: scale(0.6);
  }
  .list-enter-to {
    opacity: 1;
    transform: scale(1);
  } 
  .list-enter-active {
    transition: all .5s ease; 
  }
  .list-leave-from {
    opacity: 1;
    transform: scale(1);
  }
  .list-leave-to {
    opacity: 0;
    transform: scale(0.6);
  }
  .list-leave-active {
    transition: all .5s ease;
    position: absolute;
  }
  .list-move {
    transition: all .5s ease;
  }
  .playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
  }
  .cover {
    overflow: hidden;
    border: none;
    border-radius: 20px;
    position: relative;
    padding: 160px;
    max-width: 550px;
  }
  .cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 110%;
    max-height: 110%;
    transition: all .7s ease;
    cursor: pointer;
  }
  .cover img:hover {
    max-width: 100%;
    max-height: 100%
    
  }
  .playlist-info {
    text-align: center;
    padding: 10px;
  }
  .playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }
  .playlist-info p {
    margin-bottom: 20px;
  }
  .username {
    color: #999;
  }
  .description {
    text-align: left;
  }
  .song-list {
    position: relative;
  }
  .single-song {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--secondary);
    margin-bottom: 20px;
  }
</style>