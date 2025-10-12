import { usePropertiesStore } from '~/stores/properties.store';

export const useProperties = () => {
  const store = usePropertiesStore();

  // Getters réactifs
  const properties = computed(() => store.properties);
  const myProperties = computed(() => store.myProperties);
  const currentProperty = computed(() => store.currentProperty);
  const loading = computed(() => store.loading);
  const error = computed(() => store.error);
  const pagination = computed(() => store.pagination);
  const filters = computed(() => store.filters);

  // Actions
  const fetchProperties = async (page = 1, limit = 10, filters = {}) => {
    return await store.fetchProperties(page, limit, filters);
  };

  const fetchMyProperties = async (page = 1, limit = 10) => {
    return await store.fetchMyProperties(page, limit);
  };

  const fetchPropertyById = async (id: string) => {
    return await store.fetchPropertyById(id);
  };

  const createProperty = async (propertyData: any) => {
    return await store.createProperty(propertyData);
  };

  const updateProperty = async (id: string, updateData: any) => {
    return await store.updateProperty(id, updateData);
  };

  const deleteProperty = async (id: string) => {
    return await store.deleteProperty(id);
  };

  const uploadPropertyImage = async (propertyId: string, file: File) => {
    return await store.uploadPropertyImage(propertyId, file);
  };

  const deletePropertyImage = async (propertyId: string, imageUrl: string) => {
    return await store.deletePropertyImage(propertyId, imageUrl);
  };

  const addToFavorites = async (propertyId: string) => {
    return await store.addToFavorites(propertyId);
  };

  const removeFromFavorites = async (propertyId: string) => {
    return await store.removeFromFavorites(propertyId);
  };

  // Getters utilitaires
  const getPropertyById = (id: string) => store.getPropertyById(id);
  const getPropertiesByType = (type: string) => store.getPropertiesByType(type);
  const getPropertiesByTransactionType = (transactionType: string) => store.getPropertiesByTransactionType(transactionType);
  const getPropertiesByLocation = (location: string) => store.getPropertiesByLocation(location);
  const getPropertiesInPriceRange = (minPrice: number, maxPrice: number) => store.getPropertiesInPriceRange(minPrice, maxPrice);
  const isPropertyOwner = (propertyId: string, userId: string) => store.isPropertyOwner(propertyId, userId);
  const hasAnnonceurRole = computed(() => store.hasAnnonceurRole);

  // Actions utilitaires
  const clearError = () => store.clearError();
  const clearCurrentProperty = () => store.clearCurrentProperty();
  const setFilters = (filters: any) => store.setFilters(filters);
  const resetPagination = () => store.resetPagination();
  const reset = () => store.reset();

  return {
    // State
    properties,
    myProperties,
    currentProperty,
    loading,
    error,
    pagination,
    filters,

    // Actions
    fetchProperties,
    fetchMyProperties,
    fetchPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
    uploadPropertyImage,
    deletePropertyImage,
    addToFavorites,
    removeFromFavorites,

    // Getters
    getPropertyById,
    getPropertiesByType,
    getPropertiesByTransactionType,
    getPropertiesByLocation,
    getPropertiesInPriceRange,
    isPropertyOwner,
    hasAnnonceurRole,

    // Utilitaires
    clearError,
    clearCurrentProperty,
    setFilters,
    resetPagination,
    reset,
  };
};
