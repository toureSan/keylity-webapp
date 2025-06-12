import { defineStore } from "pinia";

interface User {
         id: string;
         email: string;
         firstName?: string;
         lastName?: string;
         isEmailVerified?: boolean;
         role?: string;
         profile?: Record<string, any>;
}

interface ApiResponse {
         user: User;
         message?: string;
         access_token?: string;
}

export const useAuthStore = defineStore("auth", {
         state: () => ({
                  user: null as User | null,
                  isAuthenticated: false,
                  verificationStatus: {
                           loading: false,
                           error: null as string | null,
                           success: false,
                  },
         }),

         actions: {
                  getApiBase() {
                           const config = useRuntimeConfig();
                           return config.public.apiBase;
                  },

                  // Vérifie l'état de connexion avec le token et appelle /auth/me
                  async checkAuth() {
                           if (process.server) return false;
                           const token = localStorage.getItem("access_token");
                           if (!token) {
                                    this.user = null;
                                    this.isAuthenticated = false;
                                    return false;
                           }

                           try {
                                    const response = await $fetch<ApiResponse>(
                                             `${this.getApiBase()}/auth/me`,
                                             {
                                                      method: "GET",
                                                      headers: {
                                                               Authorization: `Bearer ${token}`,
                                                      },
                                             },
                                    );

                                    this.user = response.user;
                                    this.isAuthenticated = true;
                                    return true;
                           } catch (error) {
                                    console.error("checkAuth error:", error);
                                    this.user = null;
                                    this.isAuthenticated = false;
                                    // Clear invalid token
                                    localStorage.removeItem("access_token");
                                    return false;
                           }
                  },

                  // Enregistre un nouvel utilisateur
                  async register(
                           email: string,
                           password: string,
                           firstName: string,
                           lastName: string,
                  ) {
                           try {
                                    const url = `${this.getApiBase()}/auth/register`;

                                    const response = await $fetch<ApiResponse>(url, {
                                             method: "POST",
                                             body: { email, password, firstName, lastName },
                                             headers: {
                                                      "Content-Type": "application/json",
                                             },
                                    });

                                    return response;
                           } catch (error: any) {
                                    console.error("Registration error:", error);

                                    // Better error handling
                                    if (error.statusCode === 0 || error.message.includes("Failed to fetch")) {
                                             throw new Error("Impossible de contacter le serveur. Vérifiez votre connexion internet.");
                                    }

                                    throw error;
                           }
                  },

                  async login(credentials: { email: string; password: string }) {
                           try {
                                    const url = `${this.getApiBase()}/auth/login`;

                                    const response = await $fetch<ApiResponse>(url, {
                                             method: "POST",
                                             body: credentials,
                                             headers: {
                                                      "Content-Type": "application/json",
                                             },
                                    });

                                    if (response.user && response.access_token) {
                                             // Enregistre le token
                                             localStorage.setItem("access_token", response.access_token);

                                             // 👇 Recharge les données utilisateur depuis le backend pour avoir le bon `isEmailVerified`
                                             await this.checkAuth();

                                             return response;
                                    }

                                    throw new Error("Identifiants invalides ou réponse incomplète");
                           } catch (error: any) {
                                    console.error("Login error:", error);

                                    // Better error handling
                                    if (error.statusCode === 0 || error.message.includes("Failed to fetch")) {
                                             throw new Error("Impossible de contacter le serveur. Vérifiez votre connexion internet.");
                                    }

                                    throw error;
                           }
                  },

                  async verifyEmail(token: string) {
                           try {
                                    this.verificationStatus.loading = true;
                                    this.verificationStatus.error = null;
                                    this.verificationStatus.success = false;

                                    const url = `${this.getApiBase()}/auth/verify-email`;

                                    const response = await $fetch<ApiResponse>(url, {
                                             method: "POST",
                                             body: { token },
                                             headers: {
                                                      "Content-Type": "application/json",
                                             },
                                    });

                                    if (response.user && response.access_token) {
                                             localStorage.setItem("access_token", response.access_token);
                                             this.user = response.user;
                                             this.isAuthenticated = true;
                                             this.verificationStatus.success = true;
                                             return { user: this.user };
                                    }

                                    throw new Error("Vérification échouée ou réponse incomplète");
                           } catch (error: any) {
                                    console.error("Email verification error:", error);
                                    this.verificationStatus.error =
                                             error.message ||
                                             "Une erreur est survenue lors de la vérification de l'email";
                                    throw error;
                           } finally {
                                    this.verificationStatus.loading = false;
                           }
                  },

                  getAuthToken() {
                           if (process.server) return null;
                           return localStorage.getItem("access_token");
                  },

                  async authenticatedFetch<T = any>(url: string, options: any = {}) {
                           const token = this.getAuthToken();
                           if (!token) {
                                    throw new Error("Non authentifié");
                           }

                           return await $fetch<T>(url, {
                                    ...options,
                                    headers: {
                                             ...options.headers,
                                             Authorization: `Bearer ${token}`,
                                    },
                           });
                  },

                  // Déconnexion
                  logout() {
                           this.user = null;
                           this.isAuthenticated = false;
                           if (!process.server) {
                                    localStorage.removeItem("access_token");
                           }
                           navigateTo("/login");
                  },
         },
});