<template>
  <section
    class="ticket-detail-fields"
    aria-labelledby="ticket-detail-fields-heading"
  >
    <h2
      id="ticket-detail-fields-heading"
      class="ticket-detail-fields__heading"
    >
      {{ $t("tickets.sections.details") }}
    </h2>
    <div class="ticket-detail-fields__list">
      <div
        v-for="(field, index) in fields"
        :key="field.labelKey"
        class="ticket-detail-fields__row"
        :class="{
          'ticket-detail-fields__row--divider': index < fields.length - 1,
          'ticket-detail-fields__row--full': field.fullWidth,
        }"
      >
        <DetailField :label="field.label">
          <PriorityBadge
            v-if="field.fieldKey === 'priority' && ticket"
            :priority="ticket.priority"
          />
          <p
            v-else
            class="text-foreground font-semibold"
            :class="field.contentClass"
          >
            {{ field.value }}
          </p>
        </DetailField>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { DetailField } from "@/shared/components/detail-field";
import PriorityBadge from "@/modules/tickets/components/shared/PriorityBadge.vue";
import type { ITicket } from "@/modules/tickets/types";
import type { ITicketDetailFieldItem } from "@/modules/tickets/utils/ticketDetailFields";

export type { ITicketDetailFieldItem };

interface IProps {
  fields: ITicketDetailFieldItem[];
  ticket: ITicket | null;
}

defineProps<IProps>();
</script>

<style scoped lang="sass">
.ticket-detail-fields
  &__heading
    margin: 0 0 1rem
    font-size: 1rem
    font-weight: 600
    line-height: 1.4
    color: var(--foreground)

  &__list
    display: grid
    grid-template-columns: 1fr 1fr
    gap: 0 1.5rem

    @media (max-width: 480px)
      grid-template-columns: 1fr

  &__row
    padding-bottom: 1rem
    min-width: 0

    &--full
      grid-column: 1 / -1

    &--divider
      border-bottom: 1px solid var(--border)
</style>
