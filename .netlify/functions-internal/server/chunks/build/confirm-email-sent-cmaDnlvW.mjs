import { _ as __nuxt_component_1 } from './nuxt-link-D9Ar4PaM.mjs';
import { mergeProps, withCtx, unref, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_0 } from './famille-DUT8eJyV.mjs';
import { l as logoImage } from './logo-complet-BQrIiOcs.mjs';
import { _ as _export_sfc } from './server.mjs';
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
import 'vue-router';

const _sfc_main = {
  __name: "confirm-email-sent",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen" }, _attrs))} data-v-6d83ea77><div class="flex flex-1 flex-col justify-center px-0 py-0 sm:px-6 lg:flex-none lg:px-10 xl:px-44" data-v-6d83ea77><div class="mx-auto w-full max-w-sm lg:w-96" data-v-6d83ea77><div class="animate-fade-in" data-v-6d83ea77>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "cursor-pointer"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", unref(logoImage))} alt="Keylity" class="cursor-pointer h-15 w-auto transform transition-transform duration-300 hover:scale-105" data-v-6d83ea77${_scopeId}>`);
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
      _push(`<h2 class="fluid-subtitle font-extrabold tracking-tight" data-v-6d83ea77> V\xE9rifiez votre email </h2><p class="mt-2 text-sm/6 text-gray-500" data-v-6d83ea77> Un email de confirmation a \xE9t\xE9 envoy\xE9 \xE0 votre adresse email. Veuillez cliquer sur le lien dans l&#39;email pour activer votre compte. </p><div class="mt-6" data-v-6d83ea77>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-300"
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
      _push(`</div></div></div></div><div class="relative hidden flex-1 lg:block" data-v-6d83ea77><img class="absolute inset-0 w-full h-full object-cover"${ssrRenderAttr("src", _imports_0)} alt="" style="${ssrRenderStyle({ "filter": "blur(2px)" })}" data-v-6d83ea77><div class="absolute inset-0 bg-gradient-to-b from-gray-900/20 to-gray-900/40" data-v-6d83ea77></div><div class="absolute bottom-2 left-6 text-white max-w-xl z-10" data-v-6d83ea77><h2 class="fluid-title animate-fade-in-up" data-v-6d83ea77>Bienvenue chez Keylity</h2><p class="mt-0 fluid-subtitle text-white/90 drop-shadow-sm animate-fade-in-up animation-delay-200" data-v-6d83ea77> Simplifiez vos d\xE9marches administratives </p></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/confirm-email-sent.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const confirmEmailSent = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6d83ea77"]]);

export { confirmEmailSent as default };
//# sourceMappingURL=confirm-email-sent-cmaDnlvW.mjs.map
