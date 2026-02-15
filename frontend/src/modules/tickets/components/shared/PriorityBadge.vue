<template>
  <span
    class="priority-indicator"
    :class="`priority-indicator--${priority}`"
  >
    <span
      class="priority-indicator__dot"
      :aria-hidden="true"
    />
    {{ $t("tickets.priority." + priority) }}
  </span>
</template>

<script setup lang="ts">
import type { TTicketPriority } from "@/modules/tickets/types";

interface Props {
  priority: TTicketPriority;
}

defineProps<Props>();
</script>

<style scoped lang="sass">
.priority-indicator
  display: inline-flex
  align-items: center
  gap: 0.375rem
  font-size: inherit
  color: inherit

  &__dot
    width: 0.375rem
    height: 0.375rem
    border-radius: 50%
    flex-shrink: 0

  &--low .priority-indicator__dot
    background-color: var(--priority-low)
  &--medium .priority-indicator__dot
    background-color: var(--priority-medium)
  &--high .priority-indicator__dot
    background-color: var(--priority-high)
</style>
