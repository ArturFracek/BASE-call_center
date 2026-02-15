/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "vue-virtual-scroller" {
  import type { App, Plugin } from "vue";
  const plugin: Plugin;
  export default plugin;
  export const RecycleScroller: unknown;
}
