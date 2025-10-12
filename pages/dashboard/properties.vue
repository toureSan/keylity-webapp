<template>
  <!-- État de chargement -->
  <div v-if="loading" class="p-4 md:p-6 space-y-4 md:space-y-6">
    <SkeletonLoader type="header" />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
      <SkeletonLoader v-for="i in 4" :key="i" type="card" />
    </div>
    <SkeletonLoader type="list" :items="3" />
  </div>

  <!-- Message d'erreur -->
  <div v-else-if="error" class="p-4 md:p-6">
    <div class="bg-red-50 border border-red-200 rounded-xl p-4 md:p-6">
      <div class="flex items-center">
        <Icon name="heroicons:exclamation-triangle" class="w-5 h-5 text-red-600 mr-3" />
        <div>
          <h3 class="text-sm font-medium text-red-800">Erreur de chargement</h3>
          <p class="text-sm text-red-600 mt-1">{{ error }}</p>
        </div>
      </div>
      <button @click="fetchMyProperties" 
              class="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
        Réessayer
      </button>
    </div>
  </div>

  <!-- Contenu principal -->
  <div v-else class="p-4 md:p-6 space-y-4 md:space-y-6">
                  <!-- Header -->
                  <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                           <div>
                                    <h1 class="text-xl md:text-2xl font-bold text-gray-900">Mes biens</h1>
                                    <p class="text-sm md:text-base text-gray-600">Gérez vos propriétés et annonces</p>
                           </div>
                                     <button @click="goToAddProperty"
                                    class="bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md text-sm md:text-base">
                                    <Icon name="heroicons:plus" class="w-4 h-4 md:w-5 md:h-5" />
                                    <span class="hidden sm:inline">Ajouter un bien</span>
                                    <span class="sm:hidden">Ajouter</span>
                           </button>
                  </div>

                  <!-- Statistiques -->
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-6">
                           <div
                                    class="bg-white p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                                    <div class="flex items-center">
                                             <div class="p-2 bg-blue-100 rounded-lg">
                                                      <Icon name="heroicons:building-office-2"
                                                               class="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                                             </div>
                                             <div class="ml-3 md:ml-4">
                                                      <p class="text-xs md:text-sm font-medium text-gray-600">Total des
                                                               biens</p>
                                                      <p class="text-lg md:text-2xl font-bold text-gray-900">
                                                               {{ myProperties.length }}</p>
                                             </div>
                                    </div>
                           </div>

                           <div
                                    class="bg-white p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                                    <div class="flex items-center">
                                             <div class="p-2 bg-green-100 rounded-lg">
                                                      <Icon name="heroicons:eye"
                                                               class="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                                             </div>
                                             <div class="ml-3 md:ml-4">
                                                      <p class="text-xs md:text-sm font-medium text-gray-600">En ligne
                                                      </p>
                                                      <p class="text-lg md:text-2xl font-bold text-gray-900">
                                                               {{ publishedProperties }}</p>
                                             </div>
                                    </div>
                           </div>

                           <div
                                    class="bg-white p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                                    <div class="flex items-center">
                                             <div class="p-2 bg-yellow-100 rounded-lg">
                                                      <Icon name="heroicons:clock"
                                                               class="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
                                             </div>
                                             <div class="ml-3 md:ml-4">
                                                      <p class="text-xs md:text-sm font-medium text-gray-600">En attente
                                                      </p>
                                                      <p class="text-lg md:text-2xl font-bold text-gray-900">
                                                               {{ pendingProperties }}</p>
                                             </div>
                                    </div>
                           </div>

                           <div
                                    class="bg-white p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                                    <div class="flex items-center">
                                             <div class="p-2 bg-purple-100 rounded-lg">
                                                      <Icon name="heroicons:users"
                                                               class="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                                             </div>
                                             <div class="ml-3 md:ml-4">
                                                      <p class="text-xs md:text-sm font-medium text-gray-600">
                                                               Candidatures</p>
                                                      <p class="text-lg md:text-2xl font-bold text-gray-900">
                                                               {{ totalApplications }}</p>
                                             </div>
                                    </div>
                           </div>
                  </div>

                  <!-- Filtres et recherche -->
                  <div class="bg-white p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                           <div class="flex flex-col gap-3 md:gap-4">
                                    <div class="flex-1">
                                             <input v-model="searchQuery" type="text"
                                                      placeholder="Rechercher un bien..."
                                                      class="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 focus:bg-white">
                                    </div>
                                    <div class="flex flex-col sm:flex-row gap-2">
                                             <select v-model="statusFilter"
                                                      class="flex-1 sm:flex-none px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 focus:bg-white">
                                                      <option value="">Tous les statuts</option>
                                                      <option value="available">Disponible</option>
                                                      <option value="unavailable">Indisponible</option>
                                                      <option value="rented">Loué</option>
                                                      <option value="sold">Vendu</option>
                                             </select>
                                             <select v-model="typeFilter"
                                                      class="flex-1 sm:flex-none px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 focus:bg-white">
                                                      <option value="">Tous les types</option>
                                                      <option value="appartement">Appartement</option>
                                                      <option value="maison">Maison</option>
                                                      <option value="studio">Studio</option>
                                                      <option value="duplex">Duplex</option>
                                                      <option value="loft">Loft</option>
                                                      <option value="penthouse">Penthouse</option>
                                             </select>
                                    </div>
                           </div>
                  </div>

                  <!-- Liste des biens -->
                  <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                           <div class="p-4 md:p-6 border-b border-gray-100">
                                    <h2 class="text-base md:text-lg font-semibold text-gray-900">Vos propriétés</h2>
                           </div>

                           <div v-if="filteredProperties.length === 0" class="p-8 md:p-12 text-center">
                                    <Icon name="heroicons:building-office-2"
                                             class="w-10 h-10 md:w-12 md:h-12 text-gray-400 mx-auto mb-4" />
                                    <h3 class="text-base md:text-lg font-medium text-gray-900 mb-2">Aucun bien trouvé
                                    </h3>
                                    <p class="text-sm md:text-base text-gray-600 mb-4">Commencez par ajouter votre
                                             premier bien immobilier</p>
                                    <button @click="goToAddProperty"
                                             class="bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md text-sm md:text-base">
                                             Ajouter un bien
                                    </button>
                           </div>

                           <div v-else class="divide-y divide-gray-100">
                                    <div v-for="property in filteredProperties" :key="property.id"
                                             class="p-4 md:p-6 hover:bg-gray-50/50 transition-all duration-200">
                                             <div
                                                      class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                                      <div class="flex-1">
                                                               <div
                                                                        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                                                                        <h3
                                                                                 class="text-base md:text-lg font-semibold text-gray-900">
                                                                                 {{ property.title }}</h3>
                                                                        <span class="px-2 py-1 text-xs font-medium rounded-full self-start"
                                                                                 :class="getStatusClass(property.status)">
                                                                                 {{ getStatusText(property.status) }}
                                                                        </span>
                                                               </div>

                                                               <div
                                                                        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm text-gray-600 mb-3">
                                                                        <div class="flex items-center gap-1">
                                                                                 <Icon name="heroicons:map-pin"
                                                                                          class="w-4 h-4" />
                                                                                 <span
                                                                                          class="truncate">{{ property.location || property.city }}</span>
                                                                        </div>
                                                                        <div class="flex items-center gap-1">
                                                                                 <Icon name="heroicons:home"
                                                                                          class="w-4 h-4" />
                                                                                 {{ property.type }}
                                                                        </div>
                                                                        <div class="flex items-center gap-1">
                                                                                 <Icon name="heroicons:banknotes"
                                                                                          class="w-4 h-4" />
                                                                                 {{ formatPrice(property.price, property.transactionType) }}
                                                                        </div>
                                                               </div>

                                                               <div
                                                                        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs md:text-sm text-gray-600">
                                                                        <div class="flex items-center gap-1">
                                                                                 <Icon name="heroicons:eye"
                                                                                          class="w-4 h-4" />
                                                                                 {{ property.views_count || 0 }} vues
                                                                        </div>
                                                                        <div class="flex items-center gap-1">
                                                                                 <Icon name="heroicons:heart"
                                                                                          class="w-4 h-4" />
                                                                                 {{ property.favorites_count || 0 }}
                                                                                 favoris
                                                                        </div>
                                                                        <div class="flex items-center gap-1">
                                                                                 <Icon name="heroicons:calendar"
                                                                                          class="w-4 h-4" />
                                                                                 {{ formatDate(property.created_at) }}
                                                                        </div>
                                                               </div>
                                                      </div>

                                                      <div
                                                               class="flex items-center justify-center lg:justify-end gap-1 lg:ml-4">
                                                               <button @click="editProperty(property)"
                                                                        class="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-200">
                                                                        <Icon name="heroicons:pencil"
                                                                                 class="w-4 h-4 md:w-5 md:h-5" />
                                                               </button>
                                                               <button @click="viewProperty(property)"
                                                                        class="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50/50 rounded-lg transition-all duration-200">
                                                                        <Icon name="heroicons:eye"
                                                                                 class="w-4 h-4 md:w-5 md:h-5" />
                                                               </button>
                                                               <button @click="deleteProperty(property)"
                                                                        class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50/50 rounded-lg transition-all duration-200">
                                                                        <Icon name="heroicons:trash"
                                                                                 class="w-4 h-4 md:w-5 md:h-5" />
                                                               </button>
                                                      </div>
                                             </div>
                                    </div>
                           </div>
                  </div>

                  <!-- Modal d'ajout de bien -->
                  <div v-if="showAddPropertyModal"
                           class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 md:p-4">
                           <div
                                    class="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 w-full max-w-2xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto shadow-2xl">
                                    <div class="flex justify-between items-center mb-4 md:mb-6">
                                             <h2 class="text-lg md:text-xl font-bold text-gray-900">Ajouter un bien</h2>
                                             <button @click="showAddPropertyModal = false"
                                                      class="text-gray-400 hover:text-gray-600">
                                                      <Icon name="heroicons:x-mark" class="w-5 h-5 md:w-6 md:h-6" />
                                             </button>
                                    </div>

                                    <form @submit.prevent="addProperty" class="space-y-3 md:space-y-4">
                                             <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                                      <div>
                                                               <label
                                                                        class="block text-xs md:text-sm font-medium text-gray-700 mb-1">Titre
                                                                        *</label>
                                                               <input v-model="newProperty.title" type="text" required
                                                                        class="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 focus:bg-white"
                                                                        placeholder="Ex: Appartement 3.5 pièces">
                                                      </div>
                                                      <div>
                                                               <label
                                                                        class="block text-xs md:text-sm font-medium text-gray-700 mb-1">Type
                                                                        *</label>
                                                               <select v-model="newProperty.type" required
                                                                        class="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 focus:bg-white">
                                                                        <option value="">Sélectionner</option>
                                                                        <option value="apartment">Appartement</option>
                                                                        <option value="house">Maison</option>
                                                                        <option value="studio">Studio</option>
                                                               </select>
                                                      </div>
                                             </div>

                                             <div>
                                                      <label
                                                               class="block text-xs md:text-sm font-medium text-gray-700 mb-1">Adresse
                                                               *</label>
                                                      <input v-model="newProperty.location" type="text" required
                                                               class="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 focus:bg-white"
                                                               placeholder="Ex: Rue de la Paix 123, 1200 Genève">
                                             </div>

                                             <div class="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                                                      <div>
                                                               <label
                                                                        class="block text-xs md:text-sm font-medium text-gray-700 mb-1">Prix
                                                                        (CHF/mois) *</label>
                                                               <input v-model="newProperty.price" type="number" required
                                                                        class="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 focus:bg-white"
                                                                        placeholder="1500">
                                                      </div>
                                                      <div>
                                                               <label
                                                                        class="block text-xs md:text-sm font-medium text-gray-700 mb-1">Pièces</label>
                                                               <input v-model="newProperty.rooms" type="number"
                                                                        class="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 focus:bg-white"
                                                                        placeholder="3.5">
                                                      </div>
                                                      <div>
                                                               <label
                                                                        class="block text-xs md:text-sm font-medium text-gray-700 mb-1">Surface
                                                                        (m²)</label>
                                                               <input v-model="newProperty.area" type="number"
                                                                        class="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 focus:bg-white"
                                                                        placeholder="85">
                                                      </div>
                                             </div>

                                             <div>
                                                      <label
                                                               class="block text-xs md:text-sm font-medium text-gray-700 mb-1">Description</label>
                                                      <textarea v-model="newProperty.description" rows="3"
                                                               class="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 focus:bg-white resize-none"
                                                               placeholder="Décrivez votre bien..."></textarea>
                                             </div>

                                             <div class="flex flex-col sm:flex-row justify-end gap-3 pt-3 md:pt-4">
                                                      <button type="button" @click="showAddPropertyModal = false"
                                                               class="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200">
                                                               Annuler
                                                      </button>
                                                      <button type="submit"
                                                               class="px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md text-sm md:text-base">
                                                               Ajouter le bien
                                                      </button>
                                             </div>
                                    </form>
                           </div>
                  </div>
         </div>
</template>

<script setup>
// Meta
definePageMeta({
  layout: 'dashboard'
})

// Router
const router = useRouter()

// Composables
const { myProperties, loading, error, fetchMyProperties } = useProperties()

// Données réactives
const searchQuery = ref('')
const statusFilter = ref('')
const typeFilter = ref('')

// Charger les propriétés au montage
onMounted(async () => {
  try {
    await fetchMyProperties()
  } catch (err) {
    console.error('Erreur lors du chargement des propriétés:', err)
  }
})


// Computed properties
const publishedProperties = computed(() => 
  myProperties.value.filter(p => p.status === 'available').length
)

const pendingProperties = computed(() => 
  myProperties.value.filter(p => p.status === 'unavailable').length
)

const totalApplications = computed(() => 
  myProperties.value.reduce((sum, p) => sum + (p.favorites_count || 0), 0)
)

const filteredProperties = computed(() => {
  let filtered = myProperties.value

  if (searchQuery.value) {
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (p.location && p.location.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      p.address.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(p => p.status === statusFilter.value)
  }

  if (typeFilter.value) {
    filtered = filtered.filter(p => p.type.toLowerCase() === typeFilter.value)
  }

  return filtered
})

// Composables pour les actions
const { deleteProperty: deletePropertyAction } = useProperties()

// Méthodes
const getStatusClass = (status) => {
  switch (status) {
    case 'available':
      return 'bg-green-100 text-green-800'
    case 'unavailable':
      return 'bg-yellow-100 text-yellow-800'
    case 'rented':
      return 'bg-blue-100 text-blue-800'
    case 'sold':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'available':
      return 'Disponible'
    case 'unavailable':
      return 'Indisponible'
    case 'rented':
      return 'Loué'
    case 'sold':
      return 'Vendu'
    default:
      return 'Inconnu'
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR')
}

const formatPrice = (price, transactionType) => {
  if (transactionType === 'vente') {
    return `${price.toLocaleString('fr-CH')} CHF`
  } else {
    return `${price.toLocaleString('fr-CH')} CHF/mois`
  }
}

// Navigation vers la page d'ajout
const goToAddProperty = () => {
  router.push('/dashboard/add-property')
}

const editProperty = (property) => {
  console.log('Éditer:', property)
  // TODO: Implémenter l'édition
  router.push(`/dashboard/edit-property/${property.id}`)
}

const viewProperty = (property) => {
  console.log('Voir:', property)
  // TODO: Implémenter la vue détaillée
  router.push(`/properties/${property.id}`)
}

const deleteProperty = async (property) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce bien ?')) {
    try {
      await deletePropertyAction(property.id)
      // La propriété sera automatiquement supprimée du store
    } catch (err) {
      console.error('Erreur lors de la suppression:', err)
      alert('Erreur lors de la suppression du bien')
    }
  }
}
</script>
