<template>
  <div>
    <p class="text-muted-foreground">
      {{ $t("tickets.messages.loading") }}
    </p>
    <div
      class="ticket-detail-skeleton mt-6 space-y-4"
      aria-hidden="true"
    >
      <div class="h-8 w-56 rounded bg-muted animate-pulse" />
      <div
        v-for="i in 6"
        :key="i"
        class="ticket-detail-skeleton__field"
      >
        <div class="h-4 w-20 rounded bg-muted animate-pulse" />
        <div
          class="mt-1 rounded bg-muted animate-pulse"
          :class="i === 4 ? 'h-20 w-full' : 'h-4 w-full max-w-md'"
        />
      </div>
      <div class="ticket-detail-skeleton__field pt-2">
        <div class="h-4 w-16 rounded bg-muted animate-pulse" />
        <div class="mt-1 flex gap-2">
          <div class="h-6 w-24 rounded bg-muted animate-pulse" />
          <div class="h-9 w-[200px] rounded bg-muted animate-pulse" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.ticket-detail-skeleton
  max-width: 40rem

  &__field
    min-height: 2rem
</style>
