import { n as executeAsync } from '../nitro/nitro.mjs';
import { k as defineNuxtRouteMiddleware, a as useAuthStore, n as navigateTo } from './server.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'pinia';
import 'vue-router';

const auth = defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  const auth2 = useAuthStore();
  if (!auth2.isAuthenticated) {
    [__temp, __restore] = executeAsync(() => auth2.checkAuth()), await __temp, __restore();
  }
  const isAuthenticated = auth2.isAuthenticated;
  const isEmailVerified = Boolean((_a = auth2.user) == null ? void 0 : _a.isEmailVerified);
  const isAuthPage = ["/login", "/auth/register"].includes(to.path);
  const isDashboardPage = to.path.startsWith("/dashboard");
  const isConfirmEmailPage = to.path === "/auth/confirm-email";
  if (!isAuthenticated && isDashboardPage) {
    return navigateTo("/login");
  }
  if (isAuthenticated && isAuthPage) {
    return navigateTo("/dashboard");
  }
  if (isAuthenticated && !isEmailVerified && !isConfirmEmailPage && !isAuthPage) {
    return navigateTo("/auth/confirm-email");
  }
});

export { auth as default };
//# sourceMappingURL=auth-CBc6cSjk.mjs.map
