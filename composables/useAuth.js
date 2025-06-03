export function useAuth() {
  function isLoggedIn() {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('user')
    }
    return false // côté serveur, on suppose que l'utilisateur n'est pas connecté
  }

  function redirectToLogin() {
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
    }
  }

  return { isLoggedIn, redirectToLogin }
}
