<template>
  <div>
    <!-- Skeleton pendant le chargement -->
    <div v-if="loading" class="space-y-6">
      <SkeletonLoader type="profile" />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SkeletonLoader v-for="i in 4" :key="i" type="card" />
      </div>
      <SkeletonLoader type="card" />
    </div>

    <!-- Contenu principal -->
    <div v-else>
      <!-- Profile Section -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div class="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div class="relative">
          <img
            :src="userProfile?.avatar_url || userProfile?.profile_photo_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'"
            alt="Profile"
            class="w-24 h-24 rounded-full object-cover"
          />
          <button @click="editProfilePhoto" 
                  class="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
            <Icon name="heroicons:camera" class="w-4 h-4" />
          </button>
        </div>
        <div>
          <h1 class="text-2xl font-bold mb-2">
            {{ userProfile?.first_name || 'Utilisateur' }} {{ userProfile?.last_name || '' }}
          </h1>
          <p class="text-gray-600 mb-4">
            {{ userRole === 'candidat' ? 'Candidat' : 'Annonceur' }} • {{ userProfile?.city || userProfile?.current_address || 'Non renseigné' }}
          </p>
          <button 
            v-if="profileCompletion < 100"
            @click="goToOnboarding"
            class="text-blue-600 hover:text-blue-700 font-medium"
          >
            Compléter mon profil
          </button>
          <div v-else class="flex items-center text-green-600">
            <Icon name="heroicons:check-circle" class="w-5 h-5 mr-2" />
            <span class="font-medium">Profil complet</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Grid - Différent selon le rôle -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <!-- Candidat -->
      <template v-if="userRole === 'candidat'">
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Icon name="heroicons:eye" class="h-6 w-6 text-blue-600" />
            </div>
            <span class="text-3xl font-bold">{{ stats.candidat.profileViews || 0 }}</span>
          </div>
          <p class="text-gray-600">Personnes qui ont vu mon profil</p>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Icon name="heroicons:document" class="h-6 w-6 text-green-600" />
            </div>
            <span class="text-3xl font-bold">{{ stats.candidat.applications || 0 }}</span>
          </div>
          <p class="text-gray-600">Candidatures envoyées</p>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Icon name="heroicons:magnifying-glass" class="h-6 w-6 text-purple-600" />
            </div>
            <span class="text-3xl font-bold">{{ stats.candidat.searches || 0 }}</span>
          </div>
          <p class="text-gray-600">Recherches effectuées</p>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Icon name="heroicons:heart" class="h-6 w-6 text-orange-600" />
            </div>
            <span class="text-3xl font-bold">{{ stats.candidat.favorites || 0 }}</span>
          </div>
          <p class="text-gray-600">Biens favoris</p>
        </div>
      </template>

      <!-- Annonceur -->
      <template v-else-if="userRole === 'annonceur'">
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Icon name="heroicons:home" class="h-6 w-6 text-blue-600" />
            </div>
            <span class="text-3xl font-bold">{{ stats.annonceur.properties || 0 }}</span>
          </div>
          <p class="text-gray-600">Biens publiés</p>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Icon name="heroicons:users" class="h-6 w-6 text-green-600" />
            </div>
            <span class="text-3xl font-bold">{{ stats.annonceur.applications || 0 }}</span>
          </div>
          <p class="text-gray-600">Candidatures reçues</p>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Icon name="heroicons:eye" class="h-6 w-6 text-purple-600" />
            </div>
            <span class="text-3xl font-bold">{{ stats.annonceur.views || 0 }}</span>
          </div>
          <p class="text-gray-600">Vues sur mes biens</p>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Icon name="heroicons:chart-bar" class="h-6 w-6 text-orange-600" />
            </div>
            <span class="text-3xl font-bold">{{ stats.annonceur.performance || 0 }}%</span>
          </div>
          <p class="text-gray-600">Performance</p>
        </div>
      </template>
    </div>

    <!-- Profile Completion -->
    <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 class="text-lg font-semibold mb-4">Statut du compte</h2>
      <div class="mb-4">
        <div class="flex justify-between mb-2">
          <span class="text-gray-600">Profil complété</span>
          <span class="font-medium">{{ profileCompletion }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div class="bg-blue-600 h-2 rounded-full" :style="`width: ${profileCompletion}%`"></div>
        </div>
      </div>
      <button 
        v-if="profileCompletion < 100"
        @click="goToOnboarding"
        class="text-blue-600 hover:text-blue-700 font-medium"
      >
        Compléter mon profil
      </button>
      <div v-else class="flex items-center text-green-600">
        <Icon name="heroicons:check-circle" class="w-5 h-5 mr-2" />
        <span class="font-medium">Profil complet</span>
      </div>
    </div>

    <!-- Documents Uploadés -->
    <div class="bg-white rounded-xl shadow-sm p-6">
      <h2 class="text-lg font-semibold mb-4">Documents uploadés</h2>
      <p class="text-sm text-gray-500 mb-4">Ces documents serons transmis à la regie ou au propriétaire lors de la soumission de votre candidature à une a une annonce</p>
      <!-- Candidat Documents -->
      <div v-if="userRole === 'candidat'" class="space-y-4">
        <!-- Pièce d'identité -->
        <div v-if="userProfile?.id_document_url" class="p-3 bg-gray-50 rounded-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Icon name="heroicons:identification" class="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h5 class="font-medium text-gray-900">Pièce d'identité</h5>
                <p class="text-sm text-gray-500">Document d'identité officiel</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="hidden sm:flex items-center gap-2">
                <a :href="userProfile.id_document_url" target="_blank" 
                   class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Voir
                </a>
                <button @click="editDocument('identity')" 
                        class="text-gray-600 hover:text-gray-700 text-sm font-medium">
                  Modifier
                </button>
              </div>
              <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-500" />
            </div>
          </div>
          <!-- Version mobile -->
          <div class="mt-3 flex flex-col gap-2 sm:hidden">
            <a :href="userProfile.id_document_url" target="_blank" 
               class="text-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Voir le document
            </a>
            <button @click="editDocument('identity')" 
                    class="px-3 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors">
              Modifier
            </button>
          </div>
        </div>

        <!-- Fiches de salaire -->
        <div v-if="userProfile?.salary_slips_urls?.length" class="p-3 bg-gray-50 rounded-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Icon name="heroicons:banknotes" class="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h5 class="font-medium text-gray-900">Fiches de salaire</h5>
                <p class="text-sm text-gray-500">{{ userProfile.salary_slips_urls.length }} document(s) uploadé(s)</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="hidden sm:flex items-center gap-2">
                <button @click="showDocuments('salary_slips')" 
                        class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Voir ({{ userProfile.salary_slips_urls.length }})
                </button>
                <button @click="editDocument('salary-slips')" 
                        class="text-gray-600 hover:text-gray-700 text-sm font-medium">
                  Modifier
                </button>
              </div>
              <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-500" />
            </div>
          </div>
          <!-- Version mobile -->
          <div class="mt-3 flex flex-col gap-2 sm:hidden">
            <button @click="showDocuments('salary_slips')" 
                    class="text-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Voir ({{ userProfile.salary_slips_urls.length }})
            </button>
            <button @click="editDocument('salary-slips')" 
                    class="px-3 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors">
              Modifier
            </button>
          </div>
        </div>

        <!-- Attestation employeur -->
        <div v-if="userProfile?.employment_certificate_url" class="p-3 bg-gray-50 rounded-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Icon name="heroicons:document-text" class="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h5 class="font-medium text-gray-900">Attestation de l'employeur</h5>
                <p class="text-sm text-gray-500">Certificat de travail</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="hidden sm:flex items-center gap-2">
                <a :href="userProfile.employment_certificate_url" target="_blank" 
                   class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Voir
                </a>
                <button @click="editDocument('employer-certificate')" 
                        class="text-gray-600 hover:text-gray-700 text-sm font-medium">
                  Modifier
                </button>
              </div>
              <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-500" />
            </div>
          </div>
          <!-- Version mobile -->
          <div class="mt-3 flex flex-col gap-2 sm:hidden">
            <a :href="userProfile.employment_certificate_url" target="_blank" 
               class="text-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Voir le document
            </a>
            <button @click="editDocument('employer-certificate')" 
                    class="px-3 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors">
              Modifier
            </button>
          </div>
        </div>

        <!-- Relevés bancaires -->
        <div v-if="userProfile?.bank_statements_urls?.length" class="p-3 bg-gray-50 rounded-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Icon name="heroicons:credit-card" class="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h5 class="font-medium text-gray-900">Relevés bancaires</h5>
                <p class="text-sm text-gray-500">{{ userProfile.bank_statements_urls.length }} document(s) uploadé(s)</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="hidden sm:flex items-center gap-2">
                <button @click="showDocuments('bank_statements')" 
                        class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Voir ({{ userProfile.bank_statements_urls.length }})
                </button>
                <button @click="editDocument('bank-statements')" 
                        class="text-gray-600 hover:text-gray-700 text-sm font-medium">
                  Modifier
                </button>
              </div>
              <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-500" />
            </div>
          </div>
          <!-- Version mobile -->
          <div class="mt-3 flex flex-col gap-2 sm:hidden">
            <button @click="showDocuments('bank_statements')" 
                    class="text-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Voir ({{ userProfile.bank_statements_urls.length }})
            </button>
            <button @click="editDocument('bank-statements')" 
                    class="px-3 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors">
              Modifier
            </button>
          </div>
        </div>

        <!-- Attestation de non-poursuite -->
        <div v-if="userProfile?.debt_certificate_url" class="p-3 bg-gray-50 rounded-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <Icon name="heroicons:shield-check" class="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h5 class="font-medium text-gray-900">Attestation de non-poursuite</h5>
                <p class="text-sm text-gray-500">Office des poursuites</p>
                <div class="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">
                  <Icon name="heroicons:clock" class="w-3 h-3" />
                  <span>Renouvelable tous les 3 mois</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="hidden sm:flex items-center gap-2">
                <a :href="userProfile.debt_certificate_url" target="_blank" 
                   class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Voir
                </a>
                <button @click="editDocument('debt-certificate')" 
                        class="text-gray-600 hover:text-gray-700 text-sm font-medium">
                  Modifier
                </button>
              </div>
              <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-500" />
            </div>
          </div>
          <!-- Version mobile -->
          <div class="mt-3 flex flex-col gap-2 sm:hidden">
            <a :href="userProfile.debt_certificate_url" target="_blank" 
               class="text-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Voir le document
            </a>
            <button @click="editDocument('debt-certificate')" 
                    class="px-3 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors">
              Modifier
            </button>
          </div>
        </div>

        <!-- Documents de garant -->
        <div v-if="userProfile?.guarantor_documents_urls?.length" class="p-3 bg-gray-50 rounded-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                <Icon name="heroicons:user-group" class="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h5 class="font-medium text-gray-900">Documents de garant</h5>
                <p class="text-sm text-gray-500">{{ userProfile.guarantor_documents_urls.length }} document(s) uploadé(s)</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="hidden sm:flex items-center gap-2">
                <button @click="showDocuments('guarantor_documents')" 
                        class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Voir ({{ userProfile.guarantor_documents_urls.length }})
                </button>
                <button @click="editDocument('guarantor-documents')" 
                        class="text-gray-600 hover:text-gray-700 text-sm font-medium">
                  Modifier
                </button>
              </div>
              <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-500" />
            </div>
          </div>
          <!-- Version mobile -->
          <div class="mt-3 flex flex-col gap-2 sm:hidden">
            <button @click="showDocuments('guarantor_documents')" 
                    class="text-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Voir ({{ userProfile.guarantor_documents_urls.length }})
            </button>
            <button @click="editDocument('guarantor-documents')" 
                    class="px-3 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors">
              Modifier
            </button>
          </div>
        </div>

        <!-- Message si aucun document -->
        <div v-if="!hasAnyDocuments" class="text-center py-8 text-gray-500">
          <Icon name="heroicons:document" class="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>Aucun document uploadé</p>
          <button @click="goToOnboarding" class="text-blue-600 hover:text-blue-700 font-medium mt-2">
            Ajouter des documents
          </button>
        </div>
      </div>

      <!-- Annonceur Documents -->
      <div v-else-if="userRole === 'annonceur'" class="space-y-4">
        <!-- Documents d'agence -->
        <div v-if="userProfile?.agency_license" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Icon name="heroicons:building-office" class="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h5 class="font-medium text-gray-900">Licence d'agence</h5>
              <p class="text-sm text-gray-500">Document officiel d'agence</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <a :href="userProfile.agency_license" target="_blank" 
               class="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Voir
            </a>
            <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-500" />
          </div>
        </div>

        <!-- Message si aucun document -->
        <div v-if="!userProfile?.agency_license" class="text-center py-8 text-gray-500">
          <Icon name="heroicons:document" class="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>Aucun document uploadé</p>
          <button @click="goToOnboarding" class="text-blue-600 hover:text-blue-700 font-medium mt-2">
            Ajouter des documents
          </button>
        </div>
      </div>
    </div>

    <!-- Modal pour afficher les documents multiples -->
    <div v-if="showDocumentsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h5 class="text-lg font-semibold">{{ modalTitle }}</h5>
            <button @click="closeDocumentsModal" class="text-gray-400 hover:text-gray-600">
              <Icon name="heroicons:x-mark" class="w-6 h-6" />
            </button>
          </div>
          
          <div class="space-y-3">
            <div v-for="(url, index) in modalDocuments" :key="index" 
                 class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center gap-3">
                <Icon name="heroicons:document" class="w-5 h-5 text-gray-400" />
                <span class="text-sm font-medium">Document {{ index + 1 }}</span>
              </div>
              <a :href="url" target="_blank" 
                 class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Ouvrir
              </a>
            </div>
          </div>
          
          <div class="mt-6 flex justify-end">
            <button @click="closeDocumentsModal" 
                    class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal pour modifier les documents -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h5 class="text-lg font-semibold">{{ editModalTitle }}</h5>
            <button @click="closeEditModal" class="text-gray-400 hover:text-gray-600">
              <Icon name="heroicons:x-mark" class="w-6 h-6" />
            </button>
          </div>
          
          <div class="space-y-4">
            <div class="text-center">
              <input 
                ref="fileInput" 
                type="file" 
                :accept="editModalAccept"
                :multiple="editModalMultiple"
                @change="handleFileUpload"
                class="hidden"
              />
              <button @click="triggerFileInput" 
                      class="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
                <Icon name="heroicons:cloud-arrow-up" class="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p class="text-sm text-gray-600">Cliquez pour sélectionner {{ editModalMultiple ? 'des fichiers' : 'un fichier' }}</p>
                <p class="text-xs text-gray-400 mt-1">{{ editModalAccept }}</p>
              </button>
            </div>
            
            <div v-if="uploading" class="text-center">
              <div class="inline-flex items-center gap-2 text-blue-600">
                <Icon name="heroicons:arrow-path" class="w-4 h-4 animate-spin" />
                <span class="text-sm">Upload en cours...</span>
              </div>
            </div>
            
            <div v-if="uploadError" class="text-center text-red-600 text-sm">
              {{ uploadError }}
            </div>
          </div>
          
          <div class="mt-6 flex justify-end gap-3">
            <button @click="closeEditModal" 
                    class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              Annuler
            </button>
            <button @click="saveDocument" 
                    :disabled="!selectedFile || uploading"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth.store'

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const authStore = useAuthStore()
const router = useRouter()

// État réactif
const userProfile = ref(null)
const userRole = ref('candidat') // Par défaut candidat
const profileCompletion = ref(0)
const loading = ref(true)

// État de la modal des documents
const showDocumentsModal = ref(false)
const modalDocuments = ref([])
const modalTitle = ref('')

// État de la modal d'édition
const showEditModal = ref(false)
const editModalTitle = ref('')
const editModalAccept = ref('')
const editModalMultiple = ref(false)
const selectedFile = ref(null)
const selectedFiles = ref([])
const uploading = ref(false)
const uploadError = ref('')
const currentEditType = ref('')
const fileInput = ref(null)

// Stats par défaut
const stats = ref({
  candidat: {
    profileViews: 0,
    applications: 0,
    searches: 0,
    favorites: 0
  },
  annonceur: {
    properties: 0,
    applications: 0,
    views: 0,
    performance: 0
  }
})

// Fonction pour aller à l'onboarding
const goToOnboarding = async () => {
  await navigateTo('/onboarding')
}

// Fonction pour vérifier si l'utilisateur a des documents
const hasAnyDocuments = computed(() => {
  if (!userProfile.value) return false
  
  if (userRole.value === 'candidat') {
    return userProfile.value.id_document_url ||
           userProfile.value.salary_slips_urls?.length ||
           userProfile.value.employment_certificate_url ||
           userProfile.value.bank_statements_urls?.length ||
           userProfile.value.debt_certificate_url ||
           userProfile.value.guarantor_documents_urls?.length
  } else if (userRole.value === 'annonceur') {
    return userProfile.value.agency_license
  }
  
  return false
})

// Fonction pour afficher les documents multiples
const showDocuments = (documentType) => {
  const documents = userProfile.value[`${documentType}_urls`]
  if (!documents || !documents.length) return
  
  // Définir le titre selon le type de document
  const titles = {
    'salary_slips': 'Fiches de salaire',
    'bank_statements': 'Relevés bancaires',
    'guarantor_documents': 'Documents de garant'
  }
  
  modalTitle.value = titles[documentType] || 'Documents'
  modalDocuments.value = documents
  showDocumentsModal.value = true
}

// Fonction pour fermer la modal
const closeDocumentsModal = () => {
  showDocumentsModal.value = false
  modalDocuments.value = []
  modalTitle.value = ''
}

// Fonction pour éditer un document
const editDocument = (documentType) => {
  const documentConfig = {
    'identity': {
      title: 'Modifier la pièce d\'identité',
      accept: '.pdf,.jpg,.jpeg,.png,.gif,.webp',
      multiple: false
    },
    'salary-slips': {
      title: 'Modifier les fiches de salaire',
      accept: '.pdf,.jpg,.jpeg,.png,.gif,.webp',
      multiple: true
    },
    'employer-certificate': {
      title: 'Modifier l\'attestation employeur',
      accept: '.pdf,.jpg,.jpeg,.png,.gif,.webp',
      multiple: false
    },
    'bank-statements': {
      title: 'Modifier les relevés bancaires',
      accept: '.pdf,.jpg,.jpeg,.png,.gif,.webp',
      multiple: true
    },
    'debt-certificate': {
      title: 'Modifier l\'attestation de non-poursuite',
      accept: '.pdf,.jpg,.jpeg,.png,.gif,.webp',
      multiple: false
    },
    'guarantor-documents': {
      title: 'Modifier les documents de garant',
      accept: '.pdf,.jpg,.jpeg,.png,.gif,.webp',
      multiple: true
    }
  }
  
  const config = documentConfig[documentType]
  if (!config) return
  
  currentEditType.value = documentType
  editModalTitle.value = config.title
  editModalAccept.value = config.accept
  editModalMultiple.value = config.multiple
  showEditModal.value = true
  uploadError.value = ''
  selectedFile.value = null
  selectedFiles.value = []
}

// Fonction pour éditer la photo de profil
const editProfilePhoto = () => {
  currentEditType.value = 'profile-photo'
  editModalTitle.value = 'Modifier la photo de profil'
  editModalAccept.value = 'image/*'
  editModalMultiple.value = false
  showEditModal.value = true
  uploadError.value = ''
  selectedFile.value = null
}

// Fonction pour déclencher la sélection de fichier
const triggerFileInput = () => {
  fileInput.value?.click()
}

// Fonction pour gérer l'upload de fichier
const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  if (files.length === 0) return
  
  if (editModalMultiple.value) {
    selectedFiles.value = files
  } else {
    selectedFile.value = files[0]
  }
  uploadError.value = ''
}

// Fonction pour sauvegarder le document
const saveDocument = async () => {
  if (!selectedFile.value && selectedFiles.value.length === 0) return
  
  uploading.value = true
  uploadError.value = ''
  
  try {
    const config = useRuntimeConfig()
    const token = authStore.getAuthToken()
    
    if (!token) {
      throw new Error('Token d\'authentification manquant')
    }
    
    if (currentEditType.value === 'profile-photo') {
      // Upload de la photo de profil
      const formData = new FormData()
      formData.append('file', selectedFile.value)
      
      const response = await $fetch(`${config.public.apiBase}/upload/avatar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })
      
      // Mettre à jour le profil avec la nouvelle photo
      await updateProfile({ avatar_url: response.url, profile_photo_url: response.url })
      
    } else {
      // Upload de documents
      const uploadPromises = editModalMultiple.value 
        ? selectedFiles.value.map(file => uploadDocument(file))
        : [uploadDocument(selectedFile.value)]
      
      const uploadResults = await Promise.all(uploadPromises)
      const urls = uploadResults.map(result => result.url)
      
      // Mettre à jour le profil avec les nouvelles URLs
      const updateData = {}
      if (editModalMultiple.value) {
        const fieldName = getDocumentFieldName(currentEditType.value)
        updateData[fieldName] = urls
      } else {
        const fieldName = getDocumentFieldName(currentEditType.value)
        updateData[fieldName] = urls[0]
      }
      
      await updateProfile(updateData)
    }
    
    // Rafraîchir le profil
    await fetchUserProfile()
    
    // Fermer la modal
    closeEditModal()
    
  } catch (error) {
    uploadError.value = error.message || 'Erreur lors de l\'upload'
  } finally {
    uploading.value = false
  }
}

// Fonction pour uploader un document
const uploadDocument = async (file) => {
  const config = useRuntimeConfig()
  const token = authStore.getAuthToken()
  
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await $fetch(`${config.public.apiBase}/upload/document`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })
  
  return response
}

// Fonction pour obtenir le nom du champ selon le type de document
const getDocumentFieldName = (documentType) => {
  const fieldMapping = {
    'identity': 'id_document_url',
    'salary-slips': 'salary_slips_urls',
    'employer-certificate': 'employment_certificate_url',
    'bank-statements': 'bank_statements_urls',
    'debt-certificate': 'debt_certificate_url',
    'guarantor-documents': 'guarantor_documents_urls'
  }
  
  return fieldMapping[documentType] || documentType
}

// Fonction pour mettre à jour le profil
const updateProfile = async (updateData) => {
  const config = useRuntimeConfig()
  const token = authStore.getAuthToken()
  
  await $fetch(`${config.public.apiBase}/user-profile/update`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: updateData
  })
}

// Fonction pour fermer la modal d'édition
const closeEditModal = () => {
  showEditModal.value = false
  editModalTitle.value = ''
  editModalAccept.value = ''
  editModalMultiple.value = false
  selectedFile.value = null
  selectedFiles.value = []
  uploading.value = false
  uploadError.value = ''
  currentEditType.value = ''
}


// Fonction pour calculer le pourcentage de completion du profil
const calculateProfileCompletion = (profile) => {
  if (!profile) return 0
  
  // Champs de base obligatoires
  const basicFields = [
    'first_name', 'last_name', 'email', 'phone'
  ]
  
  // Champs supplémentaires selon le rôle
  const additionalFields = userRole.value === 'candidat' ? [
    'birth_date', 'nationality', 'current_address', 'city', 'zip_code',
    'professional_status', 'employer', 'monthly_income'
  ] : [
    'preferred_language', 'correspondence_address'
  ]
  
  const allFields = [...basicFields, ...additionalFields]
  
  const completedFields = allFields.filter(field => 
    profile[field] && profile[field] !== null && profile[field] !== ''
  ).length
  
  return Math.round((completedFields / allFields.length) * 100)
}

// Fonction pour récupérer le profil utilisateur
const fetchUserProfile = async () => {
  try {
    loading.value = true
    const config = useRuntimeConfig()
    const token = authStore.getAuthToken()
    
    if (!token) return
    
    const response = await $fetch(`${config.public.apiBase}/user-profile/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    userProfile.value = response.profile || response
    userRole.value = response.roles?.[0] || 'candidat'
    profileCompletion.value = calculateProfileCompletion(response.profile || response)
    
    // Si c'est un candidat et que le profil n'est pas complet, afficher la modal après 3 secondes
    if (userRole.value === 'candidat' && profileCompletion.value < 50) {
      // setTimeout(() => {
      //   navigateTo('/onboarding')
      // }, 3000)
    }
    
  } catch (error) {
  } finally {
    loading.value = false
  }
}

// Fonction pour récupérer les stats
const fetchStats = async () => {
  try {
    const config = useRuntimeConfig()
    const token = authStore.getAuthToken()
    
    if (!token) return
    
    // Ici vous pouvez ajouter des appels API pour récupérer les vraies stats
    // Pour l'instant, on utilise des données mockées
    
    if (userRole.value === 'candidat') {
      // Stats pour candidat
      stats.value.candidat = {
        profileViews: 0,
        applications: 0,
        searches: 0,
        favorites: 0
      }
    } else if (userRole.value === 'annonceur') {
      // Stats pour annonceur
      stats.value.annonceur = {
        properties: 0,
        applications: 0,
        views: 0,
        performance: 0
      }
    }
    
  } catch (error) {
  }
}

// Initialisation
onMounted(async () => {
  await fetchUserProfile()
  await fetchStats()
})

// Rafraîchir le profil quand on revient sur la page
onActivated(async () => {
  await fetchUserProfile()
})
</script>
