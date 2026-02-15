import { createTestingPinia } from "@pinia/testing";
import type { MountingOptions } from "@vue/test-utils";
import { vi } from "vitest";

export function mountWithPinia(
  options: MountingOptions<unknown> = {}
): MountingOptions<unknown> {
  return {
    ...options,
    global: {
      ...options.global,
      plugins: [
        ...(options.global?.plugins ?? []),
        createTestingPinia({ createSpy: vi.fn() }),
      ],
    },
  };
}
