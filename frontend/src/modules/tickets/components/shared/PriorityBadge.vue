<template>
  <Badge
    variant="outline"
    :class="badgeClass"
  >
    {{ $t("tickets.priority." + priority) }}
  </Badge>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Badge } from "@/shared/components/ui/badge";
import type { TTicketPriority } from "@/modules/tickets/types";

interface Props {
  priority: TTicketPriority;
}

const { priority } = defineProps<Props>();

const badgeClass = computed(() => `priority-badge priority-badge--${priority}`);
</script>

<style scoped lang="sass">
.priority-badge
  border-color: transparent
  color: white
  &--low
    background-color: var(--priority-low)
  &--medium
    background-color: var(--priority-medium)
  &--high
    background-color: var(--priority-high)
</style>
