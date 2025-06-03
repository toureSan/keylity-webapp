<template>
  <div>
    <Header />

    <Hero />
    <Main />


    <div class=" mt-20">
      <div class="relative  overflow-hidden w-full min-h-[400px] flex items-center">
        <img src="@/assets/images/maison.png" alt="Maison" class="absolute inset-0 w-full h-full object-cover" />
        <div class=" mx-auto container relative inset-0 bg-black bg-opacity-50"></div>
        <div class="relative z-10 flex flex-col items-start justify-center h-full p-8 md:p-16 max-w-xl">
          <span class="text-white text-xl md:text-2xl font-semibold mt-40">N'attendez plus</span>
          <h1 class="text-white font-bold md:text-6xl leading-tight mb-6">Commencez maintenant</h1>
          <a href="#"
            class="mt-2 px-12 py-5 bg-blue-400 text-white text-xl font-bold rounded-2xl shadow transition hover:bg-blue-500">
            S'inscrire
          </a>
        </div>
      </div>
    </div>



    <Footer />
  </div>
</template>

<script setup>


import { ref, onMounted, onUnmounted } from 'vue'
const isScrolled = ref(false)
import maison  from '@/assets/images/maison.png'
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
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
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

.fluid-title {
  font-size: clamp(3rem, 3vw, 2rem);
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 700;
}

.fluid-subtitle {
  font-size: clamp(0.5rem, 1vw, 1rem);
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 300;

}
</style>