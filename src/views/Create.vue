<template>
  <div class="create">
    <form @submit.prevent="handleSubmit">
      <h4>Create New Post</h4>
      <label>Title:</label>
      <input 
        v-model="title" 
        type="text" 
        @keypress="handleKey">
      <label>Content:</label>
      <textarea 
        v-model="body" 
        @keypress="handleKey">
      </textarea>
      <label>Tags (hit enter to add a tag):</label>
      <input 
        @keydown.enter.prevent="handleKeydown" 
        v-model="tag" 
        type="text"
      >
      <div v-for="tag in tags" :key="tag" class="pill">
        #{{ tag }}
      </div>
      <div class="image-pload">
        <label for="">Upload playlist cover image</label>
        <input type="file" @change="handleChange">
      </div>
      <Error :err="error" />
<!--       <transition appear 
        @before-enter="beforeEnter"
        @enter="enter">
        <div v-if="error">
          <div class="error">{{ error }}</div>
        </div>
      </transition> -->
      <button>Add Post</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { projectFirestore, timestamp } from '../firebase/config'
import useStorage from '@/composables/useStorage'
import isEmpty from '@/composables/isEmpty'
import Error from '../components/Error'

export default {
  components: { Error },
  setup() {
    const title = ref('')
    const body = ref('')
    const tags = ref([])
    const tag = ref('')
    const file = ref(null)
    const fileError = ref(null)
    const isPending = ref(false)
    let error = ref(null)

    const { filePath, url, uploadImage } = useStorage('images')
    const router = useRouter()

    const handleKey = () => {
      error.value = null
    }

    const handleKeydown = () => {
      if (!tags.value.includes(tag.value)) {
        tag.value = tag.value.replace(/\s/g,'') // remove all whitespace
        tags.value.push(tag.value)
      }
      tag.value = ''
    }

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true
        await uploadImage(file.value)
      }
      try {
        const post = {
          title: isEmpty(title.value, 'title'),
          body: isEmpty(body.value, 'body'),
          tags: tags.value,
          coverUrl: url.value,
          filePath: filePath.value,
          createdAt: timestamp()
        }
        await projectFirestore.collection('posts').add(post)
        isPending.value = false
        
        router.push({ name: 'Home' })
      } catch (err) {
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

    return { body, title, tags, tag, handleKeydown, handleSubmit, handleChange, error, handleKey }
  },
}
</script>

<style>
.error-enter-active {
    /* transition: all 2s ease; */
    animation: wobbles 2s ease;
  }
  /* .toast-leave-active {
    animation: wobble 2s ease;
  } */
  @keyframes wobbles {
    0% { transform: translateY(-60px) scale(5); opacity: 0; }
    50% { transform: translateY(0) scale(1); opacity: 1; }
    60% { transform: translateX(10px); }
    70% { transform: translateX(-10px); }
    80% { transform: translateX(5px); }
    90% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
  }
  form {
    max-width: 480px;
    margin: 0 auto;
    text-align: left;
  }
  input, textarea {
    display: block;
    margin: 10px 0;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #eee;
  }
  textarea {
    height: 160px;
  }
  label {
    display: inline-block;
    margin-top: 30px;
    position: relative;
    font-size: 20px;
    color: white;
    margin-bottom: 10px;
    z-index: 0;
  }
  label::before {
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
  button {
    display: block;
    margin-top: 30px;
    background: var(--purple);
    color: white;
    border: none;
    padding: 8px 16px;
    font-size: 18px
  }
  .pill {
    display: inline-block;
    margin: 10px 10px 0 0;
    color: #444;
    background: var(--secondary);
    padding: 8px;
    border-radius: 20px;
    font-size: 14px;
  }
</style>