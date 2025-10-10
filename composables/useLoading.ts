// Composable pour gérer l'état de chargement
export const useLoading = (): {
  loading: Readonly<Ref<boolean>>
  error: Readonly<Ref<string | null>>
  setLoading: (value: boolean) => void
  setError: (message: string) => void
  clearError: () => void
  withLoading: <T>(fn: () => Promise<T>) => Promise<T>
} => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const setLoading = (value: boolean) => {
    loading.value = value
    if (value) {
      error.value = null
    }
  }

  const setError = (message: string) => {
    error.value = message
    loading.value = false
  }

  const clearError = () => {
    error.value = null
  }

  const withLoading = async <T>(fn: () => Promise<T>): Promise<T> => {
    try {
      setLoading(true)
      const result = await fn()
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    loading: readonly(loading),
    error: readonly(error),
    setLoading,
    setError,
    clearError,
    withLoading
  }
}
