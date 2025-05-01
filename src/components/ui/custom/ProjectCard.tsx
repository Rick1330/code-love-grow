
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  progress: number;
  tags?: string[];
  deadline?: string;
  className?: string;
}

const ProjectCard = ({ 
  title, 
  description, 
  progress, 
  tags = [], 
  deadline,
  className 
}: ProjectCardProps) => {
  return (
    <div className={cn(
      "bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-lovable-gray-light hover:-translate-y-1",
      className
    )}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold">{title}</h3>
        {deadline && (
          <span className="text-xs bg-lovable-peach text-lovable-purple-dark px-2 py-1 rounded-full">
            Due {deadline}
          </span>
        )}
      </div>
      
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="text-xs bg-lovable-blue px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="font-semibold">Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-lovable-gray-light rounded-full overflow-hidden">
          <div 
            className="h-full bg-lovable-purple rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          className="text-xs h-8 px-3 rounded-full border-lovable-purple text-lovable-purple hover:bg-lovable-purple-light"
        >
          View Details
        </Button>
        <Button className="text-xs h-8 px-3 rounded-full bg-lovable-purple hover:bg-lovable-purple-dark">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
