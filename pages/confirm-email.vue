<template>
  <div class="flex min-h-screen">
    <div class="flex flex-1 flex-col justify-center px-0 py-0 sm:px-6 lg:flex-none lg:px-10 xl:px-44">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div class="animate-fade-in">
          <NuxtLink to="/" class="cursor-pointer">
            <img
              :src="logoImage"
              alt="Keylity"
              class="cursor-pointer h-15 w-auto transform transition-transform duration-300 hover:scale-105"
            />
          </NuxtLink>
          <div v-if="loading" class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p class="mt-4 text-gray-600">Vérification de votre email en cours...</p>
          </div>
          <div v-else-if="error" class="text-center">
            <div class="text-red-500 text-xl mb-4">{{ error }}</div>
            <NuxtLink to="/login" class="text-blue-500 hover:text-blue-700">
              Retour à la page de connexion
            </NuxtLink>
          </div>
          <div v-else class="text-center">
            <div class="text-green-500 text-xl mb-4">Email vérifié avec succès !</div>
            <NuxtLink to="/login" class="text-blue-500 hover:text-blue-700">
              Aller à la page de connexion
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden flex-1 lg:block">
      <!-- Image floutée -->
      <img
        class="absolute inset-0 w-full h-full object-cover"
        src="@/assets/images/famille.png"
        alt=""
        style="filter: blur(2px)"
      />

      <!-- Overlay léger pour assombrir un peu -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-gray-900/20 to-gray-900/40"
      ></div>

      <!-- Texte net en bas à gauche -->
      <div class="absolute bottom-2 left-6 text-white max-w-xl z-10">
        <h2 class="fluid-title animate-fade-in-up">Bienvenue chez Keylity</h2>
        <p
          class="mt-0 fluid-subtitle text-white/90 drop-shadow-sm animate-fade-in-up animation-delay-200"
        >
          Simplifiez vos démarches administratives
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import logoImage from "~/assets/images/logo-complet.png"

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const token = route.query.token as string
    console.log('Confirmation email')
    if (!token) {
      throw new Error('Token manquant')
    }

    await authStore.verifyEmail(token)
    authStore.confirmEmail()

    // Attendre 2 secondes avant la redirection pour que l'utilisateur puisse voir le message de succès
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Une erreur est survenue'
  } finally {
    loading.value = false
  }
})
</script>


<style scoped>
.fluid-title {
  font-size: clamp(2.3rem, 2.5vw, 8rem);
  font-family: "Bricolage Grotesque", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-weight: 700;
}

.fluid-subtitle {
  font-size: clamp(1.5rem, 1vw, 8rem);
  font-family: "Bricolage Grotesque", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-weight: 300;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out;
}

.animation-delay-200 {
  animation-delay: 200ms;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

