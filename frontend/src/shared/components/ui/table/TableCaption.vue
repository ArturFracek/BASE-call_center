<template>
  <caption
    data-slot="table-caption"
    :class="cn('text-muted-foreground mt-4 text-sm', props.class)"
  >
    <slot />
  </caption>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '@/shared/helpers/classNames'

interface IProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<IProps>()
</script>
