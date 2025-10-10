export const useAuth = () => {
  const authStore = useAuthStore();
  
  // État réactif pour le profil utilisateur
  const userProfile = ref(null);
  const isLoading = ref(false);
  
  // Fonction pour récupérer le profil utilisateur
  const fetchUserProfile = async () => {
    if (!authStore.isAuthenticated) {
      userProfile.value = null;
      return null;
    }
    
    isLoading.value = true;
    
    try {
      const response = await authStore.getFullUserProfile();
      userProfile.value = response.profile || response.user || response;
      return userProfile.value;
    } catch (error) {
      userProfile.value = null;
      return null;
    } finally {
      isLoading.value = false;
    }
  };
  
  // Fonction de déconnexion
  const logout = () => {
    authStore.logout();
    userProfile.value = null;
  };
  
  // Fonction pour vérifier l'authentification
  const checkAuth = async () => {
    return await authStore.checkAuth();
  };
  
  // Fonction pour obtenir le token
  const getToken = () => {
    return authStore.getAuthToken();
  };
  
  // Fonction pour faire des requêtes authentifiées
  const authenticatedFetch = async (url: string, options: any = {}) => {
    return await authStore.authenticatedFetch(url, options);
  };
  
  return {
    // État
    isAuthenticated: computed(() => authStore.isAuthenticated),
    user: computed(() => authStore.user),
    userProfile: readonly(userProfile),
    isLoading: readonly(isLoading),
    
    // Actions
    fetchUserProfile,
    logout,
    checkAuth,
    getToken,
    authenticatedFetch,
  };
};
