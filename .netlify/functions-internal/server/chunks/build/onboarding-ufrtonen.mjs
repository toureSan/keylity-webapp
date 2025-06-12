import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { ref, mergeProps, useSSRContext } from 'vue';
import { _ as _export_sfc } from './server.mjs';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'pinia';
import 'vue-router';

const _imports_0 = "" + buildAssetsURL("onbording.CBJf61Vw.png");
const _sfc_main$1 = {
  __name: "Onboarding",
  __ssrInlineRender: true,
  setup(__props) {
    const step = ref(1);
    const form = ref({
      genre: "",
      nationalite: "",
      nom: "",
      prenom: "",
      naissance: "",
      npa: "",
      avs: "",
      profession: "",
      adresse: "",
      telephone: "",
      email: "",
      etatCivil: "",
      domicilieDepuis: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen bg-gray-50" }, _attrs))} data-v-a78c543a><div class="hidden md:flex flex-col justify-center items-center w-1/2 bg-purple-300 border-r border-gray-100" data-v-a78c543a><img${ssrRenderAttr("src", _imports_0)} alt="Onboarding visuel" class="w-180 h-180 object-contain mb-8" data-v-a78c543a><div class="fluid-title font-bold text-purple-900" data-v-a78c543a> Bienvenue sur Keylity </div><div class="mt-2 text-center text-white font-extrabold max-w-xs" data-v-a78c543a> Votre assistant pour simplifier toutes vos d\xE9marches administratives. </div></div><div class="flex flex-1 flex-col justify-center items-left px-20 sm:px-20 md:px-15 bg-white" data-v-a78c543a><h2 class="fluid-title font-bold" data-v-a78c543a>\xC0 propos de vous</h2><p class="fluid-subtitle text-gray-500 mb-10 max-w-xl" data-v-a78c543a> Nous avons besoins de quelque information afin de vous permettre de profiter de nos services. </p><div class="flex items-center justify-left gap-4 mb-9 w-full" data-v-a78c543a><!--[-->`);
      ssrRenderList(3, (n) => {
        _push(`<!--[--><div class="${ssrRenderClass([
          "w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg transition-all duration-300",
          step.value === n ? "bg-purple-600 text-white scale-110 ring-4 ring-purple-200" : step.value > n ? "bg-purple-300 text-white" : "bg-gray-200 text-gray-400"
        ])}" data-v-a78c543a>${ssrInterpolate(n)}</div>`);
        if (n < 3) {
          _push(`<div class="${ssrRenderClass([step.value > n ? "bg-purple-400" : "bg-gray-200", "w-12 h-1 rounded transition-all duration-300"])}" data-v-a78c543a></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div><form class="w-full max-w-lg animate-fade-in" data-v-a78c543a>`);
      if (step.value === 1) {
        _push(`<div data-v-a78c543a><div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4" data-v-a78c543a><div class="relative group" data-v-a78c543a><input${ssrRenderAttr("value", form.value.genre)} type="text" id="genre" class="input-fancy peer" placeholder="Genre " data-v-a78c543a><label for="genre" class="label-fancy" data-v-a78c543a>Genre</label><span class="icon-input" data-v-a78c543a><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-a78c543a><path d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" data-v-a78c543a></path><path d="M6.343 17.657A8 8 0 1117.657 6.343 8 8 0 016.343 17.657z" data-v-a78c543a></path></svg></span></div><div class="relative group" data-v-a78c543a><input${ssrRenderAttr("value", form.value.nationalite)} type="text" id="nationalite" class="input-fancy peer" placeholder="Nationnalit\xE9 " data-v-a78c543a><label for="nationalite" class="label-fancy" data-v-a78c543a>Nationalit\xE9</label><span class="icon-input" data-v-a78c543a><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-a78c543a><path d="M12 2a10 10 0 100 20 10 10 0 000-20z" data-v-a78c543a></path><path d="M2 12h20" data-v-a78c543a></path><path d="M12 2a15.3 15.3 0 010 20" data-v-a78c543a></path><path d="M12 2a15.3 15.3 0 000 20" data-v-a78c543a></path></svg></span></div><div class="relative group" data-v-a78c543a><input${ssrRenderAttr("value", form.value.nom)} type="text" id="nom" class="input-fancy peer" placeholder="Nom " data-v-a78c543a><label for="nom" class="label-fancy" data-v-a78c543a>Nom</label><span class="icon-input" data-v-a78c543a><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-a78c543a><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" data-v-a78c543a></path><path d="M6.343 17.657A8 8 0 1117.657 6.343 8 8 0 016.343 17.657z" data-v-a78c543a></path></svg></span></div><div class="relative group" data-v-a78c543a><input${ssrRenderAttr("value", form.value.prenom)} type="text" id="prenom" class="input-fancy peer" placeholder="Pr\xE9nom " data-v-a78c543a><label for="prenom" class="label-fancy" data-v-a78c543a>Pr\xE9nom</label><span class="icon-input" data-v-a78c543a><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-a78c543a><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" data-v-a78c543a></path><path d="M6.343 17.657A8 8 0 1117.657 6.343 8 8 0 016.343 17.657z" data-v-a78c543a></path></svg></span></div><div class="relative group" data-v-a78c543a><input${ssrRenderAttr("value", form.value.naissance)} type="date" id="naissance" class="input-fancy peer" placeholder="Date de naissance " data-v-a78c543a><label for="naissance" class="label-fancy" data-v-a78c543a>Date de naissance</label><span class="icon-input" data-v-a78c543a><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-a78c543a><rect x="3" y="4" width="18" height="18" rx="2" data-v-a78c543a></rect><path d="M16 2v4M8 2v4M3 10h18" data-v-a78c543a></path></svg></span></div><div class="relative group" data-v-a78c543a><input${ssrRenderAttr("value", form.value.npa)} type="text" id="npa" class="input-fancy peer" placeholder="NPA/Localit\xE9 " data-v-a78c543a><label for="npa" class="label-fancy" data-v-a78c543a>NPA/Localit\xE9</label><span class="icon-input" data-v-a78c543a><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-a78c543a><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" data-v-a78c543a></path><circle cx="12" cy="9" r="2.5" data-v-a78c543a></circle></svg></span></div><div class="relative group" data-v-a78c543a><input${ssrRenderAttr("value", form.value.avs)} type="text" id="avs" class="input-fancy peer" placeholder="Num\xE9ro AVS " data-v-a78c543a><label for="avs" class="label-fancy" data-v-a78c543a>Num\xE9ro AVS</label><span class="icon-input" data-v-a78c543a><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-a78c543a><rect x="2" y="7" width="20" height="14" rx="2" data-v-a78c543a></rect><path d="M16 3v4M8 3v4" data-v-a78c543a></path></svg></span></div><div class="relative group" data-v-a78c543a><input${ssrRenderAttr("value", form.value.profession)} type="text" id="profession" class="input-fancy peer" placeholder="Profession " data-v-a78c543a><label for="profession" class="label-fancy" data-v-a78c543a>Profession</label><span class="icon-input" data-v-a78c543a><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-a78c543a><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" data-v-a78c543a></path><path d="M6.343 17.657A8 8 0 1117.657 6.343 8 8 0 016.343 17.657z" data-v-a78c543a></path></svg></span></div></div></div>`);
      } else if (step.value === 2) {
        _push(`<div data-v-a78c543a><h2 class="text-xl font-bold mb-2" data-v-a78c543a>Adresse &amp; Contact</h2><div class="grid grid-cols-1 gap-y-4" data-v-a78c543a><div class="relative group" data-v-a78c543a><input${ssrRenderAttr("value", form.value.adresse)} type="text" id="adresse" class="input-fancy peer" placeholder="Adresse actuelle " data-v-a78c543a><label for="adresse" class="label-fancy" data-v-a78c543a>Adresse actuelle</label><span class="icon-input" data-v-a78c543a><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-a78c543a><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" data-v-a78c543a></path><circle cx="12" cy="9" r="2.5" data-v-a78c543a></circle></svg></span></div><div class="relative group" data-v-a78c543a><input${ssrRenderAttr("value", form.value.telephone)} type="tel" id="telephone" class="input-fancy peer" placeholder="T\xE9l\xE9phone " data-v-a78c543a><label for="telephone" class="label-fancy" data-v-a78c543a>T\xE9l\xE9phone</label><span class="icon-input" data-v-a78c543a><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-a78c543a><path d="M22 16.92V21a1 1 0 01-1.09 1A19.91 19.91 0 013 5.09 1 1 0 014 4h4.09a1 1 0 011 .75l1.13 4.52a1 1 0 01-.29 1L8.21 12.21a16 16 0 007.58 7.58l1.94-1.94a1 1 0 011-.29l4.52 1.13a1 1 0 01.75 1V21z" data-v-a78c543a></path></svg></span></div><div class="relative group" data-v-a78c543a><input${ssrRenderAttr("value", form.value.email)} type="email" id="email" class="input-fancy peer" placeholder="Email " data-v-a78c543a><label for="email" class="label-fancy" data-v-a78c543a>Email</label><span class="icon-input" data-v-a78c543a><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-a78c543a><path d="M4 4h16v16H4z" data-v-a78c543a></path><path d="M22 6l-10 7L2 6" data-v-a78c543a></path></svg></span></div></div></div>`);
      } else if (step.value === 3) {
        _push(`<div data-v-a78c543a><h2 class="text-xl font-bold mb-6" data-v-a78c543a>Profil &amp; Confirmation</h2><div class="flex flex-col items-left gap-4" data-v-a78c543a><div class="relative group w-28 h-28 mb-2" data-v-a78c543a><input type="file" id="photo" class="hidden" data-v-a78c543a><label for="photo" class="cursor-pointer w-full h-full flex flex-col items-center justify-center rounded-full bg-blue-300 shadow-lg hover:from-purple-300 hover:to-purple-500 transition-all duration-300" data-v-a78c543a><svg width="41" height="45" viewBox="0 0 41 45" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-a78c543a><path d="M20.1426 23.3674C26.5712 23.3674 31.8263 18.1123 31.8263 11.6837C31.8263 5.25508 26.5712 0 20.1426 0C13.714 0 8.45898 5.25508 8.45898 11.6837C8.45898 18.1123 13.7141 23.3674 20.1426 23.3674Z" fill="#A9DDFF" data-v-a78c543a></path><path d="M40.1944 32.7042C39.8882 31.9388 39.4801 31.2246 39.0209 30.5613C36.674 27.0919 33.0516 24.796 28.9699 24.2347C28.4598 24.1838 27.8986 24.2857 27.4904 24.5919C25.3475 26.1735 22.7965 26.9898 20.1434 26.9898C17.4903 26.9898 14.9393 26.1735 12.7964 24.5919C12.3882 24.2857 11.827 24.1327 11.3168 24.2347C7.23518 24.796 3.56175 27.0919 1.26585 30.5613C0.806667 31.2246 0.398464 31.9899 0.0924097 32.7042C-0.0606177 33.0103 -0.00964116 33.3674 0.143386 33.6736C0.551589 34.3879 1.06175 35.1022 1.52093 35.7144C2.23518 36.6838 3.00051 37.5511 3.8679 38.3674C4.58216 39.0817 5.39846 39.745 6.21487 40.4083C10.2454 43.4185 15.0924 45.0001 20.0924 45.0001C25.0924 45.0001 29.9394 43.4184 33.9699 40.4083C34.7863 39.7961 35.6026 39.0817 36.3169 38.3674C37.1332 37.5511 37.9495 36.6838 38.6639 35.7144C39.174 35.0511 39.6333 34.3879 40.0414 33.6736C40.2964 33.3674 40.3474 33.0102 40.1944 32.7042Z" fill="#A9DDFF" data-v-a78c543a></path></svg><span class="text-sm text-center mt-2 text-white font-semibold" data-v-a78c543a>Choisir une photo</span></label></div><div class="w-full mt-2 relative group" data-v-a78c543a><select id="etatCivil" class="input-fancy peer" data-v-a78c543a><option value="" disabled selected hidden data-v-a78c543a></option><option data-v-a78c543a${ssrIncludeBooleanAttr(Array.isArray(form.value.etatCivil) ? ssrLooseContain(form.value.etatCivil, null) : ssrLooseEqual(form.value.etatCivil, null)) ? " selected" : ""}>C\xE9libataire</option><option data-v-a78c543a${ssrIncludeBooleanAttr(Array.isArray(form.value.etatCivil) ? ssrLooseContain(form.value.etatCivil, null) : ssrLooseEqual(form.value.etatCivil, null)) ? " selected" : ""}>En couple</option><option data-v-a78c543a${ssrIncludeBooleanAttr(Array.isArray(form.value.etatCivil) ? ssrLooseContain(form.value.etatCivil, null) : ssrLooseEqual(form.value.etatCivil, null)) ? " selected" : ""}>Divorc\xE9(e)</option><option data-v-a78c543a${ssrIncludeBooleanAttr(Array.isArray(form.value.etatCivil) ? ssrLooseContain(form.value.etatCivil, null) : ssrLooseEqual(form.value.etatCivil, null)) ? " selected" : ""}>Veuf/veuve</option><option data-v-a78c543a${ssrIncludeBooleanAttr(Array.isArray(form.value.etatCivil) ? ssrLooseContain(form.value.etatCivil, null) : ssrLooseEqual(form.value.etatCivil, null)) ? " selected" : ""}>Autre</option></select><label for="etatCivil" class="label-fancy" data-v-a78c543a>\xC9tat civil</label><span class="icon-input" data-v-a78c543a><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-a78c543a><circle cx="12" cy="12" r="10" data-v-a78c543a></circle><path d="M8 12h8" data-v-a78c543a></path></svg></span></div><div class="w-full mt-2 relative group" data-v-a78c543a><input${ssrRenderAttr("value", form.value.domicilieDepuis)} type="date" id="domicilieDepuis" class="input-fancy peer" placeholder="Domicili\xE9 depuis le " data-v-a78c543a><label for="domicilieDepuis" class="label-fancy" data-v-a78c543a>Domicili\xE9 depuis</label><span class="icon-input" data-v-a78c543a><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-a78c543a><rect x="3" y="4" width="18" height="18" rx="2" data-v-a78c543a></rect><path d="M16 2v4M8 2v4M3 10h18" data-v-a78c543a></path></svg></span></div><div class="w-full mt-2" data-v-a78c543a><label class="block text-sm font-medium mb-1" data-v-a78c543a>R\xE9sum\xE9</label><div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-gray-700 text-sm shadow-lg" data-v-a78c543a><div class="mb-1" data-v-a78c543a><b data-v-a78c543a>Nom :</b> ${ssrInterpolate(form.value.nom)} ${ssrInterpolate(form.value.prenom)}</div><div class="mb-1" data-v-a78c543a><b data-v-a78c543a>Email :</b> ${ssrInterpolate(form.value.email)}</div><div class="mb-1" data-v-a78c543a><b data-v-a78c543a>T\xE9l\xE9phone :</b> ${ssrInterpolate(form.value.telephone)}</div><div class="mb-1" data-v-a78c543a><b data-v-a78c543a>Adresse :</b> ${ssrInterpolate(form.value.adresse)}</div><div class="mb-1" data-v-a78c543a><b data-v-a78c543a>Profession :</b> ${ssrInterpolate(form.value.profession)}</div><div class="mb-1" data-v-a78c543a><b data-v-a78c543a>Nationalit\xE9 :</b> ${ssrInterpolate(form.value.nationalite)}</div><div class="mb-1" data-v-a78c543a><b data-v-a78c543a>Num\xE9ro AVS :</b> ${ssrInterpolate(form.value.avs)}</div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex justify-start mt-6 gap-2" data-v-a78c543a>`);
      if (step.value > 1) {
        _push(`<button type="button" class="px-6 py-2 rounded bg-gray-100 text-gray-600 font-semibold hover:bg-gray-200 transition" data-v-a78c543a> Retour </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit" class="px-6 py-2 rounded bg-gradient-to-r from-purple-600 to-purple-400 text-white font-semibold shadow-lg hover:from-purple-700 hover:to-purple-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2" data-v-a78c543a>${ssrInterpolate(step.value < 3 ? "Suivant" : "Terminer")}</button></div></form><div class="flex justify-center items-left" data-v-a78c543a><h1 data-v-a78c543a>test</h1></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Onboarding.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Onboarding = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-a78c543a"]]);
const _sfc_main = {
  __name: "onboarding",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(Onboarding, _attrs, null, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/onboarding.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=onboarding-ufrtonen.mjs.map
