
import { Button } from "@/components/ui/button";
import StreakDisplay from "@/components/ui/custom/StreakDisplay";
import ProjectCard from "@/components/ui/custom/ProjectCard";
import { Calendar, Clock, Code, Coffee } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  
  const dummyProjects = [
    {
      title: "Personal Portfolio",
      description: "Redesigning my developer portfolio with React and Tailwind",
      progress: 65,
      tags: ["React", "Tailwind"],
      deadline: "Jun 15"
    },
    {
      title: "Recipe App",
      description: "Mobile app to store and share family recipes",
      progress: 30,
      tags: ["React Native", "Firebase"],
      deadline: "Jul 22"
    },
    {
      title: "Blog Platform",
      description: "Creating a blog platform with authentication and comments",
      progress: 85,
      tags: ["Next.js", "MongoDB"],
      deadline: "May 10"
    }
  ];

  return (
    <div className="pl-20 lg:pl-64 pt-16">
      <div className="p-6 md:p-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Welcome, Developer! 👋</h1>
          <Button 
            className="bg-lovable-purple hover:bg-lovable-purple-dark rounded-full"
            onClick={() => navigate('/projects/new')}
          >
            Add New Project
          </Button>
        </div>

        {/* Today's Snapshot */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Today's Snapshot</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-lovable-purple-light rounded-lg p-4 flex items-center gap-4">
              <div className="bg-white rounded-full p-3">
                <Clock className="w-6 h-6 text-lovable-purple" />
              </div>
              <div>
                <p className="text-sm">Coded Today</p>
                <p className="text-xl font-bold">2.5 hrs</p>
              </div>
            </div>
            
            <div className="bg-lovable-peach rounded-lg p-4 flex items-center gap-4">
              <div className="bg-white rounded-full p-3">
                <Code className="w-6 h-6 text-lovable-purple" />
              </div>
              <div>
                <p className="text-sm">Current Project</p>
                <p className="text-xl font-bold">Portfolio</p>
              </div>
            </div>
            
            <div className="bg-lovable-blue rounded-lg p-4 flex items-center gap-4">
              <div className="bg-white rounded-full p-3">
                <Coffee className="w-6 h-6 text-lovable-purple" />
              </div>
              <div>
                <p className="text-sm">Mood Check-in</p>
                <p className="text-xl font-bold">Productive 🚀</p>
              </div>
            </div>
            
            <div className="bg-lovable-gray-light rounded-lg p-4 flex items-center gap-4">
              <div className="bg-white rounded-full p-3">
                <Calendar className="w-6 h-6 text-lovable-purple" />
              </div>
              <div>
                <p className="text-sm">Next Goal</p>
                <p className="text-xl font-bold">React Components</p>
              </div>
            </div>
          </div>
        </div>

        {/* Streaks & Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 h-full">
              <h2 className="text-xl font-bold mb-4">Streaks & Achievements</h2>
              <div className="mb-8">
                <StreakDisplay days={5} />
              </div>
              <div className="bg-lovable-purple-light rounded-lg p-4 text-center">
                <p className="text-sm mb-2">Recent Achievement</p>
                <div className="bg-white rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-2">
                  <span className="text-2xl">🏆</span>
                </div>
                <p className="font-bold">Early Bird</p>
                <p className="text-sm text-gray-600">Coded before 9am for 3 days</p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Projects in Progress</h2>
                <Button 
                  variant="outline" 
                  className="text-sm rounded-full text-lovable-purple border-lovable-purple hover:bg-lovable-purple-light"
                  onClick={() => navigate('/projects')}
                >
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dummyProjects.slice(0, 2).map((project, index) => (
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
            </div>
          </div>
        </div>

        {/* Tips & Motivation */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Tips & Motivation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-lovable-peach rounded-lg p-4">
              <p className="text-lg font-medium mb-2">Take a Break! 🚶‍♂️</p>
              <p className="text-sm">Remember to take a 5-minute break and hydrate. Your brain needs rest to stay productive!</p>
            </div>
            
            <div className="bg-lovable-blue rounded-lg p-4">
              <p className="text-lg font-medium mb-2">Learning Tip 💡</p>
              <p className="text-sm">Try explaining a concept you're learning to someone else—it's one of the best ways to solidify your understanding.</p>
            </div>
            
            <div className="bg-lovable-purple-light rounded-lg p-4">
              <p className="text-lg font-medium mb-2">Quote of the Day 📝</p>
              <p className="text-sm italic">"The best way to predict the future is to implement it."</p>
              <p className="text-xs text-right mt-2">- Alan Kay</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
