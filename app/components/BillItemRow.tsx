import type { Person } from "~/types/person";

interface BillItemRowProps {
  name: string;
  price: number;
  people: Person[];
  itemIndex: number;
  splits: Record<string, number>;
  onSplitChange: (itemIndex: number, personId: string, factor: number) => void;
}

export function BillItemRow({
  name,
  price,
  people,
  itemIndex,
  splits,
  onSplitChange,
}: BillItemRowProps) {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <span className="text-gray-900 dark:text-white">{name}</span>
        <span className="font-semibold text-gray-900 dark:text-white">
          CHF {price.toFixed(2)}
        </span>
      </div>

      {people.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {people.map((person) => {
            const splitKey = `${itemIndex}-${person.id}`;
            const splitFactor = splits[splitKey] ?? 1;
            const isZero = splitFactor === 0;

            const handleChipClick = () => {
              const newValue = splitFactor !== 0 ? 0 : 1;
              onSplitChange(itemIndex, person.id, newValue);
            };

            return (
              <div
                key={person.id}
                onClick={handleChipClick}
                className={`${isZero ? "bg-gray-400 dark:bg-gray-600" : person.color} text-white px-3 py-1.5 rounded-full flex items-center gap-2 shadow-md cursor-pointer hover:opacity-90 transition-opacity`}
              >
                <span className="font-medium text-sm">{person.name}</span>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={splitFactor}
                  onChange={(e) =>
                    onSplitChange(
                      itemIndex,
                      person.id,
                      parseFloat(e.target.value) || 0
                    )
                  }
                  onClick={(e) => e.stopPropagation()}
                  className="w-10 px-1 py-0.5 bg-white/20 text-white text-center text-sm rounded border border-white/30 focus:outline-none focus:ring-1 focus:ring-white/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
