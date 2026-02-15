<template>
  <Select v-model="model">
    <SelectTrigger
      class="w-[180px]"
      :aria-label="$t('tickets.filter.' + STATUS_FILTER_OPTIONS.ALL)"
    >
      <SelectValue :placeholder="$t('tickets.filter.' + STATUS_FILTER_OPTIONS.ALL)" />
    </SelectTrigger>
    <SelectContent>
      <TransitionGroup
        name="filter-options"
        tag="div"
        class="contents"
      >
        <SelectItem
          v-for="opt in STATUS_FILTER_OPTIONS_LIST"
          :key="opt"
          :value="opt"
        >
          {{ $t("tickets.filter." + opt) }}
        </SelectItem>
      </TransitionGroup>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
import { TransitionGroup } from "vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  STATUS_FILTER_OPTIONS,
  STATUS_FILTER_OPTIONS_LIST,
} from "@/modules/tickets/consts";
import type { TStatusFilter } from "@/modules/tickets/types";

const model = defineModel<TStatusFilter>({
  default: STATUS_FILTER_OPTIONS.ALL,
});
</script>

<style scoped lang="sass">
.filter-options-enter-active,
.filter-options-leave-active
  transition: opacity 0.2s ease

.filter-options-enter-from,
.filter-options-leave-to
  opacity: 0
</style>
