<template>
  <div class="min-h-screen bg-[#f6fafd] flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-sm px-8 py-4 flex items-left justify-between">

      <div class="flex items-center gap-4">
        <NuxtLink to="/">

          <img src="@/assets/images/logo-complet.png" alt="logo" class="h-12 w-auto">
        </NuxtLink>
        <div class="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-6 py-2">
          <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.15165 17.0165C7.07246 17.0169 6.99401 17.0014 6.92087 16.9711C6.84774 16.9407 6.7814 16.896 6.72576 16.8397L2.09728 12.2112C1.09637 11.2113 0.414507 9.93706 0.137961 8.54958C-0.138586 7.16209 0.00260945 5.72376 0.543683 4.41653C1.08476 3.10931 2.0014 1.99194 3.17764 1.20578C4.35388 0.419623 5.73687 0 7.15165 0C8.56642 0 9.94941 0.419623 11.1257 1.20578C12.3019 1.99194 13.2185 3.10931 13.7596 4.41653C14.3007 5.72376 14.4419 7.16209 14.1653 8.54958C13.8888 9.93706 13.2069 11.2113 12.206 12.2112L7.57753 16.8397C7.52189 16.896 7.45556 16.9407 7.38242 16.9711C7.30929 17.0014 7.23083 17.0169 7.15165 17.0165ZM7.15165 1.21056C5.97618 1.21138 4.82733 1.56057 3.85023 2.21401C2.87313 2.86746 2.11162 3.79584 1.6619 4.88187C1.21218 5.96791 1.09443 7.16287 1.32353 8.31579C1.55262 9.46871 2.11828 10.5279 2.94905 11.3595L7.15165 15.5621L11.3542 11.3595C12.185 10.5279 12.7507 9.46871 12.9798 8.31579C13.2089 7.16287 13.0911 5.96791 12.6414 4.88187C12.1917 3.79584 11.4302 2.86746 10.4531 2.21401C9.47596 1.56057 8.32711 1.21138 7.15165 1.21056Z"
              fill="#182135" />
            <path
              d="M7.15201 9.80865C6.55603 9.80865 5.97343 9.63192 5.47789 9.30081C4.98235 8.9697 4.59612 8.49908 4.36805 7.94847C4.13998 7.39785 4.0803 6.79197 4.19657 6.20745C4.31284 5.62292 4.59984 5.08599 5.02126 4.66457C5.44268 4.24315 5.97961 3.95615 6.56413 3.83988C7.14866 3.72361 7.75454 3.78329 8.30516 4.01136C8.85577 4.23943 9.32639 4.62566 9.6575 5.1212C9.98861 5.61674 10.1653 6.19934 10.1653 6.79532C10.1653 7.5945 9.84786 8.36096 9.28275 8.92607C8.71765 9.49118 7.95119 9.80865 7.15201 9.80865ZM7.15201 4.98732C6.79442 4.98732 6.44486 5.09335 6.14754 5.29202C5.85021 5.49069 5.61848 5.77306 5.48163 6.10343C5.34479 6.43379 5.30898 6.79732 5.37875 7.14804C5.44851 7.49876 5.6207 7.82091 5.87356 8.07377C6.12641 8.32662 6.44857 8.49882 6.79928 8.56858C7.15 8.63834 7.51353 8.60253 7.8439 8.46569C8.17427 8.32885 8.45664 8.09711 8.6553 7.79979C8.85397 7.50246 8.96001 7.15291 8.96001 6.79532C8.96001 6.31581 8.76952 5.85593 8.43046 5.51687C8.09139 5.1778 7.63152 4.98732 7.15201 4.98732Z"
              fill="#182135" />
          </svg>

          <input type="text" placeholder="Lausanne – Switzerland"
            class="text-sm text-black bg-transparent focus:outline-none w-full" />
        </div>

      </div>
      <div class="flex items-center gap-4">
        <div class="relative">
          <input type="text" placeholder="Rechercher..."
            class="rounded-full px-4 py-2 bg-[#f6fafd] border border-gray-200 focus:outline-none" />

        </div>
        <button
          class="bg-[#f6fafd] border border-gray-200 rounded-xl w-10 h-10 flex items-center justify-center text-2xl font-bold">+</button>
        <button class="relative">
          <span class="material-icons text-gray-400 text-2xl">notifications</span>
        </button>
        <div class="flex items-center gap-2">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" class="w-9 h-9 rounded-full object-cover" />
          <span class="font-semibold text-gray-700">Thibaut</span>
          <span class="material-icons text-gray-400">expand_more</span>
        </div>
      </div>
    </header>

    <div class="flex flex-1 gap-8 px-8 py-8">
      <!-- Sidebar -->
      <aside class="bg-white rounded-2xl shadow p-6 w-60 flex flex-col gap-6 h-fit self-start">
        <nav class="flex flex-col gap-4">
          <a href="#" class="flex items-center gap-3 text-gray-700 font-medium hover:text-blue-500 transition"><span
              class="material-icons">home</span>Accueil</a>
          <a href="#" class="flex items-center gap-3 text-gray-700 font-medium hover:text-blue-500 transition"><span
              class="material-icons">domain</span>Mes biens</a>
          <a href="#" class="flex items-center gap-3 text-gray-700 font-medium hover:text-blue-500 transition"><span
              class="material-icons">event</span>Planifications</a>
          <a href="#" class="flex items-center gap-3 text-gray-700 font-medium hover:text-blue-500 transition"><span
              class="material-icons">assignment</span>Candidatures</a>
          <a href="#" class="flex items-center gap-3 text-gray-700 font-medium hover:text-blue-500 transition"><span
              class="material-icons">people</span>Network</a>
          <a href="#"
            class="flex items-center gap-3 text-gray-700 font-medium hover:text-blue-500 transition relative"><span
              class="material-icons">mail</span>Message <span
              class="absolute right-0 top-0 bg-blue-400 text-white text-xs rounded-full px-2 ml-2">2</span></a>
        </nav>
      </aside>

      <!-- Main content -->
      <main class="flex-1 flex flex-col gap-8">
        <!-- Profil Card -->
        <section class="bg-white rounded-2xl shadow p-8 flex items-center gap-8 mb-4">
          <div class="flex flex-col items-center justify-center w-1/4">
            <img src="https://randomuser.me/api/portraits/men/32.jpg"
              class="w-28 h-28 rounded-xl object-cover border-4 border-white shadow" />
          </div>
          <div class="flex-1 flex flex-col justify-center">
            <h2 class="text-2xl font-bold text-gray-800 mb-1">Thibaut Languin</h2>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-blue-500 font-semibold">Gérant</span>
              <span class="text-gray-400">· Medan, Sumatera Utara - ID</span>
            </div>
          </div>
        </section>

        <div class="flex gap-6">
          <!-- Statut du compte -->
          <div class="bg-white rounded-2xl shadow p-8 flex-1 flex flex-col items-center min-w-[300px]">
            <span class="text-gray-700 font-semibold mb-2">Statut du compte</span>
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" stroke="#e5e7eb" stroke-width="10" fill="none" />
              <circle cx="60" cy="60" r="54" stroke="#7db8e8" stroke-width="10" fill="none" stroke-dasharray="339.292"
                stroke-dashoffset="125" stroke-linecap="round" />
              <text x="50%" y="54%" text-anchor="middle" fill="#7db8e8" font-size="2em" font-weight="bold"
                dy=".3em">63%</text>
            </svg>
            <div class="flex justify-between w-full mt-4">
              <span class="text-blue-500 font-bold">63% Profil complet</span>
              <span class="text-gray-400">15% Incomplet</span>
            </div>
            <a href="#" class="text-blue-400 mt-2 text-sm font-medium hover:underline">Completer mon profil</a>
          </div>
          <!-- Statistiques à droite -->
          <div class="bg-white rounded-2xl shadow p-8 flex-[2] flex flex-col gap-4 justify-between min-w-[350px]">
            <div class="flex items-center gap-4">
              <span class="material-icons text-blue-200 text-3xl">visibility</span>
              <div>
                <div class="text-2xl font-bold text-gray-700">102</div>
                <div class="text-gray-400 text-sm">Personnes qui ont vu mon profil</div>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span class="material-icons text-blue-200 text-3xl">send</span>
              <div>
                <div class="text-2xl font-bold text-gray-700">32</div>
                <div class="text-gray-400 text-sm">Nombre de postulation</div>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span class="material-icons text-blue-200 text-3xl">search</span>
              <div>
                <div class="text-2xl font-bold text-gray-700">143</div>
                <div class="text-gray-400 text-sm">Apparitions dans les recherches</div>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span class="material-icons text-blue-200 text-3xl">home</span>
              <div>
                <div class="text-2xl font-bold text-gray-700">0</div>
                <div class="text-gray-400 text-sm">Biens publié</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth'
const { isLoggedIn, redirectToLogin } = useAuth()
if (!isLoggedIn()) {
  redirectToLogin()
}
</script>

<style scoped>
.material-icons {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}
</style> 