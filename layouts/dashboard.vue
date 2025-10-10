<template>
  <div class="h-screen bg-gray-50 flex flex-col">
    <!-- Top Navigation -->
    <header class="bg-white shadow-sm sticky top-0 z-40">
      <div class="flex items-center justify-between px-4 py-4">
        <div class="flex items-center gap-4">
          <!-- Toggle Sidebar -->
          <button
            @click="isSidebarOpen = !isSidebarOpen"
            class="p-2 rounded-lg hover:bg-gray-100 md:hidden"
          >
            <Icon name="heroicons:bars-3" class="h-6 w-6 text-gray-600" />
          </button>
          <button
            @click="isCollapsed = !isCollapsed"
            class="p-2 rounded-lg hover:bg-gray-100 hidden md:block"
          >
            <Icon name="heroicons:bars-3" class="h-6 w-6 text-gray-600" />
          </button>
          <div class="flex items-center">
            <img src="~/assets/images/logo-complet.png" class="h-8 w-auto" alt="">
          </div>
          <div class="relative hidden md:flex items-center gap-4">
            <!-- Mode Toggle Switch -->
            <div class="flex items-center bg-gray-100 rounded-full p-1">
              <button
                @click="switchMode('candidat')"
                class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                :class="
                  mode === 'candidat'
                    ? 'bg-white text-blue-600 shadow'
                    : 'text-gray-600 hover:text-gray-800'
                "
              >
                Candidat
              </button>
              <button
                @click="switchMode('annonceur')"
                class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                :class="
                  mode === 'annonceur'
                    ? 'bg-white text-blue-600 shadow'
                    : 'text-gray-600 hover:text-gray-800'
                "
              >
                Annonceur
              </button>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <!-- Add Property Button - Visible seulement pour les annonceurs -->
          <button
            v-if="mode === 'annonceur'"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hidden md:flex items-center gap-2"
          >
            <svg
              class="text-white color-white"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 11H21"
                stroke="#808080"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11 1V21"
                stroke="#808080"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            Ajouter un bien
          </button>

          <!-- Notifications Dropdown -->
          <div class="relative notifications-dropdown" ref="notificationsRef">
            <button
              @click="isNotificationsOpen = !isNotificationsOpen"
              class="p-2 rounded-lg hover:bg-gray-100 relative"
            >
              <svg
                width="18"
                height="22"
                viewBox="0 0 18 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.0486 17.5077C16.9839 17.4658 16.4972 17.1248 16.0099 16.0933C15.1149 14.1992 14.927 11.5309 14.927 9.62607C14.927 9.61778 14.9268 9.60957 14.9265 9.60132C14.9168 7.08383 13.4093 4.91365 11.2521 3.93993V2.45077C11.2521 1.0994 10.1545 0 8.80537 0H8.6026C7.25346 0 6.15587 1.0994 6.15587 2.45077V3.93985C3.99145 4.9167 2.48097 7.09796 2.48097 9.62607C2.48097 11.5309 2.29311 14.1992 1.39811 16.0933C0.910802 17.1248 0.424095 17.4657 0.359384 17.5077C0.0868765 17.6339 -0.0474868 17.9252 0.0152046 18.2204C0.0784976 18.5186 0.357193 18.7241 0.661541 18.7241H5.38583C5.41221 20.5349 6.89008 22 8.704 22C10.5179 22 11.9958 20.5349 12.0222 18.7241H16.7465C17.0508 18.7241 17.3295 18.5186 17.3928 18.2204C17.4554 17.9252 17.3211 17.6338 17.0486 17.5077ZM7.44498 2.45077C7.44498 1.81135 7.9643 1.29117 8.60264 1.29117H8.80541C9.44375 1.29117 9.96307 1.81135 9.96307 2.45077V3.52142C9.55624 3.43733 9.13511 3.39307 8.70383 3.39307C8.27268 3.39307 7.85167 3.43728 7.44502 3.52129L7.44498 2.45077ZM8.704 20.7088C7.60087 20.7088 6.70106 19.8229 6.67489 18.7242H10.7331C10.7069 19.8229 9.80714 20.7088 8.704 20.7088ZM11.2993 17.4329H2.13043C2.24193 17.2592 2.35541 17.0624 2.4682 16.8401C3.33205 15.1366 3.77007 12.7095 3.77007 9.62607C3.77007 6.90112 5.98335 4.68424 8.70379 4.68424C11.4242 4.68424 13.6375 6.90112 13.6375 9.62822C13.6375 9.63617 13.6376 9.64408 13.6379 9.65198C13.6404 12.723 14.0784 15.1415 14.9398 16.8401C15.0526 17.0625 15.1661 17.2592 15.2776 17.4329H11.2993Z"
                  fill="#808080"
                />
              </svg>

              <span
                class="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                >3</span
              >
            </button>

            <!-- Notifications Panel -->
            <div
              v-if="isNotificationsOpen"
              class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50"
            >
              <div class="px-4 py-2 border-b border-gray-100">
                <h3 class="font-semibold">Notifications</h3>
              </div>
              <div class="max-h-96 overflow-y-auto">
                <a
                  v-for="notification in notifications"
                  :key="notification.id"
                  href="#"
                  class="px-4 py-3 hover:bg-gray-50 flex items-start gap-3"
                >
                  <div
                    class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0"
                  >
                    <Icon name="heroicons:bell" class="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p class="text-sm">
                      {{ notification.message }}
                    </p>
                    <p class="text-xs text-gray-500 mt-1">
                      {{ notification.time }}
                    </p>
                  </div>
                </a>
              </div>
              <div class="px-4 py-2 border-t border-gray-100">
                <a
                  href="#"
                  class="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >Voir toutes les notifications</a
                >
              </div>
            </div>
          </div>

          <!-- User Menu -->
          <div class="relative user-menu-dropdown" ref="userMenuRef">
            <!-- Skeleton pendant le chargement -->
            <div v-if="!userProfile" class="flex items-center gap-2 p-2">
              <div class="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div class="hidden md:block w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            
            <!-- Menu utilisateur -->
            <button
              v-else
              @click="isUserMenuOpen = !isUserMenuOpen"
              class="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2"
            >
              <img
                :src="getProfileImageUrl()"
                alt="Profile"
                class="w-8 h-8 rounded-full object-cover"
                @error="handleImageError"
              />
              <span class="font-medium hidden md:block">{{ userProfile?.first_name || 'Utilisateur' }}</span>
              <Icon
                name="heroicons:chevron-down"
                class="h-5 w-5 text-gray-500"
              />
            </button>

            <!-- User Menu Panel -->
            <div
              v-if="isUserMenuOpen"
              class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50"
            >
              <div class="px-4 py-2 border-b border-gray-100">
                <div class="flex items-center gap-3">
                  <img
                    :src="getProfileImageUrl()"
                    alt="Profile"
                    class="w-10 h-10 rounded-full object-cover"
                    @error="handleImageError"
                  />
                  <div>
                    <p class="font-medium">{{ userProfile?.first_name || 'Utilisateur' }} {{ userProfile?.last_name || '' }}</p>
                    <p class="text-sm text-gray-500">{{ userProfile?.email || 'email@example.com' }}</p>
                  </div>
                </div>
              </div>

              <div class="py-2">
                <a
                  href="#"
                  class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Icon name="heroicons:user" class="h-5 w-5 text-gray-500" />
                  Mon profil
                </a>
                <a
                  href="#"
                  class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Icon
                    name="heroicons:arrow-down"
                    class="h-5 w-5 text-gray-500"
                  />
                  Mes téléchargements
                </a>
                <a
                  href="#"
                  class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Icon
                    name="heroicons:bookmark"
                    class="h-5 w-5 text-gray-500"
                  />
                  Mes favoris
                </a>
              </div>

              <div class="border-t border-gray-100 py-2">
                <a
                  href="#"
                  class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Icon
                    name="heroicons:cog-6-tooth"
                    class="h-5 w-5 text-gray-500"
                  />
                  Paramètres du compte
                </a>
                <a
                  href="#"
                  class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Icon
                    name="heroicons:calendar"
                    class="h-5 w-5 text-gray-500"
                  />
                  Abonnement
                </a>
                <a
                  href="#"
                  class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Icon
                    name="heroicons:lifebuoy"
                    class="h-5 w-5 text-gray-500"
                  />
                  Support
                </a>
              </div>

              <div class="border-t border-gray-100 py-2">
                <button
                  @click="logout"
                  class="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Icon
                    name="heroicons:arrow-right-on-rectangle"
                    class="h-5 w-5 text-red-500"
                  />
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Mobile Search -->
      <div class="md:hidden px-4 pb-4">
        <div class="relative">
          <input
            type="text"
            placeholder="Rechercher..."
            class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Icon
            name="heroicons:magnifying-glass"
            class="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
          />
        </div>
        <!-- Badge du rôle mobile -->
        <div class="mt-2 flex justify-center">
          <div class="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {{ mode === 'candidat' ? 'Candidat' : 'Annonceur' }}
          </div>
        </div>
      </div>
    </header>

    <div class="flex flex-1">
      <!-- Sidebar -->
      <aside
        class="fixed md:static inset-y-0 left-0 transform md:transform-none transition-all duration-200 ease-in-out z-30 bg-white h-full shadow-sm overflow-y-auto"
        :class="[
          isCollapsed ? 'w-20' : 'w-64',
          isSidebarOpen
            ? 'translate-x-0'
            : '-translate-x-full md:translate-x-0',
        ]"
        ref="sidebarRef"
      >
        <nav class="p-4 space-y-2">
          <NuxtLink
            to="/dashboard"
            class="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            :class="[
              { 'justify-center': isCollapsed },
              $route.path === '/dashboard' ? 'text-blue-600 bg-blue-50' : '',
            ]"
          >
            <Icon name="heroicons:home" class="h-5 w-5" />
            <span v-if="!isCollapsed">Accueil</span>
          </NuxtLink>
          
          <!-- Mes biens - Visible seulement pour les annonceurs -->
          <a
            v-if="mode === 'annonceur'"
            href="#"
            class="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            :class="{ 'justify-center': isCollapsed }"
          >
            <Icon name="heroicons:building-office-2" class="h-5 w-5" />
            <span v-if="!isCollapsed">Mes biens</span>
          </a>
          
          <!-- Candidatures - Visible pour tous mais avec des textes différents -->
          <a
            href="#"
            class="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            :class="{ 'justify-center': isCollapsed }"
          >
            <Icon name="heroicons:document" class="h-5 w-5" />
            <span v-if="!isCollapsed">
              {{ mode === 'candidat' ? 'Mes candidatures' : 'Candidatures reçues' }}
            </span>
          </a>
          
          <a
            href="#"
            class="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            :class="{ 'justify-center': isCollapsed }"
          >
            <Icon name="heroicons:calendar" class="h-5 w-5" />
            <span v-if="!isCollapsed">Planifications</span>
          </a>
        </nav>
      </aside>

      <!-- Overlay -->
      <div
        v-if="isSidebarOpen"
        @click="isSidebarOpen = false"
        class="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
      ></div>

      <!-- Main Content -->
      <main class="flex-1 p-6 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onActivated } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth.store';

const authStore = useAuthStore();
const router = useRouter();
const isCollapsed = ref(false);
const isSidebarOpen = ref(false);
const isNotificationsOpen = ref(false);
const isUserMenuOpen = ref(false);

// Données du profil utilisateur
const userProfile = ref<any>(null);
const userRole = ref('candidat');
const profileImageError = ref(false);

// Mode basé sur le rôle réel de l'utilisateur
const mode = computed(() => {
  return userProfile.value?.role || 'candidat';
});

// Fonction pour récupérer le profil utilisateur
const fetchUserProfile = async () => {
  if (!authStore.isAuthenticated) return;
  
  try {
    const config = useRuntimeConfig()
    const token = authStore.getAuthToken()
    
    if (!token) return
    
    const response: any = await $fetch(`${config.public.apiBase}/user-profile/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    userProfile.value = response.profile || response
    userRole.value = response.roles?.[0] || 'candidat'
    
    
  } catch (error) {
  }
}

// Fonction pour basculer entre les modes
const switchMode = (newMode: string) => {
  if (newMode === 'annonceur' && userRole.value !== 'annonceur') {
    // Si l'utilisateur n'a pas le rôle annonceur, rediriger vers l'onboarding
    router.push('/onboarding?mode=annonceur');
    return;
  }
};

// Fonction pour obtenir l'URL de l'image de profil
const getProfileImageUrl = () => {
  if (!userProfile.value) {
    return 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg';
  }
  
  // Essayer différents champs possibles pour l'image de profil
  const imageUrl = userProfile.value.avatar_url || 
                   userProfile.value.profile_photo_url || 
                   userProfile.value.profile_image_url ||
                   userProfile.value.photo_url;
  
  if (imageUrl && !profileImageError.value) {
    return imageUrl;
  }
  
  // Image par défaut
  return 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg';
};

// Fonction pour gérer les erreurs d'image
const handleImageError = () => {
  profileImageError.value = true;
};

// Fonction de déconnexion
const logout = () => {
  authStore.logout();
};

const notifications = [
  {
    id: 1,
    message: "Votre candidature pour l'appartement à Genève a été acceptée",
    time: "Il y a 5 minutes",
  },
  {
    id: 2,
    message: "Nouveau message de l'agence immobilière",
    time: "Il y a 2 heures",
  },
  {
    id: 3,
    message: "Rappel: Visite programmée demain à 14h",
    time: "Il y a 5 heures",
  },
];


const notificationsRef = ref(null);
const userMenuRef = ref(null);

onClickOutside(notificationsRef, () => {
  isNotificationsOpen.value = false;
});

onClickOutside(userMenuRef, () => {
  isUserMenuOpen.value = false;
});

// Close sidebar on mobile when clicking outside
const sidebarRef = ref(null);
onClickOutside(sidebarRef, () => {
  if (window.innerWidth < 768) {
    isSidebarOpen.value = false;
  }
});

// Initialiser le profil utilisateur
onMounted(async () => {
  if (authStore.isAuthenticated) {
    await fetchUserProfile()
  }
});

// Rafraîchir le profil quand on revient sur la page
onActivated(async () => {
  if (authStore.isAuthenticated) {
    await fetchUserProfile()
  }
});
</script>
