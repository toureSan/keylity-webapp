<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- Header avec logo et bouton de fermeture -->
        <div class="flex justify-between items-center mt-40 mb-8">
          <div class="text-center flex-1">
            <img src="@/assets/images/logo-complet.png" alt="Keylity" class="h-16 w-auto mx-auto">
          </div>
          <button 
            @click="closeModal"
            class="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
          >
            <Icon name="heroicons:x-mark" class="w-6 h-6 text-gray-600" />
          </button>
      </div>
        
        <!-- Formulaire d'onboarding -->
        <div class="bg-white rounded-2xl shadow-xl p-8">

          <!-- Progress Bar -->
          <div class="mb-8">
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-medium text-gray-700">Étape {{ currentStep }} sur {{ totalSteps }}</span>
              <span
                class="text-sm font-medium text-primary-600">{{ Math.round((currentStep / totalSteps) * 100) }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                :style="{ width: (currentStep / totalSteps) * 100 + '%' }"></div>
      </div>
    </div>

          <!-- Error Message -->
          <div v-if="error" class="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <Icon name="heroicons:x-circle" class="h-5 w-5 text-red-500" />
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700 font-medium">{{ error }}</p>
              </div>
            </div>
          </div>

          <!-- Onboarding Card -->
          <div>
            <!-- Step 1: Welcome & User Type -->
            <div v-if="currentStep === 1" class="text-center">
              <div class="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="heroicons:home" class="w-10 h-10 text-primary-600" />
              </div>
              <h1 class="text-2xl font-bold mb-4">Commençons votre parcours</h1>
              <p class="text-gray-600 mb-8">
                Nous allons configurer votre profil en quelques étapes simples pour vous aider à trouver le bien
                parfait.
              </p>


              <!-- Message spécial si tous les profils sont complétés -->
              <div v-if="isCandidateCompleted && isAnnonceurCompleted" class="mb-6 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
                <div class="flex items-center justify-center gap-3 mb-3">
                  <Icon name="heroicons:check-circle" class="w-8 h-8 text-green-600" />
                  <h3 class="text-lg font-semibold text-green-900">Onboarding terminé !</h3>
                </div>
                <p class="text-green-700 mb-4">
                  Vous avez déjà complété l'onboarding pour les deux rôles. 
                  Vous allez être redirigé vers votre tableau de bord.
                </p>
                <div class="flex justify-center">
                  <NuxtLink to="/dashboard" class="btn btn-primary">
                    Aller au tableau de bord
                  </NuxtLink>
                </div>
              </div>

              <div v-if="!(isCandidateCompleted && isAnnonceurCompleted)" class="space-y-4 mb-8">
                <h2 class="text-lg font-semibold">Je suis :</h2>

                <div class="grid grid-cols-1 gap-6">
                  <button 
                    @click="canSelectCandidate ? selectUserType('tenant') : null"
                    @mousedown.prevent="!canSelectCandidate"
                    @keydown.prevent="!canSelectCandidate"
                    :disabled="!canSelectCandidate"
                    :tabindex="canSelectCandidate ? 0 : -1"
                    class="p-8 border-2 rounded-xl transition-all duration-200 text-left relative"
            :class="[
                      formData.userType === 'tenant' ? 'border-primary-500 bg-primary-50' : 'border-gray-200',
                      canSelectCandidate ? 'hover:border-primary-300 hover:bg-primary-50 cursor-pointer' : 'opacity-50 cursor-not-allowed bg-gray-50'
                    ]">
                    <div class="flex items-center gap-6">
                      <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon name="heroicons:user" class="w-8 h-8 text-blue-600" />
          </div>
                      <div class="flex-1">
                        <h3 class="text-xl font-semibold mb-2">Candidat locataire</h3>
                        <p class="text-gray-600">Je recherche un logement à louer</p>
                        <ul class="text-sm text-gray-500 mt-2 space-y-1">
                          <li>• Recherche de biens immobiliers</li>
                          <li>• Dossier de candidature digital</li>
                          <li>• Planification de visites</li>
                        </ul>
                        <div v-if="isCandidateCompleted" class="mt-3 flex items-center gap-2 text-green-600">
                          <Icon name="heroicons:check-circle" class="w-5 h-5" />
                          <span class="text-sm font-medium">Onboarding déjà fait</span>
      </div>
            </div>
            </div>
                  </button>

                  <button 
                    @click="canSelectAnnonceur ? selectUserType('landlord') : null"
                    @mousedown.prevent="!canSelectAnnonceur"
                    @keydown.prevent="!canSelectAnnonceur"
                    :disabled="!canSelectAnnonceur"
                    :tabindex="canSelectAnnonceur ? 0 : -1"
                    class="p-8 border-2 rounded-xl transition-all duration-200 text-left relative"
                    :class="[
                      formData.userType === 'landlord' ? 'border-primary-500 bg-primary-50' : 'border-gray-200',
                      canSelectAnnonceur ? 'hover:border-primary-300 hover:bg-primary-50 cursor-pointer' : 'opacity-50 cursor-not-allowed bg-gray-50'
                    ]">
                    <div class="flex items-center gap-6">
                      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <Icon name="heroicons:building-office-2" class="w-8 h-8 text-green-600" />
            </div>
                      <div class="flex-1">
                        <h3 class="text-xl font-semibold mb-2">Propriétaire / Agence</h3>
                        <p class="text-gray-600">Je souhaite louer mon bien ou gérer des propriétés</p>
                        <ul class="text-sm text-gray-500 mt-2 space-y-1">
                          <li>• Publication d'annonces immobilières</li>
                          <li>• Gestion des candidatures</li>
                          <li>• Outils de gestion locative</li>
                        </ul>
                        <div v-if="isAnnonceurCompleted" class="mt-3 flex items-center gap-2 text-green-600">
                          <Icon name="heroicons:check-circle" class="w-5 h-5" />
                          <span class="text-sm font-medium">Onboarding déjà fait</span>
            </div>
            </div>
            </div>
                  </button>
            </div>
            </div>
          </div>
        </div>

            <!-- Step 2: Personal Information (TENANT) -->
            <div v-if="currentStep === 2 && formData.userType === 'tenant'">
              <h2 class="text-2xl font-bold mb-6">Informations personnelles</h2>
              <div class="space-y-6">
                <!-- Photo de profil -->
                <div class="text-center mb-6">
                  <ClientOnly>
                    <div class="relative inline-block">
                      <img
                        :src="formData.profilePhoto || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'"
                        alt="Photo de profil" class="w-24 h-24 rounded-full object-cover border-4 border-gray-100">
                      <button @click="triggerPhotoUpload"
                        class="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors">
                        <Icon name="heroicons:camera" class="w-4 h-4" />
                      </button>
                      <input v-if="clientLoaded" ref="photoInput" type="file" accept="image/*"
                        @change="handlePhotoUpload" class="hidden">
            </div>
                  </ClientOnly>
                  <p class="text-sm text-gray-500 mt-2">Ajoutez votre photo de profil</p>
            </div>

                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                    <input v-model="formData.firstName" type="text" required
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Votre prénom">
            </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                    <input v-model="formData.lastName" type="text" required
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Votre nom">
          </div>
        </div>

                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Date de naissance *</label>
                    <input v-model="formData.birthDate" type="date" required
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
        </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nationalité *</label>
                    <select v-model="formData.nationality" required
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option value="">Sélectionner</option>
                      <option value="CH">Suisse</option>
                      <option value="FR">France</option>
                      <option value="DE">Allemagne</option>
                      <option value="IT">Italie</option>
                      <option value="AT">Autriche</option>
                      <option value="OTHER">Autre</option>
                    </select>
        </div>
        </div>

                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Situation familiale *</label>
                    <select v-model="formData.maritalStatus" required
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option value="">Sélectionner</option>
                      <option value="single">Célibataire</option>
                      <option value="married">Marié(e)</option>
                      <option value="partnership">En concubinage</option>
                      <option value="divorced">Divorcé(e)</option>
                      <option value="widowed">Veuf/Veuve</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nombre d'enfants à charge</label>
                    <select v-model="formData.children"
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4+">4 ou plus</option>
                    </select>
                  </div>
                </div>

                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
                    <input v-model="formData.phone" type="tel" required
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="+41 79 123 45 67">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input v-model="formData.email" type="email" required
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="votre@email.com">
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Adresse actuelle *</label>
                  <input v-model="formData.currentAddress" type="text" required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Rue, numéro">
                </div>

                <div class="grid md:grid-cols-3 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Code postal *</label>
                    <input v-model="formData.zipCode" type="text" required
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="1200">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Ville *</label>
                    <input v-model="formData.city" type="text" required
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Genève">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Depuis quand à cette adresse ? *</label>
                    <input v-model="formData.addressSince" type="date" required
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Motif du déménagement *</label>
                  <textarea v-model="formData.movingReason" required rows="3"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Expliquez brièvement pourquoi vous souhaitez déménager..."></textarea>
                </div>
              </div>
            </div>

            <!-- Step 3: Professional Information (TENANT) -->
            <div v-if="currentStep === 3 && formData.userType === 'tenant'">
              <h2 class="text-2xl font-bold mb-6">Situation professionnelle</h2>
              <div class="space-y-6">
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Statut professionnel *</label>
                    <select v-model="formData.professionalStatus" required
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option value="">Sélectionner</option>
                      <option value="employee">Salarié</option>
                      <option value="self-employed">Indépendant</option>
                      <option value="student">Étudiant</option>
                      <option value="retired">Retraité</option>
                      <option value="unemployed">Au chômage</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ formData.professionalStatus === 'student' ? 'Établissement scolaire' : 'Nom de l\'employeur' }}
                      *
              </label>
                    <input v-model="formData.employer" type="text" required
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      :placeholder="formData.professionalStatus === 'student' ? 'Université de Genève' : 'Nom de votre entreprise'">
            </div>
                </div>

                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Poste occupé *</label>
                    <input v-model="formData.position" type="text" required
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Ex: Développeur, Médecin, Étudiant...">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Taux d'activité (%) *</label>
                    <select v-model="formData.workRate" required
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option value="">Sélectionner</option>
                      <option value="100">100%</option>
                      <option value="80">80%</option>
                      <option value="60">60%</option>
                      <option value="50">50%</option>
                      <option value="40">40%</option>
                      <option value="20">20%</option>
              </select>
            </div>
            </div>

                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Type de contrat *</label>
                    <select v-model="formData.contractType" required
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option value="">Sélectionner</option>
                      <option value="CDI">CDI</option>
                      <option value="CDD">CDD</option>
                      <option value="temporary">Temporaire</option>
                      <option value="internship">Stage</option>
                      <option value="freelance">Freelance</option>
                    </select>
                </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Date de début du contrat actuel
                      *</label>
                    <input v-model="formData.contractStartDate" type="date" required
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                </div>
                </div>

                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Revenus nets mensuels (CHF) *</label>
                    <input v-model="formData.monthlyIncome" type="number" required
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="5000">
              </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Revenu du co-demandeur (CHF)</label>
                    <input v-model="formData.partnerIncome" type="number"
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="0">
            </div>
          </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Autres revenus (allocations, pensions,
                    etc.)</label>
                  <textarea v-model="formData.otherIncome" rows="3"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Décrivez vos autres sources de revenus si applicable..."></textarea>
        </div>
              </div>
            </div>

            <!-- Step 4: Document Upload (TENANT) -->
            <div v-if="currentStep === 4 && formData.userType === 'tenant'">
              <h2 class="text-2xl font-bold mb-6">Documents requis</h2>
              <p class="text-gray-600 mb-6">
                Ajoutez vos documents pour créer un dossier de candidature complet.
                Vous pourrez les modifier plus tard dans votre profil.
              </p>
              
              <!-- Indicateur de progression des documents -->
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-sm font-medium text-blue-800">Progression des documents</h3>
                  <span class="text-sm text-blue-600">
                    {{ getUploadedDocumentsCount() }}/{{ getRequiredDocumentsCount() }} documents uploadés
                  </span>
                </div>
                <div class="w-full bg-blue-200 rounded-full h-2">
                  <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                       :style="{ width: `${(getUploadedDocumentsCount() / getRequiredDocumentsCount()) * 100}%` }"></div>
                </div>
                <p v-if="getMissingDocuments().length > 0" class="text-sm text-blue-700 mt-2">
                  Documents manquants : {{ getMissingDocuments().map(docId => {
                    const doc = requiredDocumentsTenant.find(d => d.id === docId)
                    return doc ? doc.name : docId
                  }).join(', ') }}
                </p>
              </div>

              <div class="space-y-4">
                <div v-for="docType in requiredDocumentsTenant" :key="docType.id"
                  class="border border-gray-200 rounded-lg p-4">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                        <Icon :name="docType.icon" class="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 class="font-medium">{{ docType.name }}</h3>
                        <p class="text-sm text-gray-500">{{ docType.description }}</p>
                      </div>
                    </div>
                    <span v-if="uploadedDocuments[docType.id]"
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Icon name="heroicons:check" class="w-3 h-3 mr-1" />
                      Ajouté
                    </span>
                  </div>

                  <div v-if="uploadedDocuments[docType.id]" class="mb-3 p-3 bg-gray-50 rounded-lg">
                    <div class="flex items-center gap-3">
                      <Icon name="heroicons:document" class="w-5 h-5 text-gray-400" />
                      <span class="text-sm font-medium">{{ uploadedDocuments[docType.id].name }}</span>
                    </div>
                  </div>

                  <input v-if="clientLoaded" :data-ref="`fileInput-${docType.id}`" type="file" :accept="docType.accept"
                    :multiple="docType.multiple || false"
                    @change="handleDocumentUpload($event, docType.id)" class="hidden">
                  <button @click="triggerDocumentUpload(docType.id)" class="w-full btn btn-outline text-sm">
                    <Icon name="heroicons:cloud-arrow-up" class="w-4 h-4 mr-2" />
                    {{ uploadedDocuments[docType.id] ? 'Remplacer' : 'Ajouter' }} le document
          </button>
                </div>
              </div>
            </div>

            <!-- Step 2: Owner/Agency Information -->
            <div v-if="currentStep === 2 && formData.userType === 'landlord'">
              <h2 class="text-2xl font-bold mb-6">Informations du propriétaire</h2>

              <!-- Photo de profil -->
              <div class="text-center mb-6">
                <ClientOnly>
                  <div class="relative inline-block">
                    <img
                      :src="formData.profilePhoto || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'"
                      alt="Photo de profil" class="w-24 h-24 rounded-full object-cover border-4 border-gray-100">
                    <button @click="triggerPhotoUpload"
                      class="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors">
                      <Icon name="heroicons:camera" class="w-4 h-4" />
          </button>
                    <input v-if="clientLoaded" ref="photoInput" type="file" accept="image/*" @change="handlePhotoUpload"
                      class="hidden">
        </div>
                </ClientOnly>
                <p class="text-sm text-gray-500 mt-2">Ajoutez votre photo de profil</p>
      </div>

              <div class="space-y-6">
                <!-- Type d'annonceur -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Type d'annonceur *</label>
                  <div class="grid grid-cols-2 gap-4">
                    <button @click="formData.advertiserType = 'individual'" type="button"
                      class="p-4 border-2 rounded-lg transition-all duration-200 text-left"
                      :class="formData.advertiserType === 'individual' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'">
                      <h3 class="font-medium">Particulier</h3>
                      <p class="text-sm text-gray-500">Propriétaire individuel</p>
                    </button>
                    <button @click="formData.advertiserType = 'professional'" type="button"
                      class="p-4 border-2 rounded-lg transition-all duration-200 text-left"
                      :class="formData.advertiserType === 'professional' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'">
                      <h3 class="font-medium">Professionnel</h3>
                      <p class="text-sm text-gray-500">Agence ou régie</p>
                    </button>
                  </div>
                </div>

                <!-- Informations générales -->
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ formData.advertiserType === 'professional' ? 'Raison sociale' : 'Nom' }} *
                    </label>
                    <input v-model="formData.companyName" type="text" required
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      :placeholder="formData.advertiserType === 'professional' ? 'Nom de l\'agence' : 'Votre nom'">
                  </div>
                  <div v-if="formData.advertiserType === 'individual'">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                    <input v-model="formData.firstName" type="text" required
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Votre prénom">
                  </div>
                </div>

                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input v-model="formData.email" type="email" required
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="contact@email.com">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
                    <input v-model="formData.phone" type="tel" required
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="+41 22 123 45 67">
                  </div>
                </div>

                <!-- Informations spécifiques aux professionnels -->
                <div v-if="formData.advertiserType === 'professional'" class="space-y-6">
                  <div class="grid md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">N° IDE / TVA</label>
                      <input v-model="formData.ideNumber" type="text"
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="CHE-123.456.789">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Site web (facultatif)</label>
                      <input v-model="formData.website" type="url"
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="https://www.agence.ch">
                    </div>
                  </div>

                  <div class="grid md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Représentant légal *</label>
                      <input v-model="formData.legalRepresentative" type="text" required
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Nom du représentant">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Rôle du représentant *</label>
                      <select v-model="formData.representativeRole" required
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                        <option value="">Sélectionner</option>
                        <option value="director">Directeur</option>
                        <option value="manager">Gérant</option>
                        <option value="owner">Propriétaire</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nom de l'agent responsable de la
                      location</label>
                    <input v-model="formData.responsibleAgent" type="text"
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Nom de l'agent">
                  </div>
                </div>

                <!-- Informations spécifiques aux particuliers -->
                <div v-if="formData.advertiserType === 'individual'" class="space-y-6">
                  <div class="grid md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Statut *</label>
                      <select v-model="formData.ownerStatus" required
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                        <option value="">Sélectionner</option>
                        <option value="owner">Propriétaire</option>
                        <option value="subletting">Sous-locataire autorisé</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Nombre de logements loués
                        actuellement</label>
                      <select v-model="formData.numberOfProperties"
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                        <option value="1">1</option>
                        <option value="2-5">2-5</option>
                        <option value="6-10">6-10</option>
                        <option value="10+">Plus de 10</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Lien avec le bien *</label>
                    <select v-model="formData.propertyRelation" required
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option value="">Sélectionner</option>
                      <option value="direct-owner">Propriétaire direct</option>
                      <option value="heir">Héritier</option>
                      <option value="subletting">Sous-location avec accord écrit</option>
                    </select>
                  </div>
                </div>

                <!-- Préférences de contact -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Langue de contact préférée *</label>
                  <select v-model="formData.preferredLanguage" required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="">Sélectionner</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="it">Italiano</option>
                    <option value="en">English</option>
              </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Moyens de contact souhaités *</label>
                  <div class="space-y-2">
                    <label class="flex items-center">
                      <input v-model="formData.contactMethods" value="email" type="checkbox"
                        class="rounded border-gray-300 text-primary-600 focus:ring-primary-500">
                      <span class="ml-2">Email</span>
                    </label>
                    <label class="flex items-center">
                      <input v-model="formData.contactMethods" value="phone" type="checkbox"
                        class="rounded border-gray-300 text-primary-600 focus:ring-primary-500">
                      <span class="ml-2">Téléphone</span>
                    </label>
                    <label class="flex items-center">
                      <input v-model="formData.contactMethods" value="sms" type="checkbox"
                        class="rounded border-gray-300 text-primary-600 focus:ring-primary-500">
                      <span class="ml-2">SMS</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Adresse de correspondance *</label>
                  <textarea v-model="formData.correspondenceAddress" required rows="3"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Adresse complète..."></textarea>
                </div>
              </div>
            </div>

            <!-- Step 3: Document Upload (Owner/Agency) -->
            <div v-if="currentStep === 3 && formData.userType === 'landlord'">
              <h2 class="text-2xl font-bold mb-6">Documents requis</h2>
              <p class="text-gray-600 mb-6">
                Ajoutez les documents nécessaires pour valider votre profil.
              </p>
              
              <!-- Indicateur de progression des documents -->
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-sm font-medium text-blue-800">Progression des documents</h3>
                  <span class="text-sm text-blue-600">
                    {{ getUploadedDocumentsCount() }}/{{ getRequiredDocumentsCount() }} documents uploadés
                  </span>
                </div>
                <div class="w-full bg-blue-200 rounded-full h-2">
                  <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                       :style="{ width: `${(getUploadedDocumentsCount() / getRequiredDocumentsCount()) * 100}%` }"></div>
                </div>
                <p v-if="getMissingDocuments().length > 0" class="text-sm text-blue-700 mt-2">
                  Documents manquants : {{ getMissingDocuments().map(docId => {
                    const doc = getRequiredDocumentsForOwner().find(d => d.id === docId)
                    return doc ? doc.name : docId
                  }).join(', ') }}
                </p>
              </div>

              <div class="space-y-4">
                <div v-for="docType in getRequiredDocumentsForOwner()" :key="docType.id"
                  class="border border-gray-200 rounded-lg p-4">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                        <Icon :name="docType.icon" class="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 class="font-medium">{{ docType.name }}</h3>
                        <p class="text-sm text-gray-500">{{ docType.description }}</p>
                      </div>
                    </div>
                    <span v-if="uploadedDocuments[docType.id]"
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Icon name="heroicons:check" class="w-3 h-3 mr-1" />
                      Ajouté
                    </span>
                  </div>

                  <!-- Affichage des documents uploadés -->
                  <div v-if="uploadedDocuments[docType.id]" class="mb-3 p-3 bg-gray-50 rounded-lg">
                    <!-- Document simple -->
                    <div v-if="!docType.multiple" class="flex items-center gap-3">
                      <Icon name="heroicons:document" class="w-5 h-5 text-gray-400" />
                      <span class="text-sm font-medium">{{ uploadedDocuments[docType.id].name }}</span>
                    </div>
                    
                    <!-- Documents multiples -->
                    <div v-else>
                      <div class="flex items-center gap-2 mb-2">
                        <Icon name="heroicons:document" class="w-5 h-5 text-gray-400" />
                        <span class="text-sm font-medium">{{ uploadedDocuments[docType.id].name }}</span>
                      </div>
                      <div class="space-y-1">
                        <div v-for="(file, index) in multipleDocuments[docType.id]" :key="index" 
                             class="flex items-center gap-2 text-xs text-gray-600">
                          <Icon name="heroicons:paper-clip" class="w-3 h-3" />
                          <span>{{ file.name }}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <input v-if="clientLoaded" :data-ref="`fileInput-${docType.id}`" type="file" :accept="docType.accept"
                    :multiple="docType.multiple || false"
                    @change="handleDocumentUpload($event, docType.id)" class="hidden">
                  <button @click="triggerDocumentUpload(docType.id)" class="w-full btn btn-outline text-sm">
                    <Icon name="heroicons:cloud-arrow-up" class="w-4 h-4 mr-2" />
                    <span v-if="docType.multiple">
                      {{ uploadedDocuments[docType.id] ? 'Ajouter d\'autres' : 'Ajouter' }} documents
                      ({{ multipleDocuments[docType.id]?.length || 0 }}/{{ docType.maxFiles }})
                    </span>
                    <span v-else>
                      {{ uploadedDocuments[docType.id] ? 'Remplacer' : 'Ajouter' }} le document
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Step 5: Completion -->
            <div v-if="currentStep === totalSteps">
              <div class="text-center">
                <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="heroicons:check" class="w-10 h-10 text-green-600" />
                </div>
                <h2 class="text-2xl font-bold mb-4">Félicitations !</h2>
                <p class="text-gray-600 mb-8">
                  Votre profil est maintenant configuré. Vous pouvez commencer à
                  {{ formData.userType === 'tenant' ? 'rechercher des biens' : 'publier vos annonces' }}
                  ou compléter votre dossier dans votre espace personnel.
                </p>

                <div class="bg-primary-50 rounded-lg p-6 mb-8">
                  <h3 class="font-semibold mb-4">Récapitulatif de votre profil :</h3>
                  <div class="text-left space-y-2 text-sm">
                    <p><strong>Type :</strong> {{ getUserTypeLabel() }}</p>
                    <p><strong>Nom :</strong> {{ formData.firstName }} {{ formData.lastName || formData.companyName }}
                    </p>
                    <p><strong>Email :</strong> {{ formData.email }}</p>
                    <p v-if="formData.userType === 'tenant'"><strong>Profession :</strong> {{ formData.position }}</p>
                    <p v-if="formData.userType === 'tenant'"><strong>Revenus :</strong> CHF
                      {{ formData.monthlyIncome }}/mois
                    </p>
                    <p><strong>Documents ajoutés :</strong> {{ Object.keys(uploadedDocuments).length }}</p>
                  </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                  <NuxtLink to="/dashboard" class="btn btn-primary">
                    Accéder au tableau de bord
                  </NuxtLink>
                  <NuxtLink :to="formData.userType === 'tenant' ? '/search' : '/dashboard/properties'"
                    class="btn btn-outline">
                    {{ formData.userType === 'tenant' ? 'Commencer la recherche' : 'Publier une annonce' }}
                  </NuxtLink>
                </div>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div v-if="currentStep < totalSteps" class="flex justify-between mt-8">
              <button v-if="currentStep > 1" @click="previousStep" class="btn btn-outline">
                <Icon name="heroicons:arrow-left" class="w-4 h-4 mr-2" />
                Précédent
              </button>
              <div v-else></div>

        
             

              <button @click="currentStep === totalSteps - 1 ? submitOnboarding() : nextStep()"
                :disabled="!canProceed || loading"
                class="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                <span v-if="loading" class="mr-2">
                  <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                </span>
                {{ loading ? 'Sauvegarde...' : (currentStep === totalSteps - 1 ? 'Terminer' : 'Suivant') }}
                <Icon v-if="!loading" name="heroicons:arrow-right" class="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Props
const props = defineProps({
  mode: {
    type: String,
    default: 'candidat'
  },
  userProfile: {
    type: Object,
    default: () => ({})
  },
  userRoles: {
    type: Array,
    default: () => []
  }
})

// Plus besoin d'emits car on redirige directement

// Computed properties pour vérifier les rôles complétés
const isCandidateCompleted = computed(() => {
  if (!props.userProfile || Object.keys(props.userProfile).length === 0) return false
  
  // Vérifier si l'utilisateur a déjà fait l'onboarding en tant que candidat
  const hasCandidateRole = props.userRoles.includes('candidat')
  
  // Vérifier si l'onboarding candidat est complété
  // Utiliser les nouveaux champs si disponibles, sinon fallback sur l'ancien système
  const isOnboarded = props.userProfile.candidate_onboarding_completed === true || 
                     (props.userProfile.candidate_onboarding_completed === false && 
                      props.userProfile.is_onboarded === true && 
                      hasCandidateRole)
  
  
  return hasCandidateRole && isOnboarded
})

const isAnnonceurCompleted = computed(() => {
  if (!props.userProfile || Object.keys(props.userProfile).length === 0) return false
  
  // Vérifier si l'utilisateur a déjà fait l'onboarding en tant qu'annonceur
  const hasAnnonceurRole = props.userRoles.includes('annonceur')
  
  // Vérifier si l'onboarding annonceur est complété
  // Utiliser les nouveaux champs si disponibles, sinon fallback sur l'ancien système
  const isOnboarded = props.userProfile.annonceur_onboarding_completed === true || 
                     (props.userProfile.annonceur_onboarding_completed === undefined && 
                      props.userProfile.is_onboarded === true && 
                      hasAnnonceurRole)
  
  
  return hasAnnonceurRole && isOnboarded
})

const canSelectCandidate = computed(() => {
  return !isCandidateCompleted.value
})

const canSelectAnnonceur = computed(() => {
  return !isAnnonceurCompleted.value
})

// Reactive data
const currentStep = ref(1)
const totalSteps = ref(5)
const photoInput = ref(null)
const clientLoaded = ref(false)
const loading = ref(false)
const error = ref('')

const formData = ref({
  userType: '',
  profilePhoto: '',

  // Personal info (tenant)
  firstName: '',
  lastName: '',
  birthDate: '',
  nationality: '',
  maritalStatus: '',
  children: '0',
  phone: '',
  email: '',
  currentAddress: '',
  zipCode: '',
  city: '',
  addressSince: '',
  movingReason: '',

  // Professional info (tenant)
  professionalStatus: '',
  employer: '',
  position: '',
  workRate: '',
  contractType: '',
  contractStartDate: '',
  monthlyIncome: '',
  partnerIncome: '',
  otherIncome: '',

  // Owner/Agency info
  advertiserType: '',
  companyName: '',
  ideNumber: '',
  website: '',
  legalRepresentative: '',
  representativeRole: '',
  responsibleAgent: '',
  ownerStatus: '',
  numberOfProperties: '',
  propertyRelation: '',
  preferredLanguage: '',
  contactMethods: [],
  correspondenceAddress: ''
})

const uploadedDocuments = ref({})

// Structure pour gérer les documents multiples
const multipleDocuments = ref({
  'salary-slips': [],
  'bank-statements': [],
  'guarantor-documents': []
})

// Document types for tenants
const requiredDocumentsTenant = [
  {
    id: 'identity',
    name: 'Pièce d\'identité ou passeport',
    description: 'Document d\'identité officiel',
    icon: 'heroicons:identification',
    accept: '.pdf,.jpg,.jpeg,.png'
  },
  {
    id: 'salary-slips',
    name: '3 dernières fiches de salaire',
    description: 'Bulletins de salaire récents',
    icon: 'heroicons:banknotes',
    accept: '.pdf',
    multiple: true,
    maxFiles: 3
  },
  {
    id: 'employer-certificate',
    name: 'Attestation de l\'employeur',
    description: 'Certificat de travail ou attestation',
    icon: 'heroicons:document-text',
    accept: '.pdf'
  },
  {
    id: 'bank-statements',
    name: '3 derniers relevés bancaires',
    description: 'Relevés de compte récents',
    icon: 'heroicons:credit-card',
    accept: '.pdf',
    multiple: true,
    maxFiles: 3
  },
  {
    id: 'debt-certificate',
    name: 'Attestation de non-poursuite',
    description: 'Office des poursuites en Suisse',
    icon: 'heroicons:shield-check',
    accept: '.pdf'
  }
]

// Document types for owners (individual)
const requiredDocumentsOwnerIndividual = [
  {
    id: 'identity',
    name: 'Pièce d\'identité',
    description: 'Document d\'identité officiel',
    icon: 'heroicons:identification',
    accept: '.pdf,.jpg,.jpeg,.png'
  },
  {
    id: 'property-proof',
    name: 'Preuve de propriété',
    description: 'Extrait RF, acte notarié, etc.',
    icon: 'heroicons:home',
    accept: '.pdf'
  },
  {
    id: 'subletting-agreement',
    name: 'Accord écrit du propriétaire',
    description: 'En cas de sous-location',
    icon: 'heroicons:document-text',
    accept: '.pdf',
    conditional: true
  }
]

// Document types for agencies
const requiredDocumentsAgency = [
  {
    id: 'company-registration',
    name: 'Extrait du registre du commerce',
    description: 'Document officiel de l\'entreprise',
    icon: 'heroicons:building-office-2',
    accept: '.pdf'
  },
  {
    id: 'professional-insurance',
    name: 'Assurance responsabilité professionnelle',
    description: 'Police d\'assurance RC professionnelle',
    icon: 'heroicons:shield-check',
    accept: '.pdf'
  },
  {
    id: 'management-mandate',
    name: 'Mandat de gestion',
    description: 'Autorisation de gestion des biens',
    icon: 'heroicons:document-text',
    accept: '.pdf'
  }
]

// Lifecycle hooks
onMounted(() => {
  clientLoaded.value = true
  
  
  // Vérifier si tous les profils sont complétés
  if (isCandidateCompleted.value && isAnnonceurCompleted.value) {
    // Rediriger vers le dashboard si tous les profils sont complétés
    setTimeout(() => {
      navigateTo('/dashboard')
    }, 2000)
    return
  }
  
  // Si un mode est spécifié, l'utiliser
  if (props.mode) {
    formData.value.userType = props.mode === 'annonceur' ? 'landlord' : 'tenant'
    selectUserType(formData.value.userType)
  }
})

// Computed properties
const canProceed = computed(() => {
  // Empêcher de continuer si l'onboarding pour ce rôle est déjà complété
  if (formData.value.userType === 'tenant' && isCandidateCompleted.value) {
    return false
  }
  if (formData.value.userType === 'landlord' && isAnnonceurCompleted.value) {
    return false
  }
  
  switch (currentStep.value) {
    case 1:
      return formData.value.userType !== ''
    case 2:
      if (formData.value.userType === 'tenant') {
        return formData.value.firstName && formData.value.lastName && formData.value.email &&
          formData.value.phone && formData.value.birthDate && formData.value.nationality &&
          formData.value.maritalStatus && formData.value.currentAddress && formData.value.zipCode &&
          formData.value.city && formData.value.addressSince && formData.value.movingReason
      } else {
        return formData.value.email && formData.value.phone && formData.value.advertiserType &&
          (formData.value.companyName || formData.value.firstName) && formData.value.preferredLanguage &&
          formData.value.contactMethods.length > 0 && formData.value.correspondenceAddress
      }
    case 3:
      if (formData.value.userType === 'tenant') {
        return formData.value.professionalStatus && formData.value.employer && formData.value.position &&
          formData.value.workRate && formData.value.contractType && formData.value.contractStartDate &&
          formData.value.monthlyIncome
      }
      return true
    case 4:
      // Validation des documents obligatoires
      if (formData.value.userType === 'tenant') {
        const requiredDocs = ['identity', 'salary-slips', 'employer-certificate', 'bank-statements', 'debt-certificate']
        return requiredDocs.every(docId => {
          const docType = requiredDocumentsTenant.find(doc => doc.id === docId)
          if (docType?.multiple) {
            return multipleDocuments.value[docId]?.length > 0
          } else {
            return uploadedDocuments.value[docId]?.url
          }
        })
      } else {
        // Pour les propriétaires, vérifier les documents selon le type
        const requiredDocs = getRequiredDocumentsForOwner().map(doc => doc.id)
        return requiredDocs.every(docId => {
          const docType = getRequiredDocumentsForOwner().find(doc => doc.id === docId)
          if (docType?.multiple) {
            return multipleDocuments.value[docId]?.length > 0
          } else {
            return uploadedDocuments.value[docId]?.url
          }
        })
      }
    default:
      return true
  }
})

// Validation complète pour la soumission finale
const isFormComplete = computed(() => {
  // Champs obligatoires de base
  const basicFields = formData.value.firstName && formData.value.lastName && 
                     formData.value.email && formData.value.phone
  
  if (!basicFields) return false
  
  if (formData.value.userType === 'tenant') {
    // Validation complète pour les candidats
    const personalFields = formData.value.birthDate && formData.value.nationality &&
                          formData.value.maritalStatus && formData.value.currentAddress &&
                          formData.value.zipCode && formData.value.city &&
                          formData.value.addressSince && formData.value.movingReason
    
    const professionalFields = formData.value.professionalStatus && formData.value.employer &&
                              formData.value.position && formData.value.workRate &&
                              formData.value.contractType && formData.value.contractStartDate &&
                              formData.value.monthlyIncome
    
    // Documents obligatoires
    const requiredDocs = ['identity', 'salary-slips', 'employer-certificate', 'bank-statements', 'debt-certificate']
    const documentsUploaded = requiredDocs.every(docId => {
      const docType = requiredDocumentsTenant.find(doc => doc.id === docId)
      if (docType?.multiple) {
        // Pour les documents multiples, vérifier qu'il y a au moins un document
        return multipleDocuments.value[docId]?.length > 0
  } else {
        // Pour les documents simples, vérifier l'URL
        return uploadedDocuments.value[docId]?.url
      }
    })
    
    return personalFields && professionalFields && documentsUploaded
  } else {
    // Validation pour les propriétaires
    const ownerFields = formData.value.advertiserType && formData.value.preferredLanguage &&
                       formData.value.contactMethods.length > 0 && formData.value.correspondenceAddress
    
    // Documents obligatoires selon le type
    const requiredDocs = getRequiredDocumentsForOwner().map(doc => doc.id)
    const documentsUploaded = requiredDocs.every(docId => uploadedDocuments.value[docId]?.url)
    
    return ownerFields && documentsUploaded
  }
})

// Fonction pour obtenir les documents manquants
const getMissingDocuments = () => {
  if (formData.value.userType === 'tenant') {
    const requiredDocs = ['identity', 'salary-slips', 'employer-certificate', 'bank-statements', 'debt-certificate']
    return requiredDocs.filter(docId => {
      const docType = requiredDocumentsTenant.find(doc => doc.id === docId)
      if (docType?.multiple) {
        return !multipleDocuments.value[docId]?.length
      } else {
        return !uploadedDocuments.value[docId]?.url
      }
    })
  } else {
    const requiredDocs = getRequiredDocumentsForOwner().map(doc => doc.id)
    return requiredDocs.filter(docId => {
      const docType = getRequiredDocumentsForOwner().find(doc => doc.id === docId)
      if (docType?.multiple) {
        return !multipleDocuments.value[docId]?.length
      } else {
        return !uploadedDocuments.value[docId]?.url
      }
    })
  }
}

// Fonction pour obtenir les champs manquants
const getMissingFields = () => {
  const missing = []
  
  if (!formData.value.firstName) missing.push('Prénom')
  if (!formData.value.lastName) missing.push('Nom')
  if (!formData.value.email) missing.push('Email')
  if (!formData.value.phone) missing.push('Téléphone')
  
  if (formData.value.userType === 'tenant') {
    if (!formData.value.birthDate) missing.push('Date de naissance')
    if (!formData.value.nationality) missing.push('Nationalité')
    if (!formData.value.maritalStatus) missing.push('Statut marital')
    if (!formData.value.currentAddress) missing.push('Adresse actuelle')
    if (!formData.value.zipCode) missing.push('Code postal')
    if (!formData.value.city) missing.push('Ville')
    if (!formData.value.addressSince) missing.push('Adresse depuis')
    if (!formData.value.movingReason) missing.push('Raison du déménagement')
    if (!formData.value.professionalStatus) missing.push('Statut professionnel')
    if (!formData.value.employer) missing.push('Employeur')
    if (!formData.value.position) missing.push('Poste')
    if (!formData.value.workRate) missing.push('Taux de travail')
    if (!formData.value.contractType) missing.push('Type de contrat')
    if (!formData.value.contractStartDate) missing.push('Date de début de contrat')
    if (!formData.value.monthlyIncome) missing.push('Revenus mensuels')
  } else {
    if (!formData.value.advertiserType) missing.push('Type d\'annonceur')
    if (!formData.value.preferredLanguage) missing.push('Langue préférée')
    if (!formData.value.contactMethods.length) missing.push('Méthodes de contact')
    if (!formData.value.correspondenceAddress) missing.push('Adresse de correspondance')
  }
  
  return missing
}

// Fonction pour compter les documents uploadés
const getUploadedDocumentsCount = () => {
  if (formData.value.userType === 'tenant') {
    const requiredDocs = ['identity', 'salary-slips', 'employer-certificate', 'bank-statements', 'debt-certificate']
    return requiredDocs.filter(docId => {
      const docType = requiredDocumentsTenant.find(doc => doc.id === docId)
      if (docType?.multiple) {
        return multipleDocuments.value[docId]?.length > 0
      } else {
        return uploadedDocuments.value[docId]?.url
      }
    }).length
  } else {
    const requiredDocs = getRequiredDocumentsForOwner().map(doc => doc.id)
    return requiredDocs.filter(docId => {
      const docType = getRequiredDocumentsForOwner().find(doc => doc.id === docId)
      if (docType?.multiple) {
        return multipleDocuments.value[docId]?.length > 0
      } else {
        return uploadedDocuments.value[docId]?.url
      }
    }).length
  }
}

// Fonction pour compter le total des documents requis
const getRequiredDocumentsCount = () => {
  if (formData.value.userType === 'tenant') {
    return 5 // identity, salary-slips, employer-certificate, bank-statements, debt-certificate
  } else {
    return getRequiredDocumentsForOwner().length
  }
}

// Methods
const selectUserType = (type) => {
  // Empêcher de refaire l'onboarding avec le même rôle
  if (type === 'tenant' && isCandidateCompleted.value) {
    return // Ne rien faire si déjà complété
  }
  
  if (type === 'landlord' && isAnnonceurCompleted.value) {
    return // Ne rien faire si déjà complété
  }
  
  // Si on arrive ici, la sélection est autorisée
  formData.value.userType = type
  error.value = '' // Clear any previous errors
  
  // Adjust total steps based on user type
  if (type === 'tenant') {
    totalSteps.value = 5 // Welcome, Personal, Professional, Documents, Complete
  } else {
    totalSteps.value = 4 // Welcome, Info, Documents, Complete
  }
}

const getUserTypeLabel = () => {
  const labels = {
    tenant: 'Candidat locataire',
    landlord: 'Propriétaire / Agence'
  }
  return labels[formData.value.userType] || ''
}

const getRequiredDocumentsForOwner = () => {
  if (formData.value.advertiserType === 'professional') {
    return requiredDocumentsAgency
  } else {
    return requiredDocumentsOwnerIndividual.filter(doc => {
      if (doc.conditional && formData.value.propertyRelation !== 'subletting') {
        return false
      }
      return true
    })
  }
}

const nextStep = () => {
  if (canProceed.value && currentStep.value < totalSteps.value) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const triggerPhotoUpload = () => {
  if (clientLoaded.value && photoInput.value) {
    photoInput.value.click()
  }
}

const handlePhotoUpload = async (event) => {
  const file = event.target.files[0]
  if (file) {
    try {
      const uploadResult = await uploadAvatar(file)
      formData.value.profilePhoto = uploadResult.url
    } catch (error) {
      console.error('Erreur lors de l\'upload de la photo:', error)
      error.value = 'Erreur lors de l\'upload de la photo'
    }
  }
}

const uploadAvatar = async (file) => {
  const config = useRuntimeConfig()
  const token = localStorage.getItem('access_token')
  
  if (!token) {
    throw new Error('Token d\'authentification manquant')
  }

  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await $fetch(`${config.public.apiBase}/upload/avatar`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })
    return response
  } catch (error) {
    console.error('Avatar upload error:', error)
    throw error
  }
}

const triggerDocumentUpload = (docTypeId) => {
  if (clientLoaded.value) {
    const input = document.querySelector(`input[data-ref="fileInput-${docTypeId}"]`)
    
    if (input) {
      input.click()
    }
  }
}

const handleDocumentUpload = async (event, docTypeId) => {
  const files = Array.from(event.target.files)
  if (files.length === 0) {
    return
  }

  // Vérifier si c'est un document multiple
  const docType = [...requiredDocumentsTenant, ...requiredDocumentsOwnerIndividual].find(doc => doc.id === docTypeId)
  const isMultiple = docType?.multiple || false
  const maxFiles = docType?.maxFiles || 1

  if (isMultiple) {
    const currentCount = multipleDocuments.value[docTypeId]?.length || 0
    const remainingSlots = maxFiles - currentCount
    
    if (files.length > remainingSlots) {
      error.value = `Vous ne pouvez ajouter que ${remainingSlots} document(s) de plus pour ${docType.name}`
      return
    }

    try {
      const uploadPromises = files.map(async (file) => {
        const uploadResult = await uploadFile(file)
        return {
          name: file.name,
          file: file,
          url: uploadResult.url
        }
      })

      const uploadedFiles = await Promise.all(uploadPromises)

      if (!multipleDocuments.value[docTypeId]) {
        multipleDocuments.value[docTypeId] = []
      }
      multipleDocuments.value[docTypeId].push(...uploadedFiles)

      uploadedDocuments.value[docTypeId] = {
        name: `${uploadedFiles.length} document(s)`,
        files: multipleDocuments.value[docTypeId],
        url: multipleDocuments.value[docTypeId].map(f => f.url)
      }
    } catch (error) {
      console.error('Erreur lors de l\'upload des documents:', error)
      error.value = 'Erreur lors de l\'upload des fichiers'
    }
  } else {
    const file = files[0]
    try {
      const uploadResult = await uploadFile(file)
      
      uploadedDocuments.value[docTypeId] = {
        name: file.name,
        file: file,
        url: uploadResult.url
      }
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error)
      error.value = 'Erreur lors de l\'upload du fichier'
    }
  }
}

const uploadFile = async (file) => {
  const config = useRuntimeConfig()
  const token = localStorage.getItem('access_token')
  
  if (!token) {
    throw new Error('Token d\'authentification manquant')
  }

  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await $fetch(`${config.public.apiBase}/upload/document`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })
    return response
  } catch (error) {
    console.error('Document upload error:', error)
    throw error
  }
}

// Méthode pour fermer l'onboarding
const closeModal = async () => {
  await navigateTo('/dashboard')
}

// Méthode de soumission
const submitOnboarding = async () => {
  try {
    loading.value = true
    error.value = ''
    
    const config = useRuntimeConfig()
    const token = localStorage.getItem('access_token')
    
    if (!token) {
      throw new Error('Token d\'authentification manquant')
    }

    // Validation complète du formulaire
    if (!isFormComplete.value) {
      const missingFields = getMissingFields()
      const missingDocs = getMissingDocuments()
      
      let errorMessage = 'Veuillez compléter les informations suivantes :\n'
      
      if (missingFields.length > 0) {
        errorMessage += `\n📝 Champs manquants :\n• ${missingFields.join('\n• ')}`
      }
      
      if (missingDocs.length > 0) {
        const docNames = missingDocs.map(docId => {
          const allDocs = formData.value.userType === 'tenant' ? requiredDocumentsTenant : getRequiredDocumentsForOwner()
          const doc = allDocs.find(d => d.id === docId)
          return doc ? doc.name : docId
        })
        errorMessage += `\n\n📄 Documents manquants :\n• ${docNames.join('\n• ')}`
      }
      
      throw new Error(errorMessage)
    }
    
    // Fonction pour nettoyer les valeurs vides
    const cleanValue = (value) => {
      if (value === '' || value === null || value === undefined) {
        return null;
      }
      return value;
    }

    // Préparer les données pour l'API en mappant les champs
    const payload = {
      // Champs communs obligatoires
      first_name: formData.value.firstName,
      last_name: formData.value.lastName,
      email: formData.value.email,
      phone: formData.value.phone,
      preferred_language: formData.value.preferredLanguage || 'fr',
      
      // Champs candidat
      ...(formData.value.userType === 'tenant' && {
        birth_date: cleanValue(formData.value.birthDate),
        nationality: cleanValue(formData.value.nationality),
        marital_status: cleanValue(formData.value.maritalStatus),
        number_of_children: parseInt(formData.value.children) || 0,
        current_address: cleanValue(formData.value.currentAddress),
        zip_code: cleanValue(formData.value.zipCode),
        city: cleanValue(formData.value.city),
        address_since: cleanValue(formData.value.addressSince),
        moving_reason: cleanValue(formData.value.movingReason),
        professional_status: cleanValue(formData.value.professionalStatus),
        employer: cleanValue(formData.value.employer),
        position: cleanValue(formData.value.position),
        work_rate: cleanValue(formData.value.workRate),
        contract_type: cleanValue(formData.value.contractType),
        contract_start_date: cleanValue(formData.value.contractStartDate),
        monthly_income: parseFloat(formData.value.monthlyIncome) || 0,
        partner_income: parseFloat(formData.value.partnerIncome) || 0,
        other_income: cleanValue(formData.value.otherIncome),
               // Documents
               id_document_url: uploadedDocuments.value.identity?.url || null,
               employment_certificate_url: uploadedDocuments.value['employer-certificate']?.url || null,
               salary_slips_urls: multipleDocuments.value['salary-slips']?.map(f => f.url) || [],
               bank_statements_urls: multipleDocuments.value['bank-statements']?.map(f => f.url) || [],
               rental_attestation_url: uploadedDocuments.value['rental-attestation']?.url || null,
               debt_certificate_url: uploadedDocuments.value['debt-certificate']?.url || null,
               residence_permit_url: uploadedDocuments.value['residence-permit']?.url || null,
               guarantor_documents_urls: multipleDocuments.value['guarantor-documents']?.map(f => f.url) || [],
      }),
      
      // Champs annonceur
      ...(formData.value.userType === 'landlord' && {
        agency_name: cleanValue(formData.value.companyName),
        agency_license: cleanValue(formData.value.ideNumber),
        agency_address: cleanValue(formData.value.correspondenceAddress),
        agency_phone: cleanValue(formData.value.phone),
        owner_status: cleanValue(formData.value.ownerStatus),
        number_of_properties: parseInt(formData.value.numberOfProperties) || 1,
        property_relation: cleanValue(formData.value.propertyRelation),
        legal_representative: cleanValue(formData.value.legalRepresentative),
        representative_role: cleanValue(formData.value.representativeRole),
        responsible_agent: cleanValue(formData.value.responsibleAgent),
        website: cleanValue(formData.value.website),
        contact_methods: formData.value.contactMethods || [],
        correspondence_address: cleanValue(formData.value.correspondenceAddress),
      }),
      
      // Photo de profil
      profile_photo_url: formData.value.profilePhoto || null,
      avatar_url: formData.value.profilePhoto || null,
      
      // Bio par défaut
      bio: formData.value.userType === 'tenant' 
        ? `Candidat sérieux recherchant un logement`
        : `Propriétaire/Agence immobilière`
    }
    
    const response = await $fetch(`${config.public.apiBase}/user-profile/onboarding`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: payload
    })
           
           // Rafraîchir le profil utilisateur dans le store
           const authStore = useAuthStore()
           await authStore.checkAuth()
           
           // Rediriger vers le dashboard
           await navigateTo('/dashboard')
    
  } catch (err) {
    console.error('❌ Erreur lors de la soumission:', err)
    
    // Gestion spécifique des erreurs
    if (err.message?.includes('Failed to fetch')) {
      error.value = 'Impossible de se connecter au serveur. Vérifiez que le backend est démarré.'
    } else if (err.message?.includes('401')) {
      error.value = 'Session expirée. Veuillez vous reconnecter.'
    } else if (err.message?.includes('400')) {
      error.value = 'Données invalides. Vérifiez les champs obligatoires.'
    } else {
      error.value = err.message || 'Une erreur est survenue lors de la sauvegarde'
    }
  } finally {
    loading.value = false
  }
}

// SEO
useHead({
  title: 'Configuration du profil - Keylity',
  meta: [
    {
      name: 'description',
      content: 'Configurez votre profil Keylity en quelques étapes simples'
    }
  ]
})
</script>