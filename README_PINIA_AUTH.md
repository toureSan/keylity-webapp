# Authentification avec Pinia dans Nuxt 3

## Installation de Pinia

1. Installer Pinia si ce n'est pas déjà fait :
   ```sh
   npm install pinia
   ```

2. Ajouter le plugin Pinia dans `plugins/pinia.ts` :
   ```ts
   import { createPinia } from 'pinia'

   export default defineNuxtPlugin((nuxtApp) => {
     const pinia = createPinia()
     nuxtApp.vueApp.use(pinia)
   })
   ```

## Création du store d'authentification

Dans `stores/auth.ts` :
```ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { email: string, name?: string },
    justRegistered: false,
    token: null as null | string,
  }),
  actions: {
    login(user: { email: string, name?: string }, token: string) {
      this.user = user
      this.token = token
      this.justRegistered = false
    },
    register(user: { email: string, name?: string }, token: string) {
      this.user = user
      this.token = token
      this.justRegistered = true
    },
    confirmEmail() {
      this.justRegistered = false
    },
    logout() {
      this.user = null
      this.token = null
      this.justRegistered = false
    },
    setJustRegistered(value: boolean) {
      this.justRegistered = value
    }
  }
})
```

## Utilisation dans un composant

```ts
import { useAuthStore } from '~/stores/auth'
const auth = useAuthStore()

// Pour protéger une page :
if (process.client && !auth.justRegistered) {
  router.replace('/login')
}

// Après inscription :
auth.register({ email: 'user@email.com', name: 'User' }, 'token_ici')

// Après confirmation d'email :
auth.confirmEmail()
```

## Astuce : persistance du store
Pour garder l'état après un refresh, tu peux utiliser le plugin [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/).

--- 