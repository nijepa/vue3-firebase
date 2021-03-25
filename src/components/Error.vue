<template>
  <transition appear 
    @before-enter="beforeEnter"
    @enter="enter">
    <div v-if="err">
      <div class="error">{{ err }}</div>
    </div>
  </transition>
</template>

<script>
import gsap from 'gsap'

export default {
  props: ['err'],
  setup() {

    const beforeEnter = (el) => {
      el.style.transform = 'translateY(-60px)'
      el.style.opacity = 0
    }
    const enter = (el) => {
      gsap.to(el, {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: 'elastic',
        onComplete: 0
      })
    }

    return { beforeEnter, enter }
  }
}
</script>

<style>

</style>