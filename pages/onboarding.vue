<template>
  <Onboarding />
</template>

<script setup>
import Onboarding from '@/components/Onboarding.vue'

// Protection simple (à améliorer selon ta logique réelle)
import { useAuth } from '@/composables/useAuth'
const { isLoggedIn, redirectToLogin } = useAuth()
if (!isLoggedIn()) {
  redirectToLogin()
}
</script> 