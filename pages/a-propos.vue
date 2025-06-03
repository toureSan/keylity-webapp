<template>
<<<<<<< HEAD
  <div class="min-h-screen bg-gray-50">
    <HeaderSearch />
    
    <!-- Main Content -->
    <div class="pt-32 md:pt-24 h-[calc(100vh-6rem)] overflow-hidden">
      <div class="container mx-auto px-4 h-full">
        <div class="flex h-full">
          <!-- Mobile Filters Button -->
          <button 
            @click="isFilterOpen = true"
            class="fixed bottom-6 right-6 z-50 lg:hidden bg-gray-900 text-white p-4 rounded-full shadow-lg"
          >
            <Icon name="heroicons:adjustments-horizontal" class="w-6 h-6" />
          </button>

          <!-- Mobile Filters Dialog -->
          <TransitionRoot appear :show="isFilterOpen" as="template">
            <Dialog as="div" @close="isFilterOpen = false" class="relative z-50 lg:hidden">
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="fixed inset-0 bg-black bg-opacity-25" />
              </TransitionChild>

              <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4">
                  <TransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    enter-from="opacity-0 scale-95"
                    enter-to="opacity-100 scale-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100 scale-100"
                    leave-to="opacity-0 scale-95"
                  >
                    <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                      <div class="flex justify-between items-center mb-4">
                        <DialogTitle as="h3" class="text-lg font-medium">
                          Filtres
                        </DialogTitle>
                        <button @click="isFilterOpen = false" class="p-2 hover:bg-gray-100 rounded-lg">
                          <Icon name="heroicons:x-mark" class="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div class="mt-4">
                        <SearchFilters />
                      </div>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </Dialog>
          </TransitionRoot>

          <!-- Desktop Filters -->
          <div class="hidden lg:block w-80 flex-shrink-0 overflow-y-auto h-full pr-6">
            <SearchFilters />
          </div>

          <!-- Properties Grid -->
          <div class="flex-1 min-w-0 overflow-y-auto h-full">
            <!-- Results Header -->
            <div class="flex justify-between items-center mb-8">
              <div>
                <h1 class="text-2xl font-semibold mb-2">Propriétés disponibles</h1>
                <p class="text-gray-600">{{ properties.length }} biens trouvés</p>
              </div>
              
              <Listbox v-model="sortBy" as="div" class="relative">
                <ListboxButton class="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <span class="block truncate">{{ sortBy.name }}</span>
                  <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <Icon name="heroicons:chevron-up-down" class="h-5 w-5 text-gray-400" />
                  </span>
                </ListboxButton>

                <transition
                  leave-active-class="transition duration-100 ease-in"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <ListboxOption
                      v-for="option in sortOptions"
                      :key="option.id"
                      :value="option"
                      v-slot="{ active, selected }"
                    >
                      <li
                        :class="[
                          active ? 'bg-primary-100 text-primary-900' : 'text-gray-900',
                          'relative cursor-pointer select-none py-2 pl-10 pr-4'
                        ]"
                      >
                        <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                          {{ option.name }}
                        </span>
                        <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                          <Icon name="heroicons:check" class="h-5 w-5" />
                        </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </Listbox>
            </div>

            <!-- Properties Grid -->
            <div class="grid md:grid-cols-2 gap-6 pb-8">
              <PropertyCard 
                v-for="property in properties" 
                :key="property.id"
                :property="property"
              />
            </div>

            <!-- Load More -->
            <div class="text-center mt-12 pb-8">
              <button class="bg-white border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-xl hover:bg-gray-900 hover:text-white transition-colors">
                Voir plus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue'
import HeaderSearch from '../components/HeaderSearch.vue'

const isFilterOpen = ref(false)

const sortBy = ref({ id: 1, name: 'Prix (croissant)' })
const sortOptions = [
  { id: 1, name: 'Prix (croissant)' },
  { id: 2, name: 'Prix (décroissant)' },
  { id: 3, name: 'Surface' },
  { id: 4, name: 'Plus récent' }
]

const properties = [
  {
    id: 1,
    type: 'Penthouse',
    title: 'Penthouse de luxe avec vue panoramique',
    location: 'Cologny - Route de la Capite',
    size: 250,
    rooms: '6.5',
    price: '15\'000',
    availability: 'Disponible',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg'
  },
  {
    id: 2,
    type: 'Villa',
    title: 'Villa contemporaine avec piscine',
    location: 'Vandœuvres - Route de Vandœuvres',
    size: 400,
    rooms: '8.5',
    price: '25\'000',
    availability: 'Disponible',
    image: 'https://images.pexels.com/photos/32870/pexels-photo.jpg'
  },
  {
    id: 3,
    type: 'Appartement',
    title: 'Appartement de prestige',
    location: 'Genève - Quai du Mont-Blanc',
    size: 180,
    rooms: '4.5',
    price: '12\'000',
    availability: 'Sur demande',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
  },
  {
    id: 4,
    type: 'Penthouse',
    title: 'Penthouse avec terrasse privée',
    location: 'Genève - Rue du Rhône',
    size: 300,
    rooms: '7.5',
    price: '18\'000',
    availability: 'Disponible',
    image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg'
  }
]
</script>
=======
  <div class="min-h-screen flex items-center justify-center">
    <h1 class="text-3xl font-bold text-gray-700">
      Page À propos en construction
    </h1>
  </div>
</template>
>>>>>>> 4eb96a77bc7294c004e3e2e0e313b5017de23e04
