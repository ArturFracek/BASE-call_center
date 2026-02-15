<template>
  <div
    class="table-pagination"
    role="navigation"
    :aria-label="$t('common.aria.pagination')"
  >
    <p class="table-pagination__info text-sm text-muted-foreground">
      <span v-if="props.activeFilterLabel">{{ props.activeFilterLabel }} · </span>{{ rangeText }}
    </p>
    <div class="table-pagination__pages">
      <Button
        variant="outline"
        size="sm"
        :disabled="!hasPrev"
        :aria-label="$t('common.aria.prevPage')"
        class="table-pagination__nav-btn"
        @click="goPrev"
      >
        <ChevronLeft class="size-4" />
        {{ $t("common.pagination.prev") }}
      </Button>
      <nav
        class="table-pagination__numbers"
        :aria-label="$t('common.aria.pagination')"
      >
        <template
          v-for="(item, index) in visiblePageItems"
          :key="item === 'ellipsis' ? `ellipsis-${index}` : item"
        >
          <Button
            v-if="item !== 'ellipsis'"
            variant="outline"
            size="sm"
            :class="[
              'table-pagination__page-btn',
              item === props.page && 'table-pagination__page-btn--current',
            ]"
            :aria-label="$t('common.aria.pageNumber', { page: item })"
            :aria-current="item === props.page ? 'page' : undefined"
            @click="goToPage(item)"
          >
            {{ item }}
          </Button>
          <span
            v-else
            class="table-pagination__ellipsis"
            aria-hidden="true"
          >…</span>
        </template>
      </nav>
      <Button
        variant="outline"
        size="sm"
        :disabled="!hasNext"
        :aria-label="$t('common.aria.nextPage')"
        class="table-pagination__nav-btn"
        @click="goNext"
      >
        {{ $t("common.pagination.next") }}
        <ChevronRight class="size-4" />
      </Button>
    </div>
    <div
      class="table-pagination__spacer"
      aria-hidden="true"
    />
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { computed } from "vue";
import { Button } from "@/shared/components/ui/button";

type PageItem = number | "ellipsis";

/** Zwraca listę numerów stron i wielokropków do wyświetlenia (np. [1, 'ellipsis', 4, 5, 6, 'ellipsis', 10]). */
function getVisiblePageItems(total: number, current: number): PageItem[] {
  const totalPages = Math.max(1, total);
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const items: PageItem[] = [1];
  const showLeftEllipsis = current > 3;
  const showRightEllipsis = current < totalPages - 2;
  const windowStart = Math.max(2, current - 1);
  const windowEnd = Math.min(totalPages - 1, current + 1);

  if (showLeftEllipsis) items.push("ellipsis");
  for (let p = windowStart; p <= windowEnd; p++) {
    items.push(p);
  }
  if (showRightEllipsis) items.push("ellipsis");
  if (totalPages > 1) items.push(totalPages);
  return items;
}

interface Props {
  page: number;
  pageSize: number;
  total: number;
  activeFilterLabel?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:page": [value: number];
}>();

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.total / props.pageSize))
);

const hasPrev = computed(() => props.page > 1);
const hasNext = computed(() => props.page < totalPages.value);

const visiblePageItems = computed((): PageItem[] =>
  getVisiblePageItems(totalPages.value, props.page)
);

const rangeText = computed(() => {
  if (props.total === 0) {
    return "0";
  }

  const firstOnPage = (props.page - 1) * props.pageSize + 1;
  const lastOnPage = Math.min(props.page * props.pageSize, props.total);

  return `${firstOnPage}–${lastOnPage} z ${props.total}`;
});

const goPrev = (): void => {
  if (hasPrev.value) emit("update:page", props.page - 1);
};

const goNext = (): void => {
  if (hasNext.value) emit("update:page", props.page + 1);
};

const goToPage = (page: number): void => {
  if (page >= 1 && page <= totalPages.value) {
    emit("update:page", page);
  }
};
</script>

<style scoped lang="sass">
.table-pagination
  display: flex
  flex-wrap: wrap
  align-items: center
  gap: 0.75rem
  padding: 0.75rem 1rem
  border-top: 1px solid var(--border)
  background: var(--muted/30)

  &__info
    flex: 1
    min-width: 0
    margin: 0

  &__page-of
    flex-shrink: 0
    margin: 0
    font-weight: 500

  &__pages
    flex: 0
    flex-shrink: 0
    display: flex
    flex-wrap: nowrap
    align-items: center
    justify-content: center
    gap: 0.5rem

  &__spacer
    flex: 1
    min-width: 0

  &__numbers
    display: flex
    flex-wrap: nowrap
    align-items: center
    gap: 0.25rem
    flex-shrink: 0

  &__nav-btn
    flex-shrink: 0

  &__page-btn
    min-width: 2rem
    padding-left: 0.5rem
    padding-right: 0.5rem
    &--current
      font-weight: 600
      background-color: var(--primary)
      color: var(--primary-foreground)
      border-color: var(--primary)
      pointer-events: none

  &__ellipsis
    padding: 0 0.25rem
    color: var(--muted-foreground)
    font-size: 0.875rem
</style>
