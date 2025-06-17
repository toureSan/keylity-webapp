<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <!-- Filters Bar -->
      <div class="flex flex-wrap gap-4 mb-8">
        <div class="flex gap-2">
          <button class="px-4 py-2 bg-black text-white rounded">Buy</button>
          <button class="px-4 py-2 bg-white hover:bg-gray-100 rounded">
            Sell
          </button>
          <button class="px-4 py-2 bg-white hover:bg-gray-100 rounded">
            Rent
          </button>
        </div>

        <div class="flex-1">
          <input
            type="text"
            placeholder="Location"
            class="w-full px-4 py-2 border rounded"
            value="Benevento, Italy"
          />
        </div>

        <button class="px-4 py-2 bg-gray-800 text-white rounded">
          Show on Map
        </button>
      </div>

      <!-- Sort Bar -->
      <div class="flex justify-between items-center mb-6">
        <select class="px-4 py-2 border rounded">
          <option>Sort by: Newest</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>

        <div class="flex gap-2">
          <button class="p-2 hover:bg-gray-100 rounded">
            <Icon name="heroicons:list-bullet" class="w-5 h-5" />
          </button>
          <button class="p-2 hover:bg-gray-100 rounded">
            <Icon name="heroicons:squares-2x2" class="w-5 h-5" />
          </button>
          <button class="p-2 hover:bg-gray-100 rounded">
            <Icon name="heroicons:map" class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Properties Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="property in properties"
          :key="property.id"
          class="bg-white rounded-lg overflow-hidden"
        >
          <div class="relative aspect-w-16 aspect-h-10">
            <img
              :src="property.image"
              :alt="property.title"
              class="w-full h-full object-cover"
            />
            <button
              class="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white"
            >
              <Icon name="heroicons:heart" class="w-5 h-5" />
            </button>
          </div>

          <div class="p-4">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-2xl font-bold">CHF {{ property.price }}</h3>
                <p class="text-gray-600">{{ property.title }}</p>
              </div>
            </div>

            <div class="flex items-center gap-4 text-sm text-gray-600">
              <div class="flex items-center gap-1">
                <Icon name="heroicons:home" class="w-4 h-4" />
                {{ property.beds }} beds
              </div>
              <div class="flex items-center gap-1">
                <Icon name="heroicons:beaker" class="w-4 h-4" />
                {{ property.baths }} ba
              </div>
              <div class="flex items-center gap-1">
                <Icon name="heroicons:square-2-stack" class="w-4 h-4" />
                {{ property.size }} m²
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const properties = [
  {
    id: 1,
    title: "Modern Villa with Pool",
    price: "1,528,000",
    beds: 4,
    baths: 5,
    size: 233,
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
  },
  {
    id: 2,
    title: "Luxury Apartment",
    price: "962,000",
    beds: 3,
    baths: 2,
    size: 150,
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
  },
  {
    id: 3,
    title: "Modern House",
    price: "396,500",
    beds: 2,
    baths: 2,
    size: 125,
    image: "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
  },
  {
    id: 4,
    title: "Country House",
    price: "250,000",
    beds: 3,
    baths: 2,
    size: 189,
    image: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg",
  },
  {
    id: 5,
    title: "Renovated Farmhouse",
    price: "450,000",
    beds: 4,
    baths: 3,
    size: 250,
    image: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg",
  },
  {
    id: 6,
    title: "Modern Forest House",
    price: "600,000",
    beds: 5,
    baths: 3,
    size: 260,
    image: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
  },
];
</script>
