export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore();
  
  // Vérifier d'abord si on a un token en localStorage
  const token = process.client ? localStorage.getItem('access_token') : null;
  
  if (token) {
    // Si on a un token, vérifier l'authentification
    await auth.checkAuth();
    
    // Si l'utilisateur est connecté, rediriger
    if (auth.isAuthenticated) {
      return navigateTo('/dashboard');
    }
  }
  
  // Si pas de token ou authentification échouée, permettre l'accès
});
