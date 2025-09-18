<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold">Filtres</h2>
      <button
        @click="resetFilters"
        class="text-primary-600 text-sm font-medium hover:text-primary-700"
      >
        Réinitialiser
      </button>
    </div>

    <!-- Prix -->
    <div>
      <h3 class="font-medium mb-4">Prix</h3>
      <div class="space-y-4">
        <div>
          <div class="flex justify-between text-sm text-gray-600 mb-2">
            <span>Prix minimum</span>
            <span>CHF {{ filters.priceMin }}</span>
          </div>
          <input
            type="range"
            v-model="filters.priceMin"
            min="500"
            max="5000"
            step="100"
            @input="updateFilters"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />
        </div>
        <div>
          <div class="flex justify-between text-sm text-gray-600 mb-2">
            <span>Prix maximum</span>
            <span>CHF {{ filters.priceMax }}</span>
          </div>
          <input
            type="range"
            v-model="filters.priceMax"
            min="1000"
            max="10000"
            step="100"
            @input="updateFilters"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />
        </div>
      </div>
    </div>

    <!-- Type de propriété -->
    <div>
      <h3 class="font-medium mb-4">Type de propriété</h3>
      <div class="space-y-2">
        <label
          v-for="type in propertyTypes"
          :key="type.id"
          class="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-50"
        >
          <input
            type="checkbox"
            v-model="filters.selectedTypes"
            :value="type.id"
            @change="updateFilters"
            class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span class="ml-3">{{ type.name }}</span>
        </label>
      </div>
    </div>

    <!-- Ville (Canton) -->
    <div>
      <h3 class="font-medium mb-4">Ville (Canton)</h3>
      <div class="space-y-2">
        <label
          v-for="city in cities"
          :key="city.id"
          class="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-50"
        >
          <input
            type="checkbox"
            v-model="filters.selectedCities"
            :value="city.id"
            @change="updateFilters"
            class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span class="ml-3">{{ city.name }}</span>
        </label>
      </div>
    </div>

    <!-- Nombre de pièces -->
    <div>
      <h3 class="font-medium mb-4">Nombre de pièces</h3>
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-gray-600 mb-2">Minimum</label>
            <select
              v-model="filters.roomsMin"
              @change="updateFilters"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Aucun</option>
              <option value="1">1 pièce</option>
              <option value="2">2 pièces</option>
              <option value="3">3 pièces</option>
              <option value="4">4 pièces</option>
              <option value="5">5 pièces</option>
              <option value="6">6+ pièces</option>
            </select>
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-2">Maximum</label>
            <select
              v-model="filters.roomsMax"
              @change="updateFilters"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Aucun</option>
              <option value="1">1 pièce</option>
              <option value="2">2 pièces</option>
              <option value="3">3 pièces</option>
              <option value="4">4 pièces</option>
              <option value="5">5 pièces</option>
              <option value="6">6+ pièces</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <button
      @click="applyFilters"
      class="w-full bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
    >
      Mettre à jour les résultats
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(["filtersChanged"]);

const filters = ref({
  priceMin: 500,
  priceMax: 5000,
  selectedTypes: [],
  selectedCities: [],
  roomsMin: "",
  roomsMax: "",
});

const propertyTypes = [
  { id: "apartment", name: "Appartement" },
  { id: "house", name: "Maison" },
  { id: "villa", name: "Villa" },
  { id: "penthouse", name: "Penthouse" },
  { id: "loft", name: "Loft" },
  { id: "studio", name: "Studio" },
];

const cities = [
  { id: "geneve", name: "Genève (GE)" },
  { id: "lausanne", name: "Lausanne (VD)" },
  { id: "zurich", name: "Zurich (ZH)" },
  { id: "bern", name: "Berne (BE)" },
  { id: "basel", name: "Bâle (BS)" },
  { id: "lucerne", name: "Lucerne (LU)" },
  { id: "winterthur", name: "Winterthour (ZH)" },
  { id: "st-gallen", name: "Saint-Gall (SG)" },
];

const updateFilters = () => {
  emit("filtersChanged", filters.value);
};

const applyFilters = () => {
  emit("filtersChanged", filters.value);
};

const resetFilters = () => {
  filters.value = {
    priceMin: 500,
    priceMax: 5000,
    selectedTypes: [],
    selectedCities: [],
    roomsMin: "",
    roomsMax: "",
  };
  updateFilters();
};

// Watch for changes and emit
watch(
  filters,
  () => {
    updateFilters();
  },
  { deep: true },
);
</script>
