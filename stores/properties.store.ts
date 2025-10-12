import { defineStore } from "pinia";

interface Property {
  id: string;
  title: string;
  description?: string;
  type: string;
  transactionType: string;
  address: string;
  postalCode: string;
  city: string;
  location?: string;
  price: number;
  area?: number;
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  floor?: number;
  totalFloors?: number;
  constructionYear?: number;
  livingArea?: number;
  orientation?: string;
  condition?: string;
  monthlyCharges?: number;
  deposit?: number;
  agencyFees?: number;
  applicationFees?: number;
  availableFrom?: string;
  leaseDuration?: string;
  petsAllowed?: boolean;
  smokingAllowed?: boolean;
  furnished?: boolean;
  studentFriendly?: boolean;
  contactMethods?: string[];
  visitAvailability?: string;
  additionalInfo?: string;
  equipments?: string[];
  photos?: string[];
  latitude?: number;
  longitude?: number;
  status: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
  views_count?: number;
  favorites_count?: number;
  advertiser_name?: string;
  advertiser_type?: string;
  profiles?: {
    first_name?: string;
    last_name?: string;
    company_name?: string;
    advertiser_type?: string;
  };
  users?: {
    id: string;
    email: string;
    created_at: string;
  };
}

interface PropertyFilters {
  transactionType?: string;
  type?: string;
  location?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  rooms?: number;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface PropertiesResponse {
  properties: Property[];
  pagination: Pagination;
}

interface CreatePropertyData {
  title: string;
  description?: string;
  type: string;
  transactionType: string;
  address: string;
  postalCode: string;
  city: string;
  location?: string;
  price: number;
  area?: number;
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  floor?: number;
  totalFloors?: number;
  constructionYear?: number;
  livingArea?: number;
  orientation?: string;
  condition?: string;
  monthlyCharges?: number;
  deposit?: number;
  agencyFees?: number;
  applicationFees?: number;
  availableFrom?: string;
  leaseDuration?: string;
  petsAllowed?: boolean;
  smokingAllowed?: boolean;
  furnished?: boolean;
  studentFriendly?: boolean;
  contactMethods?: string[];
  visitAvailability?: string;
  additionalInfo?: string;
  equipments?: string[];
  photos?: string[];
  latitude?: number;
  longitude?: number;
}

export const usePropertiesStore = defineStore("properties", {
  state: () => ({
    properties: [] as Property[],
    myProperties: [] as Property[],
    currentProperty: null as Property | null,
    loading: false,
    error: null as string | null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    } as Pagination,
    filters: {} as PropertyFilters,
  }),

  getters: {
    getPropertyById: (state) => (id: string) => {
      return state.properties.find(property => property.id === id) || 
             state.myProperties.find(property => property.id === id) ||
             (state.currentProperty?.id === id ? state.currentProperty : null);
    },

    getPropertiesByType: (state) => (type: string) => {
      return state.properties.filter(property => property.type === type);
    },

    getPropertiesByTransactionType: (state) => (transactionType: string) => {
      return state.properties.filter(property => property.transactionType === transactionType);
    },

    getPropertiesByLocation: (state) => (location: string) => {
      return state.properties.filter(property => property.location === location);
    },

    getPropertiesInPriceRange: (state) => (minPrice: number, maxPrice: number) => {
      return state.properties.filter(property => 
        property.price >= minPrice && property.price <= maxPrice
      );
    },

    isPropertyOwner: (state) => (propertyId: string, userId: string) => {
      const property = state.properties.find(p => p.id === propertyId) ||
                      state.myProperties.find(p => p.id === propertyId);
      return property?.user_id === userId;
    },

    hasAnnonceurRole: () => {
      const authStore = useAuthStore();
      return authStore.user?.role === 'annonceur' || 
             (authStore.user?.profile?.roles && authStore.user.profile.roles.includes('annonceur'));
    },
  },

  actions: {
    async fetchProperties(page: number = 1, limit: number = 10, filters: PropertyFilters = {}) {
      try {
        this.loading = true;
        this.error = null;

        const config = useRuntimeConfig();
        const authStore = useAuthStore();
        
        // Construire les paramètres de requête
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== undefined && value !== '')
          )
        });

        const url = `${config.public.apiBase}/properties?${params.toString()}`;
        
        const response = await $fetch<PropertiesResponse>(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        this.properties = response.properties;
        this.pagination = response.pagination;
        this.filters = filters;

        return response;
      } catch (error: any) {
        console.error("Erreur lors de la récupération des propriétés:", error);
        this.error = error.message || "Erreur lors de la récupération des propriétés";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchMyProperties(page: number = 1, limit: number = 10) {
      try {
        this.loading = true;
        this.error = null;

        const config = useRuntimeConfig();
        const authStore = useAuthStore();
        
        if (!authStore.isAuthenticated) {
          throw new Error("Non authentifié");
        }

        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        const url = `${config.public.apiBase}/properties/my-properties?${params.toString()}`;
        
        const response = await authStore.authenticatedFetch<PropertiesResponse>(url, {
          method: "GET",
        });

        this.myProperties = response.properties;
        this.pagination = response.pagination;

        return response;
      } catch (error: any) {
        console.error("Erreur lors de la récupération de mes propriétés:", error);
        this.error = error.message || "Erreur lors de la récupération de mes propriétés";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchPropertyById(id: string) {
      try {
        this.loading = true;
        this.error = null;

        const config = useRuntimeConfig();
        const url = `${config.public.apiBase}/properties/${id}`;
        
        const response = await $fetch<Property>(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        this.currentProperty = response;
        return response;
      } catch (error: any) {
        console.error("Erreur lors de la récupération de la propriété:", error);
        this.error = error.message || "Erreur lors de la récupération de la propriété";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createProperty(propertyData: CreatePropertyData) {
      try {
        this.loading = true;
        this.error = null;

        const config = useRuntimeConfig();
        const authStore = useAuthStore();
        
        if (!authStore.isAuthenticated) {
          throw new Error("Non authentifié");
        }

        const url = `${config.public.apiBase}/properties`;
        
        const response = await authStore.authenticatedFetch<Property>(url, {
          method: "POST",
          body: propertyData,
        });

        // Ajouter la nouvelle propriété à la liste
        this.myProperties.unshift(response);
        this.pagination.total += 1;

        return response;
      } catch (error: any) {
        console.error("Erreur lors de la création de la propriété:", error);
        this.error = error.message || "Erreur lors de la création de la propriété";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateProperty(id: string, updateData: Partial<CreatePropertyData>) {
      try {
        this.loading = true;
        this.error = null;

        const config = useRuntimeConfig();
        const authStore = useAuthStore();
        
        if (!authStore.isAuthenticated) {
          throw new Error("Non authentifié");
        }

        const url = `${config.public.apiBase}/properties/${id}`;
        
        const response = await authStore.authenticatedFetch<Property>(url, {
          method: "PATCH",
          body: updateData,
        });

        // Mettre à jour la propriété dans les listes
        const index = this.myProperties.findIndex(p => p.id === id);
        if (index !== -1) {
          this.myProperties[index] = response;
        }

        const publicIndex = this.properties.findIndex(p => p.id === id);
        if (publicIndex !== -1) {
          this.properties[publicIndex] = response;
        }

        if (this.currentProperty?.id === id) {
          this.currentProperty = response;
        }

        return response;
      } catch (error: any) {
        console.error("Erreur lors de la mise à jour de la propriété:", error);
        this.error = error.message || "Erreur lors de la mise à jour de la propriété";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteProperty(id: string) {
      try {
        this.loading = true;
        this.error = null;

        const config = useRuntimeConfig();
        const authStore = useAuthStore();
        
        if (!authStore.isAuthenticated) {
          throw new Error("Non authentifié");
        }

        const url = `${config.public.apiBase}/properties/${id}`;
        
        await authStore.authenticatedFetch(url, {
          method: "DELETE",
        });

        // Supprimer la propriété des listes
        this.myProperties = this.myProperties.filter(p => p.id !== id);
        this.properties = this.properties.filter(p => p.id !== id);
        
        if (this.currentProperty?.id === id) {
          this.currentProperty = null;
        }

        this.pagination.total -= 1;

        return { message: "Propriété supprimée avec succès" };
      } catch (error: any) {
        console.error("Erreur lors de la suppression de la propriété:", error);
        this.error = error.message || "Erreur lors de la suppression de la propriété";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async uploadPropertyImage(propertyId: string, file: File) {
      try {
        this.loading = true;
        this.error = null;

        const config = useRuntimeConfig();
        const authStore = useAuthStore();
        
        if (!authStore.isAuthenticated) {
          throw new Error("Non authentifié");
        }

        const formData = new FormData();
        formData.append('image', file);

        const url = `${config.public.apiBase}/properties/${propertyId}/images`;
        
        const response = await authStore.authenticatedFetch<{ imageUrl: string; message: string }>(url, {
          method: "POST",
          body: formData,
        });

        // Mettre à jour la propriété avec la nouvelle image
        const property = this.getPropertyById(propertyId);
        if (property) {
          if (!property.photos) {
            property.photos = [];
          }
          property.photos.push(response.imageUrl);
        }

        return response;
      } catch (error: any) {
        console.error("Erreur lors de l'upload de l'image:", error);
        this.error = error.message || "Erreur lors de l'upload de l'image";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deletePropertyImage(propertyId: string, imageUrl: string) {
      try {
        this.loading = true;
        this.error = null;

        const config = useRuntimeConfig();
        const authStore = useAuthStore();
        
        if (!authStore.isAuthenticated) {
          throw new Error("Non authentifié");
        }

        const url = `${config.public.apiBase}/properties/${propertyId}/images`;
        
        await authStore.authenticatedFetch(url, {
          method: "DELETE",
          body: { imageUrl },
        });

        // Supprimer l'image de la propriété
        const property = this.getPropertyById(propertyId);
        if (property && property.photos) {
          property.photos = property.photos.filter(photo => photo !== imageUrl);
        }

        return { message: "Image supprimée avec succès" };
      } catch (error: any) {
        console.error("Erreur lors de la suppression de l'image:", error);
        this.error = error.message || "Erreur lors de la suppression de l'image";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async addToFavorites(propertyId: string) {
      try {
        const config = useRuntimeConfig();
        const authStore = useAuthStore();
        
        if (!authStore.isAuthenticated) {
          throw new Error("Non authentifié");
        }

        const url = `${config.public.apiBase}/properties/${propertyId}/favorite`;
        
        await authStore.authenticatedFetch(url, {
          method: "POST",
        });

        // Incrémenter le compteur de favoris
        const property = this.getPropertyById(propertyId);
        if (property) {
          property.favorites_count = (property.favorites_count || 0) + 1;
        }

        return { message: "Propriété ajoutée aux favoris" };
      } catch (error: any) {
        console.error("Erreur lors de l'ajout aux favoris:", error);
        throw error;
      }
    },

    async removeFromFavorites(propertyId: string) {
      try {
        const config = useRuntimeConfig();
        const authStore = useAuthStore();
        
        if (!authStore.isAuthenticated) {
          throw new Error("Non authentifié");
        }

        const url = `${config.public.apiBase}/properties/${propertyId}/favorite`;
        
        await authStore.authenticatedFetch(url, {
          method: "DELETE",
        });

        // Décrémenter le compteur de favoris
        const property = this.getPropertyById(propertyId);
        if (property && property.favorites_count && property.favorites_count > 0) {
          property.favorites_count -= 1;
        }

        return { message: "Propriété retirée des favoris" };
      } catch (error: any) {
        console.error("Erreur lors de la suppression des favoris:", error);
        throw error;
      }
    },

    // Actions utilitaires
    clearError() {
      this.error = null;
    },

    clearCurrentProperty() {
      this.currentProperty = null;
    },

    setFilters(filters: PropertyFilters) {
      this.filters = filters;
    },

    resetPagination() {
      this.pagination = {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
      };
    },

    // Action pour réinitialiser le store
    reset() {
      this.properties = [];
      this.myProperties = [];
      this.currentProperty = null;
      this.loading = false;
      this.error = null;
      this.resetPagination();
      this.filters = {};
    },
  },
});
