import __nuxt_component_0 from './Icon-C_ySO281.mjs';
import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'pinia';
import 'vue-router';

const _sfc_main$1 = {
  __name: "MessageSection",
  __ssrInlineRender: true,
  setup(__props) {
    const conversations = ref([
      {
        id: 1,
        name: "Eleanor Pena",
        avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
        status: "En ligne",
        lastMessage: "Ac commodo mauris magna odio amet ante. Fermentum porta...",
        lastMessageTime: "53min",
        messages: [
          {
            id: 1,
            content: "Quis cursus eros, morbi vitae aenean ante nibh a. Mi ornare vitae viverra risus senectus amet. Maecenas mattis in in odio imperdiet.",
            time: "5:10",
            isSent: false
          },
          {
            id: 2,
            content: "Duis proin eu sagittis fermentum eget pharetra libero augue dui. Suscipit volutpat fames tincidunt.",
            time: "5:10",
            isSent: true
          }
        ]
      },
      {
        id: 2,
        name: "Jane Cooper",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
        status: "En ligne il y a 32min",
        lastMessage: "Ac commodo mauris magna odio amet ante. Fermentum porta...",
        lastMessageTime: "1h",
        messages: []
      },
      {
        id: 3,
        name: "Wade Warren",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
        status: "Hors ligne",
        lastMessage: "Ac commodo mauris magna odio amet ante. Fermentum porta...",
        lastMessageTime: "Jeu. 6 mai",
        messages: []
      },
      {
        id: 4,
        name: "Esther Howard",
        avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
        status: "En ligne",
        lastMessage: "Ac commodo mauris magna odio amet ante. Fermentum porta...",
        lastMessageTime: "Lun. 3 mai",
        messages: []
      }
    ]);
    const selectedConversation = ref(null);
    const newMessage = ref("");
    const isMobile = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-xl shadow-sm" }, _attrs))}><div class="flex h-[calc(100vh-8rem)]"><div class="${ssrRenderClass([{ "hidden md:flex": selectedConversation.value && isMobile.value }, "w-full md:w-80 border-r border-gray-200 flex flex-col"])}"><div class="p-4 border-b border-gray-200"><div class="relative"><input type="text" placeholder="Rechercher dans les messages..." class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:magnifying-glass",
        class: "h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
      }, null, _parent));
      _push(`</div></div><div class="flex-1 overflow-y-auto"><!--[-->`);
      ssrRenderList(conversations.value, (conversation) => {
        var _a;
        _push(`<div class="${ssrRenderClass([{
          "bg-primary-50": ((_a = selectedConversation.value) == null ? void 0 : _a.id) === conversation.id
        }, "p-4 hover:bg-gray-50 cursor-pointer transition-colors"])}"><div class="flex items-center gap-3"><img${ssrRenderAttr("src", conversation.avatar)}${ssrRenderAttr("alt", conversation.name)} class="w-12 h-12 rounded-full object-cover"><div class="flex-1 min-w-0"><div class="flex items-center justify-between"><h3 class="font-medium text-gray-900 truncate">${ssrInterpolate(conversation.name)}</h3><span class="text-xs text-gray-500">${ssrInterpolate(conversation.lastMessageTime)}</span></div><p class="text-sm text-gray-500 truncate hidden md:block">${ssrInterpolate(conversation.lastMessage)}</p></div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="${ssrRenderClass([{ "hidden md:flex": !selectedConversation.value && isMobile.value }, "flex-1 flex flex-col bg-white"])}">`);
      if (selectedConversation.value) {
        _push(`<!--[--><div class="p-4 border-b border-gray-200 flex items-center gap-4">`);
        if (isMobile.value) {
          _push(`<button class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:chevron-left",
            class: "h-5 w-5 text-gray-600"
          }, null, _parent));
          _push(`</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex items-center gap-3 flex-1"><img${ssrRenderAttr("src", selectedConversation.value.avatar)}${ssrRenderAttr("alt", selectedConversation.value.name)} class="w-10 h-10 rounded-full object-cover"><div><h2 class="font-medium">${ssrInterpolate(selectedConversation.value.name)}</h2><p class="text-sm text-gray-500">${ssrInterpolate(selectedConversation.value.status)}</p></div></div><div class="flex items-center gap-2"><button class="p-2 hover:bg-gray-100 rounded-lg">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:phone",
          class: "h-5 w-5 text-gray-500"
        }, null, _parent));
        _push(`</button><button class="p-2 hover:bg-gray-100 rounded-lg">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:video-camera",
          class: "h-5 w-5 text-gray-500"
        }, null, _parent));
        _push(`</button><button class="p-2 hover:bg-gray-100 rounded-lg">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:ellipsis-vertical",
          class: "h-5 w-5 text-gray-500"
        }, null, _parent));
        _push(`</button></div></div><div class="flex-1 overflow-y-auto p-4 space-y-4"><!--[-->`);
        ssrRenderList(selectedConversation.value.messages, (message) => {
          _push(`<div class="${ssrRenderClass([{ "justify-end": message.isSent }, "flex items-end gap-2"])}">`);
          if (!message.isSent) {
            _push(`<img${ssrRenderAttr("src", selectedConversation.value.avatar)}${ssrRenderAttr("alt", selectedConversation.value.name)} class="w-8 h-8 rounded-full object-cover">`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="${ssrRenderClass([
            message.isSent ? "bg-primary-500 text-white" : "bg-gray-100",
            "max-w-[75%] md:max-w-md rounded-lg p-3"
          ])}"><p>${ssrInterpolate(message.content)}</p><span class="${ssrRenderClass([
            message.isSent ? "text-primary-100" : "text-gray-500",
            "text-xs mt-1 block"
          ])}">${ssrInterpolate(message.time)}</span></div></div>`);
        });
        _push(`<!--]--></div><div class="p-4 border-t border-gray-200"><div class="flex items-end gap-2"><div class="flex-1 relative"><textarea rows="1" placeholder="\xC9crivez votre message..." class="w-full pl-4 pr-12 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none">${ssrInterpolate(newMessage.value)}</textarea><div class="absolute right-2 bottom-2 flex items-center gap-2"><button class="p-2 hover:bg-gray-100 rounded-full">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:paper-clip",
          class: "h-5 w-5 text-gray-500"
        }, null, _parent));
        _push(`</button><button class="p-2 hover:bg-gray-100 rounded-full">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:face-smile",
          class: "h-5 w-5 text-gray-500"
        }, null, _parent));
        _push(`</button></div></div><button class="px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:paper-airplane",
          class: "h-5 w-5"
        }, null, _parent));
        _push(`</button></div></div><!--]-->`);
      } else {
        _push(`<div class="flex-1 flex items-center justify-center"><div class="text-center"><div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:chat-bubble-left-right",
          class: "h-8 w-8 text-gray-400"
        }, null, _parent));
        _push(`</div><h3 class="text-lg font-medium text-gray-900">Vos messages</h3><p class="text-gray-500 mt-1"> S\xE9lectionnez une conversation pour commencer </p></div></div>`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MessageSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "messages",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MessageSection = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_MessageSection, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/messages.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=messages-wk-vNHj_.mjs.map
