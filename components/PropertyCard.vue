```vue
<template>
  <div class="bg-white rounded-2xl shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300">
    <div class="relative aspect-w-16 aspect-h-10">
      <img 
        :src="property.image" 
        :alt="property.title" 
        class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
      >
      <div class="absolute top-4 left-4">
        <span class="bg-white/90 px-3 py-1 rounded-full text-sm font-medium">{{ property.type }}</span>
      </div>
      <button class="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white text-neutral-600 hover:text-primary-600 transition-colors">
        <Icon name="heroicons:heart" class="w-5 h-5" />
      </button>
    </div>
    
    <div class="p-6">
      <div class="flex items-start justify-between mb-4">
        <div>
          <h3 class="text-xl font-semibold mb-1">{{ property.location }}</h3>
          <p class="text-gray-600">{{ property.title }}</p>
        </div>
        <div class="flex items-center bg-primary-50 px-3 py-1 rounded-full">
          <Icon name="heroicons:star" class="w-4 h-4 text-primary-600" />
          <span class="ml-1 text-primary-600 font-medium">4.9</span>
        </div>
      </div>
      
      <div class="flex items-center gap-6 text-sm text-gray-600 mb-4">
        <div class="flex items-center gap-2">
          <Icon name="heroicons:squares-2x2" class="w-4 h-4" />
          {{ property.size }}m²
        </div>
        <div class="flex items-center gap-2">
          <Icon name="heroicons:home" class="w-4 h-4" />
          {{ property.rooms }} pièces
        </div>
      </div>
      
      <div class="flex items-end justify-between">
        <div>
          <p class="text-2xl font-bold">CHF {{ property.price }}</p>
          <p class="text-sm text-gray-600">par mois</p>
        </div>
        <NuxtLink 
          :to="`/properties/${property.id}`"
          class="bg-gray-900 text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition-colors"
        >
          Voir
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  property: {
    type: Object,
    required: true
  }
})
</script>
```