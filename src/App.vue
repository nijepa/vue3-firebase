<template>
  <Navbar />
  <div class="content">
    <router-view/>
  </div>
  
</template>

<script>
import Navbar from './components/Navbar'
export default {
  components: { Navbar }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
.content {
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;
}
</style>
