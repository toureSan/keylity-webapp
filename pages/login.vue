<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-white">
    <body class="h-full">
    ```
  -->

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
            Heureux de vous revoir !
          </h2>
          <p class="mt-2 text-sm/6 text-gray-500">
            Pas encore de compte ?
            {{ " " }}
            <NuxtLink
              to="/register"
              class="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-300"
            >
              Créer un compte
            </NuxtLink>
          </p>
        </div>

        <div class="mt-10">
          <div>
            <form @submit.prevent="handleLogin" class="space-y-6">
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

              <div class="group">
                <label
                  for="password"
                  class="block text-sm/6 font-medium text-gray-900 group-focus-within:text-blue-600 transition-colors duration-300"
                  >Mot de passe</label
                >
                <div class="mt-2 relative">
                  <input
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    name="password"
                    id="password"
                    autocomplete="current-password"
                    required
                    class="block w-full rounded-lg bg-white px-4 py-3 text-base text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 transition-all duration-300 focus:ring-2 focus:ring-blue-600 focus:shadow-lg hover:ring-gray-400"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                  >
                    <svg
                      v-if="!showPassword"
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fill-rule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <svg
                      v-else
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clip-rule="evenodd"
                      />
                      <path
                        d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex gap-3">
                  <div class="flex h-6 shrink-0 items-center">
                    <div class="group grid size-4 grid-cols-1">
                      <input
                        v-model="rememberMe"
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-blue-600 checked:bg-blue-600 indeterminate:border-blue-600 indeterminate:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto transition-colors duration-300"
                      />
                      <svg
                        class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          class="opacity-0 group-has-checked:opacity-100"
                          d="M3 8L6 11L11 3.5"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          class="opacity-0 group-has-indeterminate:opacity-100"
                          d="M3 7H11"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <label for="remember-me" class="block text-sm/6 text-gray-900"
                    >Se souvenir de moi</label
                  >
                </div>

                <div class="text-sm/6">
                  <a
                    href="#"
                    class="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-300"
                    >Mot de passe oublié ?</a
                  >
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  class="group flex w-full justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm/6 font-semibold text-white shadow-sm transition-all duration-300 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                >
                  <span class="flex items-center">
                    Se connecter
                    <svg
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
                  >Ou continuer avec</span
                >
              </div>
            </div>

            <div class="w-full mt-6">
              <button
                type="button"
                @click="handleGoogleLogin"
                class="group flex w-full items-center justify-center gap-3 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 transition-all duration-300 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                <svg
                  class="h-5 w-5 transform transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                    fill="#34A853"
                  />
                </svg>
                <span class="text-sm/6 font-semibold"
                  >Continuer avec Google</span
                >
              </button>
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

.fluid-title-blur {
  font-size: clamp(2.3rem, 2vw, 8rem);
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
import logoImage from "~/assets/images/logo-complet.png";

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const showPassword = ref(false);

const handleLogin = async () => {
  try {
    // TODO: Implémenter la logique de connexion
    console.log("Login attempt with:", {
      email: email.value,
      password: password.value,
      rememberMe: rememberMe.value,
    });
  } catch (error) {
    console.error("Login error:", error);
  }
};

const handleGoogleLogin = async () => {
  try {
    // TODO: Implémenter la connexion Google
    console.log("Google login attempt");
  } catch (error) {
    console.error("Google login error:", error);
  }
};

const handleLinkedInLogin = async () => {
  try {
    // TODO: Implémenter la connexion LinkedIn
    console.log("LinkedIn login attempt");
  } catch (error) {
    console.error("LinkedIn login error:", error);
  }
};
</script>
