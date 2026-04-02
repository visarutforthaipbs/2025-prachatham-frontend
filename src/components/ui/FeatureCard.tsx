import type { IconType } from "react-icons";

interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
}

/**
 * Icon + title + description card for feature / mission sections.
 */
export default function FeatureCard({
  icon: IconComponent,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="card">
      <div className="p-6">
        <div className="flex flex-col items-start gap-4">
          <div className="p-3 rounded-lg bg-brand-50 text-brand-600">
            <IconComponent className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            {title}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
