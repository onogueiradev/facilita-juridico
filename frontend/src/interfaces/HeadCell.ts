import { DataClient } from "./DataClient";

export interface HeadCell {
  disablePadding: boolean;
  id: keyof DataClient;
  label: string;
  numeric: boolean;
}