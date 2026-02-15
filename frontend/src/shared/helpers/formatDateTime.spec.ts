import { describe, expect, it } from "vitest";
import { formatDateTime } from "./formatDateTime";

describe("formatDateTime", () => {
  it("returns formatted date for valid ISO string", () => {
    const iso = "2024-03-15T14:30:00.000Z";
    const result = formatDateTime(iso, "en");
    expect(result).not.toBe(iso);
    expect(result).toContain("2024");
  });

  it("returns input string for invalid ISO", () => {
    const invalid = "not-a-date";
    expect(formatDateTime(invalid)).toBe(invalid);
  });

  it("uses passed locale", () => {
    const iso = "2024-01-01T12:00:00.000Z";
    const en = formatDateTime(iso, "en");
    const pl = formatDateTime(iso, "pl");
    expect(en).not.toBe(iso);
    expect(pl).not.toBe(iso);
  });
});
