<template>
  <div>
    <h1 class="text-xl font-semibold text-foreground">
      {{ t("tickets.headers.detail") }}
    </h1>
    <p class="text-muted-foreground mt-2">
      {{ t("tickets.messages.notFound") }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>