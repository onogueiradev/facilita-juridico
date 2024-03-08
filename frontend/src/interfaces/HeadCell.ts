import { DataClient } from "./DataClient";

export interface HeadCell {
  disablePadding: boolean;
  id: keyof DataClient | 'actions'
  label: string;
  numeric: boolean;
}