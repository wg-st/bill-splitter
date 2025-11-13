interface CardHeaderProps {
  title: string;
  subtitle?: string;
}

export function CardHeader({ title, subtitle }: CardHeaderProps) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {subtitle}
        </p>
      )}
    </>
  );
}
