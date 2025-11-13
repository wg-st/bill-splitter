import type { BillItem } from "~/types/bill";
import type { Person } from "~/types/person";
import { BillItemRow } from "./BillItemRow";

interface BillItemsListProps {
  items: BillItem[];
  people: Person[];
  splits: Record<string, number>;
  onSplitChange: (itemIndex: number, personId: string, factor: number) => void;
}

export function BillItemsList({ items, people, splits, onSplitChange }: BillItemsListProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Items
      </h2>
      <div className="space-y-2">
        {items.map((item, index) => (
          <BillItemRow
            key={index}
            name={item.name}
            price={item.price}
            people={people}
            itemIndex={index}
            splits={splits}
            onSplitChange={onSplitChange}
          />
        ))}
      </div>
    </div>
  );
}
