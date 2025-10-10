import { defineStore } from "pinia";

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isEmailVerified?: boolean;
  is_email_verified?: boolean;
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
    async checkAuth() {
      if (process.server) return false;
      const token = localStorage.getItem("access_token");
      if (!token) {
        this.user = null;
        this.isAuthenticated = false;
        return false;
      }

      try {
        const config = useRuntimeConfig();
        const url = config.public.apiBase + "/user-profile/me";
        
        const response = await $fetch<any>(
          url,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // Le backend retourne { user: userInfo, roles, profile: filteredProfile }
        this.user = response.user || response;
        this.isAuthenticated = true;
        return true;
      } catch (error) {
        console.error("checkAuth error:", error);
        this.user = null;
        this.isAuthenticated = false;
        localStorage.removeItem("access_token");
        return false;
      }
    },

    async getUserProfile() {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("No token found");
      }

      try {
        const config = useRuntimeConfig();
        const url = config.public.apiBase + "/user-profile/me";
        
        const response = await $fetch<any>(
          url,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // Le backend retourne { user: userInfo, roles, profile: filteredProfile }
        return response.profile || response.user || response;
      } catch (error) {
        console.error("getUserProfile error:", error);
        throw error;
      }
    },

    async getFullUserProfile() {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("No token found");
      }

      try {
        const config = useRuntimeConfig();
        const url = config.public.apiBase + "/user-profile/me";
        
        const response = await $fetch<any>(
          url,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        return response;
      } catch (error) {
        console.error("getFullUserProfile error:", error);
        throw error;
      }
    },

    async register(
      email: string,
      password: string,
    ) {
      try {
        const config = useRuntimeConfig();
        const url = config.public.apiBase + "/auth/register";
        const response = await $fetch<ApiResponse>(url, {
          method: "POST",
          body: { email, password },
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        return response;
      } catch (error: any) {
        console.error("Registration error:", error);
        throw error;
      }
    },

    async login(credentials: { email: string; password: string }) {
      try {
        const config = useRuntimeConfig();
        const url = config.public.apiBase + "/auth/login";

        const response = await $fetch<ApiResponse>(url, {
          method: "POST",
          body: credentials,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.user && response.access_token) {
          localStorage.setItem("access_token", response.access_token);
          await this.checkAuth();

          return response;
        }

        throw new Error("Identifiants invalides ou réponse incomplète");
      } catch (error: any) {
        console.error("Login error:", error);
        throw error;
      }
    },

    async verifyEmail(token: string) {
      try {
        this.verificationStatus.loading = true;
        this.verificationStatus.error = null;
        this.verificationStatus.success = false;

        const config = useRuntimeConfig();
        const url = `${config.public.apiBase}/auth/verify-email`;

        const response = await $fetch<ApiResponse>(url, {
          method: "POST",
          body: { token },
          credentials: "include",
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

    // Récupération de mot de passe
    async forgotPassword(email: string) {
      try {
        const config = useRuntimeConfig();
        const response = await $fetch(`${config.public.apiBase}/auth/forgot-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: { email },
        });

        return { success: true, message: response.message };
      } catch (error: any) {
        console.error("Forgot password error:", error);
        return { 
          success: false, 
          error: error.response?._data?.message || "Une erreur est survenue lors de l'envoi de l'email de réinitialisation"
        };
      }
    },

    // Réinitialisation de mot de passe
    async resetPassword(token: string, newPassword: string) {
      try {
        const config = useRuntimeConfig();
        const response = await $fetch(`${config.public.apiBase}/auth/reset-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: { token, newPassword },
        });

        return { success: true, message: response.message };
      } catch (error: any) {
        console.error("Reset password error:", error);
        return { 
          success: false, 
          error: error.response?._data?.message || "Une erreur est survenue lors de la réinitialisation du mot de passe"
        };
      }
    },

    // Déconnexion
    logout() {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem("access_token");
      navigateTo("/login");
    },
  },
});
