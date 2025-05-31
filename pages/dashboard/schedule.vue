<template>
  <div>
    <!-- Header Section -->
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
    >
      <h1 class="text-2xl font-bold">Mes planifications</h1>
      <div class="flex flex-wrap items-center gap-4">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-green-400"></div>
          <span class="text-sm text-gray-600">Visites acceptées</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-red-400"></div>
          <span class="text-sm text-gray-600">Visites à confirmer</span>
        </div>
      </div>
    </div>

    <!-- Calendar -->
    <div class="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 overflow-hidden">
      <VueDatePicker
        v-model="selectedDate"
        :enable-time-picker="false"
        :week-start="1"
        locale="fr"
        :multi-calendars="isDesktop"
        :format="format"
        :month-change-on-scroll="false"
        :teleport="true"
        :teleport-center="true"
        auto-apply
        class="calendar-custom"
      >
        <template #day-content="{ day }">
          <div class="day-content">
            <span>{{ day.day }}</span>
            <div class="events-dots">
              <template
                v-for="event in getEventsForDate(day.value)"
                :key="event.id"
              >
                <div
                  class="event-dot"
                  :class="
                    event.status === 'accepted' ? 'bg-green-400' : 'bg-red-400'
                  "
                  :title="`${event.time} - ${event.name}`"
                ></div>
              </template>
            </div>
          </div>
        </template>
      </VueDatePicker>
    </div>

    <!-- Today's Schedule -->
    <div class="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6">
      <h2 class="text-lg font-semibold mb-4">Planning du jour</h2>
      <div class="space-y-4">
        <div
          v-for="event in todayEvents"
          :key="event.id"
          class="flex flex-col md:flex-row md:items-center gap-3 p-4 rounded-lg"
          :class="event.status === 'accepted' ? 'bg-green-50' : 'bg-red-50'"
        >
          <div class="font-medium">{{ event.time }}</div>
          <div class="flex-1">
            <div class="font-medium">{{ event.name }}</div>
            <div class="text-sm text-gray-500">Visite appartement</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Visit Requests -->
    <div class="bg-white rounded-xl shadow-sm p-4 md:p-6">
      <h2 class="text-lg font-semibold mb-4">Demandes de visites</h2>
      <div class="space-y-4">
        <div
          v-for="request in visitRequests"
          :key="request.id"
          class="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
        >
          <div class="flex items-center gap-4">
            <img
              :src="request.avatar"
              :alt="request.name"
              class="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 class="font-medium">{{ request.name }}</h3>
              <div
                class="flex flex-wrap items-center gap-2 text-sm text-gray-500"
              >
                <div class="flex items-center">
                  <Icon name="heroicons:calendar" class="w-4 h-4 mr-1" />
                  {{ request.date }}
                </div>
                <div class="flex items-center">
                  <Icon name="heroicons:clock" class="w-4 h-4 mr-1" />
                  {{ request.time }}
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2 self-end md:self-auto">
            <button
              class="flex-1 md:flex-none px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
              Accepter
            </button>
            <button
              class="flex-1 md:flex-none px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Refuser
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { format as formatDate, isToday } from "date-fns";
import { fr } from "date-fns/locale";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

definePageMeta({
  layout: "dashboard",
});

const selectedDate = ref(new Date());
const isDesktop = ref(false);

const checkDesktop = () => {
  isDesktop.value = window.innerWidth >= 768;
};

onMounted(() => {
  checkDesktop();
  window.addEventListener("resize", checkDesktop);
});

const format = (date) => {
  return formatDate(date, "dd/MM/yyyy", { locale: fr });
};

// Sample events data
const events = [
  {
    id: 1,
    date: new Date(),
    time: "09:00",
    name: "Tamara",
    status: "accepted",
  },
  {
    id: 2,
    date: new Date(),
    time: "10:00",
    name: "Samuel",
    status: "accepted",
  },
  { id: 3, date: new Date(), time: "10:00", name: "Henry", status: "pending" },
  {
    id: 4,
    date: new Date(),
    time: "14:00",
    name: "Marianah",
    status: "pending",
  },
];

const getEventsForDate = (date) => {
  return events.filter(
    (event) =>
      formatDate(event.date, "yyyy-MM-dd") === formatDate(date, "yyyy-MM-dd"),
  );
};

const todayEvents = computed(() => {
  return events
    .filter((event) => isToday(event.date))
    .sort((a, b) => a.time.localeCompare(b.time));
});

// Sample visit requests
const visitRequests = [
  {
    id: 1,
    name: "Thomas Adam",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    date: "Lun. 3 Avril 2021",
    time: "09:00 - 10:00",
  },
  {
    id: 2,
    name: "Harvey Holloman",
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
    date: "Lun. 3 Avril 2021",
    time: "09:00 - 10:00",
  },
];
</script>

<style>
.calendar-custom {
  width: 100%;
  --dp-border-radius: 0.5rem;
  --dp-cell-border-radius: 0.375rem;
  --dp-primary-color: rgb(2 132 199);
  --dp-secondary-color: rgb(14 165 233);
  --dp-menu-min-width: 100%;
}

.calendar-custom .dp__calendar_header {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.calendar-custom .dp__calendar {
  padding: 1rem;
}

.day-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem;
}

.events-dots {
  display: flex;
  gap: 0.125rem;
}

.event-dot {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
}

@media (max-width: 768px) {
  .calendar-custom {
    --dp-menu-min-width: calc(100vw - 2rem);
  }

  .calendar-custom .dp__calendar {
    padding: 0.5rem;
  }

  .calendar-custom .dp__calendar_header {
    padding: 0.5rem;
  }
}
</style>
