import { UUID } from "crypto";

export type Notification = {
  id: number;
  send_date: string;
  sent: boolean;
  content: string;
  creation_date: string;
  author:UUID
};
