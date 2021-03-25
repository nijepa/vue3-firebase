<template>
  <header>
    <div class="logo">
      <img src="@/assets/n.png" alt="">
      <h1>P</h1>
    </div>
    
    <nav>
      <div class="nav-links">
        <router-link :to="{ name: 'Home' }">Home</router-link>
        <router-link :to="{ name: 'Playlists' }">Playlists</router-link>
        <router-link :to="{ name: 'Chatroom' }">Chatroom</router-link>
      </div>
      
      <div class="nav-user" v-if="user">
        <router-link :to="{ name: 'Create' }">Create Post</router-link>
        <router-link :to="{ name: 'CreatePlaylist' }">Create Playlist</router-link>
        <!-- <router-link :to="{ name: 'UserPlaylists' }">My Playlists</router-link> -->
        <p>{{ user.displayName }}</p>
        <!-- <p class="email">{{ user.email }}</p> -->
        <a @click="handleClick">Log out</a>
      </div>
      <!-- <div v-else> -->
        <router-link v-else :to="{ name: 'Auth' }">Login/Signup</router-link>
      <!-- </div> -->
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
    margin-bottom: 20px;
    padding: 10px;
    position: relative;
    /* background: var(--primary); */
  }
  header::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: var(--purple);
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
    background: var(--purple);
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
    color: var(--purple);
    text-decoration: none;
    margin-left: 20px;
    position: relative;
    z-index: 2;
  }
  header a::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: #4a3b6e;
    position: absolute;
    z-index: -1;
    border-radius: 2px;
    padding-right: 17px;
    left: -10px;
    transform: rotateZ(-3deg);
    transition: all .4s ease;
  }
  header a:hover {
    color: var(--purple-lighter);
  }
  header a:hover::before {
    transform: rotateZ(0deg);
    -webkit-box-shadow: 0px 0px 1px 1px var(--purple-light);
    -moz-box-shadow: 0px 0px 1px 1px var(--purple-light);
    box-shadow: 0px 0px 1px 1px var(--purple-light);
  }
  header a.router-link-active {
    color: var(--purple-light);
    font-weight: bold;
  }
  header a.router-link-active::before {
    transform: rotateZ(0deg);
  }
  nav {
    padding: 0 20px;
    /* border-bottom: 1px solid #eee; */
    display: grid;
    grid-row-gap: 12px;
    /* grid-template-columns: 1fr auto; */
    justify-content: space-between;
    justify-items: end;
    align-items: center;
  }
  nav p {
    margin: 2px auto;
    font-size: 16px;
    color: var(--purple-light);
  }
  nav p.email {
    font-size: 14px;
    color: #999;
  }
  .nav-user {
    display: flex;
    align-items: center;
    font-size: 18px;
  }
  .nav-links {
    display: flex;
    align-items: center;
    font-size: 20px;
  }
  .nav-user p {
    margin-left: 20px;
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
  @media screen and (max-width: 500px) {
    .nav-links {
      font-size: 14px;
    }
    .nav-user {
      font-size: 12px;
    }
  }
</style>