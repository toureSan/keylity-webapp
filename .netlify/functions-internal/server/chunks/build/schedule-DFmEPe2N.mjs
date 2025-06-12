import __nuxt_component_0 from './Icon-C_ySO281.mjs';
import { ref, computed, unref, withCtx, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { isToday, format } from 'date-fns';
import { fr } from 'date-fns/locale';
import VueDatePicker from '@vuepic/vue-datepicker';
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

const _sfc_main = {
  __name: "schedule",
  __ssrInlineRender: true,
  setup(__props) {
    const selectedDate = ref(/* @__PURE__ */ new Date());
    const isDesktop = ref(false);
    const format$1 = (date) => {
      return format(date, "dd/MM/yyyy", { locale: fr });
    };
    const events = [
      {
        id: 1,
        date: /* @__PURE__ */ new Date(),
        time: "09:00",
        name: "Tamara",
        status: "accepted"
      },
      {
        id: 2,
        date: /* @__PURE__ */ new Date(),
        time: "10:00",
        name: "Samuel",
        status: "accepted"
      },
      { id: 3, date: /* @__PURE__ */ new Date(), time: "10:00", name: "Henry", status: "pending" },
      {
        id: 4,
        date: /* @__PURE__ */ new Date(),
        time: "14:00",
        name: "Marianah",
        status: "pending"
      }
    ];
    const getEventsForDate = (date) => {
      return events.filter(
        (event) => format(event.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
      );
    };
    const todayEvents = computed(() => {
      return events.filter((event) => isToday(event.date)).sort((a, b) => a.time.localeCompare(b.time));
    });
    const visitRequests = [
      {
        id: 1,
        name: "Thomas Adam",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
        date: "Lun. 3 Avril 2021",
        time: "09:00 - 10:00"
      },
      {
        id: 2,
        name: "Harvey Holloman",
        avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
        date: "Lun. 3 Avril 2021",
        time: "09:00 - 10:00"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"><h1 class="text-2xl font-bold">Mes planifications</h1><div class="flex flex-wrap items-center gap-4"><div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-green-400"></div><span class="text-sm text-gray-600">Visites accept\xE9es</span></div><div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-red-400"></div><span class="text-sm text-gray-600">Visites \xE0 confirmer</span></div></div></div><div class="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 overflow-hidden">`);
      _push(ssrRenderComponent(unref(VueDatePicker), {
        modelValue: selectedDate.value,
        "onUpdate:modelValue": ($event) => selectedDate.value = $event,
        "enable-time-picker": false,
        "week-start": 1,
        locale: "fr",
        "multi-calendars": isDesktop.value,
        format: format$1,
        "month-change-on-scroll": false,
        teleport: true,
        "teleport-center": true,
        "auto-apply": "",
        class: "calendar-custom"
      }, {
        "day-content": withCtx(({ day }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="day-content"${_scopeId}><span${_scopeId}>${ssrInterpolate(day.day)}</span><div class="events-dots"${_scopeId}><!--[-->`);
            ssrRenderList(getEventsForDate(day.value), (event) => {
              _push2(`<div class="${ssrRenderClass([
                event.status === "accepted" ? "bg-green-400" : "bg-red-400",
                "event-dot"
              ])}"${ssrRenderAttr("title", `${event.time} - ${event.name}`)}${_scopeId}></div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "day-content" }, [
                createVNode("span", null, toDisplayString(day.day), 1),
                createVNode("div", { class: "events-dots" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(getEventsForDate(day.value), (event) => {
                    return openBlock(), createBlock("div", {
                      key: event.id,
                      class: [
                        "event-dot",
                        event.status === "accepted" ? "bg-green-400" : "bg-red-400"
                      ],
                      title: `${event.time} - ${event.name}`
                    }, null, 10, ["title"]);
                  }), 128))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6"><h2 class="text-lg font-semibold mb-4">Planning du jour</h2><div class="space-y-4"><!--[-->`);
      ssrRenderList(todayEvents.value, (event) => {
        _push(`<div class="${ssrRenderClass([event.status === "accepted" ? "bg-green-50" : "bg-red-50", "flex flex-col md:flex-row md:items-center gap-3 p-4 rounded-lg"])}"><div class="font-medium">${ssrInterpolate(event.time)}</div><div class="flex-1"><div class="font-medium">${ssrInterpolate(event.name)}</div><div class="text-sm text-gray-500">Visite appartement</div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="bg-white rounded-xl shadow-sm p-4 md:p-6"><h2 class="text-lg font-semibold mb-4">Demandes de visites</h2><div class="space-y-4"><!--[-->`);
      ssrRenderList(visitRequests, (request) => {
        _push(`<div class="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"><div class="flex items-center gap-4"><img${ssrRenderAttr("src", request.avatar)}${ssrRenderAttr("alt", request.name)} class="w-10 h-10 rounded-full object-cover"><div><h3 class="font-medium">${ssrInterpolate(request.name)}</h3><div class="flex flex-wrap items-center gap-2 text-sm text-gray-500"><div class="flex items-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:calendar",
          class: "w-4 h-4 mr-1"
        }, null, _parent));
        _push(` ${ssrInterpolate(request.date)}</div><div class="flex items-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:clock",
          class: "w-4 h-4 mr-1"
        }, null, _parent));
        _push(` ${ssrInterpolate(request.time)}</div></div></div></div><div class="flex items-center gap-2 self-end md:self-auto"><button class="flex-1 md:flex-none px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors"> Accepter </button><button class="flex-1 md:flex-none px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"> Refuser </button></div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/schedule.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=schedule-DFmEPe2N.mjs.map
