<template>
  <tr
    data-slot="table-row"
    :class="cn('hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors', props.class)"
  >
    <slot />
  </tr>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '@/shared/helpers/classNames'

interface IProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<IProps>()
</script>
