<template>
  <div class="min-h-screen mb-10">
    <Header />

    <!-- Main Content -->
    <div class="pt-20 h-screen overflow-hidden">
      <div class="h-full flex">
        <!-- Mobile Filters Button -->
        <button
          @click="isFilterOpen = true"
          class="fixed bottom-6 right-6 z-50 lg:hidden bg-gray-900 text-white p-4 rounded-full shadow-lg"
        >
          <Icon name="heroicons:adjustments-horizontal" class="w-6 h-6" />
          <span
            v-if="activeFiltersCount > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center"
          >
            {{ activeFiltersCount }}
          </span>
        </button>

        <!-- Mobile Filters Dialog -->
        <TransitionRoot appear :show="isFilterOpen" as="template">
          <Dialog
            as="div"
            @close="isFilterOpen = false"
            class="relative z-50 lg:hidden"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
              <div class="flex min-h-full items-center justify-center p-4">
                <TransitionChild
                  as="template"
                  enter="duration-300 ease-out"
                  enter-from="opacity-0 scale-95"
                  enter-to="opacity-100 scale-100"
                  leave="duration-200 ease-in"
                  leave-from="opacity-100 scale-100"
                  leave-to="opacity-0 scale-95"
                >
                  <DialogPanel
                    class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all"
                  >
                    <div class="flex justify-between items-center mb-4">
                      <DialogTitle as="h3" class="text-lg font-medium">
                        Filtres
                      </DialogTitle>
                      <button
                        @click="isFilterOpen = false"
                        class="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <Icon name="heroicons:x-mark" class="w-5 h-5" />
                      </button>
                    </div>

                    <div class="mt-4">
                      <SearchFilters @filters-changed="handleFiltersChanged" />
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </TransitionRoot>

        <!-- Desktop Filters - Full Height Sidebar -->
        <div
          class="hidden lg:block w-80 flex-shrink-0 bg-white border-r border-gray-200 h-full overflow-y-auto"
        >
          <div class="p-6">
            <SearchFilters @filters-changed="handleFiltersChanged" />
          </div>
        </div>

        <!-- Properties Grid -->
        <div class="flex-1 min-w-0 overflow-y-auto h-full">
          <div class="p-6">
            <!-- Results Header -->
            <div class="flex justify-between items-center mb-8">
              <div>
                <h1 class="text-2xl font-semibold mb-2">Genève</h1>
                <p class="text-gray-600 mt-2">
                  {{ filteredProperties.length }} biens trouvés
                </p>

                <!-- Active Filters -->
                <div
                  v-if="activeFiltersCount > 0"
                  class="flex flex-wrap gap-2 mt-3"
                >
                  <span
                    v-if="currentFilters.selectedTypes.length > 0"
                    v-for="type in currentFilters.selectedTypes"
                    :key="type"
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                  >
                    {{ getTypeName(type) }}
                    <button
                      @click="removeTypeFilter(type)"
                      class="ml-2 hover:text-primary-600"
                    >
                      <Icon name="heroicons:x-mark" class="w-3 h-3" />
                    </button>
                  </span>

                  <span
                    v-if="currentFilters.selectedCities.length > 0"
                    v-for="city in currentFilters.selectedCities"
                    :key="city"
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                  >
                    {{ getCityName(city) }}
                    <button
                      @click="removeCityFilter(city)"
                      class="ml-2 hover:text-primary-600"
                    >
                      <Icon name="heroicons:x-mark" class="w-3 h-3" />
                    </button>
                  </span>

                  <span
                    v-if="
                      currentFilters.priceMin > 500 ||
                      currentFilters.priceMax < 5000
                    "
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                  >
                    CHF {{ currentFilters.priceMin }} -
                    {{ currentFilters.priceMax }}
                    <button
                      @click="resetPriceFilter"
                      class="ml-2 hover:text-primary-600"
                    >
                      <Icon name="heroicons:x-mark" class="w-3 h-3" />
                    </button>
                  </span>

                  <span
                    v-if="currentFilters.roomsMin || currentFilters.roomsMax"
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                  >
                    {{ getRoomsFilterText() }}
                    <button
                      @click="resetRoomsFilter"
                      class="ml-2 hover:text-primary-600"
                    >
                      <Icon name="heroicons:x-mark" class="w-3 h-3" />
                    </button>
                  </span>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <span class="text-sm text-gray-600">View all</span>
                <Listbox v-model="sortBy" as="div" class="relative">
                  <ListboxButton
                    class="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <span class="block truncate">{{ sortBy.name }}</span>
                    <span
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                    >
                      <Icon
                        name="heroicons:chevron-up-down"
                        class="h-5 w-5 text-gray-400"
                      />
                    </span>
                  </ListboxButton>

                  <transition
                    leave-active-class="transition duration-100 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <ListboxOptions
                      class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <ListboxOption
                        v-for="option in sortOptions"
                        :key="option.id"
                        :value="option"
                        v-slot="{ active, selected }"
                      >
                        <li
                          :class="[
                            active
                              ? 'bg-primary-100 text-primary-900'
                              : 'text-gray-900',
                            'relative cursor-pointer select-none py-2 pl-10 pr-4',
                          ]"
                        >
                          <span
                            :class="[
                              selected ? 'font-medium' : 'font-normal',
                              'block truncate',
                            ]"
                          >
                            {{ option.name }}
                          </span>
                          <span
                            v-if="selected"
                            class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600"
                          >
                            <Icon name="heroicons:check" class="h-5 w-5" />
                          </span>
                        </li>
                      </ListboxOption>
                    </ListboxOptions>
                  </transition>
                </Listbox>
              </div>
            </div>

            <!-- Properties Grid - 4 columns on desktop -->
            <div
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8"
            >
              <PropertiesCard
                v-for="property in sortedProperties"
                :key="property.id"
                :property="property"
              />
            </div>

            <!-- No Results -->
            <div
              v-if="filteredProperties.length === 0"
              class="text-center py-12"
            >
              <div
                class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Icon name="heroicons:home" class="h-8 w-8 text-gray-400" />
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">
                Aucun bien trouvé
              </h3>
              <p class="text-gray-500 mb-4">
                Essayez de modifier vos critères de recherche
              </p>
              <button
                @click="resetAllFilters"
                class="text-primary-600 hover:text-primary-700 font-medium"
              >
                Réinitialiser les filtres
              </button>
            </div>

            <!-- Load More -->
            <div v-else class="text-center mt-12 pb-8">
              <button
                class="bg-white border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-xl hover:bg-gray-900 hover:text-white transition-colors"
              >
                Voir plus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, computed } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

const isFilterOpen = ref(false);

const currentFilters = ref({
  priceMin: 500,
  priceMax: 5000,
  selectedTypes: [],
  selectedCities: [],
  roomsMin: "",
  roomsMax: "",
});

const sortBy = ref({ id: 1, name: "Prix (croissant)" });
const sortOptions = [
  { id: 1, name: "Prix (croissant)" },
  { id: 2, name: "Prix (décroissant)" },
  { id: 3, name: "Surface" },
  { id: 4, name: "Plus récent" },
];

const allProperties = [
  {
    id: 1,
    type: "penthouse",
    title: "Modern home in city center",
    location: "Cologny - Route de la Capite",
    city: "geneve",
    size: 250,
    rooms: 4,
    price: 1400,
    availability: "Disponible",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
  },
  {
    id: 2,
    type: "villa",
    title: "Isolated house outside of...",
    location: "Vandœuvres - Route de Vandœuvres",
    city: "geneve",
    size: 400,
    rooms: 6,
    price: 1950,
    availability: "Disponible",
    image: "https://images.pexels.com/photos/32870/pexels-photo.jpg",
  },
  {
    id: 3,
    type: "apartment",
    title: "Large dream home with...",
    location: "Genève - Quai du Mont-Blanc",
    city: "geneve",
    size: 180,
    rooms: 5,
    price: 1300,
    availability: "Sur demande",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
  },
  {
    id: 4,
    type: "penthouse",
    title: "Modern home in city center",
    location: "Genève - Rue du Rhône",
    city: "geneve",
    size: 300,
    rooms: 2,
    price: 396,
    availability: "Disponible",
    image: "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
  },
  {
    id: 5,
    type: "apartment",
    title: "Entire house • 2 BEDS",
    location: "Lausanne - Avenue de la Gare",
    city: "lausanne",
    size: 120,
    rooms: 3,
    price: 450,
    availability: "Disponible",
    image: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg",
  },
  {
    id: 6,
    type: "studio",
    title: "Modern home in city center",
    location: "Zurich - Bahnhofstrasse",
    city: "zurich",
    size: 45,
    rooms: 1,
    price: 600,
    availability: "Disponible",
    image: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg",
  },
  {
    id: 7,
    type: "house",
    title: "Family house with garden",
    location: "Berne - Kirchenfeldstrasse",
    city: "bern",
    size: 200,
    rooms: 4,
    price: 800,
    availability: "Disponible",
    image: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
  },
  {
    id: 8,
    type: "loft",
    title: "Industrial loft downtown",
    location: "Bâle - Steinenvorstadt",
    city: "basel",
    size: 150,
    rooms: 3,
    price: 1200,
    availability: "Disponible",
    image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
  },
];

// Convert price strings to numbers for filtering
const properties = computed(() => {
  return allProperties.map((property) => ({
    ...property,
    displayPrice: property.price.toLocaleString("fr-CH"),
  }));
});

const filteredProperties = computed(() => {
  return properties.value.filter((property) => {
    // Price filter
    if (
      property.price < currentFilters.value.priceMin ||
      property.price > currentFilters.value.priceMax
    ) {
      return false;
    }

    // Type filter
    if (
      currentFilters.value.selectedTypes.length > 0 &&
      !currentFilters.value.selectedTypes.includes(property.type)
    ) {
      return false;
    }

    // City filter
    if (
      currentFilters.value.selectedCities.length > 0 &&
      !currentFilters.value.selectedCities.includes(property.city)
    ) {
      return false;
    }

    // Rooms filter
    if (
      currentFilters.value.roomsMin &&
      property.rooms < parseInt(currentFilters.value.roomsMin)
    ) {
      return false;
    }
    if (
      currentFilters.value.roomsMax &&
      property.rooms > parseInt(currentFilters.value.roomsMax)
    ) {
      return false;
    }

    return true;
  });
});

const sortedProperties = computed(() => {
  const sorted = [...filteredProperties.value];

  switch (sortBy.value.id) {
    case 1: // Prix croissant
      return sorted.sort((a, b) => a.price - b.price);
    case 2: // Prix décroissant
      return sorted.sort((a, b) => b.price - a.price);
    case 3: // Surface
      return sorted.sort((a, b) => b.size - a.size);
    case 4: // Plus récent
      return sorted.sort((a, b) => b.id - a.id);
    default:
      return sorted;
  }
});

const activeFiltersCount = computed(() => {
  let count = 0;
  if (
    currentFilters.value.selectedTypes &&
    currentFilters.value.selectedTypes.length > 0
  )
    count++;
  if (
    currentFilters.value.selectedCities &&
    currentFilters.value.selectedCities.length > 0
  )
    count++;
  if (
    currentFilters.value.priceMin > 500 ||
    currentFilters.value.priceMax < 5000
  )
    count++;
  if (currentFilters.value.roomsMin || currentFilters.value.roomsMax) count++;
  return count;
});

const handleFiltersChanged = (filters) => {
  currentFilters.value = {
    priceMin: filters.priceMin || 500,
    priceMax: filters.priceMax || 5000,
    selectedTypes: filters.selectedTypes || [],
    selectedCities: filters.selectedCities || [],
    roomsMin: filters.roomsMin || "",
    roomsMax: filters.roomsMax || "",
  };
};

const getTypeName = (typeId) => {
  const typeMap = {
    apartment: "Appartement",
    house: "Maison",
    villa: "Villa",
    penthouse: "Penthouse",
    loft: "Loft",
    studio: "Studio",
  };
  return typeMap[typeId] || typeId;
};

const getCityName = (cityId) => {
  const cityMap = {
    geneve: "Genève (GE)",
    lausanne: "Lausanne (VD)",
    zurich: "Zurich (ZH)",
    bern: "Berne (BE)",
    basel: "Bâle (BS)",
    lucerne: "Lucerne (LU)",
    winterthur: "Winterthour (ZH)",
    "st-gallen": "Saint-Gall (SG)",
  };
  return cityMap[cityId] || cityId;
};

const getRoomsFilterText = () => {
  if (currentFilters.value.roomsMin && currentFilters.value.roomsMax) {
    return `${currentFilters.value.roomsMin} - ${currentFilters.value.roomsMax} pièces`;
  } else if (currentFilters.value.roomsMin) {
    return `${currentFilters.value.roomsMin}+ pièces`;
  } else if (currentFilters.value.roomsMax) {
    return `Jusqu'à ${currentFilters.value.roomsMax} pièces`;
  }
  return "";
};

const removeTypeFilter = (type) => {
  currentFilters.value.selectedTypes =
    currentFilters.value.selectedTypes.filter((t) => t !== type);
};

const removeCityFilter = (city) => {
  currentFilters.value.selectedCities =
    currentFilters.value.selectedCities.filter((c) => c !== city);
};

const resetPriceFilter = () => {
  currentFilters.value.priceMin = 500;
  currentFilters.value.priceMax = 5000;
};

const resetRoomsFilter = () => {
  currentFilters.value.roomsMin = "";
  currentFilters.value.roomsMax = "";
};

const resetAllFilters = () => {
  currentFilters.value = {
    priceMin: 500,
    priceMax: 5000,
    selectedTypes: [],
    selectedCities: [],
    roomsMin: "",
    roomsMax: "",
  };
};
</script>
