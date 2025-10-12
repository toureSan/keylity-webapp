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
                <Listbox v-model="sortBy" @update:model-value="handleSortChange" as="div" class="relative">
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

            <!-- Loading State -->
            <div v-if="loading" class="text-center py-12">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p class="text-gray-500">Chargement des propriétés...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="text-center py-12">
              <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="heroicons:exclamation-triangle" class="h-8 w-8 text-red-600" />
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Erreur de chargement</h3>
              <p class="text-gray-500 mb-4">{{ error }}</p>
              <button @click="fetchProperties(1, 50)" 
                      class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                Réessayer
              </button>
            </div>

            <!-- Properties Grid - 4 columns on desktop -->
            <div
              v-else
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
              v-if="!loading && !error && filteredProperties.length === 0"
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

            <!-- Load More / Pagination -->
            <div v-if="!loading && !error && filteredProperties.length > 0" class="text-center mt-12 pb-8">
              <div v-if="pagination.totalPages > currentPage" class="space-y-4">
                <button
                  @click="loadProperties(currentPage + 1)"
                  :disabled="loading"
                  class="bg-white border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-xl hover:bg-gray-900 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="loading">Chargement...</span>
                  <span v-else>Voir plus</span>
                </button>
                <div class="text-sm text-gray-500">
                  Page {{ currentPage }} sur {{ pagination.totalPages }} 
                  ({{ pagination.total }} propriétés au total)
                </div>
              </div>
              <div v-else class="text-sm text-gray-500">
                Toutes les propriétés ont été chargées ({{ pagination.total }} au total)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
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

// Composables
const { properties, loading, error, fetchProperties, pagination } = useProperties()

const isFilterOpen = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(20);

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

// Fonction pour charger les propriétés avec filtres
const loadProperties = async (page = 1, filters = {}) => {
  try {
    const serverFilters = {
      minPrice: currentFilters.value.priceMin,
      maxPrice: currentFilters.value.priceMax,
      type: currentFilters.value.selectedTypes.length > 0 ? currentFilters.value.selectedTypes[0] : undefined,
      city: currentFilters.value.selectedCities.length > 0 ? currentFilters.value.selectedCities[0] : undefined,
      minArea: currentFilters.value.roomsMin ? parseInt(currentFilters.value.roomsMin) * 20 : undefined, // Estimation: 20m² par pièce
      maxArea: currentFilters.value.roomsMax ? parseInt(currentFilters.value.roomsMax) * 30 : undefined, // Estimation: 30m² par pièce
    }
    
    // Supprimer les filtres undefined
    Object.keys(serverFilters).forEach(key => {
      if (serverFilters[key] === undefined) {
        delete serverFilters[key]
      }
    })
    
    await fetchProperties(page, itemsPerPage.value, serverFilters)
    currentPage.value = page
  } catch (err) {
    console.error('Erreur lors du chargement des propriétés:', err)
  }
}

// Charger les propriétés au montage
onMounted(async () => {
  await loadProperties(1)
})

// Adapter les données de l'API au format attendu par le template
const adaptedProperties = computed(() => {
  return properties.value.map((property) => ({
    id: property.id,
    type: property.type,
    title: property.title,
    location: property.location || property.city,
    city: property.city,
    size: property.area || 0,
    rooms: property.rooms || 0,
    price: property.price,
    availability: property.status === 'available' ? 'Disponible' : 'Indisponible',
    image: property.photos && property.photos.length > 0 
      ? property.photos[0] 
      : getDefaultImageByType(property.type),
    displayPrice: property.price.toLocaleString("fr-CH"),
    transactionType: property.transactionType,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    furnished: property.furnished,
    petsAllowed: property.petsAllowed,
    monthlyCharges: property.monthlyCharges,
    deposit: property.deposit,
    agencyFees: property.agencyFees,
    applicationFees: property.applicationFees,
  }));
});

// Fonction pour obtenir une image par défaut selon le type
const getDefaultImageByType = (type) => {
  const defaultImages = {
    'appartement': 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
    'maison': 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
    'studio': 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
    'duplex': 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    'loft': 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
    'penthouse': 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg'
  }
  return defaultImages[type] || 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg'
}

// Utiliser directement les propriétés adaptées (filtrage côté serveur)
const filteredProperties = computed(() => {
  return adaptedProperties.value;
});

const sortedProperties = computed(() => {
  const sorted = [...filteredProperties.value];

  switch (sortBy.value.id) {
    case 1: // Prix croissant
      return sorted.sort((a, b) => a.price - b.price);
    case 2: // Prix décroissant
      return sorted.sort((a, b) => b.price - a.price);
    case 3: // Surface
      return sorted.sort((a, b) => (b.size || 0) - (a.size || 0));
    case 4: // Plus récent
      return sorted.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    default:
      return sorted;
  }
});

// Fonction pour gérer le changement de tri
const handleSortChange = async (newSort) => {
  sortBy.value = newSort;
  // Recharger avec le nouveau tri (pour l'instant, on trie côté client)
  // TODO: Implémenter le tri côté serveur si nécessaire
};

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

const handleFiltersChanged = async (filters) => {
  currentFilters.value = {
    priceMin: filters.priceMin || 500,
    priceMax: filters.priceMax || 5000,
    selectedTypes: filters.selectedTypes || [],
    selectedCities: filters.selectedCities || [],
    roomsMin: filters.roomsMin || "",
    roomsMax: filters.roomsMax || "",
  };
  
  // Recharger les propriétés avec les nouveaux filtres
  await loadProperties(1);
};

const getTypeName = (typeId) => {
  const typeMap = {
    appartement: "Appartement",
    maison: "Maison",
    studio: "Studio",
    duplex: "Duplex",
    loft: "Loft",
    penthouse: "Penthouse",
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

const removeTypeFilter = async (type) => {
  currentFilters.value.selectedTypes =
    currentFilters.value.selectedTypes.filter((t) => t !== type);
  await loadProperties(1);
};

const removeCityFilter = async (city) => {
  currentFilters.value.selectedCities =
    currentFilters.value.selectedCities.filter((c) => c !== city);
  await loadProperties(1);
};

const resetPriceFilter = async () => {
  currentFilters.value.priceMin = 500;
  currentFilters.value.priceMax = 5000;
  await loadProperties(1);
};

const resetRoomsFilter = async () => {
  currentFilters.value.roomsMin = "";
  currentFilters.value.roomsMax = "";
  await loadProperties(1);
};

const resetAllFilters = async () => {
  currentFilters.value = {
    priceMin: 500,
    priceMax: 5000,
    selectedTypes: [],
    selectedCities: [],
    roomsMin: "",
    roomsMax: "",
  };
  await loadProperties(1);
};
</script>
