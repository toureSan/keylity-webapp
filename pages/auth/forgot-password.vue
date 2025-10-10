<template>
  <div class="flex min-h-screen">
    <div
      class="flex flex-1 flex-col justify-center px-0 py-0 sm:px-6 lg:flex-none lg:px-10 xl:px-44"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div class="animate-fade-in">
          <NuxtLink to="/" class="cursor-pointer">
            <img
              :src="logoImage"
              alt="Keylity"
              class="cursor-pointer h-15 w-auto transform transition-transform duration-300 hover:scale-105"
            />
          </NuxtLink>
          <h2 class="fluid-subtitle font-extrabold tracking-tight">
            Mot de passe oublié ?
          </h2>
          <p class="mt-2 text-sm/6 text-gray-500">
            Pas de problème ! Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
          </p>
        </div>

        <div class="mt-10">
          <div>
            <form @submit.prevent="handleForgotPassword" class="space-y-6">
              <div v-if="serverError" class="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94l-1.72-1.72z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-red-800">
                      {{ serverError }}
                    </p>
                  </div>
                </div>
              </div>

              <div v-if="successMessage" class="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-green-800">
                      {{ successMessage }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="group">
                <label
                  for="email"
                  class="block text-sm/6 font-medium text-gray-900 group-focus-within:text-blue-600 transition-colors duration-300"
                  >Adresse email</label
                >
                <div class="mt-2 relative">
                  <input
                    v-model="email"
                    type="email"
                    name="email"
                    id="email"
                    autocomplete="email"
                    required
                    class="block w-full rounded-lg bg-white px-4 py-3 text-base text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 transition-all duration-300 focus:ring-2 focus:ring-blue-600 focus:shadow-lg hover:ring-gray-400"
                    placeholder="exemple@email.com"
                  />
                  <div
                    class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                  >
                    <svg
                      class="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                      />
                      <path
                        d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  :disabled="loading"
                  class="group flex w-full justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm/6 font-semibold text-white shadow-sm transition-all duration-300 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="flex items-center">
                    <span v-if="loading" class="mr-2">
                      <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                    {{ loading ? "Envoi en cours..." : "Envoyer le lien de réinitialisation" }}
                    <svg
                      v-if="!loading"
                      class="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>

          <div class="mt-10">
            <div class="relative">
              <div
                class="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div class="w-full border-t border-gray-200" />
              </div>
              <div class="relative flex justify-center text-sm/6 font-medium">
                <span class="bg-white px-6 text-gray-900"
                  >Retour à la connexion</span
                >
              </div>
            </div>

            <div class="w-full mt-6">
              <NuxtLink
                to="/login"
                class="group flex w-full items-center justify-center gap-3 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 transition-all duration-300 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                <svg
                  class="h-5 w-5 transform transition-transform duration-300 group-hover:-translate-x-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M17 10a.75.75 0 01-.75.75H5.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="text-sm/6 font-semibold"
                  >Retour à la connexion</span
                >
              </NuxtLink>
            </div>
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

<style scoped>
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

<script setup>
// Utiliser le layout auth (sans Header) et empêcher l'accès si déjà connecté
definePageMeta({
  layout: 'auth',
  middleware: 'guest'
});

import logoImage from "~/assets/images/logo-complet.png";
import { useAuthStore } from '~/stores/auth.store';

const authStore = useAuthStore();
const email = ref("");
const serverError = ref("");
const successMessage = ref("");
const loading = ref(false);

const handleForgotPassword = async () => {
  try {
    loading.value = true;
    serverError.value = "";
    successMessage.value = "";
    
    const response = await authStore.forgotPassword(email.value);

    if (response.success) {
      successMessage.value = "Un email de réinitialisation a été envoyé à votre adresse email. Veuillez vérifier votre boîte de réception.";
    } else {
      serverError.value = response.error || "Une erreur est survenue lors de l'envoi de l'email";
    }
  } catch (error) {
    if (error.response?._data?.message) {
      serverError.value = error.response._data.message;
    } else {
      serverError.value = "Une erreur est survenue lors de l'envoi de l'email de réinitialisation";
    }
  } finally {
    loading.value = false;
  }
};
</script>
