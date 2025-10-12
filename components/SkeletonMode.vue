<template>
  <div class="animate-pulse">
    <!-- Skeleton pour le toggle de mode -->
    <div v-if="type === 'toggle'" class="flex items-center bg-gray-100 rounded-full p-0.5 md:p-1">
      <div class="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-gray-200 w-16"></div>
      <div class="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-gray-200 w-20 ml-1"></div>
    </div>

    <!-- Skeleton pour l'image de profil -->
    <div v-else-if="type === 'profile-image'" class="relative">
      <div class="w-7 h-7 md:w-8 md:h-8 bg-gray-200 rounded-full"></div>
    </div>

    <!-- Skeleton pour l'image de profil large -->
    <div v-else-if="type === 'profile-image-large'" class="relative">
      <div class="w-20 h-20 md:w-24 md:h-24 bg-gray-200 rounded-full"></div>
      <div class="absolute bottom-0 right-0 bg-gray-300 p-1.5 md:p-2 rounded-full">
        <div class="w-3 h-3 md:w-4 md:h-4"></div>
      </div>
    </div>

    <!-- Skeleton pour les informations du profil -->
    <div v-else-if="type === 'profile-info'" class="space-y-2">
      <div class="h-6 md:h-8 bg-gray-200 rounded w-48"></div>
      <div class="h-4 md:h-5 bg-gray-200 rounded w-32"></div>
      <div class="h-4 bg-gray-200 rounded w-24"></div>
    </div>

    <!-- Skeleton pour les stats -->
    <div v-else-if="type === 'stats'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
      <div v-for="i in 4" :key="i" class="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <div class="flex items-center justify-between mb-3 md:mb-4">
          <div class="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-full"></div>
          <div class="h-6 md:h-8 bg-gray-200 rounded w-12"></div>
        </div>
        <div class="h-4 bg-gray-200 rounded w-24"></div>
      </div>
    </div>

    <!-- Skeleton pour le menu utilisateur -->
    <div v-else-if="type === 'user-menu'" class="flex items-center gap-1 md:gap-2 p-1.5 md:p-2">
      <div class="w-7 h-7 md:w-8 md:h-8 bg-gray-200 rounded-full"></div>
      <div class="hidden md:block w-20 h-4 bg-gray-200 rounded"></div>
      <div class="w-4 h-4 md:w-5 md:h-5 bg-gray-200 rounded"></div>
    </div>

    <!-- Skeleton complet de page dashboard -->
    <div v-else-if="type === 'page'" class="p-4 md:p-6 space-y-6">
      <!-- Section profil -->
      <div class="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <div class="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <!-- Image de profil -->
          <div class="relative">
            <div class="w-20 h-20 md:w-24 md:h-24 bg-gray-200 rounded-full"></div>
            <div class="absolute bottom-0 right-0 bg-gray-300 p-1.5 md:p-2 rounded-full">
              <div class="w-3 h-3 md:w-4 md:h-4"></div>
            </div>
          </div>
          
          <!-- Informations du profil -->
          <div class="flex-1 space-y-2">
            <div class="h-6 md:h-8 bg-gray-200 rounded w-48"></div>
            <div class="h-4 md:h-5 bg-gray-200 rounded w-32"></div>
            <div class="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>

      <!-- Section stats -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <div v-for="i in 4" :key="i" class="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <div class="flex items-center justify-between mb-3 md:mb-4">
            <div class="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-full"></div>
            <div class="h-6 md:h-8 bg-gray-200 rounded w-12"></div>
          </div>
          <div class="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>

      <!-- Section contenu principal -->
      <div class="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <div class="space-y-4">
          <div class="h-6 bg-gray-200 rounded w-1/3"></div>
          <div class="space-y-3">
            <div class="h-4 bg-gray-200 rounded w-full"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Skeleton par défaut -->
    <div v-else class="space-y-4">
      <div class="h-4 bg-gray-200 rounded w-3/4"></div>
      <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      <div class="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  type?: 'toggle' | 'profile-image' | 'profile-image-large' | 'profile-info' | 'stats' | 'user-menu' | 'page'
}

withDefaults(defineProps<Props>(), {
  type: 'toggle'
})
</script>