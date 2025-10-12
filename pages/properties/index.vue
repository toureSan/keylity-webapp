<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Propriétés disponibles</h1>
        <p class="text-gray-600 mt-1">{{ pagination.total }} propriété(s) trouvée(s)</p>
      </div>

      <!-- Filters Bar -->
      <div class="flex flex-wrap gap-4 mb-8">
        <div class="flex gap-2">
          <button 
            @click="setQuickFilter('transactionType', 'vente')"
            :class="filters.transactionType === 'vente' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'"
            class="px-4 py-2 rounded transition-colors"
          >
            Vente
          </button>
          <button 
            @click="setQuickFilter('transactionType', 'location')"
            :class="filters.transactionType === 'location' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'"
            class="px-4 py-2 rounded transition-colors"
          >
            Location
          </button>
          <button 
            @click="clearFilters"
            class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            Tous
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

       <!-- État de chargement -->
       <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
         <div v-for="i in 6" :key="i" class="bg-white rounded-lg overflow-hidden">
           <div class="animate-pulse">
             <div class="h-48 bg-gray-200"></div>
             <div class="p-4">
               <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
               <div class="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
               <div class="flex gap-2 mb-4">
                 <div class="h-6 bg-gray-200 rounded-full w-16"></div>
                 <div class="h-6 bg-gray-200 rounded-full w-20"></div>
               </div>
               <div class="h-4 bg-gray-200 rounded w-1/3"></div>
             </div>
           </div>
         </div>
       </div>

       <!-- Message d'erreur -->
       <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-6">
         <div class="flex items-center">
           <Icon name="heroicons:exclamation-triangle" class="w-5 h-5 text-red-600 mr-3" />
           <div>
             <h3 class="text-sm font-medium text-red-800">Erreur</h3>
             <p class="text-sm text-red-700 mt-1">{{ error }}</p>
           </div>
         </div>
         <button @click="clearError" class="mt-3 text-sm text-red-600 hover:text-red-800">
           Fermer
         </button>
       </div>

       <!-- Message si aucune propriété -->
       <div v-else-if="properties.length === 0" class="text-center py-12">
         <Icon name="heroicons:building-office-2" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
         <h3 class="text-lg font-medium text-gray-900 mb-2">Aucune propriété trouvée</h3>
         <p class="text-gray-600">Essayez de modifier vos critères de recherche</p>
       </div>

       <!-- Properties Grid -->
       <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
         <div
           v-for="property in properties"
           :key="property.id"
           class="bg-white rounded-lg overflow-hidden"
         >
          <div class="relative aspect-w-16 aspect-h-10">
            <img
              v-if="property.photos && property.photos.length > 0"
              :src="property.photos[0]"
              :alt="property.title"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-gray-200">
              <Icon name="heroicons:photo" class="w-12 h-12 text-gray-400" />
            </div>
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

             <!-- Caractéristiques et charges sous forme de pastilles -->
             <div class="flex flex-wrap gap-2 mb-4">
               <!-- Caractéristiques -->
               <span v-if="property.rooms" class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                 {{ property.rooms }} pièces
               </span>
               <span v-if="property.bedrooms" class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                 {{ property.bedrooms }} ch.
               </span>
               <span v-if="property.area" class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                 {{ property.area }} m²
               </span>
               
               <!-- Charges et frais -->
               <span v-if="property.monthlyCharges" class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                 Charges: CHF {{ property.monthlyCharges }}/mois
               </span>
               <span v-if="property.deposit" class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                 Caution: CHF {{ property.deposit }}
               </span>
               <span v-if="property.agencyFees" class="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                 Frais agence: CHF {{ property.agencyFees }}
               </span>
               <span v-if="property.applicationFees" class="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                 Frais dossier: CHF {{ property.applicationFees }}
               </span>
               
               <!-- Équipements (si disponibles) -->
               <span v-if="property.equipments && property.equipments.length > 0" 
                     v-for="equipment in property.equipments.slice(0, 3)" 
                     :key="equipment"
                     class="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                 {{ equipment }}
               </span>
               
               <!-- Conditions spéciales -->
               <span v-if="property.petsAllowed" class="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full">
                 Animaux autorisés
               </span>
               <span v-if="property.furnished" class="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                 Meublé
               </span>
               <span v-if="property.studentFriendly" class="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full">
                 Étudiants
               </span>
             </div>

             <!-- Annonceur avec icône par défaut -->
             <div class="flex items-center justify-between">
               <div class="flex items-center text-sm text-gray-600">
                 <!-- Avatar de l'annonceur -->
                 <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                   <Icon name="heroicons:user" class="w-4 h-4 text-green-600" />
                 </div>
                 {{ property.advertiser_name || 'Annonceur' }}
               </div>
               
               <div class="flex items-center gap-2">
                 <div class="flex items-center text-sm text-gray-600">
                   <Icon name="heroicons:eye" class="w-4 h-4 mr-1" />
                   {{ property.views_count || 0 }}
                 </div>
                 <button 
                   @click="viewProperty(property.id)"
                   class="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                 >
                   Voir
                 </button>
               </div>
             </div>
          </div>
         </div>
       </div>

       <!-- Pagination -->
       <div v-if="pagination.totalPages > 1" class="flex justify-center mt-8">
         <nav class="flex items-center space-x-2">
           <button 
             @click="loadPage(pagination.page - 1)"
             :disabled="pagination.page <= 1"
             class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
           >
             Précédent
           </button>
           
           <span 
             v-for="page in visiblePages" 
             :key="page"
             @click="loadPage(page)"
             :class="page === pagination.page ? 'bg-blue-600 text-white' : 'text-gray-700 bg-white hover:bg-gray-50'"
             class="px-3 py-2 text-sm font-medium border border-gray-300 rounded-lg cursor-pointer"
           >
             {{ page }}
           </span>
           
           <button 
             @click="loadPage(pagination.page + 1)"
             :disabled="pagination.page >= pagination.totalPages"
             class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
           >
             Suivant
           </button>
         </nav>
       </div>
     </div>
   </div>
 </template>

<script setup>
import { useProperties } from '~/composables/useProperties';

// Composables
const {
  properties,
  loading,
  error,
  pagination,
  filters,
  fetchProperties,
  clearError,
  setFilters
} = useProperties();

// État local pour les filtres
const localFilters = ref({
  transactionType: '',
  type: '',
  location: '',
  minPrice: null,
  maxPrice: null,
  minArea: null,
  maxArea: null,
  rooms: ''
});

// Computed pour la pagination
const visiblePages = computed(() => {
  const current = pagination.value.page;
  const total = pagination.value.totalPages;
  const pages = [];
  
  for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
    pages.push(i);
  }
  
  return pages;
});

// Méthodes
const viewProperty = (id) => {
  navigateTo(`/properties/${id}`);
};

const setQuickFilter = (key, value) => {
  localFilters.value[key] = value;
  applyFilters();
};

const clearFilters = () => {
  localFilters.value = {
    transactionType: '',
    type: '',
    location: '',
    minPrice: null,
    maxPrice: null,
    minArea: null,
    maxArea: null,
    rooms: ''
  };
  applyFilters();
};

const applyFilters = () => {
  // Nettoyer les filtres vides
  const cleanFilters = Object.fromEntries(
    Object.entries(localFilters.value).filter(([_, value]) => value !== '' && value !== null)
  );
  
  setFilters(cleanFilters);
  loadPage(1);
};

const loadPage = async (page) => {
  try {
    await fetchProperties(page, 12, filters.value);
  } catch (error) {
    console.error('Erreur lors du chargement de la page:', error);
  }
};

// Initialisation
onMounted(async () => {
  try {
    await fetchProperties(1, 12);
  } catch (error) {
    console.error('Erreur lors du chargement initial:', error);
  }
});
</script>
