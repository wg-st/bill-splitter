import type { BillItem } from "~/types/bill";
import { TotalDisplay } from "./TotalDisplay";

interface BillTotalProps {
  items: BillItem[];
}

export function BillTotal({ items }: BillTotalProps) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return <TotalDisplay total={total} />;
}
