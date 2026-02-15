<template>
  <main class="ticket-list-view">
    <header class="ticket-list-view__header">
      <h1 class="ticket-list-view__title">
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
              ref="recycleScrollerRef"
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
          <Button
            v-if="isMobile && tickets.length > 0"
            type="button"
            variant="secondary"
            size="icon"
            class="ticket-list-view__scroll-top"
            :aria-label="t('common.aria.scrollToTop')"
            @click="scrollToTop"
          >
            <ChevronUp class="size-5" />
          </Button>
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
import { computed, nextTick, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { ChevronUp } from "lucide-vue-next";
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
import { ticketsToRows } from "@/modules/tickets/utils/ticketListRows";
import {
  DataTable,
  SORT_ORDER,
  useDataTable,
  type IDataTableSortPayload,
} from "@/shared/components/data-table";
import { useIsMobile } from "@/composables/useIsMobile";
import { useMeasuredHeight } from "@/shared/composables/useMeasuredHeight";
import { getQueryString } from "@/shared/helpers/routeQuery";
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

watch(isMobile, (mobile) => {
  if (mobile) setPage(1);
});

const router = useRouter();
const route = useRoute();
const { goToDetail } = useTicketNavigation();
const dataTableRef = ref<InstanceType<typeof DataTable> | null>(null);
const scrollerWrapRef = ref<HTMLElement | null>(null);
const recycleScrollerRef = ref<{ $el?: HTMLElement } | null>(null);

const virtualScroller = useVirtualScroller({ visibleCount: 4, itemSize: 140 });

const { heightPx: scrollerHeightPx } = useMeasuredHeight(scrollerWrapRef, {
  when: () => isMobile.value,
  fallbackHeight: 400,
});

const scrollToTop = (): void => {
  virtualScroller.scrollToTop({
    scrollerRef: recycleScrollerRef,
    wrapRef: scrollerWrapRef,
  });
};

const ticketRows = computed(() => ticketsToRows(tickets.value));

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

const applyReturnFromDetailAfterSave = (ticketId: string): void => {
  setStatusFilter(STATUS_FILTER_OPTIONS.ALL, { resetPage: false });
  nextTick(() => {
    dataTableRef.value?.highlightRow(ticketId);
    router.replace({ name: "tickets" });
  });
};

watch(
  () => [getQueryString(route, "updated"), tickets.value] as const,
  ([updatedId, currentTickets]) => {
    if (updatedId == null || !currentTickets?.length) return;
    applyReturnFromDetailAfterSave(updatedId);
  },
  { immediate: true }
);
</script>

<style scoped lang="sass">
.ticket-list-view
  max-width: 64rem
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

  &__scroll-top
    position: fixed
    right: 1rem
    z-index: 50
    border-radius: 50%
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15)

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
  .ticket-list-view__scroll-top
    top: 4.5rem
</style>
