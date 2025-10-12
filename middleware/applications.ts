import { useAuthStore } from "../stores/auth.store";

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore();

  // Vérifier l'authentification
  await auth.checkAuth();

  if (!auth.isAuthenticated) {
    return navigateTo("/login");
  }

  // Vérifier si l'utilisateur a les rôles requis pour accéder aux candidatures
  const userProfile = await auth.getUserProfile();
  const userRoles = (userProfile as any)?.roles || [];
  
  if (!userRoles.includes('candidat') && !userRoles.includes('annonceur')) {
    console.warn('Utilisateur sans rôle candidat ou annonceur, redirection vers le dashboard');
    return navigateTo("/dashboard");
  }

  console.log('Middleware applications: Utilisateur autorisé avec les rôles:', userRoles);
});
