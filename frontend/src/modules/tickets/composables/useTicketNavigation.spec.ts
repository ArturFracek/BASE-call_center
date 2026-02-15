import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createMemoryHistory } from "vue-router";
import { defineComponent, h } from "vue";
import { useTicketNavigation } from "./useTicketNavigation";
import type { ITicket } from "@/modules/tickets/types";

const mockTicket: ITicket = {
  id: 42,
  customerName: "Test User",
  subject: "Test",
  description: "Desc",
  priority: "medium",
  status: "new",
  createdAt: "2024-01-01T00:00:00.000Z",
};

describe("useTicketNavigation", () => {
  it("calls router.push with ticket-detail route and ticket id", async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: "/", name: "tickets", component: { template: "<div />" } },
        {
          path: "/tickets/:id",
          name: "ticket-detail",
          component: { template: "<div />" },
        },
      ],
    });
    const pushSpy = vi.spyOn(router, "push");

    const TestComp = defineComponent({
      setup() {
        const { goToDetail } = useTicketNavigation();
        return () =>
          h("button", { onClick: () => goToDetail(mockTicket) }, "Go");
      },
    });

    const wrapper = mount(TestComp, {
      global: {
        plugins: [router],
      },
    });

    await wrapper.find("button").trigger("click");
    await router.isReady();

    expect(pushSpy).toHaveBeenCalledWith({
      name: "ticket-detail",
      params: { id: "42" },
    });
  });
});
