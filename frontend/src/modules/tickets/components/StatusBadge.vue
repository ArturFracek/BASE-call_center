<template>
  <Badge
    variant="outline"
    :class="badgeClass"
  >
    {{ $t("tickets.status." + props.status) }}
  </Badge>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Badge } from "@/shared/components/ui/badge";
import type { TTicketStatus } from "@/modules/tickets/types";

const props = defineProps<{
  status: TTicketStatus;
}>();

const badgeClass = computed(() => `status-badge status-badge--${props.status}`);
</script>

<style scoped lang="sass">
.status-badge
  border-color: transparent
  color: white

  &--new
    background-color: var(--status-new)
  &--in_progress
    background-color: var(--status-in-progress)
  &--closed
    background-color: var(--status-closed)
</style>
