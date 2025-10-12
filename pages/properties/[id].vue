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
              <span>{{ property?.location || property?.city }}</span>
            </div>
            <div class="flex items-center gap-4 text-sm text-gray-500">
              <span>Publié {{ formatDate(property?.created_at) }}</span>
              <span>•</span>
              <span>Réf: {{ property?.id?.slice(-8) }}</span>
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
                {{ property.description || `Magnifique ${getTypeLabel(property.type).toLowerCase()} lumineux situé dans un quartier calme et résidentiel. Cette propriété offre un cadre de vie exceptionnel avec ses ${property.area || property.size || 'N/A'}m² parfaitement agencés. Proche des commerces, des écoles et des transports en commun. Vue dégagée, excellent état général. Idéal pour une famille ou des professionnels recherchant le confort et la tranquillité.` }}
              </p>

              <!-- Key Features Grid -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div class="p-4 bg-gray-50 rounded-xl text-center">
                  <Icon name="heroicons:home" class="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <div class="text-gray-500 text-sm mb-1">Surface</div>
                  <div class="font-semibold text-lg">{{ property.area || property.size || 'N/A' }} m²</div>
                </div>
                <div class="p-4 bg-gray-50 rounded-xl text-center">
                  <Icon name="heroicons:squares-2x2" class="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <div class="text-gray-500 text-sm mb-1">Pièces</div>
                  <div class="font-semibold text-lg">{{ property.rooms || 'N/A' }}</div>
                </div>
                <div class="p-4 bg-gray-50 rounded-xl text-center">
                  <Icon name="heroicons:building-office-2" class="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <div class="text-gray-500 text-sm mb-1">Étage</div>
                  <div class="font-semibold text-lg">{{ property.floor ? `${property.floor}ème` : 'N/A' }}</div>
                </div>
                <div class="p-4 bg-gray-50 rounded-xl text-center">
                  <Icon name="heroicons:calendar" class="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <div class="text-gray-500 text-sm mb-1">Disponibilité</div>
                  <div class="font-semibold text-lg">{{ property.availableFrom ? formatDate(property.availableFrom) : 'Immédiate' }}</div>
                </div>
              </div>

              <!-- Detailed Information -->
              <div class="grid md:grid-cols-2 gap-8">
                <!-- Caractéristiques principales -->
                <div>
                  <h3 class="font-semibold text-lg mb-4">Caractéristiques principales</h3>
                  <div class="space-y-3">
                    <div v-if="property.bedrooms" class="flex items-center gap-3">
                      <Icon name="heroicons:home" class="h-5 w-5 text-primary-600 flex-shrink-0" />
                      <span class="text-gray-700">{{ property.bedrooms }} chambre(s)</span>
                    </div>
                    <div v-if="property.bathrooms" class="flex items-center gap-3">
                      <Icon name="heroicons:home-modern" class="h-5 w-5 text-primary-600 flex-shrink-0" />
                      <span class="text-gray-700">{{ property.bathrooms }} salle(s) de bain</span>
                    </div>
                    <div v-if="property.livingArea" class="flex items-center gap-3">
                      <Icon name="heroicons:squares-2x2" class="h-5 w-5 text-primary-600 flex-shrink-0" />
                      <span class="text-gray-700">Surface habitable: {{ property.livingArea }}m²</span>
                    </div>
                    <div v-if="property.totalFloors" class="flex items-center gap-3">
                      <Icon name="heroicons:building-office-2" class="h-5 w-5 text-primary-600 flex-shrink-0" />
                      <span class="text-gray-700">{{ property.totalFloors }} étages au total</span>
                    </div>
                    <div v-if="property.constructionYear" class="flex items-center gap-3">
                      <Icon name="heroicons:calendar" class="h-5 w-5 text-primary-600 flex-shrink-0" />
                      <span class="text-gray-700">Construit en {{ property.constructionYear }}</span>
                    </div>
                    <div v-if="property.orientation" class="flex items-center gap-3">
                      <Icon name="heroicons:sun" class="h-5 w-5 text-primary-600 flex-shrink-0" />
                      <span class="text-gray-700">Orientation: {{ getOrientationLabel(property.orientation) }}</span>
                    </div>
                    <div v-if="property.condition" class="flex items-center gap-3">
                      <Icon name="heroicons:wrench-screwdriver" class="h-5 w-5 text-primary-600 flex-shrink-0" />
                      <span class="text-gray-700">État: {{ getConditionLabel(property.condition) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Équipements et services -->
                <div>
                  <h3 class="font-semibold text-lg mb-4">Équipements et services</h3>
                  <div class="space-y-3">
                    <div v-if="property.furnished" class="flex items-center gap-3">
                      <Icon name="heroicons:check-circle" class="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span class="text-gray-700">Meublé</span>
                    </div>
                    <div v-if="property.petsAllowed" class="flex items-center gap-3">
                      <Icon name="heroicons:check-circle" class="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span class="text-gray-700">Animaux autorisés</span>
                    </div>
                    <div v-if="property.smokingAllowed" class="flex items-center gap-3">
                      <Icon name="heroicons:check-circle" class="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span class="text-gray-700">Fumeurs autorisés</span>
                    </div>
                    <div v-if="property.studentFriendly" class="flex items-center gap-3">
                      <Icon name="heroicons:check-circle" class="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span class="text-gray-700">Adapté aux étudiants</span>
                    </div>
                    <div v-if="property.leaseDuration" class="flex items-center gap-3">
                      <Icon name="heroicons:calendar-days" class="h-5 w-5 text-primary-600 flex-shrink-0" />
                      <span class="text-gray-700">Durée: {{ getLeaseDurationLabel(property.leaseDuration) }}</span>
                    </div>
                    <div v-if="property.visitAvailability" class="flex items-center gap-3">
                      <Icon name="heroicons:eye" class="h-5 w-5 text-primary-600 flex-shrink-0" />
                      <span class="text-gray-700">Visites: {{ property.visitAvailability }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Frais et charges détaillés -->
              <div v-if="property.monthlyCharges || property.deposit || property.agencyFees || property.applicationFees" class="mt-8">
                <h3 class="font-semibold text-lg mb-4">Frais et charges</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div v-if="property.monthlyCharges" class="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <Icon name="heroicons:currency-franc" class="h-6 w-6 text-orange-600 flex-shrink-0" />
                    <div>
                      <p class="font-medium text-orange-900">Charges mensuelles</p>
                      <p class="text-orange-700">{{ property.monthlyCharges }} CHF/mois</p>
                    </div>
                  </div>
                  <div v-if="property.deposit" class="flex items-center gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                    <Icon name="heroicons:shield-check" class="h-6 w-6 text-red-600 flex-shrink-0" />
                    <div>
                      <p class="font-medium text-red-900">Caution</p>
                      <p class="text-red-700">{{ property.deposit }} CHF</p>
                    </div>
                  </div>
                  <div v-if="property.agencyFees" class="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <Icon name="heroicons:building-office" class="h-6 w-6 text-purple-600 flex-shrink-0" />
                    <div>
                      <p class="font-medium text-purple-900">Frais d'agence</p>
                      <p class="text-purple-700">{{ property.agencyFees }} CHF</p>
                    </div>
                  </div>
                  <div v-if="property.applicationFees" class="flex items-center gap-3 p-4 bg-pink-50 rounded-lg border border-pink-200">
                    <Icon name="heroicons:document-text" class="h-6 w-6 text-pink-600 flex-shrink-0" />
                    <div>
                      <p class="font-medium text-pink-900">Frais de dossier</p>
                      <p class="text-pink-700">{{ property.applicationFees }} CHF</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Équipements détaillés -->
              <div v-if="property.equipments && property.equipments.length > 0" class="mt-8">
                <h3 class="font-semibold text-lg mb-4">Équipements inclus</h3>
                <div class="flex flex-wrap gap-2">
                  <span v-for="equipment in property.equipments" :key="equipment" 
                        class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {{ getEquipmentLabel(equipment) }}
                  </span>
                </div>
              </div>

              <!-- Informations supplémentaires -->
              <div v-if="property.additionalInfo" class="mt-8">
                <h3 class="font-semibold text-lg mb-4">Informations supplémentaires</h3>
                <p class="text-gray-600 leading-relaxed">{{ property.additionalInfo }}</p>
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
                  <h4 class="font-medium mb-3">Adresse complète</h4>
                  <div class="space-y-2 text-gray-600">
                    <div class="flex items-center gap-2">
                      <Icon name="heroicons:map-pin" class="h-5 w-5 text-gray-400" />
                      <span>{{ property.address }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <Icon name="heroicons:building-office-2" class="h-5 w-5 text-gray-400" />
                      <span>{{ property.postalCode }} {{ property.city }}</span>
                    </div>
                    <div v-if="property.location" class="flex items-center gap-2">
                      <Icon name="heroicons:location-marker" class="h-5 w-5 text-gray-400" />
                      <span>{{ property.location }}</span>
                    </div>
                    <div v-if="property.latitude && property.longitude" class="flex items-center gap-2">
                      <Icon name="heroicons:globe-alt" class="h-5 w-5 text-gray-400" />
                      <span>Coordonnées: {{ property.latitude }}, {{ property.longitude }}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 class="font-medium mb-3">Informations de contact</h4>
                  <div class="space-y-2 text-gray-600">
                    <div v-if="property.contactMethods && property.contactMethods.length > 0" class="flex items-center gap-2">
                      <Icon name="heroicons:phone" class="h-5 w-5 text-gray-400" />
                      <span>Contact: {{ property.contactMethods.join(', ') }}</span>
                    </div>
                    <div v-if="property.visitAvailability" class="flex items-center gap-2">
                      <Icon name="heroicons:calendar" class="h-5 w-5 text-gray-400" />
                      <span>{{ property.visitAvailability }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <Icon name="heroicons:information-circle" class="h-5 w-5 text-gray-400" />
                      <span>Publié le {{ formatDate(property.created_at) }}</span>
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
                <p class="text-gray-500">{{ property.transaction_type === 'location' ? 'Prix de location / mois' : 'Prix de vente' }}</p>
              </div>

              <!-- Détail des frais -->
              <div v-if="property.transaction_type === 'location'" class="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 class="font-medium text-sm text-gray-700 mb-3">Détail des frais</h4>
                <div class="space-y-2 text-sm">
                  <div v-if="property.monthlyCharges" class="flex justify-between">
                    <span class="text-gray-600">Charges mensuelles</span>
                    <span class="font-medium">CHF {{ formatPrice(property.monthlyCharges) }}</span>
                  </div>
                  <div v-if="property.deposit" class="flex justify-between">
                    <span class="text-gray-600">Caution</span>
                    <span class="font-medium">CHF {{ formatPrice(property.deposit) }}</span>
                  </div>
                  <div v-if="property.agencyFees" class="flex justify-between">
                    <span class="text-gray-600">Frais d'agence</span>
                    <span class="font-medium">CHF {{ formatPrice(property.agencyFees) }}</span>
                  </div>
                  <div v-if="property.applicationFees" class="flex justify-between">
                    <span class="text-gray-600">Frais de dossier</span>
                    <span class="font-medium">CHF {{ formatPrice(property.applicationFees) }}</span>
                  </div>
                  <div class="border-t pt-2 mt-2">
                    <div class="flex justify-between font-semibold">
                      <span>Total mensuel</span>
                      <span>CHF {{ formatPrice(property.price + (property.monthlyCharges || 0)) }}</span>
                    </div>
                  </div>
                </div>
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
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel
} from '@headlessui/vue'

const route = useRoute()
const id = route.params.id

// Composables
const { fetchPropertyById, loading, error } = useProperties()

// Données réactives
const property = ref(null)

// Image gallery state
const currentImageIndex = ref(0)
const isImageModalOpen = ref(false)
const modalImageIndex = ref(0)

// Charger la propriété au montage
onMounted(async () => {
  try {
    const propertyData = await fetchPropertyById(id)
    property.value = propertyData
  } catch (err) {
    console.error('Erreur lors du chargement de la propriété:', err)
  }
})

// Générer les images de la galerie
const propertyImages = computed(() => {
  if (!property.value) return []

  // Si la propriété a des photos, les utiliser
  if (property.value.photos && property.value.photos.length > 0) {
    return property.value.photos
  }

  // Sinon, utiliser une image par défaut basée sur le type
  const defaultImages = {
    'appartement': 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
    'maison': 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
    'studio': 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
    'duplex': 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    'loft': 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
    'penthouse': 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg'
  }

  return [defaultImages[property.value.type] || 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg']
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

// Fonctions de formatage
const formatPrice = (price) => {
  if (!price) return '0'
  return new Intl.NumberFormat('fr-CH').format(price)
}

const formatDate = (dateString) => {
  if (!dateString) return 'Date inconnue'
  
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return 'hier'
  if (diffDays < 7) return `il y a ${diffDays} jours`
  if (diffDays < 30) return `il y a ${Math.ceil(diffDays / 7)} semaine${Math.ceil(diffDays / 7) > 1 ? 's' : ''}`
  if (diffDays < 365) return `il y a ${Math.ceil(diffDays / 30)} mois`
  return `il y a ${Math.ceil(diffDays / 365)} an${Math.ceil(diffDays / 365) > 1 ? 's' : ''}`
}

const getTypeLabel = (type) => {
  const typeMap = {
    'appartement': 'Appartement',
    'maison': 'Maison',
    'studio': 'Studio',
    'duplex': 'Duplex',
    'loft': 'Loft',
    'penthouse': 'Penthouse'
  }
  return typeMap[type] || type
}

const getOrientationLabel = (orientation) => {
  const orientationMap = {
    'nord': 'Nord',
    'sud': 'Sud',
    'est': 'Est',
    'ouest': 'Ouest',
    'nord-est': 'Nord-Est',
    'nord-ouest': 'Nord-Ouest',
    'sud-est': 'Sud-Est',
    'sud-ouest': 'Sud-Ouest'
  }
  return orientationMap[orientation] || orientation
}

const getConditionLabel = (condition) => {
  const conditionMap = {
    'excellent': 'Excellent',
    'bon': 'Bon',
    'moyen': 'Moyen',
    'mauvais': 'Mauvais',
    'à rénover': 'À rénover'
  }
  return conditionMap[condition] || condition
}

const getLeaseDurationLabel = (duration) => {
  const durationMap = {
    'mensuel': 'Mensuel',
    'trimestriel': 'Trimestriel',
    'annuel': 'Annuel',
    'long terme': 'Long terme'
  }
  return durationMap[duration] || duration
}

const getAgentName = () => {
  if (property.value?.advertiser_name) {
    return property.value.advertiser_name
  }
  return 'Agent immobilier'
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
      content: computed(() => property.value ? `${getTypeLabel(property.value.type)} de ${property.value.size}m² à ${property.value.location} pour CHF ${formatPrice(property.value.price)}${property.value.transaction_type === 'location' ? '/mois' : ''}` : 'Découvrez ce bien immobilier')
    }
  ]
})

// Fonction de mapping des équipements (anglais → français)
const getEquipmentLabel = (equipment) => {
  const equipmentMap = {
    'balcony': 'Balcon',
    'terrace': 'Terrasse',
    'garden': 'Jardin',
    'parking': 'Parking',
    'basement': 'Cave',
    'garage': 'Garage',
    'elevator': 'Ascenseur',
    'concierge': 'Concierge',
    'pool': 'Piscine',
    'gym': 'Salle de sport',
    'laundry': 'Buanderie',
    'dishwasher': 'Lave-vaisselle',
    'washing_machine': 'Machine à laver',
    'dryer': 'Sèche-linge',
    'air_conditioning': 'Climatisation',
    'heating': 'Chauffage',
    'fireplace': 'Cheminée',
    'furnished': 'Meublé',
    'pets_allowed': 'Animaux acceptés',
    'smoking_allowed': 'Fumeur accepté'
  };
  return equipmentMap[equipment] || equipment;
};
</script>