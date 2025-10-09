import { useAuthStore } from '~/stores/auth.store'

export const useAuth = () => {
  const authStore = useAuthStore()

  const login = async (credentials) => {
    try {
      const response = await authStore.login(credentials)
      return { success: true, user: response.user }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?._data?.message || error.message || 'Une erreur est survenue lors de la connexion'
      }
    }
  }

  const register = async (userData) => {
    try {
      const response = await authStore.register(userData.email, userData.password)
      return { success: true, message: response.message }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?._data?.message || error.message || 'Une erreur est survenue lors de l\'inscription'
      }
    }
  }

  const logout = () => {
    authStore.logout()
  }

  const checkAuth = async () => {
    return await authStore.checkAuth()
  }

  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const user = computed(() => authStore.user)

  return {
    login,
    register,
    logout,
    checkAuth,
    isAuthenticated,
    user
  }
}