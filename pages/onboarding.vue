<template>
  <!-- Skeleton pendant le chargement -->
  <div v-if="loading" class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
    <div class="w-full max-w-4xl mx-auto p-8">
      <SkeletonLoader type="form" :fields="8" />
    </div>
  </div>
  
  <!-- Contenu principal -->
  <Onboarding 
    v-else
    :mode="userRole" 
    :user-profile="userProfile"
    :user-roles="userRoles"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth.store'

// SEO
useHead({
  title: 'Onboarding - Keylity',
  meta: [
    { name: 'description', content: 'Complétez votre profil Keylity' }
  ]
})

const authStore = useAuthStore()
const userRole = ref('candidat')
const userProfile = ref({})
const userRoles = ref([])
const loading = ref(true)

// Récupérer le profil et les rôles de l'utilisateur
onMounted(async () => {
  try {
    const profile = await authStore.getUserProfile()
    
    // Le backend retourne { user, roles, profile }
    userProfile.value = profile.profile || {}
    userRoles.value = profile.roles || []
    userRole.value = profile.roles?.[0] || 'candidat'
    
  } catch (error) {
  } finally {
    loading.value = false
  }
})
</script>