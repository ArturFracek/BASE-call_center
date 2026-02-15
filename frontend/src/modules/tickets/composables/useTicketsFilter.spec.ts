import { describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { defineComponent, h } from "vue";
import { useTicketsFilter } from "./useTicketsFilter";
import { useTicketsStore } from "@/modules/tickets/stores/ticketsStore";
import {
  STATUS_FILTER_OPTIONS,
  TICKET_LIST_PAGE_SIZE,
} from "@/modules/tickets/consts";

const TestHost = defineComponent({
  setup() {
    const filter = useTicketsFilter();
    return () =>
      h("div", [
        h("span", { "data-status": filter.statusFilter.value }, filter.statusFilter.value),
        h("span", { "data-page": filter.page.value }, String(filter.page.value)),
        h("button", {
          "data-set-status": true,
          onClick: () => filter.setStatusFilter(STATUS_FILTER_OPTIONS.NEW),
        }),
        h("button", {
          "data-set-page": true,
          onClick: () => filter.setPage(2),
        }),
      ]);
  },
});

describe("useTicketsFilter", () => {
  it("exposes initial statusFilter and page", () => {
    const wrapper = mount(TestHost, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    });

    expect(wrapper.find("[data-status]").text()).toBe(STATUS_FILTER_OPTIONS.ALL);
    expect(wrapper.find("[data-page]").text()).toBe("1");
  });

  it("calls store.fetchTickets with status and pagination when filter or page changes", async () => {
    const pinia = createTestingPinia({ createSpy: vi.fn });
    const wrapper = mount(TestHost, {
      global: { plugins: [pinia] },
    });

    const store = useTicketsStore(pinia);
    await wrapper.find("[data-set-status]").trigger("click");
    await flushPromises();

    expect(store.fetchTickets).toHaveBeenCalledWith(
      expect.objectContaining({
        status: STATUS_FILTER_OPTIONS.NEW,
        limit: TICKET_LIST_PAGE_SIZE,
        offset: 0,
      })
    );
  });

  it("setPage(2) triggers fetchTickets with offset for page 2", async () => {
    const pinia = createTestingPinia({ createSpy: vi.fn });
    const wrapper = mount(TestHost, {
      global: { plugins: [pinia] },
    });

    const store = useTicketsStore(pinia);
    await wrapper.find("[data-set-page]").trigger("click");
    await flushPromises();

    expect(store.fetchTickets).toHaveBeenCalledWith(
      expect.objectContaining({
        limit: TICKET_LIST_PAGE_SIZE,
        offset: TICKET_LIST_PAGE_SIZE,
      })
    );
  });
});
