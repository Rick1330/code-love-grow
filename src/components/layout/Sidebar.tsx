
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home, LayoutDashboard, Calendar, Award, Cog, ListChecks, FileText, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: '/projects', label: 'Projects', icon: <FileText className="w-5 h-5" /> },
    { path: '/tracker', label: 'Time Tracker', icon: <Calendar className="w-5 h-5" /> },
    { path: '/tasks', label: 'Tasks', icon: <ListChecks className="w-5 h-5" /> },
    { path: '/achievements', label: 'Achievements', icon: <Award className="w-5 h-5" /> },
    { path: '/settings', label: 'Settings', icon: <Cog className="w-5 h-5" /> },
  ];

  return (
    <div 
      className={cn(
        "h-screen fixed top-0 left-0 bg-white dark:bg-gray-900 shadow-sm transition-all duration-300 z-40 flex flex-col border-r border-slate-200 dark:border-slate-800",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-tssk-teal flex items-center justify-center">
              <span className="text-white text-lg font-bold">T</span>
            </div>
            <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-tssk-teal to-tssk-teal-dark">
              tssk.
            </span>
          </Link>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-md bg-tssk-teal flex items-center justify-center mx-auto">
            <span className="text-white text-lg font-bold">T</span>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
      
      <nav className="flex-1 p-3 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path}
                className={cn(
                  "flex items-center gap-3 p-2.5 rounded-lg transition-colors",
                  location.pathname === item.path 
                    ? "bg-tssk-teal/10 text-tssk-teal" 
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                {item.icon}
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        <div className={cn(
          "flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800",
          collapsed ? "justify-center" : ""
        )}>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-tssk-teal to-tssk-teal-dark flex items-center justify-center">
            <span className="text-white text-sm font-bold">U</span>
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-medium">Alex Morgan</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Developer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
