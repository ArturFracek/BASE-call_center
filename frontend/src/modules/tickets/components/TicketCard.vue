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
      <div class="flex flex-wrap items-center gap-2">
        <StatusBadge :status="ticket.status" />
        <span class="text-sm text-muted-foreground">
          {{ $t("tickets.headers.priority") }}: {{ $t("tickets.priority." + ticket.priority) }}
        </span>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import StatusBadge from "./StatusBadge.vue";
import type { ITicket } from "@/modules/tickets/types";

interface Props {
  ticket: ITicket;
}

const { ticket } = defineProps<Props>();

const router = useRouter();

function goToDetail(): void {
  router.push({ name: "ticket-detail", params: { id: String(ticket.id) } });
}
</script>

<style scoped lang="sass">
.ticket-card
  outline: none
  &:focus-visible
    outline: 2px solid var(--ring)
    outline-offset: 2px
</style>
