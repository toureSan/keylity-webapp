<template>
         <div class="min-h-screen bg-gray-50">
                  <!-- Header Sticky -->
                  <div class="sticky top-16 z-30 bg-white shadow-sm border-t border-gray-200">
                           <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div class="flex items-center justify-between h-16">
                                             <div class="flex items-center">
                                                      <button @click="goBack"
                                                               class="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                                               <Icon name="heroicons:arrow-left"
                                                                        class="h-5 w-5 text-gray-600" />
                                                      </button>
                                                      <h1 class="text-xl font-semibold text-gray-900">Ajouter un bien
                                                      </h1>
                                             </div>
                                             <div class="flex items-center space-x-3">
                                                      <div class="text-xs text-gray-500 hidden md:block">
                                                               <Icon name="heroicons:cloud-arrow-down" class="w-4 h-4 inline mr-1" />
                                                               Sauvegarde automatique
                                                      </div>
                                                      <button @click="saveDraft"
                                                               :disabled="isSubmitting"
                                                               class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                                               <span v-if="isSubmitting">Sauvegarde...</span>
                                                               <span v-else>Sauvegarder comme brouillon</span>
                                                      </button>
                                                      <button @click="publishProperty"
                                                               :disabled="isSubmitting"
                                                               class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                                               <span v-if="isSubmitting">Publication...</span>
                                                               <span v-else>Publier</span>
                                                      </button>
                                             </div>
                                    </div>
                           </div>
                  </div>

                  <!-- Main Content -->
                  <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                           <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                    <!-- Formulaire à gauche -->
                                    <div class="space-y-6">
                                             <!-- Informations générales -->
                                             <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                                                      <div class="flex items-center space-x-3 mb-6">
                                                               <div class="p-2 bg-blue-100 rounded-lg">
                                                                        <Icon name="heroicons:information-circle"
                                                                                 class="h-5 w-5 text-blue-600" />
                                                               </div>
                                                               <h2 class="text-xl font-bold text-gray-900">Informations
                                                                        générales</h2>
                                                      </div>

                                                      <div class="space-y-4">
                                                               <!-- Photos -->
                                                               <div
                                                                        class="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-100 p-8">
                                                                        <div class="flex items-center space-x-3 mb-6">
                                                                                 <div
                                                                                          class="p-2 bg-purple-100 rounded-lg">
                                                                                          <Icon name="heroicons:camera"
                                                                                                   class="h-5 w-5 text-purple-600" />
                                                                                 </div>
                                                                                 <h2
                                                                                          class="text-xl font-bold text-gray-900">
                                                                                          Photos</h2>
                                                                        </div>

                                                                        <!-- Zone d'upload -->
                                                                        <div
                                                                                 class="border-2 border-dashed border-purple-300 rounded-xl p-8 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 flex items-center justify-center min-h-[200px]">
                                                                                 <input ref="fileInput" type="file"
                                                                                          multiple accept="image/*"
                                                                                          @change="handleFileUpload"
                                                                                          class="hidden">
                                                                                 <button @click="$refs.fileInput.click()"
                                                                                          class="flex flex-col items-center justify-center space-y-4 text-gray-600 hover:text-purple-600 transition-colors">
                                                                                          <div class="p-4 bg-purple-100 rounded-full">
                                                                                                   <Icon name="heroicons:cloud-arrow-up" class="h-8 w-8 text-purple-600" />
                                                                                          </div>
                                                                                          <div class="text-center">
                                                                                                   <span class="text-base font-semibold">Cliquez pour ajouter des photos</span>
                                                                                                   <p class="text-sm text-gray-500 mt-1">PNG, JPG jusqu'à 10MB</p>
                                                                                          </div>
                                                                                 </button>
                                                                        </div>


                                                                        <!-- Aperçu des photos -->
                                                                        <div v-if="form.photos.length > 0" class="mt-4">
                                                                                 <div
                                                                                          class="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                                                          <div v-for="(photo, index) in form.photos"
                                                                                                   :key="index"
                                                                                                   class="relative group">
                                                                                                   <img :src="photo.preview"
                                                                                                            :alt="`Photo ${index + 1}`"
                                                                                                            class="w-full h-32 object-cover rounded-lg">
                                                                                                   <button @click="removePhoto(index)"
                                                                                                            class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                                                            <Icon name="heroicons:x-mark"
                                                                                                                     class="h-4 w-4" />
                                                                                                   </button>
                                                                                                   <div v-if="index === 0"
                                                                                                            class="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                                                                                            Photo
                                                                                                            principale
                                                                                                   </div>
                                                                                          </div>
                                                                                 </div>
                                                                        </div>
                                                               </div>
                                                               <!-- Titre -->
                                                               <div>
                                                                        <label
                                                                                 class="block text-sm font-medium text-gray-700 mb-2">Titre
                                                                                 de l'annonce *</label>
                                                                        <input v-model="form.title" type="text"
                                                                                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                                 placeholder="Ex: Appartement 3.5 pièces avec balcon">
                                                               </div>

                                                               <!-- Description -->

                                                               <h2
                                                                        class="mt-4 text-lg font-semibold text-gray-900 mb-4">
                                                                        Description
                                                               </h2>

                                                               <div>
                                                                        <label
                                                                                 class="block text-sm font-medium text-gray-700 mb-2">Description
                                                                                 détaillée *</label>
                                                                        <textarea v-model="form.description" rows="6"
                                                                                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                                 placeholder="Décrivez votre bien en détail..."></textarea>
                                                               </div>


                                                               <!-- Type de bien -->
                                                               <div>
                                                                        <label
                                                                                 class="block text-sm font-medium text-gray-700 mb-2">Type
                                                                                 de bien *</label>
                                                                        <select v-model="form.type"
                                                                                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                                                                 <option value="">Sélectionner un type
                                                                                 </option>
                                                                                 <option value="appartement">Appartement
                                                                                 </option>
                                                                                 <option value="maison">Maison</option>
                                                                                 <option value="studio">Studio</option>
                                                                                 <option value="duplex">Duplex</option>
                                                                                 <option value="loft">Loft</option>
                                                                                 <option value="penthouse">Penthouse
                                                                                 </option>
                                                                        </select>
                                                               </div>

                                                               <!-- Type de transaction -->
                                                               <div>
                                                                        <label
                                                                                 class="block text-sm font-medium text-gray-700 mb-2">Type
                                                                                 de transaction *</label>
                                                                        <select v-model="form.transactionType"
                                                                                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                                                                 <option value="">Sélectionner un type
                                                                                 </option>
                                                                                 <option value="location">Location</option>
                                                                                 <option value="vente">Vente</option>
                                                                        </select>
                                                               </div>

                                                               <!-- Adresse -->
                                                               <div>
                                                                        <label
                                                                                 class="block text-sm font-medium text-gray-700 mb-2">Adresse
                                                                                 *</label>
                                                                        <input v-model="form.address" type="text"
                                                                                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                                 placeholder="Ex: Rue de la Paix 123">
                                                               </div>

                                                               <!-- Code postal et ville -->
                                                               <div class="grid grid-cols-2 gap-4">
                                                                        <div>
                                                                                 <label
                                                                                          class="block text-sm font-medium text-gray-700 mb-2">Code
                                                                                          postal *</label>
                                                                                 <input v-model="form.postalCode"
                                                                                          type="text"
                                                                                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                                          placeholder="1200">
                                                                        </div>
                                                                        <div class="relative">
                                                                                 <label
                                                                                          class="block text-sm font-medium text-gray-700 mb-2">Ville
                                                                                          *</label>
                                                                                 <input v-model="form.city" type="text"
                                                                                          @input="filterCities"
                                                                                          @focus="showCitySuggestions = true"
                                                                                          @blur="hideCitySuggestions"
                                                                                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                                          placeholder="Genève">

                                                                                 <!-- Suggestions de villes -->
                                                                                 <div v-if="showCitySuggestions && filteredCities.length > 0"
                                                                                          class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                                                                          <div v-for="city in filteredCities"
                                                                                                   :key="city.name"
                                                                                                   @click="selectCity(city)"
                                                                                                   class="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm">
                                                                                                   <div
                                                                                                            class="font-medium">
                                                                                                            {{ city.name }}
                                                                                                   </div>
                                                                                                   <div
                                                                                                            class="text-gray-500 text-xs">
                                                                                                            {{ city.canton }}
                                                                                                            -
                                                                                                            {{ city.postalCode }}
                                                                                                   </div>
                                                                                          </div>
                                                                                 </div>
                                                                        </div>
                                                               </div>

                                                               <!-- Prix -->
                                                               <div>
                                                                        <label
                                                                                 class="block text-sm font-medium text-gray-700 mb-2">Prix
                                                                                 mensuel (CHF) *</label>
                                                                        <input v-model.number="form.price" type="number"
                                                                                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                                 placeholder="1500">
                                                               </div>

                                                               <!-- Surface et pièces -->
                                                               <div class="grid grid-cols-2 gap-4">
                                                                        <div>
                                                                                 <label
                                                                                          class="block text-sm font-medium text-gray-700 mb-2">Surface
                                                                                          (m²) *</label>
                                                                                 <input v-model.number="form.area"
                                                                                          type="number"
                                                                                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                                          placeholder="85">
                                                                        </div>
                                                                        <div>
                                                                                 <label
                                                                                          class="block text-sm font-medium text-gray-700 mb-2">Nombre
                                                                                          de pièces *</label>
                                                                                 <select v-model="form.rooms"
                                                                                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                                                                          <option value="">Sélectionner
                                                                                          </option>
                                                                                          <option value="1">1 pièce
                                                                                          </option>
                                                                                          <option value="1.5">1.5 pièces
                                                                                          </option>
                                                                                          <option value="2">2 pièces
                                                                                          </option>
                                                                                          <option value="2.5">2.5 pièces
                                                                                          </option>
                                                                                          <option value="3">3 pièces
                                                                                          </option>
                                                                                          <option value="3.5">3.5 pièces
                                                                                          </option>
                                                                                          <option value="4">4 pièces
                                                                                          </option>
                                                                                          <option value="4.5">4.5 pièces
                                                                                          </option>
                                                                                          <option value="5">5 pièces
                                                                                          </option>
                                                                                          <option value="5.5">5.5 pièces
                                                                                          </option>
                                                                                          <option value="6">6+ pièces
                                                                                          </option>
                                                                                 </select>
                                                                        </div>
                                                               </div>

                                                               <!-- Étage et étages total -->
                                                               <div class="grid grid-cols-2 gap-4">
                                                                        <div>
                                                                                 <label
                                                                                          class="block text-sm font-medium text-gray-700 mb-2">Étage</label>
                                                                                 <input v-model.number="form.floor"
                                                                                          type="number"
                                                                                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                                          placeholder="3">
                                                                        </div>
                                                                        <div>
                                                                                 <label
                                                                                          class="block text-sm font-medium text-gray-700 mb-2">Étages
                                                                                          total</label>
                                                                                 <input v-model.number="form.totalFloors"
                                                                                          type="number"
                                                                                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                                          placeholder="5">
                                                                        </div>
                                                               </div>

                                                               <!-- Année de construction -->
                                                               <div>
                                                                        <label
                                                                                 class="block text-sm font-medium text-gray-700 mb-2">Année
                                                                                 de construction</label>
                                                                        <input v-model.number="form.constructionYear"
                                                                                 type="number"
                                                                                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                                 placeholder="2020">
                                                               </div>
                                                      </div>
                                             </div>

                                             <!-- Équipements -->
                                             <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                                                      <div class="flex items-center space-x-3 mb-6">
                                                               <div class="p-2 bg-green-100 rounded-lg">
                                                                        <Icon name="heroicons:wrench-screwdriver"
                                                                                 class="h-5 w-5 text-green-600" />
                                                               </div>
                                                               <h2 class="text-xl font-bold text-gray-900">Équipements
                                                               </h2>
                                                      </div>

                                                      <div class="grid grid-cols-2 gap-3">
                                                               <label v-for="equipment in availableEquipments"
                                                                        :key="equipment.value"
                                                                        class="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
                                                                        <input v-model="form.equipments"
                                                                                 :value="equipment.value"
                                                                                 type="checkbox"
                                                                                 class="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded">
                                                                        <span
                                                                                 class="text-sm font-medium text-gray-700">{{ equipment.label }}</span>
                                                               </label>
                                                      </div>
                                             </div>



                                             <!-- Caractéristiques détaillées -->
                                             <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                                                      <div class="flex items-center space-x-3 mb-6">
                                                               <div class="p-2 bg-indigo-100 rounded-lg">
                                                                        <Icon name="heroicons:home-modern"
                                                                                 class="h-5 w-5 text-indigo-600" />
                                                               </div>
                                                               <h2 class="text-xl font-bold text-gray-900">
                                                                        Caractéristiques détaillées</h2>
                                                      </div>

                                                      <div class="grid grid-cols-2 gap-4">
                                                               <!-- Chambres -->
                                                               <div>
                                                                        <label
                                                                                 class="block text-sm font-medium text-gray-700 mb-2">Nombre
                                                                                 de chambres</label>
                                                                        <input v-model.number="form.bedrooms"
                                                                                 type="number"
                                                                                 class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                                                                 placeholder="2">
                                                               </div>

                                                               <!-- Salles de bain -->
                                                               <div>
                                                                        <label
                                                                                 class="block text-sm font-medium text-gray-700 mb-2">Salles
                                                                                 de bain</label>
                                                                        <input v-model.number="form.bathrooms"
                                                                                 type="number" step="0.5"
                                                                                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                                 placeholder="1.5">
                                                               </div>

                                                               <!-- Surface habitable -->
                                                               <div>
                                                                        <label
                                                                                 class="block text-sm font-medium text-gray-700 mb-2">Surface
                                                                                 habitable (m²)</label>
                                                                        <input v-model.number="form.livingArea"
                                                                                 type="number"
                                                                                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                                 placeholder="75">
                                                               </div>

                                                               <!-- Lieu -->
                                                               <div>
                                                                        <label
                                                                                 class="block text-sm font-medium text-gray-700 mb-2">Lieu</label>
                                                                        <select v-model="form.location"
                                                                                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                                                                 <option value="">Sélectionner un lieu</option>
                                                                                 <option value="versoix">Versoix</option>
                                                                                 <option value="coppet">Coppet</option>
                                                                                 <option value="nyon">Nyon</option>
                                                                                 <option value="gland">Gland</option>
                                                                                 <option value="morges">Morges</option>
                                                                                 <option value="lausanne">Lausanne</option>
                                                                                 <option value="geneve">Genève</option>
                                                                                 <option value="carouge">Carouge</option>
                                                                                 <option value="lancy">Lancy</option>
                                                                                 <option value="onex">Onex</option>
                                                                                 <option value="thonex">Thônex</option>
                                                                                 <option value="chêne-bougeries">Chêne-Bougeries</option>
                                                                                 <option value="chêne-bourg">Chêne-Bourg</option>
                                                                                 <option value="collonge-bellerive">Collonge-Bellerive</option>
                                                                                 <option value="cologny">Cologny</option>
                                                                                 <option value="pregny-chambésy">Pregny-Chambésy</option>
                                                                                 <option value="versoix">Versoix</option>
                                                                                 <option value="bellevue">Bellevue</option>
                                                                                 <option value="genthod">Genthod</option>
                                                                                 <option value="hermance">Hermance</option>
                                                                                 <option value="anieres">Anières</option>
                                                                                 <option value="corsier">Corsier</option>
                                                                                 <option value="gy">Gy</option>
                                                                                 <option value="jussy">Jussy</option>
                                                                                 <option value="meinier">Meinier</option>
                                                                                 <option value="presinge">Presinge</option>
                                                                                 <option value="puplinge">Puplinge</option>
                                                                                 <option value="satigny">Satigny</option>
                                                                                 <option value="soral">Soral</option>
                                                                                 <option value="troinex">Troinex</option>
                                                                                 <option value="vandœuvres">Vandœuvres</option>
                                                                                 <option value="veigy-foncenex">Veigy-Foncenex</option>
                                                                        </select>
                                                               </div>

                                                               <!-- Orientation -->
                                                               <div>
                                                                        <label
                                                                                 class="block text-sm font-medium text-gray-700 mb-2">Orientation</label>
                                                                        <select v-model="form.orientation"
                                                                                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                                                                 <option value="">Sélectionner</option>
                                                                                 <option value="nord">Nord</option>
                                                                                 <option value="sud">Sud</option>
                                                                                 <option value="est">Est</option>
                                                                                 <option value="ouest">Ouest</option>
                                                                                 <option value="nord-est">Nord-Est
                                                                                 </option>
                                                                                 <option value="nord-ouest">Nord-Ouest
                                                                                 </option>
                                                                                 <option value="sud-est">Sud-Est
                                                                                 </option>
                                                                                 <option value="sud-ouest">Sud-Ouest
                                                                                 </option>
                                                                        </select>
                                                               </div>

                                                               <!-- État du bien -->
                                                               <div>
                                                                        <label
                                                                                 class="block text-sm font-medium text-gray-700 mb-2">État
                                                                                 du bien</label>
                                                                        <select v-model="form.condition"
                                                                                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                                                                 <option value="">Sélectionner</option>
                                                                                 <option value="excellent">Excellent
                                                                                 </option>
                                                                                 <option value="bon">Bon</option>
                                                                                 <option value="moyen">Moyen</option>
                                                                                 <option value="renovation">À rénover
                                                                                 </option>
                                                                        </select>
                                                               </div>
                                                      </div>
                                             </div>

                                             <!-- Charges et frais -->
                                             <div class="bg-white rounded-xl shadow-sm p-6">
                                                      <h2 class="text-lg font-semibold text-gray-900 mb-4">Charges et
                                                               frais</h2>

                                                      <div class="grid grid-cols-2 gap-4">
                                                               <!-- Charges mensuelles -->
                                                               <div>
                                                                        <label
                                                                                 class="block text-sm font-medium text-gray-700 mb-2">Charges
                                                                                 mensuelles (CHF)</label>
                                                                        <input v-model.number="form.monthlyCharges"
                                                                                 type="number"
                                                                                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                                 placeholder="150">
                                                               </div>

                                                               <!-- Dépôt de garantie -->
                                                               <div>
                                                                        <label
                                                                                 class="block text-sm font-medium text-gray-700 mb-2">Dépôt
                                                                                 de garantie (CHF)</label>
                                                                        <input v-model.number="form.deposit"
                                                                                 type="number"
                                                                                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                                 placeholder="3000">
                                                               </div>

                                                               <!-- Frais d'agence -->
                                                               <div>
                                                                        <label
                                                                                 class="block text-sm font-medium text-gray-700 mb-2">Frais
                                                                                 d'agence (CHF)</label>
                                                                        <input v-model.number="form.agencyFees"
                                                                                 type="number"
                                                                                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                                 placeholder="0">
                                                               </div>

                                                               <!-- Frais de dossier -->
                                                               <div>
                                                                        <label
                                                                                 class="block text-sm font-medium text-gray-700 mb-2">Frais
                                                                                 de dossier (CHF)</label>
                                                                        <input v-model.number="form.applicationFees"
                                                                                 type="number"
                                                                                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                                 placeholder="50">
                                                               </div>
                                                      </div>
                                             </div>

                                             <!-- Disponibilité et conditions -->
                                             <div class="bg-white rounded-xl shadow-sm p-6">
                                                      <h2 class="text-lg font-semibold text-gray-900 mb-4">Disponibilité
                                                               et conditions</h2>

                                                      <div class="space-y-4">
                                                               <!-- Date de disponibilité -->
                                                               <div>
                                                                        <label
                                                                                 class="block text-sm font-medium text-gray-700 mb-2">Date
                                                                                 de disponibilité *</label>
                                                                        <input v-model="form.availableFrom" type="date"
                                                                                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                                               </div>

                                                               <!-- Durée du bail -->
                                                               <div>
                                                                        <label
                                                                                 class="block text-sm font-medium text-gray-700 mb-2">Durée
                                                                                 du bail</label>
                                                                        <select v-model="form.leaseDuration"
                                                                                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                                                                 <option value="">Sélectionner</option>
                                                                                 <option value="1">1 an</option>
                                                                                 <option value="2">2 ans</option>
                                                                                 <option value="3">3 ans</option>
                                                                                 <option value="5">5 ans</option>
                                                                                 <option value="indefinite">Indéterminé
                                                                                 </option>
                                                                        </select>
                                                               </div>

                                                               <!-- Conditions spéciales -->
                                                               <div class="grid grid-cols-2 gap-4">
                                                                        <label
                                                                                 class="flex items-center space-x-3 cursor-pointer">
                                                                                 <input v-model="form.petsAllowed"
                                                                                          type="checkbox"
                                                                                          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                                                                 <span class="text-sm text-gray-700">Animaux
                                                                                          acceptés</span>
                                                                        </label>

                                                                        <label
                                                                                 class="flex items-center space-x-3 cursor-pointer">
                                                                                 <input v-model="form.smokingAllowed"
                                                                                          type="checkbox"
                                                                                          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                                                                 <span class="text-sm text-gray-700">Fumeur
                                                                                          accepté</span>
                                                                        </label>

                                                                        <label
                                                                                 class="flex items-center space-x-3 cursor-pointer">
                                                                                 <input v-model="form.furnished"
                                                                                          type="checkbox"
                                                                                          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                                                                 <span
                                                                                          class="text-sm text-gray-700">Meublé</span>
                                                                        </label>

                                                                        <label
                                                                                 class="flex items-center space-x-3 cursor-pointer">
                                                                                 <input v-model="form.studentFriendly"
                                                                                          type="checkbox"
                                                                                          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                                                                 <span class="text-sm text-gray-700">Étudiant
                                                                                          accepté</span>
                                                                        </label>
                                                               </div>
                                                      </div>
                                             </div>

                                             <!-- Contact et visites -->
                                             <div class="bg-white rounded-xl shadow-sm p-6">
                                                      <h2 class="text-lg font-semibold text-gray-900 mb-4">Contact et
                                                               visites</h2>

                                                      <div class="space-y-4">
                                                               <!-- Méthode de contact préférée -->
                                                               <div>
                                                                        <label
                                                                                 class="block text-sm font-medium text-gray-700 mb-2">Méthode
                                                                                 de contact préférée</label>
                                                                        <div class="grid grid-cols-3 gap-4">
                                                                                 <label
                                                                                          class="flex items-center space-x-3 cursor-pointer">
                                                                                          <input v-model="form.contactMethods"
                                                                                                   value="email"
                                                                                                   type="checkbox"
                                                                                                   class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                                                                          <span
                                                                                                   class="text-sm text-gray-700">Email</span>
                                                                                 </label>

                                                                                 <label
                                                                                          class="flex items-center space-x-3 cursor-pointer">
                                                                                          <input v-model="form.contactMethods"
                                                                                                   value="phone"
                                                                                                   type="checkbox"
                                                                                                   class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                                                                          <span
                                                                                                   class="text-sm text-gray-700">Téléphone</span>
                                                                                 </label>

                                                                                 <label
                                                                                          class="flex items-center space-x-3 cursor-pointer">
                                                                                          <input v-model="form.contactMethods"
                                                                                                   value="whatsapp"
                                                                                                   type="checkbox"
                                                                                                   class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                                                                          <span
                                                                                                   class="text-sm text-gray-700">WhatsApp</span>
                                                                                 </label>
                                                                        </div>
                                                               </div>

                                                               <!-- Disponibilité pour visites -->
                                                               <div>
                                                                        <label
                                                                                 class="block text-sm font-medium text-gray-700 mb-2">Disponibilité
                                                                                 pour visites</label>
                                                                        <textarea v-model="form.visitAvailability"
                                                                                 rows="3"
                                                                                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                                 placeholder="Ex: Visites possibles en semaine de 18h à 20h et le weekend de 10h à 16h"></textarea>
                                                               </div>

                                                               <!-- Informations supplémentaires -->
                                                               <div>
                                                                        <label
                                                                                 class="block text-sm font-medium text-gray-700 mb-2">Informations
                                                                                 supplémentaires</label>
                                                                        <textarea v-model="form.additionalInfo" rows="3"
                                                                                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                                 placeholder="Informations importantes à communiquer aux candidats..."></textarea>
                                                               </div>
                                                      </div>
                                             </div>


                                    </div>

                                    <!-- Prévisualisation à droite -->
                                    <div class="space-y-6">
                                             <div
                                                      class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sticky top-6">
                                                      <div class="flex items-center space-x-3 mb-6">
                                                               <div class="p-2 bg-blue-100 rounded-lg">
                                                                        <Icon name="heroicons:eye"
                                                                                 class="h-5 w-5 text-blue-600" />
                                                               </div>
                                                               <h2 class="text-xl font-bold text-gray-900">Aperçu de
                                                                        votre annonce</h2>
                                                      </div>

                                                      <!-- Prévisualisation -->
                                                      <div class="space-y-4">
                                                               <!-- Photo principale -->
                                                               <div class="relative group">
                                                                        <div v-if="form.photos.length > 0"
                                                                                 class="h-64 rounded-xl overflow-hidden shadow-lg border-4 border-white">
                                                                                 <img :src="form.photos[0].preview"
                                                                                          :alt="form.title"
                                                                                          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                                                                        </div>
                                                                        <div v-else
                                                                                 class="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-4 border-dashed border-gray-300">
                                                                                 <div class="text-center">
                                                                                          <Icon name="heroicons:photo"
                                                                                                   class="h-16 w-16 text-gray-400 mx-auto mb-2" />
                                                                                          <p
                                                                                                   class="text-gray-500 text-sm">
                                                                                                   Aucune photo</p>
                                                                                 </div>
                                                                        </div>

                                                                        <!-- Type de transaction -->
                                                                        <div v-if="form.transactionType"
                                                                                 class="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg border border-gray-200">
                                                                                 <div class="flex items-center space-x-2">
                                                                                          <Icon :name="form.transactionType === 'location' ? 'heroicons:home' : 'heroicons:banknotes'" 
                                                                                                   :class="form.transactionType === 'location' ? 'h-4 w-4 text-blue-600' : 'h-4 w-4 text-green-600'" />
                                                                                          <span :class="form.transactionType === 'location' ? 'text-blue-600 font-semibold text-sm' : 'text-green-600 font-semibold text-sm'">
                                                                                                   {{ form.transactionType === 'location' ? 'Location' : 'Vente' }}
                                                                                          </span>
                                                                                 </div>
                                                                        </div>

                                                                        <!-- Prix -->
                                                                        <div v-if="form.price"
                                                                                 class="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200">
                                                                                 <span
                                                                                          class="text-xl font-bold text-green-600">{{ formatPrice(form.price) }}</span>
                                                                        </div>

                                                                        <!-- Badge photo principale -->
                                                                        <div v-if="form.photos.length > 0"
                                                                                 class="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                                                                                 Photo principale
                                                                        </div>
                                                               </div>

                                                               <!-- Informations -->
                                                               <div class="space-y-4">
                                                                        <div class="space-y-3">
                                                                                 <h3
                                                                                          class="text-2xl font-bold text-gray-900 leading-tight">
                                                                                          {{ form.title || 'Titre de votre annonce' }}
                                                                                 </h3>
                                                                                 <p class="text-gray-600 text-lg">
                                                                                          {{ getFullAddress() }}
                                                                                 </p>
                                                                                 <!-- Lieu -->
                                                                                 <div v-if="form.location" class="flex items-center space-x-2">
                                                                                          <Icon name="heroicons:map-pin" class="h-4 w-4 text-blue-600" />
                                                                                          <span class="text-blue-600 font-medium">{{ getLocationLabel(form.location) }}</span>
                                                                                 </div>
                                                                        </div>

                                                                        <!-- Description -->
                                                                        <p class="text-gray-700 text-sm leading-relaxed">
                                                                                 {{ form.description || 'Votre description apparaîtra ici...' }}
                                                                        </p>

                                                                        <!-- Charges mensuelles (pour location uniquement) -->
                                                                        <div v-if="form.monthlyCharges && form.transactionType === 'location'" class="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200">
                                                                                 <div class="flex items-center justify-between">
                                                                                          <div class="flex items-center space-x-2">
                                                                                                   <Icon name="heroicons:plus-circle" class="h-5 w-5 text-orange-600" />
                                                                                                   <span class="text-orange-600 font-semibold">Charges mensuelles</span>
                                                                                          </div>
                                                                                          <div class="text-right">
                                                                                                   <div class="text-lg font-semibold text-gray-700">
                                                                                                            {{ formatPrice(form.monthlyCharges) }}
                                                                                                   </div>
                                                                                          </div>
                                                                                 </div>
                                                                        </div>

                                                    

                                                                        <!-- Caractéristiques -->
                                                                        <div v-if="getCharacteristics().length > 0">
                                                                                 <h4 class="text-sm font-semibold text-gray-700 mb-3">Caractéristiques</h4>
                                                                                 <div class="flex flex-wrap gap-2">
                                                                                          <span v-for="characteristic in getCharacteristics()" :key="characteristic.key"
                                                                                                   class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300 hover:from-gray-200 hover:to-gray-300 transition-all">
                                                                                                   {{ characteristic.label }}
                                                                                          </span>
                                                                                 </div>
                                                                        </div>

                                                                         <!-- Frais et charges -->
                                                                         <div v-if="form.deposit || form.agencyFees || form.applicationFees"
                                                                                  class="bg-orange-50 rounded-lg p-4 border border-orange-200">
                                                                                  <h4 class="text-sm font-semibold text-orange-800 mb-3">Frais et charges</h4>
                                                                                  <div class="grid grid-cols-1 gap-2">
                                                                                           <div v-if="form.deposit" class="flex justify-between items-center">
                                                                                                    <span class="text-sm text-orange-700">Dépôt de garantie</span>
                                                                                                    <span class="text-sm font-semibold text-orange-900">{{ formatPrice(form.deposit) }}</span>
                                                                                           </div>
                                                                                           <div v-if="form.agencyFees" class="flex justify-between items-center">
                                                                                                    <span class="text-sm text-orange-700">Frais d'agence</span>
                                                                                                    <span class="text-sm font-semibold text-orange-900">{{ formatPrice(form.agencyFees) }}</span>
                                                                                           </div>
                                                                                           <div v-if="form.applicationFees" class="flex justify-between items-center">
                                                                                                    <span class="text-sm text-orange-700">Frais de dossier</span>
                                                                                                    <span class="text-sm font-semibold text-orange-900">{{ formatPrice(form.applicationFees) }}</span>
                                                                                           </div>
                                                                                  </div>
                                                                         </div>

                                                                         <!-- Conditions spéciales -->
                                                                         <div v-if="form.petsAllowed || form.smokingAllowed || form.furnished || form.studentFriendly"
                                                                                  class="bg-green-50 rounded-lg p-4 border border-green-200">
                                                                                  <h4 class="text-sm font-semibold text-green-800 mb-3">Conditions spéciales</h4>
                                                                                  <div class="flex flex-wrap gap-2">
                                                                                           <span v-if="form.petsAllowed" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                                                    <Icon name="heroicons:heart" class="h-3 w-3 mr-1" />
                                                                                                    Animaux acceptés
                                                                                           </span>
                                                                                           <span v-if="form.smokingAllowed" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                                                    <Icon name="heroicons:fire" class="h-3 w-3 mr-1" />
                                                                                                    Fumeur accepté
                                                                                           </span>
                                                                                           <span v-if="form.furnished" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                                                    <Icon name="heroicons:home" class="h-3 w-3 mr-1" />
                                                                                                    Meublé
                                                                                           </span>
                                                                                           <span v-if="form.studentFriendly" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                                                    <Icon name="heroicons:academic-cap" class="h-3 w-3 mr-1" />
                                                                                                    Étudiant accepté
                                                                                           </span>
                                                                                  </div>
                                                                         </div>

                                                                         <!-- Durée du bail -->
                                                                         <div v-if="form.leaseDuration"
                                                                                  class="bg-purple-50 rounded-lg p-4 border border-purple-200">
                                                                                  <div class="flex items-center space-x-2">
                                                                                           <Icon name="heroicons:document-text"
                                                                                                    class="h-5 w-5 text-purple-600" />
                                                                                           <span class="text-sm font-medium text-purple-800">Durée du bail</span>
                                                                                           <span class="text-sm font-semibold text-purple-900">
                                                                                                    {{ form.leaseDuration === 'indefinite' ? 'Indéterminé' : form.leaseDuration + ' an' + (form.leaseDuration > 1 ? 's' : '') }}
                                                                                           </span>
                                                                                  </div>
                                                                         </div>

                                                                         <!-- Disponibilité -->
                                                                         <div v-if="form.availableFrom"
                                                                                  class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                                                                  <div
                                                                                           class="flex items-center space-x-2">
                                                                                           <Icon name="heroicons:clock"
                                                                                                    class="h-5 w-5 text-blue-600" />
                                                                                           <span
                                                                                                    class="text-sm font-medium text-blue-800">Disponible
                                                                                                    le</span>
                                                                                           <span
                                                                                                    class="text-sm font-semibold text-blue-900">
                                                                                                    {{ formatDate(form.availableFrom) }}
                                                                                           </span>
                                                                                  </div>
                                                                         </div>

                                                                         <!-- Méthodes de contact -->
                                                                         <div v-if="form.contactMethods && form.contactMethods.length > 0"
                                                                                  class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                                                                  <h4 class="text-sm font-semibold text-gray-700 mb-3">Contact préféré</h4>
                                                                                  <div class="flex flex-wrap gap-2">
                                                                                           <span v-for="method in form.contactMethods" :key="method" 
                                                                                                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                                                                    <Icon v-if="method === 'email'" name="heroicons:envelope" class="h-3 w-3 mr-1" />
                                                                                                    <Icon v-else-if="method === 'phone'" name="heroicons:phone" class="h-3 w-3 mr-1" />
                                                                                                    <Icon v-else-if="method === 'whatsapp'" name="heroicons:chat-bubble-left-right" class="h-3 w-3 mr-1" />
                                                                                                    {{ method === 'email' ? 'Email' : method === 'phone' ? 'Téléphone' : 'WhatsApp' }}
                                                                                           </span>
                                                                                  </div>
                                                                         </div>

                                                                         <!-- Disponibilité pour visites -->
                                                                         <div v-if="form.visitAvailability"
                                                                                  class="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                                                                                  <h4 class="text-sm font-semibold text-indigo-800 mb-2">Disponibilité pour visites</h4>
                                                                                  <p class="text-sm text-indigo-700">{{ form.visitAvailability }}</p>
                                                                         </div>

                                                                         <!-- Informations supplémentaires -->
                                                                         <div v-if="form.additionalInfo"
                                                                                  class="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                                                                                  <h4 class="text-sm font-semibold text-yellow-800 mb-2">Informations supplémentaires</h4>
                                                                                  <p class="text-sm text-yellow-700">{{ form.additionalInfo }}</p>
                                                                         </div>

                                                                        <!-- Équipements -->
                                                                        <div v-if="form.equipments.length > 0">
                                                                                 <h4
                                                                                          class="text-sm font-semibold text-gray-700 mb-2">
                                                                                          Équipements</h4>
                                                                                 <div class="flex flex-wrap gap-2">
                                                                                          <span v-for="equipment in form.equipments"
                                                                                                   :key="equipment"
                                                                                                   class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200 hover:from-blue-200 hover:to-indigo-200 transition-all">
                                                                                                   {{ getEquipmentLabel(equipment) }}
                                                                                          </span>
                                                                                 </div>
                                                                        </div>
                                                               </div>
                                                      </div>
                                             </div>
                                    </div>
                           </div>
                  </div>
         </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard'
})

// Router
const router = useRouter()
const { createProperty, uploadPropertyImage } = useProperties()

// Clé pour le localStorage
const FORM_STORAGE_KEY = 'add-property-form-data'

// Fonctions de sauvegarde et restauration
const saveFormToStorage = () => {
  try {
    const formData = {
      ...form.value,
      // Ne pas sauvegarder les fichiers (trop volumineux)
      photos: form.value.photos.map(photo => ({
        name: photo.name,
        preview: photo.preview
        // Exclure le fichier lui-même
      }))
    }
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData))
  } catch (error) {
    console.warn('Impossible de sauvegarder le formulaire:', error)
  }
}

const loadFormFromStorage = () => {
  try {
    const savedData = localStorage.getItem(FORM_STORAGE_KEY)
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      // Restaurer les données (sans les fichiers)
      Object.assign(form.value, parsedData)
      // Réinitialiser les photos (les fichiers ne peuvent pas être restaurés)
      form.value.photos = []
    }
  } catch (error) {
    console.warn('Impossible de restaurer le formulaire:', error)
  }
}

const clearFormStorage = () => {
  try {
    localStorage.removeItem(FORM_STORAGE_KEY)
  } catch (error) {
    console.warn('Impossible de supprimer la sauvegarde:', error)
  }
}

// État du formulaire
const form = ref({
  title: '',
  type: '',
  transactionType: '',
  address: '',
  postalCode: '',
  city: '',
  price: null,
  area: null,
  rooms: '',
  floor: null,
  totalFloors: null,
  constructionYear: null,
  bedrooms: null,
  bathrooms: null,
  livingArea: null,
  landArea: null,
  location: '',
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
  description: ''
})

// État pour l'autocomplétion des villes
const showCitySuggestions = ref(false)
const filteredCities = ref([])

// Liste des villes suisses principales
const swissCities = [
  // Genève
  { name: 'Genève', canton: 'GE', postalCode: '1200' },
  { name: 'Versoix', canton: 'GE', postalCode: '1290' },
  { name: 'Carouge', canton: 'GE', postalCode: '1227' },
  { name: 'Lancy', canton: 'GE', postalCode: '1212' },
  { name: 'Meyrin', canton: 'GE', postalCode: '1217' },
  { name: 'Onex', canton: 'GE', postalCode: '1213' },
  { name: 'Thônex', canton: 'GE', postalCode: '1226' },
  { name: 'Vernier', canton: 'GE', postalCode: '1214' },
  
  // Vaud
  { name: 'Lausanne', canton: 'VD', postalCode: '1000' },
  { name: 'Montreux', canton: 'VD', postalCode: '1820' },
  { name: 'Vevey', canton: 'VD', postalCode: '1800' },
  { name: 'Nyon', canton: 'VD', postalCode: '1260' },
  { name: 'Morges', canton: 'VD', postalCode: '1110' },
  { name: 'Yverdon-les-Bains', canton: 'VD', postalCode: '1400' },
  { name: 'Renens', canton: 'VD', postalCode: '1020' },
  { name: 'Pully', canton: 'VD', postalCode: '1009' },
  { name: 'Gland', canton: 'VD', postalCode: '1196' },
  { name: 'Prilly', canton: 'VD', postalCode: '1008' },
  
  // Zurich
  { name: 'Zurich', canton: 'ZH', postalCode: '8000' },
  { name: 'Winterthour', canton: 'ZH', postalCode: '8400' },
  { name: 'Uster', canton: 'ZH', postalCode: '8610' },
  { name: 'Dübendorf', canton: 'ZH', postalCode: '8600' },
  { name: 'Schlieren', canton: 'ZH', postalCode: '8952' },
  { name: 'Bülach', canton: 'ZH', postalCode: '8180' },
  { name: 'Kloten', canton: 'ZH', postalCode: '8302' },
  { name: 'Thalwil', canton: 'ZH', postalCode: '8800' },
  
  // Berne
  { name: 'Berne', canton: 'BE', postalCode: '3000' },
  { name: 'Bienne', canton: 'BE', postalCode: '2500' },
  { name: 'Thoune', canton: 'BE', postalCode: '3600' },
  { name: 'Köniz', canton: 'BE', postalCode: '3098' },
  { name: 'Ostermundigen', canton: 'BE', postalCode: '3072' },
  { name: 'Burgdorf', canton: 'BE', postalCode: '3400' },
  { name: 'Langenthal', canton: 'BE', postalCode: '4900' },
  
  // Bâle
  { name: 'Bâle', canton: 'BS', postalCode: '4000' },
  { name: 'Riehen', canton: 'BS', postalCode: '4125' },
  { name: 'Bettingen', canton: 'BS', postalCode: '4126' },
  
  // Argovie
  { name: 'Aarau', canton: 'AG', postalCode: '5000' },
  { name: 'Baden', canton: 'AG', postalCode: '5400' },
  { name: 'Wettingen', canton: 'AG', postalCode: '5430' },
  { name: 'Brugg', canton: 'AG', postalCode: '5200' },
  { name: 'Rheinfelden', canton: 'AG', postalCode: '4310' },
  
  // Lucerne
  { name: 'Lucerne', canton: 'LU', postalCode: '6000' },
  { name: 'Emmen', canton: 'LU', postalCode: '6032' },
  { name: 'Kriens', canton: 'LU', postalCode: '6010' },
  { name: 'Horw', canton: 'LU', postalCode: '6048' },
  
  // Saint-Gall
  { name: 'Saint-Gall', canton: 'SG', postalCode: '9000' },
  { name: 'Gossau', canton: 'SG', postalCode: '9200' },
  { name: 'Wil', canton: 'SG', postalCode: '9500' },
  { name: 'Rapperswil-Jona', canton: 'SG', postalCode: '8640' },
  
  // Tessin
  { name: 'Lugano', canton: 'TI', postalCode: '6900' },
  { name: 'Bellinzone', canton: 'TI', postalCode: '6500' },
  { name: 'Locarno', canton: 'TI', postalCode: '6600' },
  { name: 'Mendrisio', canton: 'TI', postalCode: '6850' },
  { name: 'Chiasso', canton: 'TI', postalCode: '6830' },
  
  // Valais
  { name: 'Sion', canton: 'VS', postalCode: '1950' },
  { name: 'Martigny', canton: 'VS', postalCode: '1920' },
  { name: 'Monthey', canton: 'VS', postalCode: '1870' },
  { name: 'Sierre', canton: 'VS', postalCode: '3960' },
  { name: 'Visp', canton: 'VS', postalCode: '3930' },
  
  // Fribourg
  { name: 'Fribourg', canton: 'FR', postalCode: '1700' },
  { name: 'Bulle', canton: 'FR', postalCode: '1630' },
  { name: 'Villars-sur-Glâne', canton: 'FR', postalCode: '1752' },
  
  // Neuchâtel
  { name: 'Neuchâtel', canton: 'NE', postalCode: '2000' },
  { name: 'La Chaux-de-Fonds', canton: 'NE', postalCode: '2300' },
  { name: 'Le Locle', canton: 'NE', postalCode: '2400' },
  
  // Jura
  { name: 'Delémont', canton: 'JU', postalCode: '2800' },
  { name: 'Porrentruy', canton: 'JU', postalCode: '2900' },
  
  // Grisons
  { name: 'Coire', canton: 'GR', postalCode: '7000' },
  { name: 'Davos', canton: 'GR', postalCode: '7270' },
  { name: 'Saint-Moritz', canton: 'GR', postalCode: '7500' },
  
  // Appenzell
  { name: 'Appenzell', canton: 'AI', postalCode: '9050' },
  { name: 'Herisau', canton: 'AR', postalCode: '9100' },
  
  // Schaffhouse
  { name: 'Schaffhouse', canton: 'SH', postalCode: '8200' },
  
  // Thurgovie
  { name: 'Frauenfeld', canton: 'TG', postalCode: '8500' },
  { name: 'Kreuzlingen', canton: 'TG', postalCode: '8280' },
  
  // Uri
  { name: 'Altdorf', canton: 'UR', postalCode: '6460' },
  
  // Schwyz
  { name: 'Schwyz', canton: 'SZ', postalCode: '6430' },
  { name: 'Einsiedeln', canton: 'SZ', postalCode: '8840' },
  
  // Obwald
  { name: 'Sarnen', canton: 'OW', postalCode: '6060' },
  
  // Nidwald
  { name: 'Stans', canton: 'NW', postalCode: '6370' },
  
  // Glaris
  { name: 'Glaris', canton: 'GL', postalCode: '8750' },
  
  // Zoug
  { name: 'Zoug', canton: 'ZG', postalCode: '6300' },
  
  // Soleure
  { name: 'Soleure', canton: 'SO', postalCode: '4500' },
  { name: 'Olten', canton: 'SO', postalCode: '4600' },
  { name: 'Grenchen', canton: 'SO', postalCode: '2540' }
]

// Équipements disponibles (valeurs en anglais pour la base, labels en français pour l'affichage)
const availableEquipments = [
  { value: 'balcony', label: 'Balcon' },
  { value: 'terrace', label: 'Terrasse' },
  { value: 'garden', label: 'Jardin' },
  { value: 'parking', label: 'Parking' },
  { value: 'basement', label: 'Cave' },
  { value: 'garage', label: 'Garage' },
  { value: 'elevator', label: 'Ascenseur' },
  { value: 'concierge', label: 'Concierge' },
  { value: 'pool', label: 'Piscine' },
  { value: 'gym', label: 'Salle de sport' },
  { value: 'laundry', label: 'Buanderie' },
  { value: 'dishwasher', label: 'Lave-vaisselle' },
  { value: 'washing_machine', label: 'Machine à laver' },
  { value: 'dryer', label: 'Sèche-linge' },
  { value: 'air_conditioning', label: 'Climatisation' },
  { value: 'heating', label: 'Chauffage' },
  { value: 'fireplace', label: 'Cheminée' },
  { value: 'furnished', label: 'Meublé' },
  { value: 'pets_allowed', label: 'Animaux acceptés' },
  { value: 'smoking_allowed', label: 'Fumeur accepté' }
]

// Fonction de formatage du prix
const formatPrice = (price) => {
  if (!price) return 'Prix non défini'
  return new Intl.NumberFormat('fr-CH', {
    style: 'currency',
    currency: 'CHF',
    minimumFractionDigits: 0
  }).format(price)
}

// Fonction de formatage des dates
const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Fonction pour obtenir l'adresse complète
const getFullAddress = () => {
  const parts = []
  if (form.value.address) parts.push(form.value.address)
  if (form.value.postalCode && form.value.city) {
    parts.push(`${form.value.postalCode} ${form.value.city}`)
  }
  return parts.length > 0 ? parts.join(', ') : 'Adresse du bien'
}

// Fonction pour obtenir le label d'un équipement
const getEquipmentLabel = (equipmentValue) => {
  const equipment = availableEquipments.find(eq => eq.value === equipmentValue)
  return equipment ? equipment.label : equipmentValue
}

// Fonction pour obtenir le label d'un lieu
const getLocationLabel = (locationValue) => {
  const locationMap = {
    'versoix': 'Versoix',
    'coppet': 'Coppet',
    'nyon': 'Nyon',
    'gland': 'Gland',
    'morges': 'Morges',
    'lausanne': 'Lausanne',
    'geneve': 'Genève',
    'carouge': 'Carouge',
    'lancy': 'Lancy',
    'onex': 'Onex',
    'thonex': 'Thônex',
    'chêne-bougeries': 'Chêne-Bougeries',
    'chêne-bourg': 'Chêne-Bourg',
    'collonge-bellerive': 'Collonge-Bellerive',
    'cologny': 'Cologny',
    'pregny-chambésy': 'Pregny-Chambésy',
    'bellevue': 'Bellevue',
    'genthod': 'Genthod',
    'hermance': 'Hermance',
    'anieres': 'Anières',
    'corsier': 'Corsier',
    'gy': 'Gy',
    'jussy': 'Jussy',
    'meinier': 'Meinier',
    'presinge': 'Presinge',
    'puplinge': 'Puplinge',
    'satigny': 'Satigny',
    'soral': 'Soral',
    'troinex': 'Troinex',
    'vandœuvres': 'Vandœuvres',
    'veigy-foncenex': 'Veigy-Foncenex'
  }
  return locationMap[locationValue] || locationValue
}

// Fonction pour obtenir les caractéristiques sous forme de pastilles
const getCharacteristics = () => {
  const characteristics = []
  
  if (form.value.rooms) {
    characteristics.push({
      key: 'rooms',
      label: `${form.value.rooms} pièces`,
      icon: 'heroicons:home',
      color: 'text-blue-600'
    })
  }
  
  if (form.value.area) {
    characteristics.push({
      key: 'area',
      label: `${form.value.area} m²`,
      icon: 'heroicons:square-3-stack-3d',
      color: 'text-green-600'
    })
  }
  
  if (form.value.bedrooms) {
    characteristics.push({
      key: 'bedrooms',
      label: `${form.value.bedrooms} ch.`,
      icon: 'heroicons:bed',
      color: 'text-purple-600'
    })
  }
  
  if (form.value.bathrooms) {
    characteristics.push({
      key: 'bathrooms',
      label: `${form.value.bathrooms} SDB`,
      icon: 'heroicons:home-modern',
      color: 'text-cyan-600'
    })
  }
  
  if (form.value.floor) {
    characteristics.push({
      key: 'floor',
      label: `${form.value.floor}${form.value.totalFloors ? `/${form.value.totalFloors}` : ''} étage`,
      icon: 'heroicons:building-office',
      color: 'text-orange-600'
    })
  }
  
  if (form.value.constructionYear) {
    characteristics.push({
      key: 'constructionYear',
      label: `Construit en ${form.value.constructionYear}`,
      icon: 'heroicons:calendar',
      color: 'text-indigo-600'
    })
  }
  
  if (form.value.livingArea) {
    characteristics.push({
      key: 'livingArea',
      label: `${form.value.livingArea} m² hab.`,
      icon: 'heroicons:home',
      color: 'text-emerald-600'
    })
  }
  
  
  if (form.value.orientation) {
    characteristics.push({
      key: 'orientation',
      label: form.value.orientation,
      icon: 'heroicons:sun',
      color: 'text-yellow-600'
    })
  }
  
  if (form.value.condition) {
    characteristics.push({
      key: 'condition',
      label: form.value.condition,
      icon: 'heroicons:check-circle',
      color: 'text-red-600'
    })
  }
  
  return characteristics
}

// Fonctions pour l'autocomplétion des villes
const filterCities = () => {
  const query = form.value.city.toLowerCase()
  if (query.length < 2) {
    filteredCities.value = []
    return
  }
  
  filteredCities.value = swissCities.filter(city => 
    city.name.toLowerCase().includes(query) ||
    city.canton.toLowerCase().includes(query) ||
    city.postalCode.includes(query)
  ).slice(0, 10) // Limiter à 10 résultats
}

const selectCity = (city) => {
  form.value.city = city.name
  form.value.postalCode = city.postalCode
  showCitySuggestions.value = false
  filteredCities.value = []
}

const hideCitySuggestions = () => {
  // Délai pour permettre le clic sur une suggestion
  setTimeout(() => {
    showCitySuggestions.value = false
  }, 200)
}

// Gestion de l'upload de fichiers
const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  
  files.forEach(file => {
    // Vérifier la taille (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert(`Le fichier ${file.name} est trop volumineux (max 10MB)`)
      return
    }
    
    // Vérifier le type
    if (!file.type.startsWith('image/')) {
      alert(`Le fichier ${file.name} n'est pas une image`)
      return
    }
    
    // Créer un aperçu
    const reader = new FileReader()
    reader.onload = (e) => {
      form.value.photos.push({
        file: file,
        preview: e.target.result,
        name: file.name
      })
    }
    reader.readAsDataURL(file)
  })
  
  // Réinitialiser l'input
  event.target.value = ''
}

// Supprimer une photo
const removePhoto = (index) => {
  form.value.photos.splice(index, 1)
}

// Navigation
const goBack = () => {
  router.back()
}

// État de chargement
const isSubmitting = ref(false)


// Sauvegarde automatique avec debounce
let saveTimeout = null;
const debouncedSave = () => {
  if (saveTimeout) {
    clearTimeout(saveTimeout)
  }
  saveTimeout = setTimeout(() => {
    saveFormToStorage()
  }, 1000) // Sauvegarde après 1 seconde d'inactivité
}

// Watcher pour sauvegarder automatiquement les changements
watch(form, () => {
  debouncedSave()
}, { deep: true })

// Restaurer les données au montage
onMounted(() => {
  loadFormFromStorage()
})

// Nettoyer le timeout au démontage
onUnmounted(() => {
  if (saveTimeout) {
    clearTimeout(saveTimeout)
  }
})

// Sauvegarder comme brouillon
const saveDraft = async () => {
  try {
    isSubmitting.value = true
    console.log('Sauvegarde comme brouillon:', form.value)
    
    // TODO: Implémenter la sauvegarde en brouillon
    // await createProperty({ ...form.value, status: 'draft' })
    
    // Sauvegarder explicitement
    saveFormToStorage()
    
    alert('Brouillon sauvegardé avec succès!')
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
    alert('Erreur lors de la sauvegarde du brouillon')
  } finally {
    isSubmitting.value = false
  }
}

// Publier le bien
const publishProperty = async () => {
  try {
    isSubmitting.value = true
    
    // Validation des champs obligatoires (seulement les plus importants)
    if (!form.value.title || !form.value.type || !form.value.transactionType || 
        !form.value.address || !form.value.city || !form.value.price) {
      alert('Veuillez remplir les champs obligatoires : Titre, Type, Transaction, Adresse, Ville et Prix')
      return
    }

    console.log('Publication du bien:', form.value)
    
    // Préparer les données pour l'API (sans les images pour éviter le payload trop large)
    const propertyData = {
      title: form.value.title,
      description: form.value.description,
      type: form.value.type,
      transactionType: form.value.transactionType, // Corrigé: transactionType au lieu de transaction_type
      price: parseFloat(form.value.price),
      address: form.value.address,
      postalCode: form.value.postalCode, // Corrigé: postalCode au lieu de postal_code
      city: form.value.city,
      location: form.value.location,
      rooms: form.value.rooms ? parseInt(form.value.rooms) : undefined,
      bedrooms: form.value.bedrooms ? parseInt(form.value.bedrooms) : undefined,
      bathrooms: form.value.bathrooms ? parseInt(form.value.bathrooms) : undefined,
      area: form.value.area ? parseFloat(form.value.area) : undefined,
      floor: form.value.floor ? parseInt(form.value.floor) : undefined,
      totalFloors: form.value.totalFloors ? parseInt(form.value.totalFloors) : undefined, // Corrigé: totalFloors au lieu de total_floors
      monthlyCharges: form.value.monthlyCharges ? parseFloat(form.value.monthlyCharges) : undefined, // Corrigé: monthlyCharges au lieu de monthly_charges
      deposit: form.value.deposit ? parseFloat(form.value.deposit) : undefined,
      agencyFees: form.value.agencyFees ? parseFloat(form.value.agencyFees) : undefined, // Corrigé: agencyFees au lieu de agency_fees
      applicationFees: form.value.applicationFees ? parseFloat(form.value.applicationFees) : undefined, // Corrigé: applicationFees au lieu de application_fees
      furnished: form.value.furnished || false,
      petsAllowed: form.value.petsAllowed || false, // Corrigé: petsAllowed au lieu de pets_allowed
      smokingAllowed: form.value.smokingAllowed || false,
      studentFriendly: form.value.studentFriendly || false, // Corrigé: studentFriendly au lieu de student_friendly
      constructionYear: form.value.constructionYear ? parseInt(form.value.constructionYear) : undefined,
      livingArea: form.value.livingArea ? parseFloat(form.value.livingArea) : undefined,
      orientation: form.value.orientation || undefined,
      condition: form.value.condition || undefined,
      leaseDuration: form.value.leaseDuration || undefined,
      availableFrom: form.value.availableFrom || undefined, // Corrigé: availableFrom au lieu de available_from
      contactMethods: form.value.contactMethods || [],
      visitAvailability: form.value.visitAvailability || undefined,
      additionalInfo: form.value.additionalInfo || undefined,
      equipments: form.value.equipments || [],
      latitude: form.value.latitude ? parseFloat(form.value.latitude) : undefined,
      longitude: form.value.longitude ? parseFloat(form.value.longitude) : undefined
      // Note: Les images seront uploadées séparément après la création de la propriété
    }
    
    console.log('Données à envoyer:', propertyData)
    
    // Créer la propriété via le store
    const newProperty = await createProperty(propertyData)
    
    // Uploader les images si il y en a
    if (form.value.photos && form.value.photos.length > 0) {
      console.log('Upload des images...')
      for (const photo of form.value.photos) {
        if (photo.file) {
          try {
            await uploadPropertyImage(newProperty.id, photo.file)
            console.log('Image uploadée:', photo.name)
          } catch (error) {
            console.error('Erreur upload image:', error)
            // Continuer même si une image échoue
          }
        }
      }
    }
    
    // Nettoyer le localStorage après publication réussie
    clearFormStorage()
    
    alert('Bien publié avec succès!')
    
    // Rediriger vers la page des propriétés
    await router.push('/dashboard/properties')
    
  } catch (error) {
    console.error('Erreur lors de la publication:', error)
    alert('Erreur lors de la publication du bien: ' + (error.message || 'Erreur inconnue'))
  } finally {
    isSubmitting.value = false
  }
}
</script>

