
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ui/custom/ProjectCard";
import { PlusCircle, Search } from "lucide-react";

const Projects = () => {
  const [filter, setFilter] = useState("all");
  
  const dummyProjects = [
    {
      title: "Personal Portfolio",
      description: "Redesigning my developer portfolio with React and Tailwind",
      progress: 65,
      tags: ["React", "Tailwind", "Frontend"],
      deadline: "Jun 15",
      status: "active"
    },
    {
      title: "Recipe App",
      description: "Mobile app to store and share family recipes",
      progress: 30,
      tags: ["React Native", "Firebase", "Mobile"],
      deadline: "Jul 22",
      status: "active"
    },
    {
      title: "Blog Platform",
      description: "Creating a blog platform with authentication and comments",
      progress: 85,
      tags: ["Next.js", "MongoDB", "Fullstack"],
      deadline: "May 10",
      status: "active"
    },
    {
      title: "Weather Dashboard",
      description: "Dashboard to display weather information from multiple APIs",
      progress: 100,
      tags: ["API", "JavaScript", "Frontend"],
      deadline: "",
      status: "completed"
    },
    {
      title: "Task Management API",
      description: "RESTful API for task management application",
      progress: 50,
      tags: ["Node.js", "Express", "MongoDB"],
      deadline: "",
      status: "paused"
    },
    {
      title: "E-commerce Site",
      description: "Online store with product catalog and shopping cart",
      progress: 15,
      tags: ["React", "Stripe", "Firebase"],
      deadline: "Aug 30",
      status: "active"
    }
  ];
  
  const filteredProjects = filter === "all" 
    ? dummyProjects 
    : dummyProjects.filter(project => project.status === filter);

  return (
    <div className="min-h-screen bg-lovable-gray-light/50">
      <Sidebar />
      <div className="pl-20 lg:pl-64 pt-6">
        <div className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">Your Projects</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lovable-purple focus:border-transparent"
                />
              </div>
              <Button 
                className="bg-lovable-purple hover:bg-lovable-purple-dark rounded-full flex items-center gap-2"
              >
                <PlusCircle className="w-5 h-5" />
                <span>New Project</span>
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  filter === "all" 
                    ? "bg-lovable-purple text-white" 
                    : "bg-lovable-gray-light text-gray-700 hover:bg-lovable-purple-light"
                }`}
                onClick={() => setFilter("all")}
              >
                All Projects
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  filter === "active" 
                    ? "bg-lovable-purple text-white" 
                    : "bg-lovable-gray-light text-gray-700 hover:bg-lovable-purple-light"
                }`}
                onClick={() => setFilter("active")}
              >
                Active
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  filter === "paused" 
                    ? "bg-lovable-purple text-white" 
                    : "bg-lovable-gray-light text-gray-700 hover:bg-lovable-purple-light"
                }`}
                onClick={() => setFilter("paused")}
              >
                Paused
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  filter === "completed" 
                    ? "bg-lovable-purple text-white" 
                    : "bg-lovable-gray-light text-gray-700 hover:bg-lovable-purple-light"
                }`}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  description={project.description}
                  progress={project.progress}
                  tags={project.tags}
                  deadline={project.deadline}
                />
              ))}
            </div>
            
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl font-medium text-gray-500">No projects found</p>
                <p className="text-gray-400">Try a different filter or create a new project</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
