<template>
  <div class="flex min-h-screen">
    <div class="flex flex-1 flex-col justify-center px-0 py-0 sm:px-6 lg:flex-none lg:px-10 xl:px-44">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div class="animate-fade-in">
          <div class="flex justify-center items-center">
            
          </div>
          <NuxtLink to="/" class="cursor-pointer flex justify-center items-center">
            <img :src="logoImage" alt="Keylity"
              class="cursor-pointer h-15 w-auto justify-center item-center transform transition-transform duration-300 hover:scale-105" />
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
            <div class="text-green-500 text-xl mb-4">Veuiller confirmer votre email</div>
            <NuxtLink to="/login" class="text-blue-500 hover:text-blue-700">
              Retourner sur la page de connexion
            </NuxtLink>
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
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();

const resendEmail = async () => {
  try {
    // TODO: Implémenter la fonction de renvoi d'email
    alert("Fonctionnalité de renvoi d'email à implémenter");
  } catch (error) {
    console.error("Error resending email:", error);
    alert("Une erreur est survenue lors du renvoi de l'email");
  }
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-5%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
</style> 