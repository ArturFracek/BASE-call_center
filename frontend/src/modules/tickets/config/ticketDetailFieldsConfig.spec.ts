import { describe, expect, it } from "vitest";
import {
  TICKET_DETAIL_FIELD_DEFS,
  type ITicketDetailFieldDef,
} from "./ticketDetailFieldsConfig";
import type { ITicket } from "@/modules/tickets/types";

const sampleTicket: ITicket = {
  id: 1,
  customerName: "Jane Doe",
  subject: "Subject",
  description: "Description",
  priority: "high",
  status: "new",
  createdAt: "2024-06-01T10:00:00.000Z",
};

const t = (key: string): string => key;

describe("ticketDetailFieldsConfig", () => {
  it("defines expected field keys in order", () => {
    const keys = TICKET_DETAIL_FIELD_DEFS.map((d) => d.fieldKey);
    expect(keys).toEqual([
      "id",
      "customerName",
      "subject",
      "description",
      "priority",
      "createdAt",
    ]);
  });

  it("getValue returns correct value for each field", () => {
    for (const def of TICKET_DETAIL_FIELD_DEFS as ITicketDetailFieldDef[]) {
      const value = def.getValue(sampleTicket, t);
      expect(value).toBeDefined();
      expect(typeof value).toBe("string");
    }
  });

  it("id getValue returns stringified id", () => {
    const idDef = TICKET_DETAIL_FIELD_DEFS.find((d) => d.fieldKey === "id");
    expect(idDef?.getValue(sampleTicket, t)).toBe("1");
  });

  it("priority getValue uses tFn", () => {
    const priorityDef = TICKET_DETAIL_FIELD_DEFS.find(
      (d) => d.fieldKey === "priority"
    );
    expect(priorityDef?.getValue(sampleTicket, t)).toBe(
      "tickets.priority.high"
    );
  });
});
