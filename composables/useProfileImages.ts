import { computed } from 'vue';

export const useProfileImages = (userProfile: any, mode: any) => {
  // Fonction pour obtenir l'URL de l'image de profil par défaut selon le type d'utilisateur
  const getDefaultProfileImage = () => {
    // Vérifier les rôles de l'utilisateur
    const userRoles = userProfile.value?.roles || [];
    const hasCandidatRole = userRoles.includes('candidat');
    const hasAnnonceurRole = userRoles.includes('annonceur');
    
    // Si l'utilisateur a les deux rôles, utiliser une image par défaut neutre
    if (hasCandidatRole && hasAnnonceurRole) {
      // Image par défaut neutre pour les utilisateurs avec les deux rôles
      return 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400';
    }
    
    // Si l'utilisateur n'a qu'un seul rôle, utiliser l'image appropriée
    if (hasAnnonceurRole && !hasCandidatRole) {
      // Pour les annonceurs uniquement, différencier selon le type
      if (userProfile.value?.advertiser_type === 'professional') {
        // Image par défaut pour les entreprises/agences
        return 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400';
      } else {
        // Image par défaut pour les propriétaires indépendants
        return 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400';
      }
    } else {
      // Image par défaut pour les candidats uniquement
      return 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400';
    }
  };

  // Fonction pour obtenir l'URL de l'image de profil
  const getProfileImageUrl = () => {
    if (!userProfile.value) {
      return getDefaultProfileImage();
    }
    
    // Vérifier les rôles de l'utilisateur
    const userRoles = userProfile.value?.roles || [];
    const hasCandidatRole = userRoles.includes('candidat');
    const hasAnnonceurRole = userRoles.includes('annonceur');
    
    // Si l'utilisateur a les deux rôles, utiliser l'image spécifique au mode actuel
    if (hasCandidatRole && hasAnnonceurRole) {
      if (mode.value === 'candidat') {
        // Utiliser l'image spécifique au candidat
        const candidateImage = userProfile.value.candidate_profile_image_url;
        if (candidateImage) {
          // Ajouter un paramètre de cache-busting pour forcer le rechargement
          const timestamp = Date.now();
          return `${candidateImage}?t=${timestamp}&mode=candidat`;
        }
      } else if (mode.value === 'annonceur') {
        // Utiliser l'image spécifique à l'annonceur
        const annonceurImage = userProfile.value.annonceur_profile_image_url;
        if (annonceurImage) {
          // Ajouter un paramètre de cache-busting pour forcer le rechargement
          const timestamp = Date.now();
          return `${annonceurImage}?t=${timestamp}&mode=annonceur`;
        }
      }
    }
    
    // Fallback : essayer les champs génériques
    const imageUrl = userProfile.value.avatar_url || 
                     userProfile.value.profile_photo_url || 
                     userProfile.value.profile_image_url ||
                     userProfile.value.photo_url;
    
    if (imageUrl) {
      return imageUrl;
    }
    
    // Image par défaut selon le type d'utilisateur
    return getDefaultProfileImage();
  };

  // Computed property pour l'image par défaut (pour l'onboarding)
  const defaultProfileImage = computed(() => {
    return getDefaultProfileImage();
  });

  // Computed property réactive pour l'URL de l'image de profil
  const profileImageUrl = computed(() => {
    return getProfileImageUrl();
  });

  return {
    getDefaultProfileImage,
    getProfileImageUrl,
    profileImageUrl, // Computed property réactive
    defaultProfileImage
  };
};
