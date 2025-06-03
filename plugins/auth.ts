import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(async () => {
  const auth = useAuthStore()
  
  // Vérifier l'état d'authentification au chargement de l'application
  await auth.checkAuth()
}) 