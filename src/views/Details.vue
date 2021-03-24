<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="post" class="post">
    <div class="cover">
      <img :src="post.coverUrl" alt="">
    </div>
    <h3>{{ post.title }}</h3>
    <p class="pre">{{ post.body }}</p>
    <button @click="handleClick">delete post</button>
  </div>
  <div v-else>
    <Spinner />
  </div>
</template>

<script>
import getPost from '@/composables/getPost'
// component imports
import Spinner from '../components/Spinner.vue'
import { projectFirestore } from '../firebase/config'
import { useRouter } from 'vue-router'
import useStorage from '@/composables/useStorage'
//import { useRoute } from 'vue-router'

export default {
  props: ['id'],
  components: { Spinner },
  setup(props) {
    const router = useRouter()
    const { deleteImage } = useStorage('images')

    const { error, post, load } = getPost(props.id)
    
    load()

    const handleClick = async () => {
      await deleteImage(post.value.filePath)
      await projectFirestore.collection('posts')
        .doc(props.id)
        .delete()

      router.push('/')
    }

    return { error, post, handleClick }
  },
}
</script>

<style scoped>
  .tags a {
    margin-right: 10px;
  }
  .post {
    max-width: 1200px;
    margin: 0 auto;
  }
  .post p {
    color: #444;
    line-height: 1.5em;
    margin-top: 40px;
  }
  .pre {
    white-space: pre-wrap;
  }
</style>