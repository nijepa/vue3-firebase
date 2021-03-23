<template>
  <div class="user-playlists">
    <h2>My playlists</h2>
    <div v-if="playlists">
      <ListView :playlists="playlists" />
    </div>
    <router-link :to="{ name: 'CreatePlaylist'}" class="btn">Create new playlist</router-link>
  </div>
</template>

<script>
import ListView from '../../components/ListView'
import getCollection from '@/composables/getCollection'
import getUser from '@/composables/getUser'

export default {
  components: { ListView },
  setup() {
    const { user } = getUser()
    const { documents: playlists } = getCollection('playlists', ['userId', '==', user.value.uid])


    return { playlists }
  }

}
</script>

<style>

</style>