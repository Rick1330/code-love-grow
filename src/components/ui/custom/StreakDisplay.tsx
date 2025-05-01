
import { cn } from "@/lib/utils";

interface StreakDisplayProps {
  days: number;
  className?: string;
}

const StreakDisplay = ({ days, className }: StreakDisplayProps) => {
  const circles = Array.from({ length: 7 }, (_, i) => i < days);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="flex items-center gap-2 mb-2">
        {circles.map((active, i) => (
          <div 
            key={i}
            className={cn(
              "w-4 h-4 rounded-full transition-all",
              active 
                ? "bg-lovable-purple shadow-sm animate-pulse-gentle"
                : "bg-lovable-gray-light"
            )}
          />
        ))}
      </div>
      <p className="text-center font-semibold">
        {days > 0 ? (
          <>You've coded <span className="text-lovable-purple">{days} {days === 1 ? 'day' : 'days'}</span> in a row!</>
        ) : (
          <>Start your coding streak today!</>
        )}
      </p>
    </div>
  );
};

export default StreakDisplay;
