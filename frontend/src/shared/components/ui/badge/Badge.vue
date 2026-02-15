<template>
  <Primitive
    data-slot="badge"
    :class="cn(badgeVariants({ variant: props.variant }), props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </Primitive>
</template>

<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { TBadgeVariants } from "."
import { reactiveOmit } from "@vueuse/core"
import { Primitive } from "reka-ui"
import { cn } from '@/shared/helpers/classNames'
import { badgeVariants } from "."

interface IProps extends PrimitiveProps {
  variant?: TBadgeVariants["variant"]
  class?: HTMLAttributes["class"]
}

const props = defineProps<IProps>()

const delegatedProps = reactiveOmit(props, "class")
</script>
