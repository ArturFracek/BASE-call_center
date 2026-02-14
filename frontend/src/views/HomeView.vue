<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <main class="space-y-6">
    <h1 class="text-2xl font-semibold tracking-tight text-foreground">
      Lista zgłoszeń
    </h1>
    <p class="text-muted-foreground">
      Tu będzie widok listy (TicketListView).
    </p>
    <div class="flex flex-wrap gap-3">
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  </main>
</template>
