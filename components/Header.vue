<template>
  <header class="fixed w-full bg-white z-50">
    <nav class="w-full px-4 md:px-8">
      <div class="flex justify-between items-center h-20 max-w-7xl mx-auto">
        <!-- Bloc gauche : logo + menu -->
        <div class="flex items-center gap-4 md:gap-12">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center">
            <img src="@/assets/images/logo-complet.png" alt="Keylity" class="h-12 w-auto" />
          </NuxtLink>
          <!-- Menu -->
          <div class="hidden md:flex items-center gap-4 md:gap-8">
            <NuxtLink to="/solutions" class="text-gray-600 hover:text-blue-600 font-medium">
              Solutions
            </NuxtLink>
            <NuxtLink to="/tarifs" class="text-gray-600 hover:text-blue-600 font-medium">
              Tarifs
            </NuxtLink>
            <NuxtLink to="/ressources" class="text-gray-600 hover:text-blue-600 font-medium">
              Ressources
            </NuxtLink>
            <NuxtLink to="/a-propos" class="text-gray-600 hover:text-blue-600 font-medium">
              À propos
            </NuxtLink>
          </div>
        </div>
        <!-- Bloc droite : boutons -->
        <div class="hidden md:flex items-center gap-2 md:gap-4">
          <button class="text-gray-600 cursor-pointer hover:text-blue-600 font-medium">
            S'identifier
          </button>
          <button class="bg-black text-white px-6 py-3.5 rounded-lg hover:bg-blue-500 cursor-pointer font-semibold flex items-center gap-2 transition-colors duration-200">
            Nous contacter
            <span class="inline-block bg-white text-black rounded p-1 ml-8">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button @click="isMenuOpen = !isMenuOpen" class="text-gray-600 hover:text-blue-600">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <!-- Mobile menu -->
      <div v-if="isMenuOpen" class="md:hidden w-full bg-white rounded-b-2xl shadow px-4 py-4">
        <NuxtLink to="/solutions" class="block px-3 py-2 text-gray-600 hover:text-blue-600 font-medium">
          Solutions
        </NuxtLink>
        <NuxtLink to="/tarifs" class="block px-3 py-2 text-gray-600 hover:text-blue-600 font-medium">
          Tarifs
        </NuxtLink>
        <NuxtLink to="/ressources" class="block px-3 py-2 text-gray-600 hover:text-blue-600 font-medium">
          Ressources
        </NuxtLink>
        <NuxtLink to="/a-propos" class="block px-3 py-2 text-gray-600 hover:text-blue-600 font-medium">
          À propos
        </NuxtLink>
        <button class="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600 font-medium mt-2">
          S'identifier
        </button>
        <button class="block w-full text-left px-3 py-2 bg-black text-white rounded-lg font-semibold mt-2">
          Nous contacter
        </button>
      </div>
    </nav>
  </header>

</template>

<script setup>
const isScrolled = ref(false)
const isMenuOpen = ref(false)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0
}
</script> 

<style scoped>
.font-keylity-subtitle {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 700;
}
</style>

