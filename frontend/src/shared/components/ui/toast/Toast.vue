<template>
  <Teleport to="body">
    <div
      class="fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col gap-2 overflow-hidden p-4 sm:max-w-[420px] sm:top-4 sm:right-4"
      :aria-label="$t('common.aria.notifications')"
    >
      <TransitionGroup
      name="toast"
      tag="div"
      class="flex flex-col gap-2"
    >
      <SingleToast
        v-for="item in toasts"
        :key="item.id"
        :type="item.type"
        :message="item.message"
        @close="dismiss(item.id)"
      />
    </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToast } from '@/composables/useToast'
import SingleToast from './SingleToast.vue'

const { toasts, dismiss } = useToast()
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.2s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.toast-move {
  transition: transform 0.2s ease;
}
</style>
