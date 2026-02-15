<template>
  <Card
    class="ticket-card cursor-pointer transition-shadow hover:shadow-md"
    role="button"
    tabindex="0"
    @click="goToDetail"
    @keydown.enter="goToDetail"
    @keydown.space.prevent="goToDetail"
  >
    <CardHeader>
      <CardTitle class="line-clamp-1 text-base">
        {{ ticket.subject }}
      </CardTitle>
      <CardDescription>
        #{{ ticket.id }}
      </CardDescription>
    </CardHeader>
    <CardContent class="flex flex-col gap-2 pt-0">
      <p class="text-sm">
        <span class="text-muted-foreground">{{ $t("tickets.headers.customerName") }}:</span>
        {{ ticket.customerName }}
      </p>
      <div class="ticket-card__badges flex flex-wrap items-center gap-2">
        <StatusBadge :status="ticket.status" />
        <PriorityBadge :priority="ticket.priority" />
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useTicketNavigation } from "@/modules/tickets/composables/useTicketNavigation";
import PriorityBadge from "./PriorityBadge.vue";
import StatusBadge from "./StatusBadge.vue";
import type { ITicket } from "@/modules/tickets/types";

interface IProps {
  ticket: ITicket;
}

const { ticket } = defineProps<IProps>();
const { goToDetail: goToDetailRoute } = useTicketNavigation();

const goToDetail = (): void => goToDetailRoute(ticket);
</script>

<style scoped lang="sass">
.ticket-card
  outline: none
  overflow: hidden
  &:focus-visible
    outline: 2px solid var(--ring)
    outline-offset: 2px

  &__badges
    min-width: 0

@media (max-width: 768px)
  .ticket-card
    padding-top: 0.5rem
    padding-bottom: 0.5rem
    gap: 0.5rem
  .ticket-card :deep([data-slot="card-header"])
    gap: 0.25rem
    padding-left: 0.5rem
    padding-right: 0.5rem
  .ticket-card :deep([data-slot="card-content"])
    padding-left: 0.5rem
    padding-right: 0.5rem
  .ticket-card :deep([data-slot="card-content"]) p
    line-height: 1.3
  .ticket-card :deep(.flex-wrap)
    gap: 0.375rem
</style>
