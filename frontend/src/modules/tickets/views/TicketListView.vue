<template>
  <main class="ticket-list-view">
    <header class="ticket-list-view__header">
      <h1
        v-once
        class="ticket-list-view__title"
      >
        {{ $t("tickets.headers.list") }}
      </h1>
      <FilterBar v-model="statusFilter" />
    </header>

    <template v-if="store.loading">
      <p class="ticket-list-view__message">
        {{ $t("tickets.messages.loading") }}
      </p>
    </template>
    <template v-else>
      <template v-if="tickets.length === 0">
        <p class="ticket-list-view__message">
          {{ $t("tickets.messages.emptyList") }}
        </p>
      </template>
      <template v-else>
        <DataTable
          v-if="!isMobile"
          ref="dataTableRef"
          :opts="tableOpts"
          @select="(row) => goToDetail(row as ITicket)"
          @sort="handleSort"
          @page-change="setPage"
        >
          <template #cell-status="{ row }">
            <StatusBadge :status="(row as ITicket).status" />
          </template>
          <template #cell-priority="{ row }">
            <PriorityBadge :priority="(row as ITicket).priority" />
          </template>
        </DataTable>

        <div
          v-else
          class="ticket-list-view__cards"
        >
          <RecycleScroller
            v-slot="{ item }"
            class="ticket-list-view__scroller"
            :style="{ height: virtualScroller.scrollerHeight + 'px' }"
            :items="tickets"
            :item-size="virtualScroller.itemSize"
            :key-field="virtualScroller.keyField"
            :buffer="virtualScroller.buffer"
          >
            <div
              class="ticket-list-view__scroller-item"
              :style="{ height: virtualScroller.itemSize + 'px' }"
            >
              <TicketCard :ticket="item" />
            </div>
          </RecycleScroller>
          <p
            v-if="store.loading"
            class="ticket-list-view__loader"
            aria-live="polite"
          >
            {{ $t("tickets.messages.loading") }}
          </p>
        </div>
      </template>
    </template>
  </main>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import FilterBar from "@/modules/tickets/components/shared/FilterBar.vue";
import PriorityBadge from "@/modules/tickets/components/shared/PriorityBadge.vue";
import StatusBadge from "@/modules/tickets/components/shared/StatusBadge.vue";
import TicketCard from "@/modules/tickets/components/shared/TicketCard.vue";
import { STATUS_FILTER_OPTIONS } from "@/modules/tickets/consts";
import { useTicketsFilter } from "@/modules/tickets/composables/useTicketsFilter";
import { useTicketsStore } from "@/modules/tickets/stores/ticketsStore";
import { TICKET_TABLE_COLUMNS } from "@/modules/tickets/tablesSetup";
import type { ITicket } from "@/modules/tickets/types";
import {
  DataTable,
  SORT_ORDER,
  useDataTable,
  type DataTableSortPayload,
} from "@/shared/components/data-table";
import { useIsMobile } from "@/composables/useIsMobile";
import { useVirtualScroller } from "@/shared/composables/useVirtualScroller";

const store = useTicketsStore();
const { t } = useI18n();
const {
  statusFilter,
  setStatusFilter,
  tickets,
  page,
  setPage,
  pageSize,
  total,
} = useTicketsFilter();
const { isMobile } = useIsMobile();
const router = useRouter();
const route = useRoute();
const dataTableRef = ref<InstanceType<typeof DataTable> | null>(null);

const virtualScroller = useVirtualScroller({
  visibleCount: 5,
});

const sortField = ref<string | null>(null);
const sortOrder = ref<DataTableSortPayload["order"]>(SORT_ORDER.ASC);

const { tableOpts } = useDataTable<ITicket>({
  columns: TICKET_TABLE_COLUMNS,
  data: tickets,
  rowKey: "id",
  selectable: true,
  sortField,
  sortOrder,
  emptyText: "tickets.messages.emptyList",
  pagination: {
    page,
    pageSize,
    total,
    getActiveFilterLabel: () => t("tickets.filter." + statusFilter.value),
  },
});

const handleSort = (payload: DataTableSortPayload): void => {
  sortField.value = payload.field;
  sortOrder.value = payload.order;
};

const goToDetail = (ticket: ITicket): void => {
  router.push({ name: "ticket-detail", params: { id: String(ticket.id) } });
};

function getUpdatedTicketIdFromQuery(): string | null {
  const raw = route.query.updated;
  return typeof raw === "string" && raw.length > 0 ? raw : null;
}

function applyReturnFromDetailAfterSave(ticketId: string): void {
  setStatusFilter(STATUS_FILTER_OPTIONS.ALL, { resetPage: false });
  nextTick(() => {
    dataTableRef.value?.highlightRow(ticketId);
    router.replace({ name: "tickets" });
  });
}

watch(
  () => [getUpdatedTicketIdFromQuery(), tickets.value] as const,
  ([updatedId, currentTickets]) => {
    if (updatedId == null || !currentTickets?.length) return;
    applyReturnFromDetailAfterSave(updatedId);
  },
  { immediate: true }
);
</script>

<style scoped lang="sass">
.ticket-list-view
  max-width: 56rem
  margin-inline: auto
  padding: 1.5rem 1rem
  display: flex
  flex-direction: column
  gap: 1.5rem

  &__header
    display: flex
    flex-direction: column
    gap: 1rem

  &__title
    font-size: 1.5rem
    font-weight: 600
    letter-spacing: -0.025em
    color: var(--foreground)

  &__message
    color: var(--muted-foreground)
    font-size: 0.9375rem

  &__cards
    display: flex
    flex-direction: column
    gap: 0.75rem

  &__scroller
    width: 100%

  &__scroller-item
    display: flex
    flex-direction: column
    padding-bottom: 0.5rem
    box-sizing: border-box
    flex-shrink: 0
    overflow: hidden

  &__loader
    color: var(--muted-foreground)
    font-size: 0.875rem
    text-align: center
    padding: 0.5rem 0
    margin: 0

@media (max-width: 768px)
  .ticket-list-view
    padding: 0.75rem 0.5rem
    gap: 0.75rem
  .ticket-list-view__header
    gap: 0.5rem
  .ticket-list-view__cards
    gap: 0.5rem
</style>
