<template>
  <tbody
    data-slot="table-body"
    :class="cn('[&_tr:last-child]:border-0', props.class)"
  >
    <slot />
  </tbody>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '@/shared/helpers/classNames'

interface IProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<IProps>()
</script>
