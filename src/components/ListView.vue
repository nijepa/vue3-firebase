<template>
  <transition-group
    tag="ul"
    appear
    @beforeEnter="beforeEnter"
    @enter="enter"
  >
    <div v-for="(playlist, index) in playlists" 
      :key="playlist.id" 
      :data-index="index"
    >
      <router-link :to="{ name: 'PlaylistDetails', params: { id: playlist.id}}">
        <div class="single">
          <div class="thumbnail">
            <img :src="playlist.coverUrl" alt="">
          </div>
          <div class="info">
            <h3>{{ playlist.title }}</h3>
            <p>Created by: {{ playlist.userName }}</p>
          </div>
          <div class="song-number">
            <p>{{ playlist.songs.length }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </transition-group>
</template>

<script>
import gsap from 'gsap'

export default {
  props: ['playlists'],
  setup() {
    const beforeEnter = (el) => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(100px)'
    }
    const enter = (el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: el.dataset.index * 0.5
      })
    }

    return { beforeEnter, enter }
  }
}
</script>

<style scoped>
  .single {
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    background: white;
    margin: 16px 0;
    transition: all ease 0.2s;
  }
  .single:hover {
    box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
    transform: scale(1.02);
    transition: all ease 0.2s;
  }
  .thumbnail {
    max-width: 100px;
    max-height: 100px;
    overflow: hidden;
    border-radius: 10px;
  }
  img {
    max-width: 120%;
    max-height: 120%;
    display: block;
  }
  .info {
    margin: 0 30px;
  }
  .song-number {
    margin-left: auto;
  }
</style>