<template>
  <RouterView v-slot="{ Component }">
    <Transition name="view" mode="out-in">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </Transition>
  </RouterView>
  <Toast />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toast } from '@/shared/components/ui/toast'
</script>

<style scoped>
.view-enter-active,
.view-leave-active {
  transition: opacity 0.15s ease;
}
.view-enter-from,
.view-leave-to {
  opacity: 0;
}
</style>


