<template>
  <section id="how-it-works" class="section bg-neutral-50">
    <div class="container">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Comment ça fonctionne</h2>
        <p class="text-lg text-neutral-600">
          Une expérience fluide de bout en bout pour tous les utilisateurs
        </p>
      </div>
      
      <!-- Steps -->
      <div class="relative">
        <!-- Connection Line -->
        <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-primary-200 -translate-x-1/2 z-0"></div>
        
        <div class="space-y-12 md:space-y-24 relative z-10">
          <!-- Step 1 -->
          <div class="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
            <div class="md:w-1/2 order-2 md:order-1 animate-slide-up">
              <div class="bg-white rounded-xl shadow-md p-6 md:p-8">
                <div class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-6 text-primary-600 font-bold text-xl">
                  1
                </div>
                <h3 class="text-2xl font-bold mb-4">Créez votre profil</h3>
                <p class="text-neutral-600 mb-6">
                  Inscrivez-vous en quelques minutes et complétez votre profil en fonction de votre rôle : 
                  locataire, propriétaire ou agence immobilière. Ajoutez vos documents et informations pertinentes.
                </p>
                <ul class="space-y-3">
                  <li class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>Création de compte simple et rapide</span>
                  </li>
                  <li class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>Téléchargement sécurisé de documents</span>
                  </li>
                  <li class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>Interface adaptée selon votre rôle</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="md:w-1/2 order-1 md:order-2 animate-slide-in-right">
              <img 
                src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Create Profile" 
                class="rounded-xl shadow-lg"
              />
            </div>
          </div>
          
          <!-- Step 2 -->
          <div class="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
            <div class="md:w-1/2 animate-slide-in-right">
              <img 
                src="https://images.pexels.com/photos/7821879/pexels-photo-7821879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Search Property" 
                class="rounded-xl shadow-lg"
              />
            </div>
            <div class="md:w-1/2 animate-slide-up">
              <div class="bg-white rounded-xl shadow-md p-6 md:p-8">
                <div class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-6 text-primary-600 font-bold text-xl">
                  2
                </div>
                <h3 class="text-2xl font-bold mb-4">Trouvez ou publiez un bien</h3>
                <p class="text-neutral-600 mb-6">
                  Pour les locataires, explorez notre base de données d'annonces filtrée selon vos critères. 
                  Pour les propriétaires, publiez vos biens en quelques clics avec notre outil intuitif.
                </p>
                <ul class="space-y-3">
                  <li class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>Recherche avancée avec filtres personnalisés</span>
                  </li>
                  <li class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>Publication multi-canaux pour les propriétaires</span>
                  </li>
                  <li class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>Estimation automatique des prix par IA</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <!-- Step 3 -->
          <div class="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
            <div class="md:w-1/2 order-2 md:order-1 animate-slide-up">
              <div class="bg-white rounded-xl shadow-md p-6 md:p-8">
                <div class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-6 text-primary-600 font-bold text-xl">
                  3
                </div>
                <h3 class="text-2xl font-bold mb-4">Organisez les visites</h3>
                <p class="text-neutral-600 mb-6">
                  Utilisez notre agenda intégré pour planifier ou réserver des visites. Les propriétaires peuvent 
                  définir leurs disponibilités et les candidats réserver des créneaux en temps réel.
                </p>
                <ul class="space-y-3">
                  <li class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>Calendrier intelligent avec synchronisation</span>
                  </li>
                  <li class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>Rappels automatiques par email et notifications</span>
                  </li>
                  <li class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>Check-in digital pour les visites</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="md:w-1/2 order-1 md:order-2 animate-slide-in-right">
              <img 
                src="https://images.pexels.com/photos/5997993/pexels-photo-5997993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Schedule Visits" 
                class="rounded-xl shadow-lg"
              />
            </div>
          </div>
          
          <!-- Step 4 -->
          <div class="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
            <div class="md:w-1/2 animate-slide-in-right">
              <img 
                src="https://images.pexels.com/photos/6774274/pexels-photo-6774274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Contract Signing" 
                class="rounded-xl shadow-lg"
              />
            </div>
            <div class="md:w-1/2 animate-slide-up">
              <div class="bg-white rounded-xl shadow-md p-6 md:p-8">
                <div class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-6 text-primary-600 font-bold text-xl">
                  4
                </div>
                <h3 class="text-2xl font-bold mb-4">Finalisez votre location</h3>
                <p class="text-neutral-600 mb-6">
                  Postulez avec votre dossier digital ou sélectionnez le candidat idéal. Puis signez le contrat 
                  électroniquement et accédez à notre marketplace de services pour une installation sans stress.
                </p>
                <ul class="space-y-3">
                  <li class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>Signature électronique des contrats</span>
                  </li>
                  <li class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>Services partenaires (assurance, déménagement)</span>
                  </li>
                  <li class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>État des lieux digital</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Call to Action -->
      <div class="mt-20 text-center">
        <a href="#" class="btn btn-primary inline-flex items-center">
          Commencer gratuitement
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>