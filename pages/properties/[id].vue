<template>
  <div class="min-h-screen bg-gray-50">
    <Header />

    <div class="pt-20 pb-12">
      <div class="container mx-auto px-4">
        <!-- Breadcrumb -->
        <nav class="flex mb-6" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <NuxtLink to="/search"
                class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600">
                <Icon name="heroicons:home" class="w-4 h-4 mr-2" />
                Recherche
              </NuxtLink>
            </li>
            <li>
              <div class="flex items-center">
                <Icon name="heroicons:chevron-right" class="w-4 h-4 text-gray-400" />
                <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">Détail du bien</span>
              </div>
            </li>
          </ol>
        </nav>

        <!-- Property Header -->
        <div class="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8">
          <div>
            <h1 class="text-3xl font-bold mb-2">{{ property?.title || 'Chargement...' }}</h1>
            <div class="flex items-center text-gray-600 mb-2">
              <Icon name="heroicons:map-pin" class="w-5 h-5 mr-2" />
              <span>{{ property?.location }}</span>
            </div>
            <div class="flex items-center gap-4 text-sm text-gray-500">
              <span>Publié il y a 3 jours</span>
              <span>•</span>
              <span>Réf: {{ property?.id }}{{ Math.floor(Math.random() * 1000) }}</span>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button class="btn btn-outline flex items-center gap-2">
              <Icon name="heroicons:heart" class="h-5 w-5" />
              Favoris
            </button>
            <button class="btn btn-outline flex items-center gap-2">
              <Icon name="heroicons:share" class="h-5 w-5" />
              Partager
            </button>
          </div>
        </div>

        <div v-if="property" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Image Gallery -->
            <div class="bg-white rounded-xl shadow-sm overflow-hidden">
              <div class="relative">
                <img :src="propertyImages[currentImageIndex]" :alt="property.title"
                  class="w-full h-[500px] object-cover cursor-pointer" @click="openImageModal(currentImageIndex)">
                <div class="absolute top-4 left-4">
                  <span
                    class="bg-white px-3 py-2 rounded-full text-sm font-medium shadow-sm">{{ getTypeLabel(property.type) }}</span>
                </div>
                <div class="absolute top-4 right-4">
                  <span
                    class="bg-green-500 text-white px-3 py-2 rounded-full text-sm font-medium">{{ property.availability }}</span>
                </div>
                <!-- Gallery Navigation -->
                <div class="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {{ currentImageIndex + 1 }} / {{ propertyImages.length }}
                </div>
                <!-- Navigation Arrows -->
                <button v-if="currentImageIndex > 0" @click="previousImage"
                  class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
                  <Icon name="heroicons:chevron-left" class="w-6 h-6" />
                </button>
                <button v-if="currentImageIndex < propertyImages.length - 1" @click="nextImage"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
                  <Icon name="heroicons:chevron-right" class="w-6 h-6" />
                </button>
              </div>
              <!-- Thumbnail Gallery -->
              <div class="p-4 border-t">
                <div class="flex gap-3 overflow-x-auto">
                  <img v-for="(image, index) in propertyImages" :key="index" :src="image" :alt="`Photo ${index + 1}`"
                    class="w-20 h-20 rounded-lg object-cover cursor-pointer hover:opacity-75 transition-opacity flex-shrink-0"
                    :class="{ 'ring-2 ring-primary-500': index === currentImageIndex }" @click="setCurrentImage(index)">
                </div>
              </div>
            </div>

            <!-- Property Details -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <h2 class="text-2xl font-semibold mb-6">Description</h2>
              <p class="text-gray-600 mb-8 leading-relaxed">
                Magnifique {{ getTypeLabel(property.type).toLowerCase() }} lumineux situé dans un quartier calme et
                résidentiel.
                Cette propriété offre un cadre de vie exceptionnel avec ses {{ property.size }}m² parfaitement agencés.
                Proche des commerces, des écoles et des transports en commun. Vue dégagée, excellent état général.
                Idéal pour une famille ou des professionnels recherchant le confort et la tranquillité.
              </p>

              <!-- Key Features Grid -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div class="p-4 bg-gray-50 rounded-xl text-center">
                  <Icon name="heroicons:home" class="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <div class="text-gray-500 text-sm mb-1">Surface</div>
                  <div class="font-semibold text-lg">{{ property.size }} m²</div>
                </div>
                <div class="p-4 bg-gray-50 rounded-xl text-center">
                  <Icon name="heroicons:squares-2x2" class="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <div class="text-gray-500 text-sm mb-1">Pièces</div>
                  <div class="font-semibold text-lg">{{ property.rooms }}</div>
                </div>
                <div class="p-4 bg-gray-50 rounded-xl text-center">
                  <Icon name="heroicons:building-office-2" class="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <div class="text-gray-500 text-sm mb-1">Étage</div>
                  <div class="font-semibold text-lg">{{ Math.floor(Math.random() * 8) + 1 }}ème</div>
                </div>
                <div class="p-4 bg-gray-50 rounded-xl text-center">
                  <Icon name="heroicons:calendar" class="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <div class="text-gray-500 text-sm mb-1">Disponibilité</div>
                  <div class="font-semibold text-lg">{{ property.availability }}</div>
                </div>
              </div>

              <!-- Features -->
              <div class="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 class="font-semibold text-lg mb-4">Caractéristiques</h3>
                  <div class="space-y-3">
                    <div v-for="feature in features" :key="feature" class="flex items-center gap-3">
                      <Icon name="heroicons:check-circle" class="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span class="text-gray-700">{{ feature }}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="font-semibold text-lg mb-4">Charges incluses</h3>
                  <div class="space-y-3">
                    <div v-for="charge in charges" :key="charge" class="flex items-center gap-3">
                      <Icon name="heroicons:check-circle" class="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span class="text-gray-700">{{ charge }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Location -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <h2 class="text-2xl font-semibold mb-6">Localisation</h2>
              <div class="h-64 bg-gray-100 rounded-xl mb-6 flex items-center justify-center">
                <div class="text-center text-gray-500">
                  <Icon name="heroicons:map" class="w-12 h-12 mx-auto mb-2" />
                  <p>Carte interactive</p>
                </div>
              </div>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-medium mb-3">Adresse</h4>
                  <div class="space-y-2 text-gray-600">
                    <div class="flex items-center gap-2">
                      <Icon name="heroicons:map-pin" class="h-5 w-5 text-gray-400" />
                      <span>{{ property.location }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <Icon name="heroicons:building-office-2" class="h-5 w-5 text-gray-400" />
                      <span>Quartier résidentiel</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 class="font-medium mb-3">Transports</h4>
                  <div class="space-y-2 text-gray-600">
                    <div class="flex items-center gap-2">
                      <Icon name="heroicons:truck" class="h-5 w-5 text-gray-400" />
                      <span>Arrêt de bus à 2 min</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <Icon name="heroicons:building-library" class="h-5 w-5 text-gray-400" />
                      <span>Gare à 10 min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column - Sticky Sidebar -->
          <div class="lg:sticky lg:top-24 space-y-6">
            <!-- Price & Apply Card -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <div class="text-center mb-6">
                <div class="text-4xl font-bold text-primary-600 mb-2">
                  CHF {{ formatPrice(property.price) }}
                </div>
                <p class="text-gray-500">par mois</p>
              </div>

              <!-- Apply Button -->
              <button class="btn btn-primary w-full mb-4 text-lg py-4">
                <Icon name="heroicons:document-text" class="h-6 w-6 mr-2" />
                Postuler pour ce bien
              </button>

              <div class="grid grid-cols-2 gap-3 mb-6">
                <button class="btn btn-outline flex items-center justify-center gap-2">
                  <Icon name="heroicons:phone" class="h-5 w-5" />
                  Appeler
                </button>
                <button class="btn btn-outline flex items-center justify-center gap-2">
                  <Icon name="heroicons:calendar" class="h-5 w-5" />
                  Visite
                </button>
              </div>

              <div class="text-center">
                <p class="text-sm text-gray-500 mb-2">Réponse garantie sous 24h</p>
                <div class="flex items-center justify-center gap-1">
                  <div v-for="n in 5" :key="n" class="w-4 h-4">
                    <Icon name="heroicons:star" class="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                  <span class="text-sm text-gray-600 ml-2">4.9 (127 avis)</span>
                </div>
              </div>
            </div>

            <!-- Agency Card -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <h3 class="font-semibold text-lg mb-4">Contact</h3>
              <div class="flex items-center gap-4 mb-4">
                <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" alt="Agent"
                  class="w-16 h-16 rounded-full object-cover">
                <div>
                  <h4 class="font-semibold">{{ getAgentName() }}</h4>
                  <p class="text-gray-500 text-sm">Agent immobilier</p>
                  <div class="flex items-center gap-1 mt-1">
                    <Icon name="heroicons:star" class="w-4 h-4 text-yellow-400 fill-current" />
                    <span class="text-sm text-gray-600">4.8</span>
                  </div>
                </div>
              </div>

              <div class="space-y-3 mb-4">
                <div class="flex items-center gap-3">
                  <Icon name="heroicons:phone" class="h-5 w-5 text-gray-400" />
                  <span class="text-gray-600">+41 22 123 45 67</span>
                </div>
                <div class="flex items-center gap-3">
                  <Icon name="heroicons:envelope" class="h-5 w-5 text-gray-400" />
                  <span class="text-gray-600">contact@agence.ch</span>
                </div>
              </div>

              <button class="btn btn-outline w-full">
                Voir tous les biens de l'agence
              </button>
            </div>

            <!-- Quick Info -->
            <div class="bg-primary-50 rounded-xl p-6">
              <h3 class="font-semibold text-lg mb-3">Informations importantes</h3>
              <div class="space-y-3 text-sm">
                <div class="flex items-start gap-2">
                  <Icon name="heroicons:information-circle" class="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span>Caution: 3 mois de loyer</span>
                </div>
                <div class="flex items-start gap-2">
                  <Icon name="heroicons:information-circle" class="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span>Animaux acceptés sous conditions</span>
                </div>
                <div class="flex items-start gap-2">
                  <Icon name="heroicons:information-circle" class="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span>Parking disponible (+CHF 150/mois)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading state -->
        <div v-else class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p class="text-gray-500">Chargement de l'annonce...</p>
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <TransitionRoot appear :show="isImageModalOpen" as="template">
      <Dialog as="div" @close="closeImageModal" class="relative z-50">
        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
          leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black bg-opacity-90" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95">
              <DialogPanel class="w-full max-w-6xl transform overflow-hidden transition-all">
                <div class="relative">
                  <!-- Close Button -->
                  <button @click="closeImageModal"
                    class="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
                    <Icon name="heroicons:x-mark" class="w-6 h-6" />
                  </button>

                  <!-- Image Counter -->
                  <div class="absolute top-4 left-4 z-10 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {{ modalImageIndex + 1 }} / {{ propertyImages.length }}
                  </div>

                  <!-- Main Image -->
                  <img :src="propertyImages[modalImageIndex]" :alt="`Photo ${modalImageIndex + 1}`"
                    class="w-full h-auto max-h-[80vh] object-contain">

                  <!-- Navigation Arrows -->
                  <button v-if="modalImageIndex > 0" @click="previousModalImage"
                    class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors">
                    <Icon name="heroicons:chevron-left" class="w-8 h-8" />
                  </button>
                  <button v-if="modalImageIndex < propertyImages.length - 1" @click="nextModalImage"
                    class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors">
                    <Icon name="heroicons:chevron-right" class="w-8 h-8" />
                  </button>

                  <!-- Thumbnail Navigation -->
                  <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 rounded-lg p-2">
                    <div class="flex gap-2 max-w-md overflow-x-auto">
                      <img v-for="(image, index) in propertyImages" :key="index" :src="image"
                        :alt="`Miniature ${index + 1}`"
                        class="w-12 h-12 rounded object-cover cursor-pointer hover:opacity-75 transition-opacity flex-shrink-0"
                        :class="{ 'ring-2 ring-white': index === modalImageIndex }" @click="setModalImage(index)">
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel
} from '@headlessui/vue'

const route = useRoute()
const id = parseInt(route.params.id)

// Image gallery state
const currentImageIndex = ref(0)
const isImageModalOpen = ref(false)
const modalImageIndex = ref(0)

// Static listings data (same as in search page)
const allProperties = [
  {
    id: 1,
    type: 'penthouse',
    title: 'Modern home in city center',
    location: 'Cologny - Route de la Capite',
    city: 'geneve',
    size: 250,
    rooms: 4,
    price: 1400,
    availability: 'Disponible',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg'
  },
  {
    id: 2,
    type: 'villa',
    title: 'Isolated house outside of...',
    location: 'Vandœuvres - Route de Vandœuvres',
    city: 'geneve',
    size: 400,
    rooms: 6,
    price: 1950,
    availability: 'Disponible',
    image: 'https://images.pexels.com/photos/32870/pexels-photo.jpg'
  },
  {
    id: 3,
    type: 'apartment',
    title: 'Large dream home with...',
    location: 'Genève - Quai du Mont-Blanc',
    city: 'geneve',
    size: 180,
    rooms: 5,
    price: 1300,
    availability: 'Sur demande',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
  },
  {
    id: 4,
    type: 'penthouse',
    title: 'Modern home in city center',
    location: 'Genève - Rue du Rhône',
    city: 'geneve',
    size: 300,
    rooms: 2,
    price: 396,
    availability: 'Disponible',
    image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg'
  },
  {
    id: 5,
    type: 'apartment',
    title: 'Entire house • 2 BEDS',
    location: 'Lausanne - Avenue de la Gare',
    city: 'lausanne',
    size: 120,
    rooms: 3,
    price: 450,
    availability: 'Disponible',
    image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg'
  },
  {
    id: 6,
    type: 'studio',
    title: 'Modern home in city center',
    location: 'Zurich - Bahnhofstrasse',
    city: 'zurich',
    size: 45,
    rooms: 1,
    price: 600,
    availability: 'Disponible',
    image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg'
  },
  {
    id: 7,
    type: 'house',
    title: 'Family house with garden',
    location: 'Berne - Kirchenfeldstrasse',
    city: 'bern',
    size: 200,
    rooms: 4,
    price: 800,
    availability: 'Disponible',
    image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg'
  },
  {
    id: 8,
    type: 'loft',
    title: 'Industrial loft downtown',
    location: 'Bâle - Steinenvorstadt',
    city: 'basel',
    size: 150,
    rooms: 3,
    price: 1200,
    availability: 'Disponible',
    image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg'
  }
]

const property = computed(() => {
  return allProperties.find(listing => listing.id === id)
})

// Generate multiple images for the gallery (simulating different photos of the same property)
const propertyImages = computed(() => {
  if (!property.value) return []

  // Base images for variety
  const baseImages = [
    property.value.image,
    'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg',
    'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
    'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
    'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
    'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg'
  ]

  return baseImages
})

// Image navigation methods
const setCurrentImage = (index) => {
  currentImageIndex.value = index
}

const previousImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}

const nextImage = () => {
  if (currentImageIndex.value < propertyImages.value.length - 1) {
    currentImageIndex.value++
  }
}

// Modal methods
const openImageModal = (index) => {
  modalImageIndex.value = index
  isImageModalOpen.value = true
}

const closeImageModal = () => {
  isImageModalOpen.value = false
}

const setModalImage = (index) => {
  modalImageIndex.value = index
}

const previousModalImage = () => {
  if (modalImageIndex.value > 0) {
    modalImageIndex.value--
  }
}

const nextModalImage = () => {
  if (modalImageIndex.value < propertyImages.value.length - 1) {
    modalImageIndex.value++
  }
}

// Keyboard navigation for modal
const handleKeydown = (event) => {
  if (!isImageModalOpen.value) return

  switch (event.key) {
    case 'Escape':
      closeImageModal()
      break
    case 'ArrowLeft':
      previousModalImage()
      break
    case 'ArrowRight':
      nextModalImage()
      break
  }
}

// Add keyboard event listener
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

const formatPrice = (price) => {
  return price.toLocaleString('fr-CH')
}

const getTypeLabel = (type) => {
  const typeMap = {
    'apartment': 'Appartement',
    'house': 'Maison',
    'villa': 'Villa',
    'penthouse': 'Penthouse',
    'loft': 'Loft',
    'studio': 'Studio'
  }
  return typeMap[type] || type
}

const getAgentName = () => {
  const names = ['Sophie Martin', 'Jean Dupont', 'Marie Dubois', 'Pierre Leroy', 'Claire Bernard']
  return names[Math.floor(Math.random() * names.length)]
}

const features = [
  'Cuisine équipée moderne',
  'Balcon avec vue',
  'Cave privée',
  'Ascenseur',
  'Interphone vidéo',
  'Fibre optique',
  'Double vitrage',
  'Parquet dans les chambres',
  'Salle de bain avec baignoire',
  'Buanderie commune'
]

const charges = [
  'Chauffage central',
  'Eau chaude',
  'Électricité des communs',
  'Conciergerie',
  'Entretien des espaces verts',
  'Assurance immeuble'
]

// SEO
useHead({
  title: computed(() => property.value ? `${property.value.title} - ${property.value.location}` : 'Bien immobilier'),
  meta: [
    {
      name: 'description',
      content: computed(() => property.value ? `${getTypeLabel(property.value.type)} de ${property.value.size}m² à ${property.value.location} pour CHF ${formatPrice(property.value.price)}/mois` : 'Découvrez ce bien immobilier')
    }
  ]
})
</script>