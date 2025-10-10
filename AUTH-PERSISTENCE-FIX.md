# Correction de la persistance d'authentification

## Problème
L'utilisateur est déconnecté lors du rechargement de la page.

## Solutions implémentées

### 1. Plugin d'authentification (`plugins/auth-persistence.client.ts`)
- ✅ **Créé** : Plugin pour initialiser l'authentification au démarrage
- ✅ **Méthode** : `initializeAuth()` pour vérifier l'authentification côté client

### 2. Store d'authentification amélioré (`stores/auth.store.ts`)
- ✅ **Méthode `initializeAuth()`** : Initialise l'authentification au démarrage
- ✅ **Méthode `checkAuth()` améliorée** : Meilleure gestion des erreurs
- ✅ **Login amélioré** : Sauvegarde directe de l'état sans re-vérification

### 3. Middleware d'authentification (`middleware/auth.ts`)
- ✅ **Vérification systématique** : `await auth.checkAuth()` à chaque navigation
- ✅ **Redirection appropriée** : Selon l'état d'authentification

## Diagnostic

### Vérifier le token dans localStorage
1. **Ouvrir les DevTools** (F12)
2. **Aller dans Application/Storage** → **Local Storage**
3. **Vérifier** que `access_token` existe et n'est pas expiré

### Vérifier les logs de la console
1. **Ouvrir la console** (F12)
2. **Recharger la page**
3. **Vérifier** s'il y a des erreurs d'authentification

### Tester l'endpoint backend
```javascript
// Dans la console du navigateur
const token = localStorage.getItem('access_token');
fetch('http://localhost:3000/api/user-profile/me', {
  headers: { 'Authorization': `Bearer ${token}` }
}).then(r => r.json()).then(console.log);
```

## Causes possibles

### 1. Token expiré
- **Symptôme** : Token existe mais API retourne 401
- **Solution** : Se reconnecter

### 2. Token corrompu
- **Symptôme** : Token existe mais format invalide
- **Solution** : Nettoyer localStorage et se reconnecter

### 3. Backend non accessible
- **Symptôme** : Erreur réseau lors de `checkAuth()`
- **Solution** : Vérifier que le backend est démarré

### 4. CORS ou configuration
- **Symptôme** : Erreurs CORS dans la console
- **Solution** : Vérifier la configuration CORS du backend

## Test de la correction

1. **Se connecter** normalement
2. **Vérifier** que le token est sauvegardé dans localStorage
3. **Recharger la page** (F5)
4. **Vérifier** que l'utilisateur reste connecté
5. **Naviguer** entre les pages pour tester la persistance

## Commandes de test

```javascript
// Vérifier l'état d'authentification
const authStore = useAuthStore();
console.log('Authenticated:', authStore.isAuthenticated);
console.log('User:', authStore.user);
console.log('Token:', localStorage.getItem('access_token'));

// Forcer la vérification
await authStore.checkAuth();
```

## Si le problème persiste

1. **Vider le localStorage** : `localStorage.clear()`
2. **Se reconnecter** complètement
3. **Vérifier** que le backend fonctionne
4. **Contrôler** les logs du backend pour les erreurs d'authentification
