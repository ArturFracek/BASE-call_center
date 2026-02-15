<template>
  <div
    role="status"
    aria-live="polite"
    :class="mergeClasses(toastVariants({ variant: props.type }))"
  >
    <span class="flex-1 font-medium">{{ props.message }}</span>
    <button
      type="button"
      :aria-label="$t('common.aria.close')"
      class="shrink-0 rounded-md p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      @click="onClose"
    >
      <svg class="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { TToastType } from '@/composables/useToast'
import { mergeClasses } from '@/shared/helpers/classNames'
import { toastVariants } from '.'

interface IProps {
  type: TToastType
  message: string
}

const props = defineProps<IProps>()

const emit = defineEmits<{
  close: []
}>()

const onClose = (): void => {
  emit("close");
};
</script>
