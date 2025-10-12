<template>
  <!-- État de chargement -->
  <div v-if="loading" class="p-4 md:p-6 space-y-4 md:space-y-6">
    <SkeletonLoader type="header" />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
      <SkeletonLoader v-for="i in 4" :key="i" type="card" />
    </div>
    <SkeletonLoader type="list" :items="3" />
  </div>

  <!-- Contenu principal -->
  <div v-else class="p-4 md:p-6 space-y-4 md:space-y-6">
                  <!-- Header -->
                  <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                           <div>
                                    <h1 class="text-xl md:text-2xl font-bold text-gray-900">Mes biens</h1>
                                    <p class="text-sm md:text-base text-gray-600">Gérez vos propriétés et annonces</p>
                           </div>
                           <button @click="showAddPropertyModal = true"
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
                                                               {{ properties.length }}</p>
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
                                                      <option value="published">En ligne</option>
                                                      <option value="pending">En attente</option>
                                                      <option value="draft">Brouillon</option>
                                             </select>
                                             <select v-model="typeFilter"
                                                      class="flex-1 sm:flex-none px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 focus:bg-white">
                                                      <option value="">Tous les types</option>
                                                      <option value="apartment">Appartement</option>
                                                      <option value="house">Maison</option>
                                                      <option value="studio">Studio</option>
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
                                    <button @click="showAddPropertyModal = true"
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
                                                                                          class="truncate">{{ property.location }}</span>
                                                                        </div>
                                                                        <div class="flex items-center gap-1">
                                                                                 <Icon name="heroicons:home"
                                                                                          class="w-4 h-4" />
                                                                                 {{ property.type }}
                                                                        </div>
                                                                        <div class="flex items-center gap-1">
                                                                                 <Icon name="heroicons:currency-euro"
                                                                                          class="w-4 h-4" />
                                                                                 {{ property.price }} CHF/mois
                                                                        </div>
                                                               </div>

                                                               <div
                                                                        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs md:text-sm text-gray-600">
                                                                        <div class="flex items-center gap-1">
                                                                                 <Icon name="heroicons:eye"
                                                                                          class="w-4 h-4" />
                                                                                 {{ property.views }} vues
                                                                        </div>
                                                                        <div class="flex items-center gap-1">
                                                                                 <Icon name="heroicons:users"
                                                                                          class="w-4 h-4" />
                                                                                 {{ property.applications }}
                                                                                 candidatures
                                                                        </div>
                                                                        <div class="flex items-center gap-1">
                                                                                 <Icon name="heroicons:calendar"
                                                                                          class="w-4 h-4" />
                                                                                 {{ formatDate(property.createdAt) }}
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

// Données réactives
const loading = ref(false)
const properties = ref([
  {
    id: 1,
    title: 'Appartement 3.5 pièces',
    location: 'Rue de la Paix 123, 1200 Genève',
    type: 'Appartement',
    price: 1500,
    rooms: 3.5,
    area: 85,
    status: 'published',
    views: 245,
    applications: 12,
    createdAt: '2024-01-15',
    description: 'Magnifique appartement en centre-ville...'
  },
  {
    id: 2,
    title: 'Studio moderne',
    location: 'Avenue de France 45, 1000 Lausanne',
    type: 'Studio',
    price: 1200,
    rooms: 1,
    area: 35,
    status: 'pending',
    views: 89,
    applications: 5,
    createdAt: '2024-01-20',
    description: 'Studio récemment rénové...'
  }
])

const showAddPropertyModal = ref(false)
const searchQuery = ref('')
const statusFilter = ref('')
const typeFilter = ref('')

const newProperty = ref({
  title: '',
  type: '',
  location: '',
  price: '',
  rooms: '',
  area: '',
  description: ''
})

// Computed properties
const publishedProperties = computed(() => 
  properties.value.filter(p => p.status === 'published').length
)

const pendingProperties = computed(() => 
  properties.value.filter(p => p.status === 'pending').length
)

const totalApplications = computed(() => 
  properties.value.reduce((sum, p) => sum + p.applications, 0)
)

const filteredProperties = computed(() => {
  let filtered = properties.value

  if (searchQuery.value) {
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.value.toLowerCase())
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

// Méthodes
const getStatusClass = (status) => {
  switch (status) {
    case 'published':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'draft':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'published':
      return 'En ligne'
    case 'pending':
      return 'En attente'
    case 'draft':
      return 'Brouillon'
    default:
      return 'Inconnu'
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR')
}

const addProperty = () => {
  const property = {
    id: Date.now(),
    ...newProperty.value,
    status: 'draft',
    views: 0,
    applications: 0,
    createdAt: new Date().toISOString().split('T')[0]
  }
  
  properties.value.push(property)
  showAddPropertyModal.value = false
  
  // Reset form
  newProperty.value = {
    title: '',
    type: '',
    location: '',
    price: '',
    rooms: '',
    area: '',
    description: ''
  }
}

const editProperty = (property) => {
  console.log('Éditer:', property)
  // TODO: Implémenter l'édition
}

const viewProperty = (property) => {
  console.log('Voir:', property)
  // TODO: Implémenter la vue détaillée
}

const deleteProperty = (property) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce bien ?')) {
    const index = properties.value.findIndex(p => p.id === property.id)
    if (index > -1) {
      properties.value.splice(index, 1)
    }
  }
}
</script>
