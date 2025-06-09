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
          <h2 class="fluid-subtitle font-extrabold tracking-tight">
            Vérifiez votre email
          </h2>
          <p class="mt-2 text-sm/6 text-gray-500">
            Un email de confirmation a été envoyé à votre adresse email. Veuillez cliquer sur le lien dans l'email pour activer votre compte.
          </p>
          <div class="mt-6">
            <NuxtLink
              to="/login"
              class="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-300"
            >
              Retour à la page de connexion
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

<script setup>
import logoImage from "~/assets/images/logo-complet.png";
</script>

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