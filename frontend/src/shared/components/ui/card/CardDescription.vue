<template>
  <p
    data-slot="card-description"
    :class="cn('text-muted-foreground text-sm', props.class)"
  >
    <slot />
  </p>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '@/shared/helpers/classNames'

interface Props {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>
