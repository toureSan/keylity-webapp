import { useAuthStore } from "../stores/auth.store";
// middleware/auth.tsAdd commentMore actions

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore();

  // Éviter les appels multiples à checkAuth si déjà authentifié
  if (!auth.isAuthenticated) {
    await auth.checkAuth();
  }

  const isAuthenticated = auth.isAuthenticated;
  const isEmailVerified = Boolean(auth.user?.isEmailVerified);
  const isAuthPage = ["/login", "/auth/register"].includes(to.path);
  const isDashboardPage = to.path.startsWith("/dashboard");
  const isConfirmEmailPage = to.path === "/auth/confirm-email";

  if (!isAuthenticated && isDashboardPage) {
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

  // 4. Laisser passer sinon
});
