<template>
  <main class="space-y-6">
    <h1 class="text-2xl font-semibold tracking-tight text-foreground">
      {{ $t('tickets.headers.detail') }}
    </h1>
    <p class="text-muted-foreground">ID: {{ id }}</p>
    <RouterLink to="/" class="text-primary underline">
      {{ $t('tickets.buttons.backToList') }}
    </RouterLink>
  </main>
</template>

<script setup lang="ts">
interface Props {
  id: string;
}

const { id } = defineProps<Props>();
</script>
