<template>
  <main class="ticket-detail-view">
    <RouterLink
      :to="{ name: 'tickets' }"
      class="ticket-detail-view__back text-primary underline text-sm mb-4 inline-block"
    >
      {{ $t("tickets.buttons.backToList") }}
    </RouterLink>

    <template v-if="loading">
      <p class="text-muted-foreground">
        {{ $t("tickets.messages.loading") }}
      </p>
      <div
        class="ticket-detail-view__skeleton mt-4 space-y-3"
        aria-hidden="true"
      >
        <div class="h-6 w-48 rounded bg-muted animate-pulse" />
        <div class="h-4 w-full max-w-md rounded bg-muted animate-pulse" />
        <div class="h-4 w-full max-w-sm rounded bg-muted animate-pulse" />
        <div class="h-20 w-full rounded bg-muted animate-pulse" />
      </div>
    </template>

    <template v-else-if="notFound">
      <h1 class="text-xl font-semibold text-foreground">
        {{ $t("tickets.headers.detail") }}
      </h1>
      <p class="text-muted-foreground mt-2">
        {{ $t("tickets.messages.notFound") }}
      </p>
    </template>

    <template v-else-if="ticket">
      <h1 class="text-2xl font-semibold tracking-tight text-foreground">
        {{ $t("tickets.headers.detail") }}
      </h1>

      <div class="ticket-detail-view__fields space-y-4 mt-6">
        <div>
          <label class="text-sm font-medium text-muted-foreground block mb-1">
            {{ $t("tickets.headers.id") }}
          </label>
          <p class="text-foreground">{{ ticket.id }}</p>
        </div>

        <div>
          <label class="text-sm font-medium text-muted-foreground block mb-1">
            {{ $t("tickets.headers.customerName") }}
          </label>
          <p class="text-foreground">{{ ticket.customerName }}</p>
        </div>

        <div>
          <label class="text-sm font-medium text-muted-foreground block mb-1">
            {{ $t("tickets.headers.subject") }}
          </label>
          <p class="text-foreground">{{ ticket.subject }}</p>
        </div>

        <div>
          <label class="text-sm font-medium text-muted-foreground block mb-1">
            {{ $t("tickets.headers.description") }}
          </label>
          <p class="text-foreground whitespace-pre-wrap">{{ ticket.description }}</p>
        </div>

        <div>
          <label class="text-sm font-medium text-muted-foreground block mb-1">
            {{ $t("tickets.headers.priority") }}
          </label>
          <p class="text-foreground">
            {{ $t("tickets.priority." + ticket.priority) }}
          </p>
        </div>

        <div>
          <label class="text-sm font-medium text-muted-foreground block mb-1">
            {{ $t("tickets.headers.createdAt") }}
          </label>
          <p class="text-foreground">{{ formatDateTime(ticket.createdAt) }}</p>
        </div>

        <div>
          <label class="text-sm font-medium text-muted-foreground block mb-1">
            {{ $t("tickets.headers.status") }}
          </label>
          <Select v-model="selectedStatus">
            <SelectTrigger class="w-[200px]" aria-label="Status zgłoszenia">
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
      </div>

      <div class="ticket-detail-view__actions mt-8 flex gap-3">
        <Button
          :disabled="saving || selectedStatus === ticket.status"
          @click="saveStatus"
        >
          {{ $t("tickets.buttons.save") }}
        </Button>
      </div>
    </template>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { toRef } from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";
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
import { useTicketsStore } from "@/modules/tickets/stores/ticketsStore";
import type { TTicketStatus } from "@/modules/tickets/types";

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
    max-width: 28rem

  &__fields
    label + p,
    label + div
      margin-top: 0.25rem
</style>
