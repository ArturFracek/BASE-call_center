<template>
  <main class="ticket-list-view">
    <header class="ticket-list-view__header">
      <h1
        v-once
        class="ticket-list-view__title"
      >
        {{ t("tickets.headers.list") }}
      </h1>
      <FilterBar v-model="statusFilter" />
    </header>

    <template v-if="store.loading">
      <p class="ticket-list-view__message">
        {{ t("tickets.messages.loading") }}
      </p>
    </template>
    <template v-else>
      <template v-if="tickets.length === 0">
        <p class="ticket-list-view__message">
          {{ t("tickets.messages.emptyList") }}
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
          <template #cell-actions="{ row }">
            <Button
              variant="outline"
              size="sm"
              class="ticket-list-view__edit-btn"
              :aria-label="t('tickets.buttons.edit')"
              @click.stop="goToDetail(row as ITicket)"
            >
              {{ t("tickets.buttons.edit") }}
            </Button>
          </template>
        </DataTable>

        <div
          v-else
          class="ticket-list-view__cards"
        >
          <div
            ref="scrollerWrapRef"
            class="ticket-list-view__scroller-wrap"
          >
            <RecycleScroller
              v-if="scrollerHeightPx > 0"
              v-slot="{ item: row }"
              class="ticket-list-view__scroller"
              :style="{ height: scrollerHeightPx + 'px' }"
              :items="ticketRows"
              :item-size="virtualScroller.itemSize"
              key-field="id"
              :buffer="virtualScroller.buffer"
            >
              <div
                class="ticket-list-view__scroller-item"
                :style="{ height: virtualScroller.itemSize + 'px' }"
              >
                <div
                  v-for="ticket in row.tickets"
                  :key="ticket.id"
                  class="ticket-list-view__card-inner"
                >
                  <TicketCard :ticket="ticket" />
                </div>
              </div>
            </RecycleScroller>
          </div>
          <p
            v-if="store.loading"
            class="ticket-list-view__loader"
            aria-live="polite"
          >
            {{ t("tickets.messages.loading") }}
          </p>
        </div>
      </template>
    </template>
  </main>
</template>

<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { Button } from "@/shared/components/ui/button";
import FilterBar from "@/modules/tickets/components/shared/FilterBar.vue";
import PriorityBadge from "@/modules/tickets/components/shared/PriorityBadge.vue";
import StatusBadge from "@/modules/tickets/components/shared/StatusBadge.vue";
import TicketCard from "@/modules/tickets/components/shared/TicketCard.vue";
import {
  STATUS_FILTER_OPTIONS,
  TICKET_LIST_CARDS_LIMIT,
  TICKET_LIST_PAGE_SIZE,
} from "@/modules/tickets/consts";
import { useTicketNavigation } from "@/modules/tickets/composables/useTicketNavigation";
import { useTicketsFilter } from "@/modules/tickets/composables/useTicketsFilter";
import { useTicketsStore } from "@/modules/tickets/stores/ticketsStore";
import { TICKET_TABLE_COLUMNS } from "@/modules/tickets/tablesSetup";
import type { ITicket } from "@/modules/tickets/types";
import {
  DataTable,
  SORT_ORDER,
  useDataTable,
  type IDataTableSortPayload,
} from "@/shared/components/data-table";
import { useIsMobile } from "@/composables/useIsMobile";
import { useVirtualScroller } from "@/shared/composables/useVirtualScroller";

const store = useTicketsStore();
const { t } = useI18n();
const { isMobile } = useIsMobile();
const limitRef = computed(() =>
  isMobile.value ? TICKET_LIST_CARDS_LIMIT : TICKET_LIST_PAGE_SIZE
);
const {
  statusFilter,
  setStatusFilter,
  tickets,
  page,
  setPage,
  pageSize,
  total,
} = useTicketsFilter({ limitRef });
const router = useRouter();
const route = useRoute();
const { goToDetail } = useTicketNavigation();
const dataTableRef = ref<InstanceType<typeof DataTable> | null>(null);
const scrollerWrapRef = ref<HTMLElement | null>(null);
const scrollerHeightPx = ref(0);

const virtualScroller = useVirtualScroller({
  visibleCount: 4,
  itemSize: 140,
});

const ticketRows = computed(() => {
  const list = tickets.value;
  const rows: { id: string; tickets: ITicket[] }[] = [];
  for (let i = 0; i < list.length; i += 2) {
    const a = list[i];
    if (a == null) continue;
    const b = list[i + 1];
    const rowTickets: ITicket[] = b != null ? [a, b] : [a];
    rows.push({
      id: rowTickets.length === 2 ? `row-${a.id}-${b.id}` : `row-${a.id}`,
      tickets: rowTickets,
    });
  }
  return rows;
});

let resizeObserver: ResizeObserver | null = null;

const measureScroller = (el: HTMLElement | null): void => {
  if (!el) return;
  const h = el.clientHeight;
  scrollerHeightPx.value = h > 0 ? h : 400;
};

watch(
  () => (isMobile.value ? scrollerWrapRef.value : null),
  (el) => {
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }
    if (!el) {
      scrollerHeightPx.value = 0;
      return;
    }
    measureScroller(el);
    resizeObserver = new ResizeObserver(() => measureScroller(el));
    resizeObserver.observe(el);
  },
  { immediate: true, flush: "post" }
);

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
});

const sortField = ref<string | null>(null);
const sortOrder = ref<IDataTableSortPayload["order"]>(SORT_ORDER.ASC);

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

const handleSort = (payload: IDataTableSortPayload): void => {
  sortField.value = payload.field;
  sortOrder.value = payload.order;
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
  flex: 1
  min-height: 0

  &__header
    display: flex
    flex-direction: column
    gap: 1rem
    flex-shrink: 0

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
    flex: 1
    min-height: 0

  &__scroller-wrap
    flex: 1
    min-height: 0
    overflow: hidden

  &__scroller
    width: 100%

  &__scroller-item
    display: flex
    flex-direction: row
    gap: 0.5rem
    padding-inline: 0.5rem
    padding-bottom: 0.5rem
    box-sizing: border-box
    flex-shrink: 0
    overflow: hidden

  &__card-inner
    flex: 1
    min-width: 0
    min-height: 0
    display: flex

    > *
      width: 100%
      min-height: 0

  &__loader
    color: var(--muted-foreground)
    font-size: 0.875rem
    text-align: center
    padding: 0.5rem 0
    margin: 0
    flex-shrink: 0

  &__edit-btn
    flex-shrink: 0

@media (max-width: 768px)
  .ticket-list-view
    width: 100%
    max-width: none
    padding: 0.75rem 0
    gap: 0.75rem
  .ticket-list-view__header
    width: 100%
    padding-inline: 0.75rem
    gap: 0.5rem
  .ticket-list-view__cards
    width: 100%
  .ticket-list-view__scroller-wrap
    width: 100%
</style>
