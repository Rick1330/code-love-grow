
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const FeatureCard = ({ title, description, icon, className }: FeatureCardProps) => {
  return (
    <div className={cn(
      "bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-lovable-gray-light hover:-translate-y-1",
      className
    )}>
      <div className="w-12 h-12 rounded-full bg-lovable-purple-light flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
