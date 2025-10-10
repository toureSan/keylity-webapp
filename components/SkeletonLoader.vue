<template>
  <div class="animate-pulse">
    <!-- Skeleton pour le header -->
    <div v-if="type === 'header'" class="flex items-center space-x-4">
      <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
      <div class="space-y-2">
        <div class="h-4 bg-gray-200 rounded w-32"></div>
        <div class="h-3 bg-gray-200 rounded w-24"></div>
      </div>
    </div>

    <!-- Skeleton pour les cartes -->
    <div v-else-if="type === 'card'" class="bg-white rounded-lg shadow p-6">
      <div class="space-y-4">
        <div class="h-6 bg-gray-200 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        <div class="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>

    <!-- Skeleton pour les formulaires -->
    <div v-else-if="type === 'form'" class="space-y-6">
      <div v-for="i in fields" :key="i" class="space-y-2">
        <div class="h-4 bg-gray-200 rounded w-1/4"></div>
        <div class="h-10 bg-gray-200 rounded"></div>
      </div>
    </div>

    <!-- Skeleton pour les listes -->
    <div v-else-if="type === 'list'" class="space-y-4">
      <div v-for="i in items" :key="i" class="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
        <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div class="flex-1 space-y-2">
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          <div class="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>

    <!-- Skeleton pour les tableaux -->
    <div v-else-if="type === 'table'" class="bg-white rounded-lg shadow overflow-hidden">
      <div class="p-4 border-b">
        <div class="h-6 bg-gray-200 rounded w-1/3"></div>
      </div>
      <div class="divide-y">
        <div v-for="i in rows" :key="i" class="p-4 flex items-center space-x-4">
          <div class="w-8 h-8 bg-gray-200 rounded"></div>
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            <div class="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div class="h-8 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>

    <!-- Skeleton pour les profils -->
    <div v-else-if="type === 'profile'" class="space-y-6">
      <div class="flex items-center space-x-4">
        <div class="w-20 h-20 bg-gray-200 rounded-full"></div>
        <div class="space-y-2">
          <div class="h-6 bg-gray-200 rounded w-48"></div>
          <div class="h-4 bg-gray-200 rounded w-32"></div>
          <div class="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="i in 4" :key="i" class="space-y-2">
          <div class="h-4 bg-gray-200 rounded w-1/3"></div>
          <div class="h-10 bg-gray-200 rounded"></div>
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
  type?: 'header' | 'card' | 'form' | 'list' | 'table' | 'profile'
  fields?: number
  items?: number
  rows?: number
}

withDefaults(defineProps<Props>(), {
  type: 'card',
  fields: 3,
  items: 3,
  rows: 5
})
</script>
