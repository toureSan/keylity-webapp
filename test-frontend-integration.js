// Script pour tester l'intégration frontend-backend
// Ce script simule les appels que le frontend ferait

const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

// Configuration pour les tests
const testConfig = {
  authToken: 'YOUR_JWT_TOKEN_HERE',
  testPropertyId: null
};

// Simuler les appels du store Pinia
class MockPropertiesStore {
  constructor() {
    this.properties = [];
    this.myProperties = [];
    this.loading = false;
    this.error = null;
    this.pagination = { page: 1, limit: 10, total: 0, totalPages: 0 };
  }

  async authenticatedFetch(url, options = {}) {
    const config = {
      method: options.method || 'GET',
      url: `${BASE_URL}${url}`,
      headers: {
        'Authorization': `Bearer ${testConfig.authToken}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    };
    
    if (options.body) {
      config.data = options.body;
    }
    
    const response = await axios(config);
    return response.data;
  }

  async fetchProperties(page = 1, limit = 10, filters = {}) {
    try {
      this.loading = true;
      this.error = null;

      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value !== undefined && value !== '')
        )
      });

      const url = `/properties?${params.toString()}`;
      const response = await this.authenticatedFetch(url, { method: 'GET' });

      this.properties = response.properties;
      this.pagination = response.pagination;
      return response;
    } catch (error) {
      this.error = error.message || 'Erreur lors de la récupération des propriétés';
      throw error;
    } finally {
      this.loading = false;
    }
  }

  async fetchMyProperties(page = 1, limit = 10) {
    try {
      this.loading = true;
      this.error = null;

      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      const url = `/properties/my-properties?${params.toString()}`;
      const response = await this.authenticatedFetch(url, { method: 'GET' });

      this.myProperties = response.properties;
      this.pagination = response.pagination;
      return response;
    } catch (error) {
      this.error = error.message || 'Erreur lors de la récupération de mes propriétés';
      throw error;
    } finally {
      this.loading = false;
    }
  }

  async createProperty(propertyData) {
    try {
      this.loading = true;
      this.error = null;

      const url = '/properties';
      const response = await this.authenticatedFetch(url, {
        method: 'POST',
        body: propertyData,
      });

      this.myProperties.unshift(response);
      this.pagination.total += 1;
      return response;
    } catch (error) {
      this.error = error.message || 'Erreur lors de la création de la propriété';
      throw error;
    } finally {
      this.loading = false;
    }
  }

  async deleteProperty(id) {
    try {
      this.loading = true;
      this.error = null;

      const url = `/properties/${id}`;
      await this.authenticatedFetch(url, { method: 'DELETE' });

      this.myProperties = this.myProperties.filter(p => p.id !== id);
      this.properties = this.properties.filter(p => p.id !== id);
      this.pagination.total -= 1;

      return { message: 'Propriété supprimée avec succès' };
    } catch (error) {
      this.error = error.message || 'Erreur lors de la suppression de la propriété';
      throw error;
    } finally {
      this.loading = false;
    }
  }
}

// Tests
async function testFrontendIntegration() {
  console.log('🧪 Test d\'intégration Frontend-Backend...');
  
  if (testConfig.authToken === 'YOUR_JWT_TOKEN_HERE') {
    console.log('\n❌ ERREUR: Vous devez remplacer "YOUR_JWT_TOKEN_HERE" par un token JWT valide');
    return;
  }

  const store = new MockPropertiesStore();

  try {
    // Test 1: Récupérer les propriétés publiques
    console.log('\n📋 Test 1: Récupération des propriétés publiques...');
    await store.fetchProperties(1, 5);
    console.log('✅ Propriétés publiques récupérées:', store.properties.length);
    console.log('📊 Pagination:', store.pagination);

    // Test 2: Récupérer mes propriétés
    console.log('\n🏠 Test 2: Récupération de mes propriétés...');
    await store.fetchMyProperties(1, 10);
    console.log('✅ Mes propriétés récupérées:', store.myProperties.length);

    // Test 3: Créer une propriété
    console.log('\n➕ Test 3: Création d\'une propriété...');
    const propertyData = {
      title: 'Test Frontend Integration',
      type: 'appartement',
      transactionType: 'location',
      address: 'Rue Frontend 456',
      postalCode: '1290',
      city: 'Versoix',
      price: 1800,
      area: 65,
      rooms: 2.5,
      bedrooms: 1,
      bathrooms: 1
    };

    const newProperty = await store.createProperty(propertyData);
    console.log('✅ Propriété créée:', newProperty.id);
    console.log('📋 Titre:', newProperty.title);
    console.log('💰 Prix:', newProperty.price);
    testConfig.testPropertyId = newProperty.id;

    // Test 4: Vérifier que la propriété apparaît dans mes propriétés
    console.log('\n🔍 Test 4: Vérification dans mes propriétés...');
    await store.fetchMyProperties(1, 10);
    const foundProperty = store.myProperties.find(p => p.id === newProperty.id);
    if (foundProperty) {
      console.log('✅ Propriété trouvée dans mes propriétés');
      console.log('👤 Nom de l\'annonceur:', foundProperty.advertiser_name);
    } else {
      console.log('❌ Propriété non trouvée dans mes propriétés');
    }

    // Test 5: Supprimer la propriété de test
    console.log('\n🗑️ Test 5: Suppression de la propriété de test...');
    await store.deleteProperty(newProperty.id);
    console.log('✅ Propriété supprimée');

    console.log('\n🎉 Tous les tests d\'intégration sont passés !');
    console.log('✅ L\'ajout de biens depuis le frontend fonctionne correctement');

  } catch (error) {
    console.log('\n💥 Erreur lors des tests d\'intégration:', error.message);
    console.log('🔧 Solutions possibles:');
    console.log('   - Vérifiez que le serveur backend est démarré');
    console.log('   - Vérifiez que le token JWT est valide');
    console.log('   - Vérifiez que l\'utilisateur a le rôle "annonceur"');
  }
}

// Instructions
console.log(`
🧪 Test d'intégration Frontend-Backend pour l'ajout de propriétés

📋 Instructions :
1. Assurez-vous que le serveur backend est démarré (npm run start:dev)
2. Obtenez un token JWT valide d'un utilisateur avec le rôle "annonceur"
3. Remplacez 'YOUR_JWT_TOKEN_HERE' par votre token
4. Exécutez : node test-frontend-integration.js

🔑 Pour obtenir un token JWT :
- Connectez-vous via l'API auth
- Ou utilisez un token existant d'un utilisateur avec le rôle annonceur
`);

// Exécuter les tests
if (require.main === module) {
  testFrontendIntegration();
}

module.exports = { testFrontendIntegration, MockPropertiesStore };
