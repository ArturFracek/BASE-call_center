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
          :opts="tableOpts"
          @select="(row) => goToDetail(row as ITicket)"
          @sort="handleSort"
          @page-change="setPage"
        >
          <template #cell-status="{ row }">
            <StatusBadge :status="(row as ITicket).status" />
          </template>
          <template #cell-priority="{ row }">
            {{ $t("tickets.priority." + (row as ITicket).priority) }}
          </template>
        </DataTable>

        <div
          v-else
          class="ticket-list-view__cards"
        >
          <TicketCard
            v-for="ticket in tickets"
            :key="ticket.id"
            :ticket="ticket"
          />
        </div>
      </template>
    </template>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import FilterBar from "@/modules/tickets/components/FilterBar.vue";
import StatusBadge from "@/modules/tickets/components/StatusBadge.vue";
import TicketCard from "@/modules/tickets/components/TicketCard.vue";
import { useTicketsFilter } from "@/modules/tickets/composables/useTicketsFilter";
import { useTicketsStore } from "@/modules/tickets/stores/ticketsStore";
import type { ITicket } from "@/modules/tickets/types";
import { DataTable, type DataTableOpts } from "@/shared/components/data-table";
import { useIsMobile } from "@/composables/useIsMobile";

const { t } = useI18n();
const store = useTicketsStore();
const {
  statusFilter,
  tickets,
  page,
  setPage,
  pageSize,
  total,
} = useTicketsFilter();
const { isMobile } = useIsMobile();
const router = useRouter();

const sortField = ref<string | null>(null);
const sortOrder = ref<"asc" | "desc">("asc");

const tableOpts = computed<DataTableOpts<ITicket>>(() => ({
  columns: [
    { key: "id", header: "tickets.headers.id", sortable: true },
    { key: "customerName", header: "tickets.headers.customerName", sortable: true },
    {
      key: "subject",
      header: "tickets.headers.subject",
      sortable: true,
      cellClass: "max-w-[240px] truncate",
    },
    { key: "status", header: "tickets.headers.status" },
    { key: "priority", header: "tickets.headers.priority" },
  ],
  data: tickets.value,
  rowKey: "id",
  selectable: true,
  sortField: sortField.value,
  sortOrder: sortOrder.value,
  emptyText: "tickets.messages.emptyList",
  ...(total.value > 0 && {
    pagination: {
      page: page.value,
      pageSize,
      total: total.value,
      activeFilterLabel: t("tickets.filter." + statusFilter.value),
    },
  }),
}));

const handleSort = (payload: {
  field: string;
  order: "asc" | "desc";
}): void => {
  sortField.value = payload.field;
  sortOrder.value = payload.order;
};

const goToDetail = (ticket: ITicket): void => {
  router.push({ name: "ticket-detail", params: { id: String(ticket.id) } });
};
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
</style>
