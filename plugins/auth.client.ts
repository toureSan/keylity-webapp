export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();
  
  // Vérifier l'authentification au démarrage de l'application
  if (process.client) {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        await authStore.checkAuth();
      } catch (error) {
        // En cas d'erreur, nettoyer le token
        localStorage.removeItem('access_token');
        authStore.isAuthenticated = false;
        authStore.user = null;
      }
    }
  }
});
