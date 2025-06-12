import __nuxt_component_0 from './Icon-C_ySO281.mjs';
import { computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { a as useAuthStore } from './server.mjs';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './index-DnQnDVfH.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = useAuthStore();
    const user = computed(() => auth.user);
    computed(() => {
      var _a2;
      var _a;
      return (_a2 = (_a = auth.user) == null ? void 0 : _a.role) != null ? _a2 : "user";
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="bg-white rounded-xl shadow-sm p-6 mb-6"><div class="flex flex-col md:flex-row items-start md:items-center gap-6"><img${ssrRenderAttr("src", ((_b = (_a = user.value) == null ? void 0 : _a.profile) == null ? void 0 : _b.avatar_url) || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg")} alt="Profile" class="w-24 h-24 rounded-full object-cover"><div><h1 class="text-2xl font-bold mb-2">${ssrInterpolate((_c = user.value) == null ? void 0 : _c.firstName)} ${ssrInterpolate((_d = user.value) == null ? void 0 : _d.lastName)}</h1><p class="text-gray-600 mb-4">`);
      if ((_f = (_e = user.value) == null ? void 0 : _e.profile) == null ? void 0 : _f.city) {
        _push(`<span>\u2022 ${ssrInterpolate(user.value.profile.city)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</p><button class="text-blue-600 hover:text-blue-700 font-medium"> Compl\xE9ter mon profil </button></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"><div class="bg-white rounded-xl shadow-sm p-6"><div class="flex items-center justify-between mb-4"><div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:eye",
        class: "h-6 w-6 text-blue-600"
      }, null, _parent));
      _push(`</div><span class="text-3xl font-bold">${ssrInterpolate(((_h = (_g = user.value) == null ? void 0 : _g.profile) == null ? void 0 : _h.views) || 0)}</span></div><p class="text-gray-600">Personnes qui ont vu mon profil</p></div><div class="bg-white rounded-xl shadow-sm p-6"><div class="flex items-center justify-between mb-4"><div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:document",
        class: "h-6 w-6 text-blue-600"
      }, null, _parent));
      _push(`</div><span class="text-3xl font-bold">${ssrInterpolate(((_j = (_i = user.value) == null ? void 0 : _i.profile) == null ? void 0 : _j.applications) || 0)}</span></div><p class="text-gray-600">Nombre de postulations</p></div><div class="bg-white rounded-xl shadow-sm p-6"><div class="flex items-center justify-between mb-4"><div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:magnifying-glass",
        class: "h-6 w-6 text-blue-600"
      }, null, _parent));
      _push(`</div><span class="text-3xl font-bold">${ssrInterpolate(((_l = (_k = user.value) == null ? void 0 : _k.profile) == null ? void 0 : _l.search_appearances) || 0)}</span></div><p class="text-gray-600">Apparitions dans les recherches</p></div><div class="bg-white rounded-xl shadow-sm p-6"><div class="flex items-center justify-between mb-4"><div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:home",
        class: "h-6 w-6 text-blue-600"
      }, null, _parent));
      _push(`</div><span class="text-3xl font-bold">${ssrInterpolate(((_n = (_m = user.value) == null ? void 0 : _m.profile) == null ? void 0 : _n.published_properties) || 0)}</span></div><p class="text-gray-600">Biens publi\xE9s</p></div></div><div class="bg-white rounded-xl shadow-sm p-6"><h2 class="text-lg font-semibold mb-4">Statut du compte</h2><div class="mb-4"><div class="flex justify-between mb-2"><span class="text-gray-600">Profil compl\xE9t\xE9</span><span class="font-medium">${ssrInterpolate(((_p = (_o = user.value) == null ? void 0 : _o.profile) == null ? void 0 : _p.completion) || 63)}%</span></div><div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-blue-600 h-2 rounded-full" style="${ssrRenderStyle({ width: (((_r = (_q = user.value) == null ? void 0 : _q.profile) == null ? void 0 : _r.completion) || 63) + "%" })}"></div></div></div><button class="text-blue-600 hover:text-blue-700 font-medium"> Compl\xE9ter mon profil </button></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BwpYAZyB.mjs.map
