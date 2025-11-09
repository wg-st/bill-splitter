import { useState } from "react";
import { useNavigate } from "react-router";
import { FileUploadCard } from "../components/FileUploadCard";
import { LoadingSpinner } from "../components/LoadingSpinner";

export function meta() {
  return [
    { title: "Upload Bill - Bill Splitter" },
    { name: "description", content: "Upload your bill to start splitting" },
  ];
}

export default function Upload() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = (file: File) => {
    console.log("Uploaded file:", file.name);
    setIsLoading(true);

    // Simulate processing for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
      navigate("/bill-splitting");
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-900 dark:text-white">
          Bill Splitter
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Upload your bill to get started
        </p>
        <FileUploadCard onFileUpload={handleFileUpload} />
      </div>
    </div>
  );
}
