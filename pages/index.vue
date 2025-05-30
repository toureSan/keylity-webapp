<template>
  <div>
    <Header />

    <Hero />
    <Main />

    <div class="container mx-auto mb-20 mt-20">
      <section
        class="w-full bg-purple-400 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 px-4 py-6 mt-8 mb-2 relative overflow-visible">

        <!-- Image plus grande en mobile -->
        <img src="/assets/images/email.png" alt="Newsletter"
          class="w-44 h-44 object-contain -mt-4 md:w-164 md:h-144 md:-ml-16 md:-mt-40 z-10 relative" />

        <!-- Contenu texte + formulaire -->
        <div class="flex-1 flex flex-col items-center md:items-start text-center md:text-left w-full">
          <h2 class="text-3xl md:text-5xl font-bold text-white mb-3 font-bricolage">Newsletter</h2>
          <p class="text-base md:text-xl text-white mb-6">
         Ne manquer plus jamais un bien de qualité, abonnez-vous à la newsletter
          </p>

          <!-- Formulaire ajusté en mobile -->
          <form class="w-full flex flex-col md:flex-row items-center gap-4 max-w-2xl">
            <input type="email" placeholder="Adresse e-mail"
              class="w-full md:flex-1 px-5 py-4 rounded-xl border border-gray-200 text-base md:text-lg text-black placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-black" />
            <button type="submit"
              class="w-full md:w-auto bg-blue-400 text-white font-bold text-base md:text-xl px-10 py-4 rounded-xl transition hover:bg-blue-400">
              S'abonner
            </button>
          </form>
        </div>
      </section>
    </div>


    <Footer />
  </div>
</template>

<script setup>


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

        .fluid-title {
          font-size: clamp(3rem, 3vw, 2rem);
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 700;
        }
    
        .fluid-subtitle {
          font-size: clamp(0.5rem, 1vw, 1rem);
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 400;
    
        }
</style> 