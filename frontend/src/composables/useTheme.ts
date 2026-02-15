import { ref, onMounted } from "vue";

export type TTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "app-theme";

const applyThemeToDom = (theme: TTheme): void => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
};

const getStoredTheme = (): TTheme | null => {
  if (typeof localStorage === "undefined") return null;
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return null;
};

const getSystemTheme = (): TTheme => {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const resolveInitialTheme = (): TTheme =>
  getStoredTheme() ?? getSystemTheme();

export const useTheme = () => {
  const theme = ref<TTheme>(resolveInitialTheme());

  onMounted(() => {
    applyThemeToDom(theme.value);
  });

  const setTheme = (newTheme: TTheme): void => {
    theme.value = newTheme;
    applyThemeToDom(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  return {
    theme,
    setTheme,
  };
};
