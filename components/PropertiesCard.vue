<template>
  <div
    class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
  >
    <!-- Image Container -->
    <div class="relative aspect-[4/3] overflow-hidden">
      <img
        :src="property.image"
        :alt="property.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      <!-- Property Type Badge -->
      <div class="absolute top-3 left-3">
        <span
          class="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800"
        >
          {{ getTypeLabel(property.type) }}
        </span>
      </div>

      <!-- Favorite Button -->
      <button
        class="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
      >
        <Icon
          name="heroicons:heart"
          class="w-5 h-5 text-gray-600 hover:text-red-500"
        />
      </button>

      <!-- Availability Badge -->
      <div class="absolute bottom-3 left-3">
        <span
          class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium"
        >
          {{ property.availability }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5">
      <!-- Price -->
      <div class="mb-3">
        <div class="text-2xl font-bold text-gray-900">
          CHF {{ formatPrice(property.price) }}
        </div>
        <div class="text-sm text-gray-500">par mois</div>
      </div>

      <!-- Title -->
      <h3 class="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
        {{ property.title }}
      </h3>

      <!-- Location -->
      <div class="flex items-center text-gray-600 mb-4">
        <Icon name="heroicons:map-pin" class="w-4 h-4 mr-1 flex-shrink-0" />
        <span class="text-sm truncate">{{ property.location }}</span>
      </div>

      <!-- Property Details -->
      <div class="flex items-center gap-4 text-sm text-gray-600 mb-5">
        <div class="flex items-center gap-1">
          <Icon name="heroicons:home" class="w-4 h-4" />
          <span>{{ property.size }}m²</span>
        </div>
        <div class="flex items-center gap-1">
          <Icon name="heroicons:squares-2x2" class="w-4 h-4" />
          <span>{{ property.rooms }} pièces</span>
        </div>
      </div>

      <!-- Action Button -->
      <NuxtLink
        :to="`/properties/${property.id}`"
        class="w-full bg-gray-900 text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-center block font-medium"
      >
        Voir le bien
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  property: {
    type: Object,
    required: true,
  },
});

const formatPrice = (price) => {
  return price.toLocaleString("fr-CH");
};

const getTypeLabel = (type) => {
  const typeMap = {
    apartment: "Appartement",
    house: "Maison",
    villa: "Villa",
    penthouse: "Penthouse",
    loft: "Loft",
    studio: "Studio",
  };
  return typeMap[type] || type;
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
