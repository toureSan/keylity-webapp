<template>
  <div class="flex h-screen">
    <!-- Sidebar -->

    <!-- Partie droite scrollable -->
    <main class="flex-1 overflow-y-auto p-6 bg-gray-50">
      <div>
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-xl font-bold">Mes biens immobiliers</h1>
        </div>

        <div
          class="grid md:grid-cols-3 gap-4 overflow-y-auto max-h-[calc(100vh-120px)]"
        >
          <!-- Property Card -->
          <div
            v-for="(bien, index) in biens"
            :key="index"
            class="border border-gray-200 rounded-lg shadow-sm overflow-hidden max-w-md mx-auto"
          >
            <div class="relative">
              <div class="aspect-w-4 aspect-h-3 relative">
                <img
                  :src="bien.image"
                  :alt="bien.titre"
                  class="w-full h-full object-cover"
                />
                <div
                  class="absolute inset-0ient-to-t from-black/40 to-transparent"
                ></div>
                <button
                  class="absolute top-2 right-2 p-1 rounded-full bg-white/90 hover:bg-white transition-colors"
                >
                  <Icon
                    name="heroicons:ellipsis-horizontal"
                    class="h-4 w-4 text-gray-700"
                  />
                </button>
                <div
                  class="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium"
                >
                  {{ bien.type }}
                </div>
                <div
                  class="absolute top-2 right-12 w-10 h-5 bg-white rounded-full p-0.5 cursor-pointer"
                >
                  <div class="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div
                  class="absolute bottom-2 left-2 bg-blue-500 text-white px-2 py-0.5 rounded text-xs flex items-center"
                >
                  <Icon name="heroicons:calendar" class="h-3 w-3 mr-1" />
                  Date de visite
                </div>
              </div>
            </div>

            <div class="p-3">
              <div class="flex justify-between items-start mb-1">
                <h3 class="text-lg font-semibold leading-tight">
                  {{ bien.titre }}
                </h3>
              </div>
              <div class="text-lg font-bold text-blue-600 mb-2">
                {{ bien.prix }}
                <span class="text-xs text-gray-500 font-normal">{{
                  bien.unit
                }}</span>
              </div>

              <div class="flex items-center text-gray-500 mb-2 text-sm">
                <Icon name="heroicons:map-pin" class="h-4 w-4 mr-1" />
                {{ bien.ville }}
              </div>

              <div class="grid grid-cols-3 gap-2 mb-4 text-sm">
                <div class="text-center text-gray-500">{{ bien.surface }}</div>
                <div class="text-center border-x border-gray-200 text-gray-500">
                  {{ bien.pieces }}
                </div>
                <div class="text-center text-gray-500">{{ bien.sdb }}</div>
              </div>

              <div
                class="flex justify-between items-center border-t border-gray-200 pt-2 text-sm"
              >
                <div class="flex items-center gap-2 text-gray-500">
                  <div class="flex items-center">
                    <Icon name="heroicons:user-group" class="h-4 w-4 mr-1" />
                    {{ bien.visites }} visites
                  </div>
                  <div class="flex items-center">
                    <Icon name="heroicons:document-text" class="h-4 w-4 mr-1" />
                    {{ bien.candidats }} Candidats
                  </div>
                </div>
              </div>
            </div>

            <div class="px-3 pb-3">
              <button
                class="bg-blue-500 px-12 py-2 text-white font-medium rounded-lg transition-colors"
              >
                Consulter les postulations
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
});

const biens = [
  {
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    titre: "Appartement F5 lumineux",
    type: "Appartement",
    prix: "CHF 1 400.-",
    unit: "/ mois",
    ville: "Genève",
    surface: "82 m²",
    pieces: "2 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 4,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },

  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
  {
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    titre: "Maison familiale spacieuse",
    type: "Maison",
    prix: "CHF 955 000.-",
    unit: "",
    ville: "Lausanne",
    surface: "2000 m²",
    pieces: "5 pièces",
    sdb: "2 SDB",
    visites: 12,
    candidats: 3,
  },
];
</script>
