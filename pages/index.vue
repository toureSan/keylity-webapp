<template>
  <div>
    <!-- Loading Overlay - Couvre toute la page -->
    <div v-if="isLoading" class="loading-overlay fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-sm flex items-center justify-center">
      <div class="text-center">
        <!-- Logo Keylity -->
        <div class="mb-8">
          <img src="~/assets/images/logo-complet.png" alt="Keylity" class="h-20 w-auto mx-auto opacity-90">
        </div>
       
        <!-- Texte de chargement -->
        <div class="space-y-2">
          <p class="text-gray-700 text-xl font-semibold">Chargement de Keylity...</p>
          <p class="text-gray-500 text-sm">Préparation de votre expérience immobilière</p>
        </div>
        
        <!-- Barre de progression animée -->
        <div class="mt-8 w-64 mx-auto">
          <div class="h-1 bg-blue-200 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenu principal -->
    <Header />
    <Hero />
    <Main />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth.store'

// SEO
useHead({
  title: 'Keylity - Plateforme immobilière intelligente',
  meta: [
    { name: 'description', content: 'Découvrez Keylity, la plateforme immobilière qui révolutionne la recherche et la gestion de biens immobiliers en Suisse.' }
  ]
})

const authStore = useAuthStore()
const isLoading = ref(true)

// Simulation du chargement avec vérification d'authentification
onMounted(async () => {
  try {
    // Vérifier l'authentification si un token existe
    const token = process.client ? localStorage.getItem('access_token') : null
    if (token) {
      await authStore.checkAuth()
    }
    
    // Simuler un temps de chargement minimum pour une meilleure UX
    await new Promise(resolve => setTimeout(resolve, 1500))
  } catch (error) {
    // En cas d'erreur, continuer quand même
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
.loading-overlay {
  z-index: 9999 !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
}
</style>
