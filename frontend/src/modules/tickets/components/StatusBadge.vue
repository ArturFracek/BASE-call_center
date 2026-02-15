<template>
  <Badge
    variant="outline"
    :class="badgeClass"
  >
    {{ $t("tickets.status." + status) }}
  </Badge>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Badge } from "@/shared/components/ui/badge";
import type { TTicketStatus } from "@/modules/tickets/types";

interface Props {
  status: TTicketStatus;
}

const { status } = defineProps<Props>();

const badgeClass = computed(() => `status-badge status-badge--${status}`);
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
