<template>
  <section
    class="ticket-detail-status-section"
    :aria-label="$t('tickets.aria.editStatus')"
  >
    <h2 class="ticket-detail-status-section__heading">
      {{ $t("tickets.headers.status") }}
    </h2>
    <div class="ticket-detail-status-section__row">
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
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import type { ITicket, TTicketStatus } from "@/modules/tickets/types";

interface IProps {
  ticket: ITicket;
  saving: boolean;
  statusOptions: readonly TTicketStatus[];
}

defineProps<IProps>();

const selectedStatus = defineModel<TTicketStatus>({ required: true });

const emit = defineEmits<{
  save: [];
}>();
</script>

<style scoped lang="sass">
.ticket-detail-status-section
  &__heading
    margin: 0 0 0.75rem
    font-size: 1rem
    font-weight: 600
    line-height: 1.4
    color: var(--foreground)

  &__row
    display: flex
    flex-wrap: wrap
    align-items: center
    gap: 0.5rem
</style>
