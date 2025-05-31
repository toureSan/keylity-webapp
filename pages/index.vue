<template>
  <div>
    <Header />

    <Hero />
    <Main />


    <div class="mt-20">
      <div class="relative overflow-hidden w-full min-h-[400px] flex items-center">
        <img src="@/assets/images/maison.png" alt="Maison" class="absolute inset-0 w-full h-full object-cover" />

        <!-- Overlay sombre -->


        <!-- Contenu aligné à gauche -->
        <div class="container mx-auto">
          <div class="relative z-10 flex flex-col justify-center h-full p-20 px-20 md:pl-20 max-w-2xl">
            <span class="text-white text-xl md:text-2xl font-semibold">N'attendez plus</span>
            <h1 class="text-white font-bold md:text-6xl leading-tight mb-6">Commencez maintenant</h1>
            <NuxtLink to="/login"
              class="w-auto self-start bg-blue-400 text-white px-4 py-3.5 rounded-lg hover:bg-blue-500 cursor-pointer font-semibold flex items-center gap-2 transition-colors duration-200">
             S'inscrire 
              <span class="inline-block bg-white text-black rounded p-1 ml-8">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </NuxtLink>
          </div>
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