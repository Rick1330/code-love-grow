
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Award, Calendar, ChevronLeft, ChevronRight, Home, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { path: '/projects', label: 'Projects', icon: <Activity className="w-5 h-5" /> },
    { path: '/tracker', label: 'Tracker', icon: <Calendar className="w-5 h-5" /> },
    { path: '/achievements', label: 'Achievements', icon: <Award className="w-5 h-5" /> },
    { path: '/settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div 
      className={cn(
        "h-screen fixed top-0 left-0 bg-white shadow-md transition-all duration-300 z-40 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-lovable-purple flex items-center justify-center">
              <span className="text-white text-lg font-bold">L</span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-lovable-purple to-lovable-purple-dark bg-clip-text text-transparent">
              lovable.dev
            </span>
          </Link>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-full bg-lovable-purple flex items-center justify-center mx-auto">
            <span className="text-white text-lg font-bold">L</span>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="p-2 rounded-full hover:bg-lovable-gray-light transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-colors",
                  location.pathname === item.path 
                    ? "bg-lovable-purple-light text-lovable-purple" 
                    : "hover:bg-lovable-gray-light"
                )}
              >
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        <div className={cn(
          "flex items-center gap-3 p-3 rounded-lg bg-lovable-purple-light",
          collapsed ? "justify-center" : ""
        )}>
          <div className="h-8 w-8 rounded-full bg-lovable-purple flex items-center justify-center">
            <span className="text-white text-sm font-bold">U</span>
          </div>
          {!collapsed && <span className="font-medium">User Name</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
