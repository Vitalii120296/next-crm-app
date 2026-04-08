import type { ClientStatus } from "../types";

export function statusFormat(status: ClientStatus) {
  switch (status) {
    case "NEW":
      return "New";
    case "IN_PROGRESS":
      return "In Progress";
    case "DONE":
      return "Done";
    default:
      return "";
  }
}
