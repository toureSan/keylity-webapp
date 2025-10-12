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

      <!-- Transaction Type Badge -->
      <div class="absolute bottom-3 left-3">
        <span
          :class="property.transaction_type === 'location' ? 'bg-blue-500' : 'bg-green-500'"
          class="text-white px-3 py-1 rounded-full text-sm font-medium"
        >
          {{ property.transaction_type === 'location' ? 'Location' : 'Vente' }}
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
        <div class="text-sm text-gray-500">
          {{ property.transaction_type === 'location' ? 'Prix de location / mois' : 'Prix de vente' }}
        </div>
      </div>

      <!-- Title -->
      <h3 class="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
        {{ property.title }}
      </h3>

      <!-- Location -->
      <div class="flex items-center text-gray-600 mb-4">
        <Icon name="heroicons:map-pin" class="w-4 h-4 mr-1 flex-shrink-0" />
        <span class="text-sm truncate">{{ property.location || property.city }}</span>
      </div>

      <!-- Property Details -->
      <div class="flex items-center gap-4 text-sm text-gray-600 mb-4">
        <div class="flex items-center gap-1">
          <Icon name="heroicons:home" class="w-4 h-4" />
          <span>{{ property.area || property.size || 'N/A' }}m²</span>
        </div>
        <div class="flex items-center gap-1">
          <Icon name="heroicons:squares-2x2" class="w-4 h-4" />
          <span>{{ property.rooms || 'N/A' }} pièces</span>
        </div>
        <div v-if="property.bedrooms" class="flex items-center gap-1">
          <Icon name="heroicons:home-modern" class="w-4 h-4" />
          <span>{{ property.bedrooms }} ch.</span>
        </div>
        <div v-if="property.bathrooms" class="flex items-center gap-1">
          <Icon name="heroicons:home-modern" class="w-4 h-4" />
          <span>{{ property.bathrooms }} SDB</span>
        </div>
      </div>

      <!-- Charges et frais (pastilles) -->
      <div v-if="property.transaction_type === 'location'" class="flex flex-wrap gap-2 mb-4">
        <span v-if="property.monthlyCharges" class="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
          Charges: CHF {{ formatPrice(property.monthlyCharges) }}
        </span>
        <span v-if="property.deposit" class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
          Caution: CHF {{ formatPrice(property.deposit) }}
        </span>
        <span v-if="property.agencyFees" class="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
          Frais agence: CHF {{ formatPrice(property.agencyFees) }}
        </span>
        <span v-if="property.applicationFees" class="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
          Frais dossier: CHF {{ formatPrice(property.applicationFees) }}
        </span>
      </div>

      <!-- Caractéristiques (pastilles) -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span v-if="property.furnished" class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
          Meublé
        </span>
        <span v-if="property.petsAllowed" class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
          Animaux autorisés
        </span>
        <span v-if="property.studentFriendly" class="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
          Étudiants
        </span>
        <span v-if="property.smokingAllowed" class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
          Fumeurs autorisés
        </span>
        <span v-if="property.floor" class="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
          {{ property.floor }}ème étage
        </span>
        <span v-if="property.totalFloors" class="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
          {{ property.totalFloors }} étages
        </span>
        <span v-if="property.constructionYear" class="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
          Construit {{ property.constructionYear }}
        </span>
        <span v-if="property.livingArea" class="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
          {{ property.livingArea }}m² habitable
        </span>
        <span v-if="property.orientation" class="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
          {{ getOrientationLabel(property.orientation) }}
        </span>
        <span v-if="property.condition" class="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
          {{ getConditionLabel(property.condition) }}
        </span>
        <span v-if="property.leaseDuration" class="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
          {{ getLeaseDurationLabel(property.leaseDuration) }}
        </span>
        <span v-if="property.availableFrom" class="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
          Disponible {{ formatDate(property.availableFrom) }}
        </span>
      </div>

      <!-- Frais et charges -->
      <div v-if="property.monthlyCharges || property.deposit || property.agencyFees || property.applicationFees" class="mb-4">
        <h4 class="text-sm font-medium text-gray-700 mb-2">Frais et charges</h4>
        <div class="flex flex-wrap gap-2">
          <span v-if="property.monthlyCharges" class="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
            Charges: {{ property.monthlyCharges }} CHF/mois
          </span>
          <span v-if="property.deposit" class="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
            Caution: {{ property.deposit }} CHF
          </span>
          <span v-if="property.agencyFees" class="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
            Frais agence: {{ property.agencyFees }} CHF
          </span>
          <span v-if="property.applicationFees" class="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-xs">
            Frais dossier: {{ property.applicationFees }} CHF
          </span>
        </div>
      </div>

      <!-- Équipements -->
      <div v-if="property.equipments && property.equipments.length > 0" class="mb-4">
        <h4 class="text-sm font-medium text-gray-700 mb-2">Équipements</h4>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="equipment in property.equipments.slice(0, 5)" 
            :key="equipment"
            class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
          >
            {{ getEquipmentLabel(equipment) }}
          </span>
          <span 
            v-if="property.equipments.length > 5"
            class="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
          >
            +{{ property.equipments.length - 5 }} autres
          </span>
        </div>
      </div>

      <!-- Contact et visites -->
      <div v-if="property.contactMethods || property.visitAvailability" class="mb-4">
        <h4 class="text-sm font-medium text-gray-700 mb-2">Contact et visites</h4>
        <div class="space-y-1">
          <div v-if="property.contactMethods && property.contactMethods.length > 0" class="flex items-center gap-2">
            <Icon name="heroicons:phone" class="w-4 h-4 text-gray-500" />
            <span class="text-sm text-gray-600">
              {{ property.contactMethods.join(', ') }}
            </span>
          </div>
          <div v-if="property.visitAvailability" class="flex items-center gap-2">
            <Icon name="heroicons:calendar" class="w-4 h-4 text-gray-500" />
            <span class="text-sm text-gray-600">{{ property.visitAvailability }}</span>
          </div>
        </div>
      </div>

      <!-- Informations supplémentaires -->
      <div v-if="property.additionalInfo" class="mb-4">
        <h4 class="text-sm font-medium text-gray-700 mb-2">Informations supplémentaires</h4>
        <p class="text-sm text-gray-600 line-clamp-2">{{ property.additionalInfo }}</p>
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
    'appartement': "Appartement",
    'maison': "Maison",
    'studio': "Studio",
    'duplex': "Duplex",
    'loft': "Loft",
    'penthouse': "Penthouse",
  };
  return typeMap[type] || type;
};

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

const getOrientationLabel = (orientation) => {
  const orientationMap = {
    'north': "Nord",
    'south': "Sud",
    'east': "Est",
    'west': "Ouest",
    'northeast': "Nord-Est",
    'northwest': "Nord-Ouest",
    'southeast': "Sud-Est",
    'southwest': "Sud-Ouest",
  };
  return orientationMap[orientation] || orientation;
};

const getConditionLabel = (condition) => {
  const conditionMap = {
    'excellent': "Excellent",
    'good': "Bon",
    'fair': "Correct",
    'poor': "Mauvais",
    'renovated': "Rénové",
    'new': "Neuf",
  };
  return conditionMap[condition] || condition;
};

const getLeaseDurationLabel = (duration) => {
  const durationMap = {
    'short': "Court terme",
    'medium': "Moyen terme",
    'long': "Long terme",
    'indefinite': "Indéfini",
  };
  return durationMap[duration] || duration;
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long'
  });
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
