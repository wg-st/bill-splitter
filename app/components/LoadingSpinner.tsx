export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-24 h-24">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-24 h-24 border-8 border-gray-200 dark:border-gray-700 rounded-full"></div>
          <div className="absolute top-0 left-0 w-24 h-24 border-8 border-blue-500 dark:border-blue-400 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
      <p className="mt-6 text-lg font-medium text-gray-700 dark:text-gray-300">
        Processing your bill...
      </p>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        This will only take a moment
      </p>
    </div>
  );
}
