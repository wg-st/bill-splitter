import type { BillItem } from "~/types/bill";
import type { Person } from "~/types/person";
import { TotalDisplay } from "./TotalDisplay";

interface BillSummaryProps {
  items: BillItem[];
  people: Person[];
  splits: Record<string, number>;
}

export function BillSummary({ items, people, splits }: BillSummaryProps) {
  const personSums = people.map((person) => {
    const sum = items.reduce((total, item, itemIndex) => {
      const splitKey = `${itemIndex}-${person.id}`;
      const personFactor = splits[splitKey] ?? 1;

      const totalFactors = people.reduce((sum, p) => {
        const key = `${itemIndex}-${p.id}`;
        return sum + (splits[key] ?? 1);
      }, 0);

      const share =
        totalFactors > 0 ? (personFactor / totalFactors) * item.price : 0;

      return total + share;
    }, 0);

    return { person, sum };
  });

  const grandTotal = personSums.reduce((total, { sum }) => total + sum, 0);

  if (people.length === 0) {
    return (
      <div className="text-gray-500 dark:text-gray-400 text-center py-4">
        Add people to see the summary
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {personSums.map(({ person, sum }) => (
          <div
            key={person.id}
            className="flex justify-between items-center py-2 px-3 rounded-lg"
            style={{ backgroundColor: `${person.color}15` }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: person.color }}
              />
              <span className="font-medium text-gray-900 dark:text-white">
                {person.name}
              </span>
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">
              CHF {sum.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <TotalDisplay total={grandTotal} />
    </div>
  );
}
