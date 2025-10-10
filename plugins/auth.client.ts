export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();
  
  // Vérifier l'authentification au démarrage de l'application
  if (process.client) {
    await authStore.checkAuth();
  }
});
