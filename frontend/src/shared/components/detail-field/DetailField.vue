<template>
  <div class="detail-field">
    <label class="detail-field__label">
      {{ label }}
    </label>
    <div class="detail-field__value">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  label: string;
}

defineProps<IProps>();
</script>

<style scoped lang="sass">
.detail-field
  &__label
    display: block
    margin-bottom: 0.25rem
    font-size: 0.875rem
    font-weight: 500
    color: var(--muted-foreground)

  &__value
    margin-top: 0.25rem
</style>
