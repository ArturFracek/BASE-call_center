<template>
  <div
    data-slot="card-content"
    :class="cn('px-6', props.class)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '@/shared/helpers/classNames'

interface IProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<IProps>()
</script>
