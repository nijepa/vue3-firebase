<template>
  <div class="container">
    <ChatWindow />
    <NewChatForm />
  </div>
</template>

<script>
import { watch } from 'vue'
import getUser from '../composables/getUser'
import { useRouter } from 'vue-router'
import NewChatForm from '../components/NewChatForm'
import ChatWindow from '../components/ChatWindow'

export default {
  components: { NewChatForm, ChatWindow },
  setup() {
    const { user } = getUser()
    const router = useRouter()

    watch(user, () => {
      if (!user.value) {
        router.push({ name: 'Home' })
      }
    })
  }
}
</script>

<style>

</style>