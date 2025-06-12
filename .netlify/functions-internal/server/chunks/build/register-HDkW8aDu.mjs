import { _ as __nuxt_component_1 } from './nuxt-link-D9Ar4PaM.mjs';
import { ref, mergeProps, withCtx, unref, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderDynamicModel, ssrIncludeBooleanAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_0 } from './famille-DUT8eJyV.mjs';
import { l as logoImage } from './logo-complet-BQrIiOcs.mjs';
import { _ as _export_sfc, a as useAuthStore } from './server.mjs';
import { useRouter } from 'vue-router';
import { useForm, useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'pinia';

const _sfc_main = {
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const authStore = useAuthStore();
    const registerSchema = toTypedSchema(z.object({
      firstName: z.string().min(1, "Le pr\xE9nom est requis"),
      lastName: z.string().min(1, "Le nom est requis"),
      email: z.string().email("L'adresse email n'est pas valide"),
      password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caract\xE8res").regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caract\xE8re sp\xE9cial"
      ),
      confirmPassword: z.string().min(1, "La confirmation du mot de passe est requise")
    }).refine((data) => data.password === data.confirmPassword, {
      message: "Les mots de passe ne correspondent pas",
      path: ["confirmPassword"]
    }));
    const form = useForm({
      validationSchema: registerSchema,
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      validateOnMount: false,
      validateOnBlur: true,
      validateOnInput: true
    });
    const { handleSubmit, errors, values, resetForm, meta } = form;
    const serverError = ref("");
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const loading = ref(false);
    const { value: firstName, errorMessage: firstNameError, touched: firstNameTouched } = useField("firstName");
    const { value: lastName, errorMessage: lastNameError, touched: lastNameTouched } = useField("lastName");
    const { value: email, errorMessage: emailError, touched: emailTouched } = useField("email");
    const { value: password, errorMessage: passwordError, touched: passwordTouched } = useField("password");
    const { value: confirmPassword, errorMessage: confirmPasswordError, touched: confirmPasswordTouched } = useField("confirmPassword");
    handleSubmit(async (formValues) => {
      var _a, _b;
      try {
        loading.value = true;
        serverError.value = "";
        await authStore.register(
          formValues.email,
          formValues.password,
          formValues.firstName,
          formValues.lastName
        );
        resetForm();
        router.push("/auth/confirm-email-sent");
      } catch (error) {
        console.error("Register error:", error);
        if ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) {
          serverError.value = error.response.data.message;
        } else {
          serverError.value = "Une erreur est survenue lors de l'inscription";
        }
      } finally {
        loading.value = false;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen" }, _attrs))} data-v-4a2bd05b><div class="flex flex-1 flex-col justify-center px-0 py-0 sm:px-6 lg:flex-none lg:px-10 xl:px-44" data-v-4a2bd05b><div class="mx-auto w-full max-w-sm lg:w-96" data-v-4a2bd05b><div class="animate-fade-in" data-v-4a2bd05b>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "cursor-pointer"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", unref(logoImage))} alt="Keylity" class="cursor-pointer h-15 w-auto transform transition-transform duration-300 hover:scale-105" data-v-4a2bd05b${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: unref(logoImage),
                alt: "Keylity",
                class: "cursor-pointer h-15 w-auto transform transition-transform duration-300 hover:scale-105"
              }, null, 8, ["src"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h2 class="fluid-subtitle font-extrabold tracking-tight" data-v-4a2bd05b> Cr\xE9er un compte </h2><p class="mt-2 text-sm/6 text-gray-500" data-v-4a2bd05b> D\xE9j\xE0 un compte ? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Se connecter `);
          } else {
            return [
              createTextVNode(" Se connecter ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div><div class="mt-10" data-v-4a2bd05b><form class="space-y-6" data-v-4a2bd05b>`);
      if (unref(serverError)) {
        _push(`<div class="bg-red-50 border-l-4 border-red-500 p-4 mb-6" data-v-4a2bd05b><div class="flex" data-v-4a2bd05b><div class="flex-shrink-0" data-v-4a2bd05b><svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" data-v-4a2bd05b><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" data-v-4a2bd05b></path></svg></div><div class="ml-3" data-v-4a2bd05b><p class="text-sm text-red-700" data-v-4a2bd05b>${ssrInterpolate(unref(serverError))}</p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="group" data-v-4a2bd05b><label for="firstName" class="block text-sm/6 font-medium text-gray-900" data-v-4a2bd05b>Pr\xE9nom</label><div class="mt-2 relative" data-v-4a2bd05b><input${ssrRenderAttr("value", unref(firstName))} type="text" name="firstName" id="firstName" autocomplete="given-name" required class="${ssrRenderClass([{
        "ring-red-500": unref(firstNameTouched) && unref(firstNameError),
        "ring-green-500": unref(firstNameTouched) && !unref(firstNameError) && unref(firstName)
      }, "block w-full rounded-lg bg-white px-4 py-3 text-base text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 transition-all duration-300 focus:ring-2 focus:ring-blue-600 focus:shadow-lg hover:ring-gray-400"])}" placeholder="John" data-v-4a2bd05b>`);
      if (unref(firstNameTouched) && unref(firstNameError)) {
        _push(`<span class="text-red-500 text-sm mt-1 block" data-v-4a2bd05b>${ssrInterpolate(unref(firstNameError))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="group" data-v-4a2bd05b><label for="lastName" class="block text-sm/6 font-medium text-gray-900" data-v-4a2bd05b>Nom</label><div class="mt-2 relative" data-v-4a2bd05b><input${ssrRenderAttr("value", unref(lastName))} type="text" name="lastName" id="lastName" autocomplete="family-name" required class="${ssrRenderClass([{
        "ring-red-500": unref(lastNameTouched) && unref(lastNameError),
        "ring-green-500": unref(lastNameTouched) && !unref(lastNameError) && unref(lastName)
      }, "block w-full rounded-lg bg-white px-4 py-3 text-base text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 transition-all duration-300 focus:ring-2 focus:ring-blue-600 focus:shadow-lg hover:ring-gray-400"])}" placeholder="Doe" data-v-4a2bd05b>`);
      if (unref(lastNameTouched) && unref(lastNameError)) {
        _push(`<span class="text-red-500 text-sm mt-1 block" data-v-4a2bd05b>${ssrInterpolate(unref(lastNameError))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="group" data-v-4a2bd05b><label for="email" class="block text-sm/6 font-medium text-gray-900" data-v-4a2bd05b>Adresse email</label><div class="mt-2 relative" data-v-4a2bd05b><input${ssrRenderAttr("value", unref(email))} type="email" name="email" id="email" autocomplete="email" required class="${ssrRenderClass([{
        "ring-red-500": unref(emailTouched) && unref(emailError),
        "ring-green-500": unref(emailTouched) && !unref(emailError) && unref(email)
      }, "block w-full rounded-lg bg-white px-4 py-3 text-base text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 transition-all duration-300 focus:ring-2 focus:ring-blue-600 focus:shadow-lg hover:ring-gray-400"])}" placeholder="exemple@email.com" data-v-4a2bd05b>`);
      if (unref(emailTouched) && unref(emailError)) {
        _push(`<span class="text-red-500 text-sm mt-1 block" data-v-4a2bd05b>${ssrInterpolate(unref(emailError))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="group" data-v-4a2bd05b><label for="password" class="block text-sm/6 font-medium text-gray-900" data-v-4a2bd05b>Mot de passe</label><div class="mt-2 relative" data-v-4a2bd05b><input${ssrRenderDynamicModel(unref(showPassword) ? "text" : "password", unref(password), null)}${ssrRenderAttr("type", unref(showPassword) ? "text" : "password")} name="password" id="password" autocomplete="new-password" required class="${ssrRenderClass([{
        "ring-red-500": unref(passwordTouched) && unref(passwordError),
        "ring-green-500": unref(passwordTouched) && !unref(passwordError) && unref(password)
      }, "block w-full rounded-lg bg-white px-4 py-3 text-base text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 transition-all duration-300 focus:ring-2 focus:ring-blue-600 focus:shadow-lg hover:ring-gray-400"])}" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" data-v-4a2bd05b>`);
      if (unref(passwordTouched) && unref(passwordError)) {
        _push(`<span class="text-red-500 text-sm mt-1 block" data-v-4a2bd05b>${ssrInterpolate(unref(passwordError))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="button" class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors duration-300" data-v-4a2bd05b>`);
      if (!unref(showPassword)) {
        _push(`<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" data-v-4a2bd05b><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" data-v-4a2bd05b></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" data-v-4a2bd05b></path></svg>`);
      } else {
        _push(`<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" data-v-4a2bd05b><path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" data-v-4a2bd05b></path><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" data-v-4a2bd05b></path></svg>`);
      }
      _push(`</button></div></div><div class="group" data-v-4a2bd05b><label for="confirmPassword" class="block text-sm/6 font-medium text-gray-900" data-v-4a2bd05b>Confirmer le mot de passe</label><div class="mt-2 relative" data-v-4a2bd05b><input${ssrRenderDynamicModel(unref(showConfirmPassword) ? "text" : "password", unref(confirmPassword), null)}${ssrRenderAttr("type", unref(showConfirmPassword) ? "text" : "password")} name="confirmPassword" id="confirmPassword" autocomplete="new-password" required class="${ssrRenderClass([{
        "ring-red-500": unref(confirmPasswordTouched) && unref(confirmPasswordError),
        "ring-green-500": unref(confirmPasswordTouched) && !unref(confirmPasswordError) && unref(confirmPassword)
      }, "block w-full rounded-lg bg-white px-4 py-3 text-base text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 transition-all duration-300 focus:ring-2 focus:ring-blue-600 focus:shadow-lg hover:ring-gray-400"])}" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" data-v-4a2bd05b>`);
      if (unref(confirmPasswordTouched) && unref(confirmPasswordError)) {
        _push(`<span class="text-red-500 text-sm mt-1 block" data-v-4a2bd05b>${ssrInterpolate(unref(confirmPasswordError))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="button" class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors duration-300" data-v-4a2bd05b>`);
      if (!unref(showConfirmPassword)) {
        _push(`<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" data-v-4a2bd05b><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" data-v-4a2bd05b></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" data-v-4a2bd05b></path></svg>`);
      } else {
        _push(`<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" data-v-4a2bd05b><path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" data-v-4a2bd05b></path><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" data-v-4a2bd05b></path></svg>`);
      }
      _push(`</button></div></div><div data-v-4a2bd05b><button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="group flex w-full justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm/6 font-semibold text-white shadow-sm transition-all duration-300 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed" data-v-4a2bd05b><span class="flex items-center" data-v-4a2bd05b>`);
      if (unref(loading)) {
        _push(`<span class="mr-2" data-v-4a2bd05b><svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-4a2bd05b><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-4a2bd05b></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-4a2bd05b></path></svg></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(loading) ? "Cr\xE9ation en cours..." : "Cr\xE9er un compte")}</span></button></div></form></div></div></div><div class="relative hidden flex-1 lg:block" data-v-4a2bd05b><img class="absolute inset-0 w-full h-full object-cover"${ssrRenderAttr("src", _imports_0)} alt="" style="${ssrRenderStyle({ "filter": "blur(2px)" })}" data-v-4a2bd05b><div class="absolute inset-0 bg-gradient-to-b from-gray-900/20 to-gray-900/40" data-v-4a2bd05b></div><div class="absolute bottom-2 left-6 text-white max-w-xl z-10" data-v-4a2bd05b><h2 class="fluid-title animate-fade-in-up" data-v-4a2bd05b>Bienvenue chez Keylity</h2><p class="mt-0 fluid-subtitle text-white/90 drop-shadow-sm animate-fade-in-up animation-delay-200" data-v-4a2bd05b> Simplifiez vos d\xE9marches administratives </p></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const register = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4a2bd05b"]]);

export { register as default };
//# sourceMappingURL=register-HDkW8aDu.mjs.map
