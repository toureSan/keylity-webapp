<template>
  <header
    class="fixed w-full top-0 z-50 transition-all duration-300 bg-white"
    :class="[
      isScrolled ? 'bg-white shadow-sm py-4' : 'bg-transparent py-6',
      isSearchModalOpen ? 'bg-white' : '',
    ]"
  >
    <div class="px-4 md:px-8">
      <div class="flex items-center justify-between">
        <!-- Logo and Navigation -->
        <div class="flex items-center gap-8">
          <NuxtLink to="/" class="text-2xl font-bold shrink-0">
            <img
              src="@/assets/images/logo-complet.png"
              alt="Keylity"
              class="w-auto h-10"
            />
          </NuxtLink>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center space-x-6">
            <NuxtLink
              to="/properties"
              class="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Acheter
            </NuxtLink>
            <NuxtLink
              to="/search"
              class="text-gray-600 hover:text-primary-600 transition-colors font-medium text-primary-600"
            >
              Chercher un bien
            </NuxtLink>
            <NuxtLink
              to="/dashboard"
              class="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Estimer
            </NuxtLink>
            <NuxtLink
              to="/dashboard/properties"
              class="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Vendre
            </NuxtLink>
          </nav>
        </div>
        <div class="flex items-center gap-4">
          <!-- Bouton pour utilisateurs non connectés -->
          <NuxtLink
            v-if="!authStore.isAuthenticated"
            to="login"
            class="bg-blue-500 text-white hidden md:block hover:bg-blue-600 cursor-pointer px-4 py-2 rounded-full transition-colors font-medium"
          >
            Publier mon bien gratuitement
          </NuxtLink>

          <!-- Menu utilisateur connecté -->
          <Menu v-if="authStore.isAuthenticated" as="div" class="relative">
            <MenuButton
              class="flex items-center border border-gray-300 rounded-full p-1 hover:shadow-md transition-all cursor-pointer bg-white"
            >
              <Icon name="heroicons:bars-3" class="w-5 h-5 mx-2" />
              <div
                class="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white overflow-hidden"
              >
                <img
                  v-if="userProfile?.avatar_url || userProfile?.profile_photo_url"
                  :src="userProfile?.avatar_url || userProfile?.profile_photo_url"
                  alt="Profile"
                  class="w-full h-full object-cover"
                />
                <Icon v-else name="heroicons:user" class="w-5 h-5" />
              </div>
            </MenuButton>

            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                class="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-gray-200 ring-opacity-5 focus:outline-none divide-y divide-gray-100"
              >
                <div class="px-4 py-3">
                  <p class="text-sm">Connecté en tant que</p>
                  <p class="text-sm font-medium text-gray-900 truncate">
                    {{ userProfile?.first_name || 'Utilisateur' }} {{ userProfile?.last_name || '' }}
                  </p>
                  <p class="text-xs text-gray-500 truncate">
                    {{ userProfile?.email || 'email@example.com' }}
                  </p>
                </div>

                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <NuxtLink
                      to="/dashboard"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'group flex items-center px-4 py-2 text-sm',
                      ]"
                    >
                      <Icon
                        name="heroicons:user"
                        class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      />
                      Profil
                    </NuxtLink>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <NuxtLink
                      to="/dashboard"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'group flex items-center px-4 py-2 text-sm',
                      ]"
                    >
                      <Icon
                        name="heroicons:cog-6-tooth"
                        class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      />
                      Paramètres
                    </NuxtLink>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <NuxtLink
                      to="/dashboard"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'group flex items-center px-4 py-2 text-sm',
                      ]"
                    >
                      <Icon
                        name="heroicons:heart"
                        class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      />
                      Favoris
                    </NuxtLink>
                  </MenuItem>
                </div>

                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <button
                      @click="logout"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'group flex w-full items-center px-4 py-2 text-sm',
                      ]"
                    >
                      <Icon
                        name="heroicons:arrow-right-on-rectangle"
                        class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      />
                      Se déconnecter
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>

          <!-- Bouton de connexion pour utilisateurs non connectés -->
          <div v-if="!authStore.isAuthenticated" class="flex items-center gap-2">
            <NuxtLink
              to="/login"
              class="text-gray-600 hover:text-primary-600 transition-colors font-medium"
            >
              Se connecter
            </NuxtLink>
            <span class="text-gray-300">|</span>
            <NuxtLink
              to="/register"
              class="text-gray-600 hover:text-primary-600 transition-colors font-medium"
            >
              S'inscrire
            </NuxtLink>
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Icon
              :name="isMobileMenuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'"
              class="w-6 h-6"
            />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isMobileMenuOpen"
          class="md:hidden absolute inset-x-0 top-full bg-white border-t border-gray-200 shadow-lg"
        >
          <div class="px-4 py-6 space-y-4">
            <NuxtLink
              v-for="link in mobileLinks"
              :key="link.to"
              :to="link.to"
              class="block py-2 text-gray-600 hover:text-primary-600 transition-colors"
              :class="{ 'text-primary-600 font-medium': link.to === '/search' }"
              @click="isMobileMenuOpen = false"
            >
              {{ link.text }}
            </NuxtLink>
            <NuxtLink
              to="/dashboard/properties"
              class="block w-full text-center bg-purple-500 text-white hover:bg-purple-600 px-4 py-2 rounded-full transition-colors font-medium"
              @click="isMobileMenuOpen = false"
            >
              Publier mon bien gratuitement
            </NuxtLink>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ref, onMounted, onActivated } from "vue";
import { useAuthStore } from '~/stores/auth.store';

const authStore = useAuthStore();
const isScrolled = ref(false);
const isSearchModalOpen = ref(false);
const isMobileMenuOpen = ref(false);

// Données du profil utilisateur
const userProfile = ref(null);

const mobileLinks = [
  { to: "/properties", text: "Acheter" },
  { to: "/search", text: "Chercher un bien" },
  { to: "/dashboard", text: "Estimer" },
  { to: "/dashboard/properties", text: "Vendre" },
];

// Fonction pour récupérer le profil utilisateur
const fetchUserProfile = async () => {
  if (!authStore.isAuthenticated) return;
  
  try {
    const config = useRuntimeConfig()
    const token = authStore.getAuthToken()
    
    if (!token) return
    
    const response = await $fetch(`${config.public.apiBase}/user-profile/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    // Le backend retourne { user: userInfo, roles, profile: filteredProfile }
    userProfile.value = response.profile || response
    
  } catch (error) {
  }
}

// Fonction de déconnexion
const logout = () => {
  authStore.logout();
};

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 0;
  };

  window.addEventListener("scroll", handleScroll);
  
  // Charger le profil si l'utilisateur est connecté
  if (authStore.isAuthenticated) {
    fetchUserProfile();
  }

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
});

// Rafraîchir le profil quand on revient sur la page
onActivated(() => {
  if (authStore.isAuthenticated) {
    fetchUserProfile();
  }
});
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
