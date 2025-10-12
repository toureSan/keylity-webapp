import { ref, computed } from 'vue'

// Store global pour le mode utilisateur
const globalCurrentMode = ref('candidat')
const globalIsModeChanging = ref(false)

export const useUserMode = () => {
  // Computed pour le mode avec réactivité
  const mode = computed(() => globalCurrentMode.value)

  // Fonction pour initialiser le mode
  const initializeMode = (response: any = null, userProfile: any = null) => {
    // Utiliser les rôles de la réponse si fournie, sinon du userProfile
    const roles = response?.roles || userProfile?.roles || []
    const savedMode = localStorage.getItem('userMode')

    if (roles.includes('candidat') && roles.includes('annonceur')) {
      if (savedMode && (savedMode === 'candidat' || savedMode === 'annonceur')) {
        globalCurrentMode.value = savedMode
      } else {
        globalCurrentMode.value = 'candidat'
      }
    } else if (roles.includes('annonceur')) {
      globalCurrentMode.value = 'annonceur'
    } else {
      globalCurrentMode.value = 'candidat'
    }
  }

  // Fonction pour basculer le mode
  const switchMode = (newMode: string) => {
    globalIsModeChanging.value = true
    globalCurrentMode.value = newMode
    localStorage.setItem('userMode', newMode)
    
    // Désactiver le skeleton après un délai
    setTimeout(() => {
      globalIsModeChanging.value = false
    }, 500)
  }

  // Computed pour l'état de changement de mode
  const isModeChanging = computed(() => globalIsModeChanging.value)

  // Vérifier si l'utilisateur a le rôle annonceur
  const hasAnnonceurRole = computed(() => {
    // Cette fonction sera appelée depuis les composants qui ont accès aux rôles
    return true // Sera surchargée par les composants
  })

  // Vérifier si l'utilisateur a le rôle candidat
  const hasCandidatRole = computed(() => {
    // Cette fonction sera appelée depuis les composants qui ont accès aux rôles
    return true // Sera surchargée par les composants
  })

  return {
    mode,
    isModeChanging,
    hasAnnonceurRole,
    hasCandidatRole,
    switchMode,
    initializeMode,
  }
}