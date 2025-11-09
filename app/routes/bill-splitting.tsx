import { Link } from "react-router";

export function meta() {
  return [
    { title: "Split Bill - Bill Splitter" },
    { name: "description", content: "Split your bill between friends" },
  ];
}

export default function BillSplitting() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            to="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to upload
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Bill Splitting
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This page is under construction. Bill splitting functionality will
            be implemented here.
          </p>

          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              TODO: Implement bill splitting logic
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
