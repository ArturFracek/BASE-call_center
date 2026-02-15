import { generateId } from "@/shared/helpers/generateId";
import { shallowRef, type ShallowRef } from "vue";

export type ToastKind = "error" | "info" | "success";

export type ToastType = "default" | "success" | "destructive";

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
}

const DEFAULT_DURATION = 5000;

const KIND_TO_VARIANT: Record<ToastKind, ToastType> = {
  error: "destructive",
  info: "default",
  success: "success",
};

const toasts: ShallowRef<ToastItem[]> = shallowRef([]);
const timers = new Map<string, ReturnType<typeof setTimeout>>();

function removeToast(id: string): void {
  const timer = timers.get(id);
  if (timer) {
    clearTimeout(timer);
    timers.delete(id);
  }
  toasts.value = toasts.value.filter((t) => t.id !== id);
}

function addToast(
  type: ToastType,
  message: string,
  duration: number = DEFAULT_DURATION
): void {
  const id = generateId("toast");
  toasts.value = [...toasts.value, { id, type, message, duration }];
  if (duration > 0) {
    const timer = setTimeout(() => removeToast(id), duration);
    timers.set(id, timer);
  }
}

export function displayToast(
  type: ToastKind,
  message: string,
  duration: number = DEFAULT_DURATION
): void {
  addToast(KIND_TO_VARIANT[type], message, duration);
}

export function useToast() {
  function dismiss(id: string): void {
    removeToast(id);
  }
  return {
    toasts,
    displayToast,
    dismiss,
  };
}
