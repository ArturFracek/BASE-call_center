<template>
  <div
    class="theme-switcher"
    role="group"
    :aria-label="t('common.theme.aria')"
  >
    <Button
      v-for="mode in themeModes"
      :key="mode"
      :variant="theme === mode ? 'default' : 'outline'"
      size="sm"
      :aria-pressed="theme === mode"
      :aria-label="t('common.theme.' + mode)"
      class="theme-switcher__btn"
      @click="setTheme(mode)"
    >
      <Sun
        v-if="mode === 'light'"
        class="theme-switcher__icon"
        aria-hidden
      />
      <Moon
        v-else
        class="theme-switcher__icon"
        aria-hidden
      />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Sun, Moon } from "lucide-vue-next";
import { useI18n } from "vue-i18n";
import { Button } from "@/shared/components/ui/button";
import { useTheme } from "@/composables/useTheme";
import type { TTheme } from "@/composables/useTheme";

const { t } = useI18n();
const { theme, setTheme } = useTheme();

const themeModes: TTheme[] = ["light", "dark"];
</script>

<style scoped lang="sass">
.theme-switcher
  display: inline-flex
  align-items: center
  gap: 0.25rem

  &__icon
    width: 1rem
    height: 1rem
</style>
