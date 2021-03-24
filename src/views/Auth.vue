<template>
  <div class="welcome container">
    <transition appear 
      @before-enter="beforeEnter"
      @enter="enter">
      <p>Welcome</p>
    </transition>
    
    
    <div v-if="showLogin">
      <h2>Log in</h2>
      <transition name="toast" mode="out-in" appear>
      <LoginForm @login="enterChat" />
      </transition>
      <p>No account yet? <span @click="showLogin = false">Sign up</span> instead</p>
    </div>
    <div v-else-if="!showLogin">
      <h2>Sign up</h2>
      <transition name="toast" mode="out-in" appear>
      <SignupForm @signup="enterChat" />
      </transition>
      <p>Already registered? <span @click="showLogin = true">Log in</span> instead</p>
    </div>
    
  </div>
</template>

<script>
import SignupForm from '../components/SignupForm.vue'
import LoginForm from '../components/LoginForm.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'

export default {
  components: { SignupForm, LoginForm },
  setup() {
    const showLogin = ref(true)
    const router = useRouter()

    const enterChat = () => {
      router.push({ name: 'Home' })
    }
    const beforeEnter = (el) => {
      el.style.transform = 'translateY(-60px)'
      el.style.opacity = 0
    }
    const enter = (el) => {
      gsap.to(el, {
        duration: 3,
        y: 0,
        opacity: 1,
        ease: 'bounce.out',
        onComplete: 0
      })
    }

    return { showLogin, enterChat, beforeEnter, enter }
  }
}
</script>

<style>
  .toast-enter-active,
  .toast-leave-active {
    /* transition: all 2s ease; */
    animation: wobble .5s ease;
  }
  /* .toast-leave-active {
    animation: wobble 2s ease;
  } */
  @keyframes wobble {
    0% { transform: translateX(-60px); opacity: 0; }
    50% { transform: translateX(0); opacity: 1; }
    60% { transform: translateX(10px); }
    70% { transform: translateX(-10px); }
    80% { transform: translateX(5px); }
    90% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
  }
  .welcome {
    text-align: center;
    padding: 20px 0;
  }
  .welcome h2 {
    font-family: var(--font-logo);
  }
  /* form styles */
  .welcome form {
    width: 300px;
    margin: 20px auto;
  }
  .welcome label {
    display: block;
    margin: 20px 0 10px;
  }
  .welcome input {
    width: 100%;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #eee;
    outline: none;
    color: #999;
    margin: 10px auto;
  }
  .welcome span{
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
  }
  .welcome button {
    margin: 20px auto;
  }
</style>