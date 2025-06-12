<template>
  <div>
    <!-- Profile Section -->
    <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div class="flex flex-col md:flex-row items-start md:items-center gap-6">
        <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" alt="Profile"
          class="w-24 h-24 rounded-full object-cover">
        <div>
          <h1 class="text-2xl font-bold mb-2">Thibaut Languin</h1>
          <p class="text-gray-600 mb-4">Gérant • Medan, Sumatera Utara - ID</p>
          <button class="text-blue-600 hover:text-blue-700 font-medium">
            Compléter mon profil
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Icon name="heroicons:eye" class="h-6 w-6 text-blue-600" />
          </div>
          <span class="text-3xl font-bold">102</span>
        </div>
        <p class="text-gray-600">Personnes qui ont vu mon profil</p>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Icon name="heroicons:document" class="h-6 w-6 text-blue-600" />
          </div>
          <span class="text-3xl font-bold">32</span>
        </div>
        <p class="text-gray-600">Nombre de postulations</p>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Icon name="heroicons:magnifying-glass" class="h-6 w-6 text-blue-600" />
          </div>
          <span class="text-3xl font-bold">143</span>
        </div>
        <p class="text-gray-600">Apparitions dans les recherches</p>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Icon name="heroicons:home" class="h-6 w-6 text-blue-600" />
          </div>
          <span class="text-3xl font-bold">0</span>
        </div>
        <p class="text-gray-600">Biens publiés</p>
      </div>
    </div>

    <!-- Profile Completion -->
    <div class="bg-white rounded-xl shadow-sm p-6">
      <h2 class="text-lg font-semibold mb-4">Statut du compte</h2>
      <div class="mb-4">
        <div class="flex justify-between mb-2">
          <span class="text-gray-600">Profil complété</span>
          <span class="font-medium">63%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div class="bg-blue-600 h-2 rounded-full" style="width: 63%"></div>
        </div>
      </div>
      <button class="text-blue-600 hover:text-blue-700 font-medium">
        Compléter mon profil
      </button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard'
})
</script>