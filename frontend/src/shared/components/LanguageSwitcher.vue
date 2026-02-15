<template>
  <div
    class="language-switcher"
    role="group"
    :aria-label="t('common.language')"
  >
    <Button
      v-for="loc in supportedLocales"
      :key="loc"
      :variant="locale === loc ? 'default' : 'outline'"
      size="sm"
      :aria-pressed="locale === loc"
      :aria-label="localeLabel(loc)"
      @click="setLocale(loc)"
    >
      {{ loc.toUpperCase() }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Button } from "@/shared/components/ui/button";
import { useLocale } from "@/composables/useLocale";
import type { TSupportedLocale } from "@/plugins/i18n";

const { t } = useI18n();
const { locale, setLocale, supportedLocales } = useLocale();

const localeLabel = (loc: TSupportedLocale): string =>
  loc === "pl" ? "Polski" : "English";
</script>

<style scoped lang="sass">
.language-switcher
  display: inline-flex
  align-items: center
  gap: 0.25rem
</style>
