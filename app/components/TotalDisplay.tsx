interface TotalDisplayProps {
  total: number;
}

export function TotalDisplay({ total }: TotalDisplayProps) {
  return (
    <div className="border-t pt-4">
      <div className="flex justify-between items-center text-xl font-bold">
        <span className="text-gray-900 dark:text-white">Total</span>
        <span className="text-gray-900 dark:text-white">
          CHF {total.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
