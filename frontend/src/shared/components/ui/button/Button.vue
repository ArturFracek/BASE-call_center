<template>
  <Primitive
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :class="mergeClasses(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>

<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { TButtonVariants } from "."
import { Primitive } from "reka-ui"
import { mergeClasses } from '@/shared/helpers/classNames'
import { buttonVariants } from "."

interface Props extends PrimitiveProps {
  variant?: TButtonVariants["variant"]
  size?: TButtonVariants["size"]
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
})
</script>
