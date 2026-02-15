<template>
  <div class="app">
    <header class="app__header">
      <span class="app__title">{{ t("common.appTitle") }}</span>
      <div class="app__header-actions">
        <ThemeSwitcher />
        <span
          class="app__header-divider"
          aria-hidden="true"
        />
        <LanguageSwitcher />
      </div>
    </header>
    <main class="app__main">
      <RouterView v-slot="{ Component }">
        <Transition name="view" mode="out-in">
          <KeepAlive :key="locale">
            <component :is="Component" />
          </KeepAlive>
        </Transition>
      </RouterView>
    </main>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { RouterView } from "vue-router";
import LanguageSwitcher from "@/shared/components/LanguageSwitcher.vue";
import ThemeSwitcher from "@/shared/components/ThemeSwitcher.vue";
import { Toast } from "@/shared/components/ui/toast";

const { t, locale } = useI18n();
</script>

<style scoped lang="sass">
.app
  min-height: 100vh
  display: flex
  flex-direction: column

.app__header
  display: flex
  align-items: center
  justify-content: space-between
  gap: 1rem
  padding: 0.75rem 1rem
  border-bottom: 1px solid var(--border)
  background: var(--card)
  flex-shrink: 0

.app__title
  font-size: 1rem
  font-weight: 600
  color: var(--foreground)

.app__header-actions
  display: flex
  align-items: center
  gap: 0.5rem

.app__header-divider
  width: 1px
  height: 1.5rem
  background: var(--border)
  flex-shrink: 0
  margin: 0 0.25rem

.app__main
  flex: 1
  min-height: 0
  display: flex
  flex-direction: column

  // Child view (from RouterView) fills remaining height for proper scroll in lists
  > *
    flex: 1
    min-height: 0

.view-enter-active,
.view-leave-active
  transition: opacity 0.15s ease

.view-enter-from,
.view-leave-to
  opacity: 0
</style>


