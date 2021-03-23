<template>
  <header>
    <div class="logo">
      <img src="@/assets/n.png" alt="">
      <h1>ijepa</h1>
    </div>
    
    <nav>
      <router-link :to="{ name: 'Home' }">Home</router-link>
      <router-link :to="{ name: 'Create' }">Create Post</router-link>
      <router-link :to="{ name: 'Chatroom' }">Chatroom</router-link>
      <router-link :to="{ name: 'Playlists' }">Playlists</router-link>
      <div class="nav-user" v-if="user">
        <router-link :to="{ name: 'CreatePlaylist' }">Create Playlist</router-link>
        <router-link :to="{ name: 'UserPlaylists' }">My Playlists</router-link>
        <p>{{ user.displayName }}</p>
        <p class="email">{{ user.email }}</p>
        <a @click="handleClick">Log out</a>
      </div>
      <div v-else>
        <router-link :to="{ name: 'Auth' }">Login/Signup</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
import useLogout from '../composables/useLogout'
import getUser from '../composables/getUser'

export default {
  setup() {
    const { logout, error } = useLogout()
    const { user } = getUser()

    const handleClick = async () => {
      await logout()
      if(!error.value) {
        console.log('logged out')
      }
    }

    return { handleClick, user }
  }
}
</script>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* max-width: 1200px; */
    margin: 0 auto;
    padding: 10px;
    position: relative;
    /* background: var(--primary); */
  }
  header::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: #6d4cbb;
    position: absolute;
    z-index: -1;
    padding-right: 40px;
    left: -30px;
    transform: rotateZ(-1.5deg);
  }
  header::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: #6d4cbb;
    position: absolute;
    z-index: -1;
    padding-right: 40px;
    left: -30px;
    transform: rotateZ(1.5deg);
  }
  header h1 {
    color: #dfdfdf;
    font-size: 48px;
  }
  header a {
    color: #bbb;
    text-decoration: none;
    margin-left: 20px;
  }
  header a:hover {
    color: var(--purple-light);
  }
  header a.router-link-active {
    color: var(--purple-dark);
    font-weight: bold;
  }
  nav {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav p {
    margin: 2px auto;
    font-size: 16px;
    color: #444;
  }
  nav p.email {
    font-size: 14px;
    color: #999;
  }
  .nav-user {
    display: flex;
    align-items: center;
  }
  .nav-user p {
    margin-left: 10px;
  }
  header img {
    max-height: 60px;
  }
  .logo {
    display: inline-flex;
  }
  .logo h1 {
    margin-left: .1em;
    color: var(--purple-dark);
    letter-spacing: .1em;
  }
</style>