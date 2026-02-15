<template>
  <div
    class="table-pagination"
    role="navigation"
    aria-label="Paginacja tabeli"
  >
    <p class="table-pagination__info text-sm text-muted-foreground">
      <span v-if="props.activeFilterLabel">{{ props.activeFilterLabel }} · </span>{{ rangeText }}
    </p>
    <p class="table-pagination__page-of text-sm text-muted-foreground">
      {{ $t("common.pagination.pageOf", { page: props.page, total: totalPages }) }}
    </p>
    <div class="table-pagination__buttons">
      <Button
        variant="outline"
        size="sm"
        :disabled="!hasPrev"
        aria-label="Poprzednia strona"
        @click="goPrev"
      >
        <ChevronLeft class="size-4" />
        {{ $t("common.pagination.prev") }}
      </Button>
      <Button
        variant="outline"
        size="sm"
        :disabled="!hasNext"
        aria-label="Następna strona"
        @click="goNext"
      >
        {{ $t("common.pagination.next") }}
        <ChevronRight class="size-4" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { computed } from "vue";
import { Button } from "@/shared/components/ui/button";

interface Props {
  page: number;
  pageSize: number;
  total: number;
  activeFilterLabel?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:page": [value: number]
}>()

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.total / props.pageSize))
);

const hasPrev = computed(() => props.page > 1);
const hasNext = computed(() => props.page < totalPages.value);

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

  &__buttons
    flex: 1
    display: flex
    justify-content: flex-end
    gap: 0.5rem
</style>
