<template>
         <div class="bg-white rounded-xl shadow-sm">
                  <!-- Messages Container -->
                  <div class="flex h-[calc(100vh-8rem)]">
                           <!-- Conversations List -->
                           <div class="w-full md:w-80 border-r border-gray-200 flex flex-col"
                                    :class="{ 'hidden md:flex': selectedConversation && isMobile }">
                                    <!-- Search Bar -->
                                    <div class="p-4 border-b border-gray-200">
                                             <div class="relative">
                                                      <input type="text" placeholder="Rechercher dans les messages..."
                                                               class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                                                      <Icon name="heroicons:magnifying-glass"
                                                               class="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                             </div>
                                    </div>

                                    <!-- Conversations -->
                                    <div class="flex-1 overflow-y-auto">
                                             <div v-for="conversation in conversations" :key="conversation.id"
                                                      @click="selectConversation(conversation)"
                                                      class="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                                                      :class="{ 'bg-primary-50': selectedConversation?.id === conversation.id }">
                                                      <div class="flex items-center gap-3">
                                                               <img :src="conversation.avatar" :alt="conversation.name"
                                                                        class="w-12 h-12 rounded-full object-cover">
                                                               <div class="flex-1 min-w-0">
                                                                        <div class="flex items-center justify-between">
                                                                                 <h3
                                                                                          class="font-medium text-gray-900 truncate">
                                                                                          {{ conversation.name }}</h3>
                                                                                 <span
                                                                                          class="text-xs text-gray-500">{{ conversation.lastMessageTime }}</span>
                                                                        </div>
                                                                        <p class="text-sm text-gray-500 truncate">
                                                                                 {{ conversation.lastMessage }}</p>
                                                               </div>
                                                      </div>
                                             </div>
                                    </div>
                           </div>

                           <!-- Chat Area -->
                           <div class="flex-1 flex flex-col bg-white"
                                    :class="{ 'hidden md:flex': !selectedConversation && isMobile }">
                                    <template v-if="selectedConversation">
                                             <!-- Chat Header -->
                                             <div class="p-4 border-b border-gray-200 flex items-center gap-4">
                                                      <!-- Back Button on Mobile -->
                                                      <button v-if="isMobile" @click="selectedConversation = null"
                                                               class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                                               <Icon name="heroicons:chevron-left"
                                                                        class="h-5 w-5 text-gray-600" />
                                                      </button>

                                                      <div class="flex items-center gap-3 flex-1">
                                                               <img :src="selectedConversation.avatar"
                                                                        :alt="selectedConversation.name"
                                                                        class="w-10 h-10 rounded-full object-cover">
                                                               <div>
                                                                        <h2 class="font-medium">
                                                                                 {{ selectedConversation.name }}</h2>
                                                                        <p class="text-sm text-gray-500">
                                                                                 {{ selectedConversation.status }}</p>
                                                               </div>
                                                      </div>

                                                      <div class="flex items-center gap-2">
                                                               <button class="p-2 hover:bg-gray-100 rounded-lg">
                                                                        <Icon name="heroicons:phone"
                                                                                 class="h-5 w-5 text-gray-500" />
                                                               </button>
                                                               <button class="p-2 hover:bg-gray-100 rounded-lg">
                                                                        <Icon name="heroicons:video-camera"
                                                                                 class="h-5 w-5 text-gray-500" />
                                                               </button>
                                                               <button class="p-2 hover:bg-gray-100 rounded-lg">
                                                                        <Icon name="heroicons:ellipsis-vertical"
                                                                                 class="h-5 w-5 text-gray-500" />
                                                               </button>
                                                      </div>
                                             </div>

                                             <!-- Messages -->
                                             <div class="flex-1 overflow-y-auto p-4 space-y-4">
                                                      <template v-for="message in selectedConversation.messages"
                                                               :key="message.id">
                                                               <div class="flex items-end gap-2"
                                                                        :class="{ 'justify-end': message.isSent }">
                                                                        <img v-if="!message.isSent"
                                                                                 :src="selectedConversation.avatar"
                                                                                 :alt="selectedConversation.name"
                                                                                 class="w-8 h-8 rounded-full object-cover">
                                                                        <div class="max-w-[75%] md:max-w-md rounded-lg p-3"
                                                                                 :class="message.isSent ? 'bg-primary-500 text-white' : 'bg-gray-100'">
                                                                                 <p>{{ message.content }}</p>
                                                                                 <span class="text-xs mt-1 block"
                                                                                          :class="message.isSent ? 'text-primary-100' : 'text-gray-500'">
                                                                                          {{ message.time }}
                                                                                 </span>
                                                                        </div>
                                                               </div>
                                                      </template>
                                             </div>

                                             <!-- Message Input -->
                                             <div class="p-4 border-t border-gray-200">
                                                      <div class="flex items-end gap-2">
                                                               <div class="flex-1 relative">
                                                                        <textarea v-model="newMessage" rows="1"
                                                                                 placeholder="Écrivez votre message..."
                                                                                 class="w-full pl-4 pr-12 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                                                                                 @keydown.enter.prevent="sendMessage"></textarea>
                                                                        <div
                                                                                 class="absolute right-2 bottom-2 flex items-center gap-2">
                                                                                 <button
                                                                                          class="p-2 hover:bg-gray-100 rounded-full">
                                                                                          <Icon name="heroicons:paper-clip"
                                                                                                   class="h-5 w-5 text-gray-500" />
                                                                                 </button>
                                                                                 <button
                                                                                          class="p-2 hover:bg-gray-100 rounded-full">
                                                                                          <Icon name="heroicons:face-smile"
                                                                                                   class="h-5 w-5 text-gray-500" />
                                                                                 </button>
                                                                        </div>
                                                               </div>
                                                               <button @click="sendMessage"
                                                                        class="px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                                                                        <Icon name="heroicons:paper-airplane"
                                                                                 class="h-5 w-5" />
                                                               </button>
                                                      </div>
                                             </div>
                                    </template>

                                    <!-- No Conversation Selected -->
                                    <div v-else class="flex-1 flex items-center justify-center">
                                             <div class="text-center">
                                                      <div
                                                               class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                               <Icon name="heroicons:chat-bubble-left-right"
                                                                        class="h-8 w-8 text-gray-400" />
                                                      </div>
                                                      <h3 class="text-lg font-medium text-gray-900">Vos messages</h3>
                                                      <p class="text-gray-500 mt-1">Sélectionnez une conversation pour
                                                               commencer</p>
                                             </div>
                                    </div>
                           </div>
                  </div>
         </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const conversations = ref([
         {
                  id: 1,
                  name: 'Eleanor Pena',
                  avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
                  status: 'En ligne',
                  lastMessage: 'Ac commodo mauris magna odio amet ante. Fermentum porta...',
                  lastMessageTime: '53min',
                  messages: [
                           {
                                    id: 1,
                                    content: 'Quis cursus eros, morbi vitae aenean ante nibh a. Mi ornare vitae viverra risus senectus amet. Maecenas mattis in in odio imperdiet.',
                                    time: '5:10',
                                    isSent: false
                           },
                           {
                                    id: 2,
                                    content: 'Duis proin eu sagittis fermentum eget pharetra libero augue dui. Suscipit volutpat fames tincidunt.',
                                    time: '5:10',
                                    isSent: true
                           }
                  ]
         },
         {
                  id: 2,
                  name: 'Jane Cooper',
                  avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
                  status: 'En ligne il y a 32min',
                  lastMessage: 'Ac commodo mauris magna odio amet ante. Fermentum porta...',
                  lastMessageTime: '1h',
                  messages: []
         },
         {
                  id: 3,
                  name: 'Wade Warren',
                  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
                  status: 'Hors ligne',
                  lastMessage: 'Ac commodo mauris magna odio amet ante. Fermentum porta...',
                  lastMessageTime: 'Jeu. 6 mai',
                  messages: []
         },
         {
                  id: 4,
                  name: 'Esther Howard',
                  avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
                  status: 'En ligne',
                  lastMessage: 'Ac commodo mauris magna odio amet ante. Fermentum porta...',
                  lastMessageTime: 'Lun. 3 mai',
                  messages: []
         }
])

const selectedConversation = ref(null)
const newMessage = ref('')
const isMobile = ref(false)

const selectConversation = (conversation) => {
         selectedConversation.value = conversation
}

const sendMessage = () => {
         if (!newMessage.value.trim()) return

         if (selectedConversation.value) {
                  selectedConversation.value.messages.push({
                           id: Date.now(),
                           content: newMessage.value,
                           time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                           isSent: true
                  })
                  newMessage.value = ''
         }
}

onMounted(() => {
         const checkMobile = () => {
                  isMobile.value = window.innerWidth < 768
         }

         checkMobile()
         window.addEventListener('resize', checkMobile)

         return () => {
                  window.removeEventListener('resize', checkMobile)
         }
})
</script>