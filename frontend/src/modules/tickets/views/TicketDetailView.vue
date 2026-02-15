<template>
  <main class="ticket-detail-view">
    <Breadcrumb class="ticket-detail-view__breadcrumb">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            :as="RouterLink"
            :to="{ name: 'tickets' }"
            class="inline-flex items-center gap-1.5 hover:underline"
          >
            <ChevronLeft class="size-4 shrink-0" />
            {{ $t("tickets.headers.list") }}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{{ $t("tickets.headers.detail") }}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>

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
      <Card
        v-else-if="ticket"
        key="ticket"
        class="ticket-detail-view__card"
      >
        <CardHeader class="ticket-detail-view__card-header">
          <CardTitle class="text-2xl">
            {{ $t("tickets.headers.detail") }}
          </CardTitle>
          <div
            class="ticket-detail-view__current-status"
            :class="`ticket-detail-view__current-status--${ticket.status}`"
          >
            <span
              class="ticket-detail-view__current-status-dot"
              aria-hidden="true"
            />
            <span class="ticket-detail-view__current-status-value">
              {{ $t("tickets.status." + ticket.status) }}
            </span>
          </div>
        </CardHeader>
        <CardContent class="flex flex-col gap-6 pt-0">
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
        </CardContent>
      </Card>
    </Transition>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { toRef } from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink, useRouter } from "vue-router";
import { ChevronLeft } from "lucide-vue-next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import { displayToast } from "@/composables/useToast";
import { TICKET_STATUSES } from "@/modules/tickets/consts";
import {
  TicketDetailFields,
  TicketDetailNotFound,
  TicketDetailSkeleton,
  TicketDetailStatusSection,
} from "@/modules/tickets/components/sections/ticketDetailsSections";
import { useTicketsStore } from "@/modules/tickets/stores/ticketsStore";
import type { ITicket, TTicketStatus } from "@/modules/tickets/types";
import { getDetailFieldsForTicket } from "@/modules/tickets/utils/ticketDetailFields";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

interface IProps {
  id: string;
}

const props = defineProps<IProps>();
const { t } = useI18n();
const store = useTicketsStore();
const idRef = toRef(props, "id");

const ticket = computed(() => store.currentTicket);
const loading = computed(() => store.currentTicketLoading);
const notFound = computed(() => store.currentTicketNotFound);

const selectedStatus = ref<TTicketStatus>("new");
const saving = ref(false);
const statusOptions = TICKET_STATUSES;

const detailFields = computed(() =>
  getDetailFieldsForTicket(ticket.value, t)
);

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

const router = useRouter();

const saveStatus = async (): Promise<void> => {
  const current = store.currentTicket;
  if (!current || saving.value) return;
  if (selectedStatus.value === current.status) return;

  saving.value = true;
  try {
    await store.updateTicketStatus(current.id, selectedStatus.value);
    displayToast("success", t("tickets.messages.updateSuccess"));
    router.push({
      name: "tickets",
      query: { updated: String(current.id) },
    });
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

  &__breadcrumb
    margin-bottom: 1.5rem

  &__card-header
    display: flex
    flex-direction: row
    flex-wrap: wrap
    align-items: baseline
    justify-content: space-between
    gap: 1rem

  &__current-status
    display: inline-flex
    align-items: center
    gap: 0.5rem
    font-size: 1rem
    line-height: 1.4
    font-weight: 600
    color: var(--foreground)
    align-self: flex-start

    &-dot
      width: 0.5rem
      height: 0.5rem
      border-radius: 50%
      flex-shrink: 0

    &--new .ticket-detail-view__current-status-dot
      background-color: var(--status-new)
    &--in_progress .ticket-detail-view__current-status-dot
      background-color: var(--status-in-progress)
    &--closed .ticket-detail-view__current-status-dot
      background-color: var(--status-closed)

  &__card
    border-radius: var(--radius)

.ticket-detail-fade-enter-active,
.ticket-detail-fade-leave-active
  transition: opacity 0.2s ease

.ticket-detail-fade-enter-from,
.ticket-detail-fade-leave-to
  opacity: 0
</style>
