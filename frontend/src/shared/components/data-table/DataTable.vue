<template>
  <div class="data-table">
    <Table class="data-table__table">
      <TableHeader>
        <TableRow class="data-table__header-row">
          <TableHead
            v-for="col in props.opts.columns"
            :key="col.key"
            :class="col.sortable ? 'data-table__sortable' : null"
            @click="col.sortable ? handleSort(col.key) : null"
          >
            <span class="data-table__header-label">{{ $t(col.header) }}</span>
            <span
              v-if="col.sortable"
              class="data-table__sort-icon"
              :aria-label="sortField === col.key ? (sortOrder === 'asc' ? 'Rosnąco' : 'Malejąco') : 'Sortuj'"
            >
              <ChevronUp
                v-if="sortField === col.key && sortOrder === 'asc'"
                class="data-table__sort-chevron"
              />
              <ChevronDown
                v-else-if="sortField === col.key && sortOrder === 'desc'"
                class="data-table__sort-chevron"
              />
              <ChevronUp
                v-else
                class="data-table__sort-chevron data-table__sort-chevron--inactive"
              />
            </span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="sortedData.length === 0 && props.opts.emptyText">
          <TableRow>
            <TableCell
              :colspan="props.opts.columns.length"
              class="text-center text-muted-foreground py-8"
            >
              {{ $t(props.opts.emptyText) }}
            </TableCell>
          </TableRow>
        </template>
        <TableRow
          v-for="(row, index) in sortedData"
          :key="getRowKey(row, index)"
          v-memo="[getRowKey(row, index), row]"
          :class="[
            'data-table__row',
            props.opts.selectable && 'cursor-pointer hover:bg-muted/50',
          ]"
          @click="props.opts.selectable ? emit('select', row) : null"
        >
          <TableCell
            v-for="col in props.opts.columns"
            :key="col.key"
            :class="col.cellClass"
          >
            <slot
              :name="`cell-${col.key}`"
              :row="row"
            >
              {{ getCellValue(row, col.key) }}
            </slot>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <TablePagination
      v-if="props.opts.pagination?.total && props.opts.pagination.total > 0"
      :page="props.opts.pagination.page"
      :page-size="props.opts.pagination.pageSize"
      :total="props.opts.pagination.total"
      :active-filter-label="props.opts.pagination.activeFilterLabel"
      @update:page="(p) => emit('pageChange', p)"
    />
  </div>
</template>

<script setup lang="ts">
import { ChevronDown, ChevronUp } from "lucide-vue-next";
import { computed } from "vue";
import { sortRows } from "./sortRows";
import type { DataTableOpts } from "./types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import TablePagination from "./TablePagination.vue";

interface Props {
  opts: DataTableOpts;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  select: [row: unknown]
  sort: [payload: { field: string; order: "asc" | "desc" }]
  pageChange: [page: number]
}>()

const sortField = computed(() => props.opts.sortField ?? null);
const sortOrder = computed(() => props.opts.sortOrder ?? "asc");

const sortedData = computed(() =>
  sortRows(props.opts.data, sortField.value, sortOrder.value)
);

const getRowKey = (row: unknown, index: number): string | number => {
  const key = props.opts.rowKey ?? "id";
  const r = row as Record<string, unknown>;
  const value = r[key];
  return value != null ? String(value) : index;
};

const getCellValue = (row: unknown, key: string): unknown =>
  (row as Record<string, unknown>)[key];

const handleSort = (field: string): void => {
  const nextOrder =
    sortField.value === field && sortOrder.value === "asc" ? "desc" : "asc";
  emit("sort", { field, order: nextOrder });
};
</script>

<style scoped lang="sass">
.data-table
  border: 1px solid var(--border)
  border-radius: var(--radius)
  background: var(--card)
  box-shadow: var(--shadow-sm)
  overflow: hidden

  &__table
    :deep(th),
    :deep(td)
      padding: 0.75rem 1rem
    :deep(th)
      background: var(--muted)
      color: var(--muted-foreground)
      font-weight: 500
      font-size: 0.8125rem
      text-transform: uppercase
      letter-spacing: 0.025em

  &__header-row
    border-bottom: 1px solid var(--border)

  &__header-label
    margin-right: 0.25rem

  &__sortable
    cursor: pointer
    user-select: none
    white-space: nowrap
    &:hover
      color: var(--foreground)

  &__sort-icon
    display: inline-flex
    align-items: center
    margin-left: 0.25rem
    vertical-align: middle

  &__sort-chevron
    width: 1rem
    height: 1rem
    opacity: 1
    &--inactive
      opacity: 0.35

  &__row
    border-bottom: 1px solid var(--border)
    transition: background-color 0.15s ease
    &:last-child
      border-bottom: none
</style>
