<template>
         <div v-if="showModal" class="fixed bottom-6 right-6 z-50 max-w-sm w-full mx-4">
                  <!-- Modal Container -->
                  <div class="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transform transition-all duration-700 ease-out animate-bounce-in bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4 animate-glow"
                           :class="modalClasses">
                           <!-- Header avec gradient -->
                           <div class=" px-6 py-4">
                                    <div class="flex items-center justify-between">
                                             <div class="flex items-center space-x-3">
                                                      <div
                                                               class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                               ✅
                                                      </div>
                                                      <div>
                                                               <h3 class="text-gray-900 font-extrabold text-lg">Complétez
                                                                        votre profil</h3>
                                                               <p class="text-gray-900 text-sm">Votre profil n'est pas encore complet </p>
                                                      </div>
                                             </div>
                                    </div>
                           </div>

                           <!-- Content -->
                           <div class="px-6 py-5">
                                    <!-- Progress Bar -->
                                    <div class="mb-4">
                                             <div class="flex justify-between text-sm text-gray-600 mb-2">
                                                      <span>Progression</span>
                                                      <span>{{ progressPercentage }}%</span>
                                             </div>
                                             <div class="w-full bg-gray-200 rounded-full h-2">
                                                      <div class="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500"
                                                               :style="{ width: progressPercentage + '%' }"></div>
                                             </div>
                                    </div>

                                    <!-- Benefits List -->
                                    <div class="space-y-3 mb-6">
                                             <div class="flex items-center space-x-3">
                                                      <div
                                                               class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                               <Icon name="heroicons:check"
                                                                        class="w-4 h-4 text-green-600" />
                                                      </div>
                                                      <span class="text-gray-700 text-sm">Publier des biens
                                                               immobiliers</span>
                                             </div>
                                             <div class="flex items-center space-x-3">
                                                      <div
                                                               class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                               <Icon name="heroicons:check"
                                                                        class="w-4 h-4 text-green-600" />
                                                      </div>
                                                      <span class="text-gray-700 text-sm">Postuler en un clic a des centaines d'annonces immobilières</span>
                                             </div>
                                             <div class="flex items-center space-x-3">
                                                      <div
                                                               class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                               <Icon name="heroicons:check"
                                                                        class="w-4 h-4 text-green-600" />
                                                      </div>
                                                      <span class="text-gray-700 text-sm">Accéder à toutes les
                                                               fonctionnalités</span>
                                             </div>
                                    </div>

                                    <!-- Action Buttons -->
                                    <div class="space-y-3">
                                             <button @click="goToOnboarding"
                                                      class="cursor-pointer w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover-lift animate-pulse-shadow">
                                                      <div class="flex items-center justify-center space-x-2">
                                                               <Icon name="heroicons:arrow-right"
                                                                        class="w-5 h-5 text-white" />
                                                               <span class="text-white font-medium">Commencer
                                                                      </span>
                                                      </div>
                                             </button>

                                    </div>
                           </div>

                           <!-- Footer avec info -->
                           <div class="px-6 py-3 bg-gray-50 border-t border-gray-100">
                                    <p class="text-xs text-gray-500 text-center">
                                             <Icon name="heroicons:clock" class="w-3 h-3 inline mr-1" />
                                             Prend seulement 2-3 minutes
                                    </p>
                           </div>
                  </div>

         </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

// État du modal
const showModal = ref(false)

// Computed pour vérifier si l'utilisateur est onboardé
const isOnboarded = computed(() => {
  return authStore.userProfile?.is_onboarded || false
})

// Computed pour calculer le pourcentage de progression
const progressPercentage = computed(() => {
  if (!authStore.userProfile) return 0
  
  const profile = authStore.userProfile
  let completed = 0
  let total = 0
  
  // Champs obligatoires
  const requiredFields = [
    'first_name',
    'last_name', 
    'email',
    'phone',
    'address',
    'city'
  ]
  
  total += requiredFields.length
  requiredFields.forEach(field => {
    if (profile[field]) completed++
  })
  
  return Math.round((completed / total) * 100)
})

// Animation classes
const modalClasses = computed(() => {
  return showModal.value 
    ? 'translate-y-0 opacity-100 scale-100' 
    : 'translate-y-4 opacity-0 scale-95'
})

// Méthodes
const goToOnboarding = () => {
  // Jouer un son de clic
  playNotificationSound()
  router.push('/onboarding')
}

// Fonction pour jouer un son
const playNotificationSound = () => {
  try {
    // Créer un son de notification simple
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    // Fréquence agréable (523.25 Hz = C5)
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime)
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1) // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2) // G5
    
    // Volume doux
    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  } catch (error) {
    console.log('Son non disponible:', error)
  }
}

// Lifecycle
onMounted(() => {
  // Afficher le modal après un délai si l'utilisateur n'est pas onboardé
  setTimeout(() => {
    if (!isOnboarded.value) {
      showModal.value = true
    }
  }, 2000) // Délai de 2 secondes
})

// Watcher pour réinitialiser le modal si l'utilisateur se déconnecte
watch(() => authStore.userProfile, (newProfile) => {
  if (!newProfile) {
    // Utilisateur déconnecté, réinitialiser
    showModal.value = false
  }
})

// Watcher pour masquer le modal quand l'utilisateur est onboardé
watch(isOnboarded, (newValue) => {
  if (newValue) {
    showModal.value = false
  }
})

// Watcher pour jouer le son à chaque changement de route
watch(() => router.currentRoute.value.path, (newPath, oldPath) => {
  // Jouer le son si l'utilisateur n'est pas onboardé et qu'on change de page
  if (!isOnboarded.value && newPath !== oldPath && newPath.startsWith('/dashboard')) {
    setTimeout(() => {
      playNotificationSound()
    }, 500) // Délai pour laisser la page se charger
  }
})

// Watcher pour jouer le son quand le modal devient visible
watch(showModal, (newValue) => {
  if (newValue && !isOnboarded.value) {
    // Jouer le son immédiatement quand le modal s'affiche
    playNotificationSound()
  }
})
</script>

<style scoped>
/* Animation d'entrée avec bounce */
@keyframes bounceIn {
  0% {
    transform: translateY(100px) scale(0.3) rotate(-10deg);
    opacity: 0;
  }
  50% {
    transform: translateY(-20px) scale(1.05) rotate(2deg);
    opacity: 0.8;
  }
  70% {
    transform: translateY(10px) scale(0.95) rotate(-1deg);
    opacity: 0.9;
  }
  100% {
    transform: translateY(0) scale(1) rotate(0deg);
    opacity: 1;
  }
}

/* Animation de pulsation pour attirer l'attention */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

/* Animation de shake pour le bouton */
@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-2px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(2px);
  }
}

/* Animation de glow pour le header */
@keyframes glow {
  0% {
    box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
  }
  100% {
    box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
  }
}

/* Appliquer les animations */
.animate-bounce-in {
  animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.animate-pulse-shadow {
  animation: pulse 2s infinite;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.animate-glow {
  animation: glow 2s ease-in-out infinite;
}

/* Animation de sortie */
@keyframes slideOutDown {
  from {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  to {
    transform: translateY(100px) scale(0.9);
    opacity: 0;
  }
}

.modal-leave-active {
  animation: slideOutDown 0.3s ease-in;
}

/* Amélioration des transitions */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Effet de hover amélioré pour le bouton */
.hover-lift:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
</style>
