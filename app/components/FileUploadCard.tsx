import { useState, useRef } from "react";
import type { DragEvent, ChangeEvent } from "react";

interface FileUploadCardProps {
  onFileUpload: (file: File) => void;
}

export function FileUploadCard({ onFileUpload }: FileUploadCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative cursor-pointer transition-all duration-200
        border-2 border-dashed rounded-xl p-12
        bg-white dark:bg-gray-800
        hover:border-blue-500 dark:hover:border-blue-400
        hover:bg-blue-50 dark:hover:bg-gray-700
        ${
          isDragging
            ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-gray-700 scale-[1.02]"
            : "border-gray-300 dark:border-gray-600"
        }
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
        accept="image/*,.pdf"
      />

      <div className="flex flex-col items-center justify-center text-center">
        <svg
          className={`w-16 h-16 mb-4 transition-colors ${
            isDragging
              ? "text-blue-500 dark:text-blue-400"
              : "text-gray-400 dark:text-gray-500"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>

        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          {isDragging ? "Drop your file here" : "Upload Bill"}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Drag and drop your bill here, or click to browse
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-500">
          Supports: Coop bills (PDF)
        </p>
      </div>
    </div>
  );
}
