<template>
  <div class="flex min-h-screen">
    <div class="flex flex-1 flex-col justify-center px-0 py-0 sm:px-6 lg:flex-none lg:px-10 xl:px-44">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div class="animate-fade-in">
          <div class="flex justify-center items-center">
            <NuxtLink to="/" class="cursor-pointer">
              <img :src="logoImage" alt="Keylity"
                class="cursor-pointer h-15 w-auto justify-center item-center transform transition-transform duration-300 hover:scale-105" />
            </NuxtLink>
          </div>
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
            <div class="text-green-500 text-xl mb-4">Email confirmé avec succès !</div>
            <p class="text-gray-600">Redirection vers le dashboard...</p>
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden flex-1 lg:block">
      <!-- Image floutée -->
      <img class="absolute inset-0 w-full h-full object-cover" src="@/assets/images/famille.png" alt=""
        style="filter: blur(2px)" />

      <!-- Overlay léger pour assombrir un peu -->
      <div class="absolute inset-0 bg-gradient-to-b from-gray-900/20 to-gray-900/40"></div>

      <!-- Texte net en bas à gauche -->
      <div class="absolute bottom-2 left-6 text-white max-w-xl z-10">
        <h2 class="fluid-title animate-fade-in-up">Bienvenue chez Keylity</h2>
        <p class="mt-0 fluid-subtitle text-white/90 drop-shadow-sm animate-fade-in-up animation-delay-200">
          Simplifiez vos démarches administratives
        </p>
      </div>
    </div>
  </div>
</template>


<script setup>
         import logoImage from "~/assets/images/logo-complet.png";
         import {useAuthStore} from "~/stores/auth";
         import {useRouter} from "vue-router";

         const router = useRouter();
         const authStore = useAuthStore();
         const loading = ref(true);
         const error = ref(null);

onMounted(async () => {
         try {
                  
                  let accessToken = null
                  let type = null

                  if (window.location.hash) {
                           const hashParams = new URLSearchParams(window.location.hash.substring(1))
                           accessToken = hashParams.get('access_token')
                           type = hashParams.get('type')
                  } else if (window.location.search) {
                           const queryParams = new URLSearchParams(window.location.search)
                           accessToken = queryParams.get('token') || queryParams.get('access_token')
                           type = queryParams.get('type')
                  }

                  if (!accessToken || type !== 'signup') {
                           throw new Error('Token invalide ou type incorrect')
                  }

                  await authStore.verifyEmail(accessToken)

                  await new Promise(resolve => setTimeout(resolve, 1000))
                  await navigateTo('/dashboard')
         } catch (err) {
                  console.error('Erreur de vérification:', err)
                  error.value = err.message || 'Une erreur est survenue lors de la vérification de votre email'
         } finally {
                  loading.value = false
         }
})

</script>


<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fluid-title {
  font-size: clamp(2.3rem, 2.5vw, 8rem);
  font-family: "Bricolage Grotesque", sans-serif;
  font-weight: 700;
}

.fluid-subtitle {
  font-size: clamp(1.5rem, 1vw, 8rem);
  font-family: "Bricolage Grotesque", sans-serif;
  font-weight: 300;
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out;
}

.animation-delay-200 {
  animation-delay: 200ms;
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