# 🎯 Gestion des rôles dans l'onboarding

## 📋 Fonctionnalité

Le système d'onboarding gère maintenant intelligemment les rôles déjà complétés par l'utilisateur, empêchant la modification de profils déjà finalisés.

## 🔧 Comportement

### **1. Rôles déjà complétés**
- **Boutons désactivés** : Les rôles complétés ne peuvent plus être sélectionnés
- **Indicateur visuel** : Icône de validation verte avec "Profil complété"
- **Style désactivé** : Opacité réduite et curseur "not-allowed"

### **2. Messages informatifs**
- **Message bleu** : Information sur les profils existants
- **Message vert** : Confirmation si tous les profils sont complétés
- **Redirection automatique** : Vers le dashboard si tout est complété

### **3. Logique de validation**
- **Vérification des rôles** : Basée sur `userProfile.is_onboarded` et `userRoles`
- **Protection contre la modification** : Empêche la sélection de rôles complétés
- **Messages d'erreur** : Alerte si tentative de modification

## 🎨 Interface utilisateur

### **Boutons de sélection**
```vue
<button 
  @click="canSelectCandidate ? selectUserType('tenant') : null"
  :disabled="!canSelectCandidate"
  :class="[
    'p-8 border-2 rounded-xl transition-all duration-200 text-left relative',
    canSelectCandidate ? 'hover:border-primary-300 hover:bg-primary-50 cursor-pointer' : 'opacity-50 cursor-not-allowed bg-gray-50'
  ]">
  <!-- Contenu du bouton -->
  <div v-if="isCandidateCompleted" class="mt-3 flex items-center gap-2 text-green-600">
    <Icon name="heroicons:check-circle" class="w-5 h-5" />
    <span class="text-sm font-medium">Profil complété</span>
  </div>
</button>
```

### **Messages informatifs**
```vue
<!-- Message pour profils existants -->
<div v-if="isCandidateCompleted || isAnnonceurCompleted" class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
  <div class="flex items-start gap-3">
    <Icon name="heroicons:information-circle" class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
    <div class="text-left">
      <h3 class="text-sm font-medium text-blue-900 mb-1">Profils existants</h3>
      <p class="text-sm text-blue-700">
        <!-- Message conditionnel selon les profils complétés -->
      </p>
    </div>
  </div>
</div>

<!-- Message si tous les profils sont complétés -->
<div v-if="isCandidateCompleted && isAnnonceurCompleted" class="mb-6 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
  <div class="flex items-center justify-center gap-3 mb-3">
    <Icon name="heroicons:check-circle" class="w-8 h-8 text-green-600" />
    <h3 class="text-lg font-semibold text-green-900">Tous vos profils sont complétés !</h3>
  </div>
  <p class="text-green-700 mb-4">
    Vous avez déjà complété vos profils candidat et propriétaire/agence. 
    Vous allez être redirigé vers votre tableau de bord.
  </p>
  <div class="flex justify-center">
    <NuxtLink to="/dashboard" class="btn btn-primary">
      Aller au tableau de bord
    </NuxtLink>
  </div>
</div>
```

## 🔍 Logique de validation

### **Computed properties**
```javascript
// Vérifier si le profil candidat est complété
const isCandidateCompleted = computed(() => {
  if (!props.userProfile) return false
  return props.userProfile.is_onboarded && 
         (props.userRoles.includes('candidat') || props.userProfile.user_type === 'candidat')
})

// Vérifier si le profil annonceur est complété
const isAnnonceurCompleted = computed(() => {
  if (!props.userProfile) return false
  return props.userProfile.is_onboarded && 
         (props.userRoles.includes('annonceur') || props.userProfile.user_type === 'annonceur')
})

// Permissions de sélection
const canSelectCandidate = computed(() => {
  return !isCandidateCompleted.value
})

const canSelectAnnonceur = computed(() => {
  return !isAnnonceurCompleted.value
})
```

### **Méthode de sélection**
```javascript
const selectUserType = (type) => {
  // Vérifier si le rôle est déjà complété
  if (type === 'tenant' && isCandidateCompleted.value) {
    error.value = 'Votre profil candidat est déjà complété. Vous ne pouvez pas le modifier ici.'
    return
  }
  
  if (type === 'landlord' && isAnnonceurCompleted.value) {
    error.value = 'Votre profil propriétaire/agence est déjà complété. Vous ne pouvez pas le modifier ici.'
    return
  }
  
  formData.value.userType = type
  error.value = '' // Clear any previous errors
  
  // Adjust total steps based on user type
  if (type === 'tenant') {
    totalSteps.value = 5 // Welcome, Personal, Professional, Documents, Complete
  } else {
    totalSteps.value = 4 // Welcome, Info, Documents, Complete
  }
}
```

## 📊 Props du composant

### **Props ajoutées**
```javascript
const props = defineProps({
  mode: {
    type: String,
    default: 'candidat'
  },
  userProfile: {
    type: Object,
    default: () => ({})
  },
  userRoles: {
    type: Array,
    default: () => []
  }
})
```

### **Utilisation dans la page**
```vue
<template>
  <Onboarding 
    :mode="userRole" 
    :user-profile="userProfile"
    :user-roles="userRoles"
  />
</template>

<script setup>
const userProfile = ref({})
const userRoles = ref([])

onMounted(async () => {
  try {
    const profile = await authStore.getUserProfile()
    userProfile.value = profile.profile || {}
    userRoles.value = profile.roles || []
    userRole.value = profile.roles?.[0] || 'candidat'
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error)
  }
})
</script>
```

## 🚀 Scénarios d'utilisation

### **1. Utilisateur sans profil**
- **Comportement** : Peut sélectionner n'importe quel rôle
- **Interface** : Boutons normaux, pas de messages spéciaux

### **2. Utilisateur avec profil candidat complété**
- **Comportement** : Ne peut pas re-sélectionner "Candidat locataire"
- **Interface** : Bouton candidat désactivé avec indicateur "Profil complété"
- **Message** : "Votre profil candidat est déjà complété. Vous pouvez compléter votre profil propriétaire/agence ci-dessous."

### **3. Utilisateur avec profil annonceur complété**
- **Comportement** : Ne peut pas re-sélectionner "Propriétaire / Agence"
- **Interface** : Bouton annonceur désactivé avec indicateur "Profil complété"
- **Message** : "Votre profil propriétaire/agence est déjà complété. Vous pouvez compléter votre profil candidat ci-dessous."

### **4. Utilisateur avec les deux profils complétés**
- **Comportement** : Redirection automatique vers le dashboard
- **Interface** : Message de félicitations avec bouton de redirection
- **Message** : "Tous vos profils sont complétés ! Vous allez être redirigé vers votre tableau de bord."

## 🔒 Sécurité

### **Protection côté client**
- **Validation des props** : Vérification de l'existence des données
- **Computed properties** : Calcul en temps réel des permissions
- **Messages d'erreur** : Feedback clair en cas de tentative de modification

### **Protection côté serveur**
- **Validation des rôles** : Le backend vérifie les permissions
- **Vérification de l'onboarding** : Contrôle de `is_onboarded`
- **Gestion des erreurs** : Messages appropriés en cas de violation

## 🎯 Avantages

### **1. Expérience utilisateur**
- **Clarté** : L'utilisateur sait immédiatement quels profils sont complétés
- **Guidance** : Messages informatifs pour orienter l'utilisateur
- **Prévention d'erreurs** : Empêche la modification accidentelle de profils complétés

### **2. Intégrité des données**
- **Protection** : Empêche la corruption de profils déjà validés
- **Cohérence** : Maintient la cohérence entre les différents rôles
- **Audit** : Traçabilité des modifications de profils

### **3. Performance**
- **Chargement optimisé** : Évite les requêtes inutiles
- **Redirection intelligente** : Évite les étapes superflues
- **Cache** : Utilise les données déjà chargées

## 🔧 Maintenance

### **Tests recommandés**
1. **Test sans profil** : Vérifier la sélection normale
2. **Test avec un profil** : Vérifier la désactivation du rôle complété
3. **Test avec deux profils** : Vérifier la redirection automatique
4. **Test de modification** : Vérifier les messages d'erreur

### **Monitoring**
- **Logs d'erreur** : Surveiller les tentatives de modification
- **Métriques d'usage** : Taux de complétion des profils
- **Feedback utilisateur** : Collecter les retours sur l'expérience

---

**Cette fonctionnalité améliore significativement l'expérience utilisateur en empêchant la modification accidentelle de profils déjà complétés tout en guidant l'utilisateur vers les actions appropriées.**
