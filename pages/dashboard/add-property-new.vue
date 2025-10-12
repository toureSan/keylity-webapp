<template>
  <div class="p-4 md:p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-4">
        <button 
          @click="goBack"
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Icon name="heroicons:arrow-left" class="w-5 h-5" />
        </button>
        <div>
          <h1 class="text-xl md:text-2xl font-bold text-gray-900">Ajouter un bien</h1>
          <p class="text-sm md:text-base text-gray-600">Créez une nouvelle annonce immobilière</p>
        </div>
      </div>
    </div>

    <!-- Message d'erreur -->
    <div v-if="error" class="mb-6">
      <div class="bg-red-50 border border-red-200 rounded-xl p-4">
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
    </div>

    <!-- Contenu principal -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Formulaire -->
      <div class="space-y-6">
        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Informations générales -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div class="flex items-center gap-3 mb-6">
              <div class="p-2 bg-blue-100 rounded-lg">
                <Icon name="heroicons:information-circle" class="w-6 h-6 text-blue-600" />
              </div>
              <h2 class="text-xl font-bold text-gray-900">Informations générales</h2>
            </div>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Titre *</label>
                <input 
                  v-model="form.title"
                  type="text" 
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: Appartement moderne 3.5 pièces"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  v-model="form.description"
                  rows="4"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Décrivez votre bien en détail..."
                ></textarea>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Type de bien *</label>
                  <select 
                    v-model="form.type"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Sélectionner</option>
                    <option value="appartement">Appartement</option>
                    <option value="maison">Maison</option>
                    <option value="studio">Studio</option>
                    <option value="duplex">Duplex</option>
                    <option value="loft">Loft</option>
                    <option value="penthouse">Penthouse</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Type de transaction *</label>
                  <select 
                    v-model="form.transactionType"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Sélectionner</option>
                    <option value="location">Location</option>
                    <option value="vente">Vente</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Prix *</label>
                  <input 
                    v-model.number="form.price"
                    type="number" 
                    required
                    min="0"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="2500"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Surface (m²)</label>
                  <input 
                    v-model.number="form.area"
                    type="number" 
                    min="0"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="85"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Localisation -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div class="flex items-center gap-3 mb-6">
              <div class="p-2 bg-green-100 rounded-lg">
                <Icon name="heroicons:map-pin" class="w-6 h-6 text-green-600" />
              </div>
              <h2 class="text-xl font-bold text-gray-900">Localisation</h2>
            </div>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Adresse *</label>
                <input 
                  v-model="form.address"
                  type="text" 
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Rue du Lac 15"
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Code postal *</label>
                  <input 
                    v-model="form.postalCode"
                    type="text" 
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="1290"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Ville *</label>
                  <input 
                    v-model="form.city"
                    type="text" 
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Versoix"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Lieu spécifique</label>
                <select 
                  v-model="form.location"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Sélectionner</option>
                  <option value="Versoix">Versoix</option>
                  <option value="Coppet">Coppet</option>
                  <option value="Nyon">Nyon</option>
                  <option value="Gland">Gland</option>
                  <option value="Genève">Genève</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Caractéristiques -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div class="flex items-center gap-3 mb-6">
              <div class="p-2 bg-purple-100 rounded-lg">
                <Icon name="heroicons:home" class="w-6 h-6 text-purple-600" />
              </div>
              <h2 class="text-xl font-bold text-gray-900">Caractéristiques</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Pièces</label>
                <input 
                  v-model.number="form.rooms"
                  type="number" 
                  min="0"
                  step="0.5"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="3.5"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Chambres</label>
                <input 
                  v-model.number="form.bedrooms"
                  type="number" 
                  min="0"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="2"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Salles de bain</label>
                <input 
                  v-model.number="form.bathrooms"
                  type="number" 
                  min="0"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1"
                />
              </div>
            </div>
          </div>

          <!-- Boutons d'action -->
          <div class="flex gap-4">
            <button 
              type="button"
              @click="goBack"
              class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button 
              type="submit"
              :disabled="loading"
              class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="loading">Création...</span>
              <span v-else>Créer le bien</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Aperçu -->
      <div class="lg:sticky lg:top-6">
        <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <div class="flex items-center gap-3 mb-6">
            <div class="p-2 bg-gray-100 rounded-lg">
              <Icon name="heroicons:eye" class="w-6 h-6 text-gray-600" />
            </div>
            <h2 class="text-xl font-bold text-gray-900">Aperçu</h2>
          </div>

          <div class="space-y-4">
            <!-- Image placeholder -->
            <div class="h-48 bg-gray-200 rounded-xl flex items-center justify-center">
              <Icon name="heroicons:photo" class="w-12 h-12 text-gray-400" />
            </div>

            <!-- Titre -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900">
                {{ form.title || 'Titre du bien' }}
              </h3>
              <p class="text-sm text-gray-600">
                {{ form.location || form.city || 'Localisation' }}
              </p>
            </div>

            <!-- Prix -->
            <div class="flex items-center justify-between">
              <div class="text-2xl font-bold text-gray-900">
                {{ form.price ? formatPrice(form.price) : 'Prix' }}
                <span v-if="form.transactionType === 'location'" class="text-sm font-normal text-gray-600">/mois</span>
              </div>
              <div class="text-sm text-gray-600">
                {{ form.area ? `${form.area}m²` : 'Surface' }}
              </div>
            </div>

            <!-- Caractéristiques -->
            <div class="flex flex-wrap gap-2">
              <span v-if="form.rooms" class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                {{ form.rooms }} pièces
              </span>
              <span v-if="form.bedrooms" class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                {{ form.bedrooms }} ch.
              </span>
              <span v-if="form.bathrooms" class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                {{ form.bathrooms }} SDB
              </span>
            </div>

            <!-- Description -->
            <div v-if="form.description" class="text-sm text-gray-600">
              {{ form.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProperties } from '~/composables/useProperties';
import { useRouter } from 'vue-router';

// Configuration de la page
definePageMeta({
  middleware: 'auth'
});

// Composables
const router = useRouter();
const {
  loading,
  error,
  createProperty,
  clearError
} = useProperties();

// État du formulaire
const form = ref({
  title: '',
  description: '',
  type: '',
  transactionType: '',
  address: '',
  postalCode: '',
  city: '',
  location: '',
  price: null,
  area: null,
  rooms: null,
  bedrooms: null,
  bathrooms: null,
  floor: null,
  totalFloors: null,
  constructionYear: null,
  livingArea: null,
  orientation: '',
  condition: '',
  monthlyCharges: null,
  deposit: null,
  agencyFees: null,
  applicationFees: null,
  availableFrom: '',
  leaseDuration: '',
  petsAllowed: false,
  smokingAllowed: false,
  furnished: false,
  studentFriendly: false,
  contactMethods: [],
  visitAvailability: '',
  additionalInfo: '',
  equipments: [],
  photos: [],
  latitude: null,
  longitude: null
});

// Méthodes
const goBack = () => {
  router.back();
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-CH', {
    style: 'currency',
    currency: 'CHF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

const submitForm = async () => {
  try {
    // Validation basique
    if (!form.value.title || !form.value.type || !form.value.transactionType || 
        !form.value.address || !form.value.postalCode || !form.value.city || 
        !form.value.price) {
      throw new Error('Veuillez remplir tous les champs obligatoires');
    }

    // Créer la propriété
    const property = await createProperty(form.value);
    
    // Rediriger vers la page des propriétés
    await router.push('/dashboard/properties');
    
    // Afficher un message de succès (optionnel)
    // Vous pouvez utiliser un toast ou une notification ici
    
  } catch (error) {
    console.error('Erreur lors de la création de la propriété:', error);
  }
};

// Initialisation
onMounted(() => {
  // Vous pouvez ajouter ici des initialisations si nécessaire
});
</script>
