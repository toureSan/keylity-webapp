export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();
  
  // Vérifier l'authentification au démarrage de l'application
  if (process.client) {
    const token = localStorage.getItem('access_token');
    if (token) {
      await authStore.checkAuth();
    }
  }
});
