<template>
  <main class="ticket-detail-view">
    <RouterLink
      :to="{ name: 'tickets' }"
      class="ticket-detail-view__back text-primary underline text-sm mb-4 inline-block"
    >
      {{ $t("tickets.buttons.backToList") }}
    </RouterLink>

    <Transition
      name="ticket-detail-fade"
      mode="out-in"
    >
      <TicketDetailSkeleton
        v-if="loading"
        key="loading"
      />
      <TicketDetailNotFound
        v-else-if="notFound"
        key="notFound"
      />
      <div
        v-else-if="ticket"
        key="ticket"
      >
        <h1 class="text-2xl font-semibold tracking-tight text-foreground">
          {{ $t("tickets.headers.detail") }}
        </h1>
        <div class="ticket-detail-view__body mt-6 space-y-4">
          <TicketDetailFields
            :fields="detailFields"
            :ticket="ticket"
          />
          <TicketDetailStatusSection
            v-model="selectedStatus"
            :ticket="ticket"
            :saving="saving"
            :status-options="statusOptions"
            @save="saveStatus"
          />
        </div>
      </div>
    </Transition>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { toRef } from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";
import { displayToast } from "@/composables/useToast";
import { formatDateTime } from "@/shared/helpers/formatDateTime";
import { TICKET_STATUSES } from "@/modules/tickets/consts";
import {
  TicketDetailFields,
  TicketDetailNotFound,
  TicketDetailSkeleton,
  TicketDetailStatusSection,
} from "@/modules/tickets/components/sections/ticketDetailsSections";
import { useTicketsStore } from "@/modules/tickets/stores/ticketsStore";
import type { ITicket, TTicketStatus } from "@/modules/tickets/types";

interface Props {
  id: string;
}

const props = defineProps<Props>();
const { t } = useI18n();
const store = useTicketsStore();
const idRef = toRef(props, "id");

const ticket = computed(() => store.currentTicket);
const loading = computed(() => store.currentTicketLoading);
const notFound = computed(() => store.currentTicketNotFound);

const selectedStatus = ref<TTicketStatus>("new");
const saving = ref(false);
const statusOptions = TICKET_STATUSES;

const DETAIL_FIELD_KEYS: Array<{
  fieldKey: string;
  labelKey: string;
  getValue: (t: ITicket, tFn: (key: string) => string) => string;
  contentClass?: string;
}> = [
  {
    fieldKey: "id",
    labelKey: "tickets.headers.id",
    getValue: (t) => String(t.id),
  },
  {
    fieldKey: "customerName",
    labelKey: "tickets.headers.customerName",
    getValue: (t) => t.customerName,
  },
  {
    fieldKey: "subject",
    labelKey: "tickets.headers.subject",
    getValue: (t) => t.subject,
  },
  {
    fieldKey: "description",
    labelKey: "tickets.headers.description",
    getValue: (t) => t.description,
    contentClass: "whitespace-pre-wrap",
  },
  {
    fieldKey: "priority",
    labelKey: "tickets.headers.priority",
    getValue: (t, tFn) => tFn("tickets.priority." + t.priority),
  },
  {
    fieldKey: "createdAt",
    labelKey: "tickets.headers.createdAt",
    getValue: (t) => formatDateTime(t.createdAt),
  },
];

const detailFields = computed(() => {
  if (!ticket.value) return [];
  return DETAIL_FIELD_KEYS.map(
    ({ fieldKey, labelKey, getValue, contentClass }) => ({
      fieldKey,
      labelKey,
      label: t(labelKey),
      value: getValue(ticket.value!, t),
      contentClass,
    })
  );
});

watch(
  () => store.currentTicket,
  (data) => {
    if (data) selectedStatus.value = data.status;
  },
  { immediate: true }
);

watch(
  idRef,
  () => store.fetchTicketById(Number(idRef.value)),
  { immediate: true }
);

const saveStatus = async (): Promise<void> => {
  const current = store.currentTicket;
  if (!current || saving.value) return;
  if (selectedStatus.value === current.status) return;

  saving.value = true;
  try {
    await store.updateTicketStatus(current.id, selectedStatus.value);
    displayToast("success", t("tickets.messages.updateSuccess"));
    await store.fetchTicketById(current.id);
  } finally {
    saving.value = false;
  }
};
</script>

<style scoped lang="sass">
.ticket-detail-view
  max-width: 40rem
  margin-inline: auto
  padding: 1.5rem 1rem

  &__back
    &:hover
      text-decoration: none

.ticket-detail-fade-enter-active,
.ticket-detail-fade-leave-active
  transition: opacity 0.2s ease

.ticket-detail-fade-enter-from,
.ticket-detail-fade-leave-to
  opacity: 0
</style>
