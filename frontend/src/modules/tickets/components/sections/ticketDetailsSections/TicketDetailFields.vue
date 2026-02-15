<template>
  <div class="ticket-detail-fields space-y-4">
    <DetailField
      v-for="field in fields"
      :key="field.labelKey"
      :label="field.label"
    >
      <PriorityBadge
        v-if="field.fieldKey === 'priority' && ticket"
        :priority="ticket.priority"
      />
      <p
        v-else
        class="text-foreground"
        :class="field.contentClass"
      >
        {{ field.value }}
      </p>
    </DetailField>
  </div>
</template>

<script setup lang="ts">
import { DetailField } from "@/shared/components/detail-field";
import PriorityBadge from "@/modules/tickets/components/shared/PriorityBadge.vue";
import type { ITicket } from "@/modules/tickets/types";

export interface TicketDetailFieldItem {
  fieldKey: string;
  labelKey: string;
  label: string;
  value: string;
  contentClass?: string;
}

interface Props {
  fields: TicketDetailFieldItem[];
  ticket: ITicket | null;
}

defineProps<Props>();
</script>
