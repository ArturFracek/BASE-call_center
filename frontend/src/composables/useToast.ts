import { generateId } from "@/shared/helpers/generateId";
import { shallowRef, type ShallowRef } from "vue";

export type TToastKind = "error" | "info" | "success";

export type TToastType = "default" | "success" | "destructive";

export interface IToastItem {
  id: string;
  type: TToastType;
  message: string;
  duration: number;
}

const DEFAULT_DURATION = 5000;

const KIND_TO_VARIANT: Record<TToastKind, TToastType> = {
  error: "destructive",
  info: "default",
  success: "success",
};

const toasts: ShallowRef<IToastItem[]> = shallowRef([]);
const timers = new Map<string, ReturnType<typeof setTimeout>>();

const removeToast = (id: string): void => {
  const timer = timers.get(id);
  if (timer) {
    clearTimeout(timer);
    timers.delete(id);
  }
  toasts.value = toasts.value.filter((t) => t.id !== id);
};

const addToast = (
  type: TToastType,
  message: string,
  duration: number = DEFAULT_DURATION
): void => {
  const id = generateId("toast");
  toasts.value = [...toasts.value, { id, type, message, duration }];
  if (duration > 0) {
    const timer = setTimeout(() => removeToast(id), duration);
    timers.set(id, timer);
  }
};

export const displayToast = (
  type: TToastKind,
  message: string,
  duration: number = DEFAULT_DURATION
): void => {
  addToast(KIND_TO_VARIANT[type], message, duration);
};

export const useToast = () => {
  const dismiss = (id: string): void => {
    removeToast(id);
  };
  return {
    toasts,
    displayToast,
    dismiss,
  };
};
