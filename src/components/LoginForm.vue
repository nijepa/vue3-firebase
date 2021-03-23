<template>
  <form @submit.prevent="handleSubmit">
    <input type="Email" required placeholder="email" v-model="email">
    <input type="password" required placeholder="Password" v-model="password">
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Log in</button>
    <button v-else disabled>Loading...</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useLogin from '../composables/useLogin'

export default {
  setup(props, context) {
    const email = ref('')
    const password = ref('')

    const { error, login, isPending } = useLogin()

    const handleSubmit = async () => {
      await login(email.value, password.value)
      if (!error.value) {
        context.emit('login')
      }
    }

    return { email, password, handleSubmit, error, isPending }
  }
}
</script>

<style>

</style>