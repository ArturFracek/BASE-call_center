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
      <div
        v-if="loading"
        key="loading"
      >
        <p class="text-muted-foreground">
          {{ $t("tickets.messages.loading") }}
        </p>
        <div
          class="ticket-detail-view__skeleton mt-6 space-y-4"
          aria-hidden="true"
        >
          <div class="h-8 w-56 rounded bg-muted animate-pulse" />
          <div
            v-for="i in 6"
            :key="i"
            class="ticket-detail-view__skeleton-field"
          >
            <div class="h-4 w-20 rounded bg-muted animate-pulse" />
            <div
              class="mt-1 rounded bg-muted animate-pulse"
              :class="i === 4 ? 'h-20 w-full' : 'h-4 w-full max-w-md'"
            />
          </div>
          <div class="ticket-detail-view__skeleton-field pt-2">
            <div class="h-4 w-16 rounded bg-muted animate-pulse" />
            <div class="mt-1 flex gap-2">
              <div class="h-6 w-24 rounded bg-muted animate-pulse" />
              <div class="h-9 w-[200px] rounded bg-muted animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div
        v-else-if="notFound"
        key="notFound"
      >
        <h1 class="text-xl font-semibold text-foreground">
          {{ $t("tickets.headers.detail") }}
        </h1>
        <p class="text-muted-foreground mt-2">
          {{ $t("tickets.messages.notFound") }}
        </p>
      </div>

      <div
        v-else-if="ticket"
        key="ticket"
      >
      <h1 class="text-2xl font-semibold tracking-tight text-foreground">
        {{ $t("tickets.headers.detail") }}
      </h1>

      <div class="ticket-detail-view__fields space-y-4 mt-6">
        <DetailField
          v-for="field in detailFields"
          :key="field.labelKey"
          :label="field.label"
        >
          <PriorityBadge
            v-if="field.fieldKey === 'priority'"
            :priority="ticket.priority"
          />
          <p
            v-else
            class="text-foreground"
            :class="field.contentClass"
          >
            {{ field.value }}
          </p>
        </DetailField>

        <section
          class="ticket-detail-view__status-section"
          :aria-label="$t('tickets.aria.editStatus')"
        >
          <DetailField :label="$t('tickets.headers.status')">
            <div class="flex flex-wrap items-center gap-2">
              <StatusBadge :status="ticket.status" />
              <Select v-model="selectedStatus">
                <SelectTrigger
                  class="w-[200px]"
                  :aria-label="$t('tickets.aria.statusSelect')"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="status in statusOptions"
                    :key="status"
                    :value="status"
                  >
                    {{ $t("tickets.status." + status) }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </DetailField>
          <div class="ticket-detail-view__actions flex gap-3 mt-2">
            <Button
              :disabled="saving || selectedStatus === ticket.status"
              @click="saveStatus"
            >
              {{ $t("tickets.buttons.save") }}
            </Button>
          </div>
        </section>
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
import { DetailField } from "@/shared/components/detail-field";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { displayToast } from "@/composables/useToast";
import { formatDateTime } from "@/shared/helpers/formatDateTime";
import { TICKET_STATUSES } from "@/modules/tickets/consts";
import PriorityBadge from "@/modules/tickets/components/PriorityBadge.vue";
import StatusBadge from "@/modules/tickets/components/StatusBadge.vue";
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

  &__skeleton
    max-width: 40rem

  &__skeleton-field
    min-height: 2rem

  &__fields
    label + p,
    label + div
      margin-top: 0.25rem

  &__status-section
    padding: 1rem
    border: 1px solid var(--border)
    border-radius: var(--radius)
    background: var(--muted/30)

.ticket-detail-fade-enter-active,
.ticket-detail-fade-leave-active
  transition: opacity 0.2s ease

.ticket-detail-fade-enter-from,
.ticket-detail-fade-leave-to
  opacity: 0
</style>
