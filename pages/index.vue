<template>
  <div>
    <Header />

    <Hero/>
    <Main />
    <Footer />
  </div>
</template>

<script setup>
// Les composants sont automatiquement importés par Nuxt

import { ref, onMounted, onUnmounted } from 'vue'
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.hero-block {
  background: #23190f;
  max-width: 1200px;
  min-height: 400px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
}
.no-radius {
  border-radius: 0 !important;
}
.hero-gradient {
  background: linear-gradient(180deg, #f8eaff 0%, #f7f7ff 100%);
  border-radius: 2rem;
  width: 100%;
  overflow: hidden;
}
.font-bricolage {
  font-family: 'Bricolage Grotesque', sans-serif;
}
</style> 