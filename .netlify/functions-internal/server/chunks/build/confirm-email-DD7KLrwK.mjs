import { _ as __nuxt_component_1 } from './nuxt-link-D9Ar4PaM.mjs';
import { ref, mergeProps, withCtx, unref, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_0 } from './famille-DUT8eJyV.mjs';
import { l as logoImage } from './logo-complet-BQrIiOcs.mjs';
import { _ as _export_sfc, a as useAuthStore } from './server.mjs';
import { useRouter } from 'vue-router';
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
  __name: "confirm-email",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useAuthStore();
    const loading = ref(true);
    const error = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen" }, _attrs))} data-v-63499fd8><div class="flex flex-1 flex-col justify-center px-0 py-0 sm:px-6 lg:flex-none lg:px-10 xl:px-44" data-v-63499fd8><div class="mx-auto w-full max-w-sm lg:w-96" data-v-63499fd8><div class="animate-fade-in" data-v-63499fd8><div class="flex justify-center items-center" data-v-63499fd8>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "cursor-pointer"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", unref(logoImage))} alt="Keylity" class="cursor-pointer h-15 w-auto justify-center item-center transform transition-transform duration-300 hover:scale-105" data-v-63499fd8${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: unref(logoImage),
                alt: "Keylity",
                class: "cursor-pointer h-15 w-auto justify-center item-center transform transition-transform duration-300 hover:scale-105"
              }, null, 8, ["src"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(loading)) {
        _push(`<div class="text-center" data-v-63499fd8><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto" data-v-63499fd8></div><p class="mt-4 text-gray-600" data-v-63499fd8>V\xE9rification de votre email en cours...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="text-center" data-v-63499fd8><div class="text-red-500 text-xl mb-4" data-v-63499fd8>${ssrInterpolate(unref(error))}</div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "text-blue-500 hover:text-blue-700"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Retour \xE0 la page de connexion `);
            } else {
              return [
                createTextVNode(" Retour \xE0 la page de connexion ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="text-center" data-v-63499fd8><div class="text-green-500 text-xl mb-4" data-v-63499fd8>Email confirm\xE9 avec succ\xE8s !</div><p class="text-gray-600" data-v-63499fd8>Redirection vers le dashboard...</p></div>`);
      }
      _push(`</div></div></div><div class="relative hidden flex-1 lg:block" data-v-63499fd8><img class="absolute inset-0 w-full h-full object-cover"${ssrRenderAttr("src", _imports_0)} alt="" style="${ssrRenderStyle({ "filter": "blur(2px)" })}" data-v-63499fd8><div class="absolute inset-0 bg-gradient-to-b from-gray-900/20 to-gray-900/40" data-v-63499fd8></div><div class="absolute bottom-2 left-6 text-white max-w-xl z-10" data-v-63499fd8><h2 class="fluid-title animate-fade-in-up" data-v-63499fd8>Bienvenue chez Keylity</h2><p class="mt-0 fluid-subtitle text-white/90 drop-shadow-sm animate-fade-in-up animation-delay-200" data-v-63499fd8> Simplifiez vos d\xE9marches administratives </p></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/confirm-email.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const confirmEmail = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-63499fd8"]]);

export { confirmEmail as default };
//# sourceMappingURL=confirm-email-DD7KLrwK.mjs.map
