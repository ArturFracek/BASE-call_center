import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import StatusBadge from "./StatusBadge.vue";

describe("StatusBadge", () => {
  it("renders translated status label for new", () => {
    const wrapper = mount(StatusBadge, {
      props: { status: "new" },
      global: {},
    });
    expect(wrapper.text()).toBe("New");
  });

  it("renders translated status label for in_progress", () => {
    const wrapper = mount(StatusBadge, {
      props: { status: "in_progress" },
    });
    expect(wrapper.text()).toBe("In progress");
  });

  it("applies modifier class for status", () => {
    const wrapper = mount(StatusBadge, {
      props: { status: "closed" },
    });
    expect(wrapper.classes()).toContain("status-badge--closed");
  });
});
