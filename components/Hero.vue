<template>
  <section class="hero-gradient py-44 md:py-44 rounded-3xl">
    <div class="container mx-auto px-4 sm:px-24 flex flex-col md:flex-row items-center justify-between">
      <!-- Colonne gauche : texte -->
      <div class="flex-1 flex flex-col items-start justify-center max-w-xl w-full">
        <h1 class="fluid-title mb-6 hero-anim">
          Simplifiez votre expérience immobilière avec <span class="text-purple-500">Keylity</span> 🔑
        </h1>
        <p class="fluid-subtitle text-gray-700 mb-10 hero-anim">
          La plateforme immobilière intelligente qui révolutionne la recherche et la gestion de vos biens en Suisse
        </p>
        <div class="hero-anim w-full flex flex-col sm:flex-row bg-white rounded-xl shadow-lg overflow-hidden mt-4">
          <!-- Input Location -->
          <div class="flex items-center gap-2 px-4 py-3 w-full sm:w-1/3">
            <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <input type="text" placeholder="Genève, routes des acacias 12"
              class="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400" />
          </div>
          <!-- Dropdown Property Type -->
          <div
            class="flex items-center gap-2 px-4 py-3 w-full sm:w-1/3 border-t sm:border-t-0 sm:border-l border-gray-200">
            <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M3 10v6a1 1 0 001 1h16a1 1 0 001-1v-6" />
              <path d="M16 3H8a1 1 0 00-1 1v6h10V4a1 1 0 00-1-1z" />
            </svg>
            <select class="w-full bg-transparent outline-none text-gray-700">
              <option value="location">Location</option>
              <option value="vente">Vente</option>
            </select>
          </div>
          <!-- Search Button -->
          <button
            class="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold w-full sm:w-1/3 rounded-b-xl sm:rounded-b-none sm:rounded-r-xl hover:bg-blue-500 transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            Rechercher
          </button>
        </div>
      </div>
      <!-- Colonne droite : illustration -->
      <div class="flex-1 flex justify-center items-center h-full mt-8 md:mt-0">
        <img class="w-full max-w-3xl h-auto hero-anim" src="@/assets/images/person.png" alt="Illustration Keylity" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'

onMounted(() => {
  const items = document.querySelectorAll('.hero-anim')
  items.forEach((item, i) => {
    gsap.from(item, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      delay: 0.2 + i * 0.15,
      ease: 'power2.out'
    })
  })
})
</script>

<style scoped>
.hero-gradient {
  background: linear-gradient(
    180deg,
    rgba(191, 116, 223, 0.25) 0%,
    #DFD7D7 100%
  ) !important;
  border-radius: 2rem !important;
  width: 98% !important;
  margin-left: auto !important;
  margin-right: auto !important;
  overflow: hidden !important;
}

.font-bricolage {
  font-family: 'Bricolagegrotesque Variablefont Opsz Wdth Wght', sans-serif;
}

.fluid-title { 
  font-size: clamp(2.5rem, 2.5vw, 8rem);
    font-family: 'Bricolage Grotesque', sans-serif;
      font-weight: 700;
}

.fluid-subtitle {
  font-size: clamp(1.2rem, 1.5vw, 2rem);
  line-height: 1.3;
  font-weight: 400;
}

.font-keylity-subtitle {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 700;
}
</style>