import { useAuthStore } from "../stores/auth.store";
// middleware/auth.tsAdd commentMore actions

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore();

  // Toujours vérifier l'authentification au chargement de la page
  await auth.checkAuth();

  const isAuthenticated = auth.isAuthenticated;
  const isEmailVerified = Boolean(auth.user?.isEmailVerified || auth.user?.is_email_verified);
  const isAuthPage = ["/login", "/register"].includes(to.path);
  const isDashboardPage = to.path.startsWith("/dashboard");
  const isOnboardingPage = to.path === "/onboarding";
  const isConfirmEmailPage = to.path === "/auth/confirm-email";

  // Protéger les pages privées (dashboard et onboarding)
  if (!isAuthenticated && (isDashboardPage || isOnboardingPage)) {
    return navigateTo("/login");
  }

  if (isAuthenticated && isAuthPage) {
    return navigateTo("/dashboard");
  }

  if (
    isAuthenticated &&
    !isEmailVerified &&
    !isConfirmEmailPage &&
    !isAuthPage
  ) {
    return navigateTo("/auth/confirm-email");
  }
});
