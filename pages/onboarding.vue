<template>
  <Onboarding :mode="userRole" />
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

// Récupérer le rôle de l'utilisateur
onMounted(async () => {
  try {
    const profile = await authStore.getUserProfile()
    userRole.value = profile.roles?.[0] || 'candidat'
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error)
  }
})
</script>