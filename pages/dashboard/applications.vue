<template>
  <!-- État de chargement -->
  <div v-if="loading" class="p-4 md:p-6 space-y-4 md:space-y-6">
    <SkeletonLoader type="header" />
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
      <SkeletonLoader v-for="i in 4" :key="i" type="card" />
    </div>
    <SkeletonLoader type="list" :items="5" />
  </div>

  <!-- Contenu principal -->
  <div v-else-if="isAuthenticated" class="p-4 md:p-6 space-y-4 md:space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div>
        <h1 class="text-xl md:text-2xl font-bold text-gray-900">
          {{ mode === 'candidat' ? 'Mes candidatures' : 'Candidatures reçues' }}
        </h1>
        <p class="text-sm md:text-base text-gray-600">
          {{ mode === 'candidat' ? 'Suivez vos candidatures' : 'Gérez les candidatures pour vos biens' }}
        </p>
      </div>
    </div>

    <!-- Statistiques -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
      <div class="bg-white p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <Icon name="heroicons:document-text" class="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
          </div>
          <div class="ml-3 md:ml-4">
            <p class="text-xs md:text-sm font-medium text-gray-600">Total</p>
            <p class="text-lg md:text-2xl font-bold text-gray-900">{{ applications.length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <Icon name="heroicons:check-circle" class="w-5 h-5 md:w-6 md:h-6 text-green-600" />
          </div>
          <div class="ml-3 md:ml-4">
            <p class="text-xs md:text-sm font-medium text-gray-600">Acceptées</p>
            <p class="text-lg md:text-2xl font-bold text-gray-900">{{ acceptedApplications }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <Icon name="heroicons:clock" class="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
          </div>
          <div class="ml-3 md:ml-4">
            <p class="text-xs md:text-sm font-medium text-gray-600">En attente</p>
            <p class="text-lg md:text-2xl font-bold text-gray-900">{{ pendingApplications }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
        <div class="flex items-center">
          <div class="p-2 bg-red-100 rounded-lg">
            <Icon name="heroicons:x-circle" class="w-5 h-5 md:w-6 md:h-6 text-red-600" />
          </div>
          <div class="ml-3 md:ml-4">
            <p class="text-xs md:text-sm font-medium text-gray-600">Refusées</p>
            <p class="text-lg md:text-2xl font-bold text-gray-900">{{ rejectedApplications }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtres -->
    <div class="bg-white p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <div class="flex flex-col gap-3 md:gap-4">
        <div class="flex-1">
          <input v-model="searchQuery" type="text" placeholder="Rechercher..."
            class="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 focus:bg-white">
        </div>
        <div class="flex gap-2">
          <select v-model="statusFilter" class="flex-1 md:flex-none px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 focus:bg-white">
            <option value="">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="accepted">Acceptée</option>
            <option value="rejected">Refusée</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Liste des candidatures -->
    <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <div class="p-4 md:p-6 border-b border-gray-100">
        <h2 class="text-base md:text-lg font-semibold text-gray-900">
          {{ mode === 'candidat' ? 'Vos candidatures' : 'Candidatures reçues' }}
        </h2>
      </div>
      
      <div v-if="filteredApplications.length === 0" class="p-8 md:p-12 text-center">
        <Icon name="heroicons:document-text" class="w-10 h-10 md:w-12 md:h-12 text-gray-400 mx-auto mb-4" />
        <h3 class="text-base md:text-lg font-medium text-gray-900 mb-2">Aucune candidature</h3>
        <p class="text-sm md:text-base text-gray-600">
          {{ mode === 'candidat' ? 'Vous n\'avez pas encore de candidatures' : 'Aucune candidature reçue pour le moment' }}
        </p>
      </div>

      <div v-else class="divide-y divide-gray-100 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div v-for="application in filteredApplications" :key="application.id" 
          class="p-4 md:p-6 hover:bg-gray-50/50 transition-all duration-200">
          <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div class="flex-1">
              <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                <h3 class="text-base md:text-lg font-semibold text-gray-900">
                  {{ mode === 'candidat' ? application.propertyTitle : application.candidateName }}
                </h3>
                <span class="px-2 py-1 text-xs font-medium rounded-full self-start" :class="getStatusClass(application.status)">
                  {{ getStatusText(application.status) }}
                </span>
              </div>
              
              <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm text-gray-600 mb-3">
                <div class="flex items-center gap-1">
                  <Icon name="heroicons:map-pin" class="w-4 h-4" />
                  <span class="truncate">{{ application.location }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <Icon name="heroicons:currency-euro" class="w-4 h-4" />
                  {{ application.price }} CHF/mois
                </div>
                <div class="flex items-center gap-1">
                  <Icon name="heroicons:calendar" class="w-4 h-4" />
                  {{ formatDate(application.createdAt) }}
                </div>
              </div>

              <p class="text-sm md:text-base text-gray-700 mb-3 line-clamp-2">{{ application.message }}</p>

              <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm text-gray-600">
                <div class="flex items-center gap-1">
                  <Icon name="heroicons:user" class="w-4 h-4" />
                  <span class="truncate">{{ mode === 'candidat' ? 'Candidat' : application.candidateName }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <Icon name="heroicons:envelope" class="w-4 h-4" />
                  <span class="truncate">{{ application.email }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <Icon name="heroicons:phone" class="w-4 h-4" />
                  {{ application.phone }}
                </div>
              </div>
            </div>

            <div v-if="mode === 'annonceur'" class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 lg:ml-4">
              <button @click="acceptApplication(application)"
                class="px-3 md:px-4 py-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-all duration-200 text-xs md:text-sm font-medium shadow-sm hover:shadow-md">
                Accepter
              </button>
              <button @click="rejectApplication(application)"
                class="px-3 md:px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-all duration-200 text-xs md:text-sm font-medium shadow-sm hover:shadow-md">
                Refuser
              </button>
              <button @click="viewApplication(application)"
                class="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all duration-200 self-center">
                <Icon name="heroicons:eye" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de détails de candidature -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
      <div class="bg-white rounded-xl md:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto">
        <!-- Header de la modal -->
        <div class="sticky top-0 bg-white border-b border-gray-100 p-4 md:p-6 rounded-t-xl md:rounded-t-2xl">
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1 min-w-0">
              <h2 class="text-lg md:text-2xl font-bold text-gray-900">
                Détails de la candidature
              </h2>
              <p class="text-sm md:text-base text-gray-600 mt-1 truncate">
                {{ selectedApplication?.candidateName }} - {{ selectedApplication?.propertyTitle }}
              </p>
            </div>
            <button @click="closeModal" class="p-2 hover:bg-gray-100 rounded-xl transition-colors flex-shrink-0">
              <Icon name="heroicons:x-mark" class="w-5 h-5 md:w-6 md:h-6 text-gray-500" />
            </button>
          </div>
        </div>

        <!-- Contenu de la modal -->
        <div v-if="selectedApplication" class="p-4 md:p-6 space-y-6 md:space-y-8">
          <!-- Informations personnelles -->
          <div class="bg-gray-50 rounded-xl p-4 md:p-6">
            <h3 class="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
              <Icon name="heroicons:user" class="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
              Informations personnelles
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label class="text-xs md:text-sm font-medium text-gray-600">Nom complet</label>
                <p class="text-sm md:text-base text-gray-900">{{ selectedApplication.candidateName }}</p>
              </div>
              <div>
                <label class="text-xs md:text-sm font-medium text-gray-600">Âge</label>
                <p class="text-sm md:text-base text-gray-900">{{ selectedApplication.details?.age }} ans</p>
              </div>
              <div>
                <label class="text-xs md:text-sm font-medium text-gray-600">Nationalité</label>
                <p class="text-sm md:text-base text-gray-900">{{ selectedApplication.details?.nationality }}</p>
              </div>
              <div>
                <label class="text-xs md:text-sm font-medium text-gray-600">Situation familiale</label>
                <p class="text-sm md:text-base text-gray-900">{{ selectedApplication.details?.maritalStatus }}</p>
              </div>
              <div v-if="selectedApplication.details?.children > 0">
                <label class="text-xs md:text-sm font-medium text-gray-600">Enfants</label>
                <p class="text-sm md:text-base text-gray-900">{{ selectedApplication.details.children }} enfant(s)</p>
              </div>
            </div>
          </div>

          <!-- Informations professionnelles -->
          <div class="bg-gray-50 rounded-xl p-4 md:p-6">
            <h3 class="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
              <Icon name="heroicons:briefcase" class="w-4 h-4 md:w-5 md:h-5 text-green-600" />
              Informations professionnelles
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label class="text-sm font-medium text-gray-600">Profession</label>
                <p class="text-gray-900">{{ selectedApplication.details?.profession }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-600">Employeur</label>
                <p class="text-gray-900">{{ selectedApplication.details?.employer }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-600">Type de contrat</label>
                <p class="text-gray-900">{{ selectedApplication.details?.contractType }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-600">Taux d'activité</label>
                <p class="text-gray-900">{{ selectedApplication.details?.workRate }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-600">Revenus mensuels</label>
                <p class="font-semibold text-green-600">{{ selectedApplication.details?.monthlyIncome?.toLocaleString() }} CHF</p>
              </div>
            </div>
          </div>

          <!-- Adresse actuelle -->
          <div class="bg-gray-50 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="heroicons:map-pin" class="w-5 h-5 text-purple-600" />
              Adresse actuelle
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium text-gray-600">Adresse</label>
                <p class="text-gray-900">{{ selectedApplication.details?.currentAddress }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-600">Depuis le</label>
                <p class="text-gray-900">{{ new Date(selectedApplication.details?.addressSince).toLocaleDateString('fr-FR') }}</p>
              </div>
              <div class="md:col-span-2">
                <label class="text-sm font-medium text-gray-600">Raison du déménagement</label>
                <p class="text-gray-900">{{ selectedApplication.details?.movingReason }}</p>
              </div>
            </div>
          </div>

          <!-- Garant -->
          <div v-if="selectedApplication.details?.guarantor" class="bg-gray-50 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="heroicons:shield-check" class="w-5 h-5 text-orange-600" />
              Garant
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium text-gray-600">Nom</label>
                <p class="text-gray-900">{{ selectedApplication.details.guarantor.name }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-600">Relation</label>
                <p class="text-gray-900">{{ selectedApplication.details.guarantor.relationship }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-600">Téléphone</label>
                <p class="text-gray-900">{{ selectedApplication.details.guarantor.phone }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-600">Email</label>
                <p class="text-gray-900">{{ selectedApplication.details.guarantor.email }}</p>
              </div>
            </div>
          </div>

          <!-- Message du candidat -->
          <div class="bg-blue-50 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="heroicons:chat-bubble-left-right" class="w-5 h-5 text-blue-600" />
              Message du candidat
            </h3>
            <p class="text-gray-700 leading-relaxed">{{ selectedApplication.message }}</p>
          </div>

          <!-- Documents -->
          <div class="bg-gray-50 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="heroicons:document-text" class="w-5 h-5 text-indigo-600" />
              Documents fournis
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-if="selectedApplication.details?.documents?.idDocument" class="flex items-center gap-3 p-3 bg-white rounded-lg">
                <Icon name="heroicons:identification" class="w-5 h-5 text-blue-600" />
                <div>
                  <p class="font-medium text-gray-900">Pièce d'identité</p>
                  <a :href="selectedApplication.details.documents.idDocument" target="_blank" class="text-sm text-blue-600 hover:underline">Voir le document</a>
                </div>
              </div>
              <div v-if="selectedApplication.details?.documents?.employmentCertificate" class="flex items-center gap-3 p-3 bg-white rounded-lg">
                <Icon name="heroicons:briefcase" class="w-5 h-5 text-green-600" />
                <div>
                  <p class="font-medium text-gray-900">Certificat de travail</p>
                  <a :href="selectedApplication.details.documents.employmentCertificate" target="_blank" class="text-sm text-blue-600 hover:underline">Voir le document</a>
                </div>
              </div>
              <div v-if="selectedApplication.details?.documents?.salarySlips?.length" class="flex items-center gap-3 p-3 bg-white rounded-lg">
                <Icon name="heroicons:currency-dollar" class="w-5 h-5 text-yellow-600" />
                <div>
                  <p class="font-medium text-gray-900">Bulletins de salaire</p>
                  <p class="text-sm text-gray-600">{{ selectedApplication.details.documents.salarySlips.length }} document(s)</p>
                </div>
              </div>
              <div v-if="selectedApplication.details?.documents?.bankStatements?.length" class="flex items-center gap-3 p-3 bg-white rounded-lg">
                <Icon name="heroicons:building-library" class="w-5 h-5 text-purple-600" />
                <div>
                  <p class="font-medium text-gray-900">Relevés bancaires</p>
                  <p class="text-sm text-gray-600">{{ selectedApplication.details.documents.bankStatements.length }} document(s)</p>
                </div>
              </div>
              <div v-if="selectedApplication.details?.documents?.debtCertificate" class="flex items-center gap-3 p-3 bg-white rounded-lg">
                <Icon name="heroicons:shield-check" class="w-5 h-5 text-red-600" />
                <div>
                  <p class="font-medium text-gray-900">Certificat de non-endettement</p>
                  <a :href="selectedApplication.details.documents.debtCertificate" target="_blank" class="text-sm text-blue-600 hover:underline">Voir le document</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-4 md:pt-6 border-t border-gray-200">
            <button @click="closeModal" class="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base text-gray-600 hover:text-gray-800 transition-colors">
              Fermer
            </button>
            <button @click="rejectApplication(selectedApplication); closeModal()" 
              class="px-4 md:px-6 py-2 md:py-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-all duration-200 text-sm md:text-base font-medium">
              Refuser
            </button>
            <button @click="acceptApplication(selectedApplication); closeModal()" 
              class="px-4 md:px-6 py-2 md:py-3 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-all duration-200 text-sm md:text-base font-medium">
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Message d'erreur pour les utilisateurs non authentifiés -->
  <div v-else class="h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <Icon name="heroicons:exclamation-triangle" class="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h2 class="text-xl font-semibold text-gray-900 mb-2">Accès non autorisé</h2>
      <p class="text-gray-600 mb-4">Vous devez être connecté pour accéder à cette page.</p>
      <button @click="router.push('/login')" 
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Se connecter
      </button>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth.store'

// Meta
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'applications']
})

const authStore = useAuthStore()
const router = useRouter()

// Données réactives
const applications = ref([
  {
    id: 1,
    propertyTitle: 'Appartement 3.5 pièces',
    candidateName: 'Jean Dupont',
    location: 'Rue de la Paix 123, 1200 Genève',
    price: 1500,
    status: 'pending',
    message: 'Bonjour, je suis très intéressé par cet appartement. Je suis un locataire sérieux et je peux fournir toutes les garanties nécessaires.',
    email: 'jean.dupont@email.com',
    phone: '+41 22 123 45 67',
    createdAt: '2024-01-15',
    // Données détaillées pour la modal
    details: {
      age: 32,
      profession: 'Ingénieur informatique',
      employer: 'Google Switzerland',
      monthlyIncome: 8500,
      contractType: 'CDI',
      workRate: '100%',
      maritalStatus: 'Marié',
      children: 1,
      nationality: 'Français',
      currentAddress: 'Rue du Rhône 45, 1204 Genève',
      addressSince: '2020-03-15',
      movingReason: 'Besoin de plus d\'espace pour la famille',
      guarantor: {
        name: 'Marie Dupont',
        relationship: 'Épouse',
        phone: '+41 22 123 45 68',
        email: 'marie.dupont@email.com'
      },
      documents: {
        idDocument: 'https://example.com/id-document.pdf',
        employmentCertificate: 'https://example.com/employment-cert.pdf',
        salarySlips: ['https://example.com/salary-1.pdf', 'https://example.com/salary-2.pdf'],
        bankStatements: ['https://example.com/bank-1.pdf'],
        debtCertificate: 'https://example.com/debt-cert.pdf'
      }
    }
  },
  {
    id: 2,
    propertyTitle: 'Studio moderne',
    candidateName: 'Marie Martin',
    location: 'Avenue de France 45, 1000 Lausanne',
    price: 1200,
    status: 'accepted',
    message: 'Je cherche un studio pour mon stage de 6 mois. Je suis étudiante et très propre.',
    email: 'marie.martin@email.com',
    phone: '+41 21 987 65 43',
    createdAt: '2024-01-20',
    details: {
      age: 24,
      profession: 'Étudiante en médecine',
      employer: 'Université de Lausanne',
      monthlyIncome: 1200,
      contractType: 'Stage',
      workRate: '100%',
      maritalStatus: 'Célibataire',
      children: 0,
      nationality: 'Suisse',
      currentAddress: 'Rue de l\'Université 12, 1000 Lausanne',
      addressSince: '2023-09-01',
      movingReason: 'Stage de 6 mois à Genève',
      guarantor: {
        name: 'Pierre Martin',
        relationship: 'Père',
        phone: '+41 21 987 65 44',
        email: 'pierre.martin@email.com'
      },
      documents: {
        idDocument: 'https://example.com/marie-id.pdf',
        employmentCertificate: 'https://example.com/marie-employment.pdf',
        salarySlips: ['https://example.com/marie-salary.pdf'],
        bankStatements: ['https://example.com/marie-bank.pdf'],
        debtCertificate: 'https://example.com/marie-debt.pdf'
      }
    }
  },
  {
    id: 3,
    propertyTitle: 'Maison 4 pièces',
    candidateName: 'Pierre Dubois',
    location: 'Chemin des Vignes 8, 1260 Nyon',
    price: 2200,
    status: 'pending',
    message: 'Famille avec 2 enfants, très intéressée par cette maison. Nous cherchons un logement stable.',
    email: 'pierre.dubois@email.com',
    phone: '+41 22 555 12 34',
    createdAt: '2024-01-18',
    details: {
      age: 38,
      profession: 'Directeur commercial',
      employer: 'Nestlé Suisse',
      monthlyIncome: 12000,
      contractType: 'CDI',
      workRate: '100%',
      maritalStatus: 'Marié',
      children: 2,
      nationality: 'Suisse',
      currentAddress: 'Avenue de la Gare 15, 1000 Lausanne',
      addressSince: '2018-06-01',
      movingReason: 'Besoin d\'une maison plus grande pour la famille',
      guarantor: {
        name: 'Sophie Dubois',
        relationship: 'Épouse',
        phone: '+41 22 555 12 35',
        email: 'sophie.dubois@email.com'
      },
      documents: {
        idDocument: 'https://example.com/pierre-id.pdf',
        employmentCertificate: 'https://example.com/pierre-employment.pdf',
        salarySlips: ['https://example.com/pierre-salary-1.pdf', 'https://example.com/pierre-salary-2.pdf', 'https://example.com/pierre-salary-3.pdf'],
        bankStatements: ['https://example.com/pierre-bank-1.pdf', 'https://example.com/pierre-bank-2.pdf'],
        debtCertificate: 'https://example.com/pierre-debt.pdf'
      }
    }
  },
  {
    id: 4,
    propertyTitle: 'Appartement 2 pièces',
    candidateName: 'Sophie Laurent',
    location: 'Rue du Rhône 12, 1204 Genève',
    price: 1800,
    status: 'rejected',
    message: 'Je suis une jeune professionnelle, très propre et respectueuse.',
    email: 'sophie.laurent@email.com',
    phone: '+41 22 777 88 99',
    createdAt: '2024-01-16',
    details: {
      age: 28,
      profession: 'Consultante marketing',
      employer: 'Publicis Groupe',
      monthlyIncome: 6500,
      contractType: 'CDI',
      workRate: '100%',
      maritalStatus: 'Célibataire',
      children: 0,
      nationality: 'Française',
      currentAddress: 'Rue de la Paix 8, 1200 Genève',
      addressSince: '2022-01-15',
      movingReason: 'Cherche un appartement plus moderne',
      guarantor: {
        name: 'Michel Laurent',
        relationship: 'Père',
        phone: '+41 22 777 88 98',
        email: 'michel.laurent@email.com'
      },
      documents: {
        idDocument: 'https://example.com/sophie-id.pdf',
        employmentCertificate: 'https://example.com/sophie-employment.pdf',
        salarySlips: ['https://example.com/sophie-salary-1.pdf', 'https://example.com/sophie-salary-2.pdf'],
        bankStatements: ['https://example.com/sophie-bank.pdf'],
        debtCertificate: 'https://example.com/sophie-debt.pdf'
      }
    }
  },
  {
    id: 5,
    propertyTitle: 'Loft moderne',
    candidateName: 'Thomas Moreau',
    location: 'Avenue de Châtelaine 45, 1219 Châtelaine',
    price: 1600,
    status: 'accepted',
    message: 'Artiste freelance, je cherche un espace lumineux pour travailler.',
    email: 'thomas.moreau@email.com',
    phone: '+41 22 333 44 55',
    createdAt: '2024-01-22',
    details: {
      age: 35,
      profession: 'Artiste freelance',
      employer: 'Indépendant',
      monthlyIncome: 4500,
      contractType: 'Freelance',
      workRate: '100%',
      maritalStatus: 'Célibataire',
      children: 0,
      nationality: 'Belge',
      currentAddress: 'Rue des Artistes 22, 1000 Lausanne',
      addressSince: '2021-09-01',
      movingReason: 'Besoin d\'un espace plus grand pour mon atelier',
      guarantor: {
        name: 'Claire Moreau',
        relationship: 'Sœur',
        phone: '+41 22 333 44 56',
        email: 'claire.moreau@email.com'
      },
      documents: {
        idDocument: 'https://example.com/thomas-id.pdf',
        employmentCertificate: 'https://example.com/thomas-employment.pdf',
        salarySlips: ['https://example.com/thomas-salary.pdf'],
        bankStatements: ['https://example.com/thomas-bank.pdf'],
        debtCertificate: 'https://example.com/thomas-debt.pdf'
      }
    }
  },
  {
    id: 6,
    propertyTitle: 'Studio cosy',
    candidateName: 'Emma Petit',
    location: 'Rue de Carouge 78, 1205 Genève',
    price: 1100,
    status: 'pending',
    message: 'Étudiante en médecine, très calme et responsable.',
    email: 'emma.petit@email.com',
    phone: '+41 22 999 11 22',
    createdAt: '2024-01-21',
    details: {
      age: 22,
      profession: 'Étudiante en médecine',
      employer: 'Université de Genève',
      monthlyIncome: 800,
      contractType: 'Étudiant',
      workRate: '100%',
      maritalStatus: 'Célibataire',
      children: 0,
      nationality: 'Suisse',
      currentAddress: 'Rue de l\'École 5, 1200 Genève',
      addressSince: '2023-09-01',
      movingReason: 'Cherche un studio plus proche de l\'hôpital',
      guarantor: {
        name: 'Robert Petit',
        relationship: 'Père',
        phone: '+41 22 999 11 23',
        email: 'robert.petit@email.com'
      },
      documents: {
        idDocument: 'https://example.com/emma-id.pdf',
        employmentCertificate: 'https://example.com/emma-employment.pdf',
        salarySlips: ['https://example.com/emma-salary.pdf'],
        bankStatements: ['https://example.com/emma-bank.pdf'],
        debtCertificate: 'https://example.com/emma-debt.pdf'
      }
    }
  }
])

const searchQuery = ref('')
const statusFilter = ref('')
const selectedApplication = ref(null)
const isModalOpen = ref(false)

// État d'authentification
const userProfile = ref(null)
const userRoles = ref([])
const loading = ref(true)
const isAuthenticated = ref(false)

// Mode actuel (candidat/annonceur)
const mode = computed(() => {
  const savedMode = localStorage.getItem('userMode')
  if (savedMode && (savedMode === 'candidat' || savedMode === 'annonceur')) {
    return savedMode
  }
  return 'candidat'
})

// Computed properties
const acceptedApplications = computed(() => 
  applications.value.filter(a => a.status === 'accepted').length
)

const pendingApplications = computed(() => 
  applications.value.filter(a => a.status === 'pending').length
)

const rejectedApplications = computed(() => 
  applications.value.filter(a => a.status === 'rejected').length
)

const filteredApplications = computed(() => {
  let filtered = applications.value

  if (searchQuery.value) {
    filtered = filtered.filter(a => 
      a.propertyTitle.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      a.candidateName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      a.location.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(a => a.status === statusFilter.value)
  }

  return filtered
})

// Méthodes
const getStatusClass = (status) => {
  switch (status) {
    case 'accepted':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'rejected':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'accepted':
      return 'Acceptée'
    case 'pending':
      return 'En attente'
    case 'rejected':
      return 'Refusée'
    default:
      return 'Inconnu'
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR')
}

const acceptApplication = (application) => {
  application.status = 'accepted'
  // TODO: Envoyer notification au candidat
}

const rejectApplication = (application) => {
  application.status = 'rejected'
  // TODO: Envoyer notification au candidat
}

const viewApplication = (application) => {
  selectedApplication.value = application
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedApplication.value = null
}

// Fonction pour récupérer le profil utilisateur
const fetchUserProfile = async () => {
  try {
    loading.value = true
    
    // Le middleware s'occupe déjà de la vérification d'authentification et des rôles
    // On peut donc directement utiliser les données du store
    const profile = await authStore.getUserProfile()
    userProfile.value = profile
    userRoles.value = profile?.roles || []
    isAuthenticated.value = authStore.isAuthenticated
    
    console.log('Profil utilisateur chargé:', {
      isAuthenticated: isAuthenticated.value,
      roles: userRoles.value,
      profile: userProfile.value
    })
    
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error)
    isAuthenticated.value = false
  } finally {
    loading.value = false
  }
}

// Initialisation
onMounted(async () => {
  await fetchUserProfile()
})

// Rafraîchir le profil quand on revient sur la page
onActivated(async () => {
  await fetchUserProfile()
})
</script>
