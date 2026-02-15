<template>
  <section
    class="ticket-detail-status-section"
    :aria-label="$t('tickets.aria.editStatus')"
  >
    <DetailField :label="$t('tickets.headers.status')">
      <div class="flex flex-wrap items-center gap-2">
        <StatusBadge :status="ticket.status" />
        <Select v-model="selectedStatus">
          <SelectTrigger
            class="w-[200px]"
            :aria-label="$t('tickets.aria.statusSelect')"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="status in statusOptions"
              :key="status"
              :value="status"
            >
              {{ $t("tickets.status." + status) }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </DetailField>
    <div class="ticket-detail-status-section__actions flex gap-3 mt-2">
      <Button
        :disabled="saving || selectedStatus === ticket.status"
        @click="emit('save')"
      >
        {{ $t("tickets.buttons.save") }}
      </Button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { DetailField } from "@/shared/components/detail-field";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import StatusBadge from "@/modules/tickets/components/shared/StatusBadge.vue";
import type { ITicket, TTicketStatus } from "@/modules/tickets/types";

interface Props {
  ticket: ITicket;
  saving: boolean;
  statusOptions: readonly TTicketStatus[];
}

defineProps<Props>();

const selectedStatus = defineModel<TTicketStatus>({ required: true });

const emit = defineEmits<{
  save: [];
}>();
</script>

<style scoped lang="sass">
.ticket-detail-status-section
  padding: 1rem
  border: 1px solid var(--border)
  border-radius: var(--radius)
  background: var(--muted/30)
</style>
