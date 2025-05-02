
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Search, Bell, User, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import NotificationDropdown from "../notifications/NotificationDropdown";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="bg-white/80 backdrop-blur-md py-3 px-4 md:px-8 fixed top-0 left-0 right-0 z-50 shadow-sm border-b border-slate-200">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-lovable-purple flex items-center justify-center">
            <span className="text-white text-lg font-bold">T</span>
          </div>
          <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-lovable-purple to-lovable-purple-dark">
            Task Manager
          </span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center max-w-sm w-full mx-4 relative">
          <Search className="absolute left-3 text-slate-400 w-4 h-4" />
          <Input 
            className="pl-9 py-2 h-9 bg-slate-50 border-slate-200 focus:bg-white transition-all"
            placeholder="Search tasks, projects..." 
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/dashboard" 
            className={`text-slate-600 hover:text-lovable-purple font-medium transition-colors ${
              location.pathname === '/dashboard' ? 'text-lovable-purple' : ''
            }`}
          >
            Dashboard
          </Link>
          <Link 
            to="/projects" 
            className={`text-slate-600 hover:text-lovable-purple font-medium transition-colors ${
              location.pathname === '/projects' ? 'text-lovable-purple' : ''
            }`}
          >
            Projects
          </Link>
          <Link 
            to="/tasks" 
            className={`text-slate-600 hover:text-lovable-purple font-medium transition-colors ${
              location.pathname === '/tasks' ? 'text-lovable-purple' : ''
            }`}
          >
            Tasks
          </Link>
          <Link 
            to="/tracker" 
            className={`text-slate-600 hover:text-lovable-purple font-medium transition-colors ${
              location.pathname === '/tracker' ? 'text-lovable-purple' : ''
            }`}
          >
            Tracker
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <NotificationDropdown />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-full hover:bg-slate-100 text-slate-600">
                <User className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white z-50">
              <div className="p-2 text-center">
                <p className="font-medium">John Doe</p>
                <p className="text-xs text-slate-500">john.doe@example.com</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500 cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="bg-lovable-purple hover:bg-lovable-purple-dark rounded-lg">
                <Plus className="w-4 h-4 mr-1" /> New Task
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white z-50">
              <DropdownMenuItem onClick={() => navigate('/tasks/new')} className="cursor-pointer">
                New Task
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/projects/new')} className="cursor-pointer">
                New Project
              </DropdownMenuItem>
              <DropdownMenuItem>
                Quick Time Entry
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-slate-600" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-6 flex flex-col gap-4 border-b border-slate-200 animate-fade-in z-40">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
            <Input 
              className="pl-9 py-2 bg-slate-50 border-slate-200"
              placeholder="Search..." 
            />
          </div>
          
          <Link 
            to="/dashboard" 
            className={`font-medium hover:text-lovable-purple transition-colors py-2 border-b border-slate-100 ${
              location.pathname === '/dashboard' ? 'text-lovable-purple' : 'text-slate-700'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            to="/projects" 
            className={`font-medium hover:text-lovable-purple transition-colors py-2 border-b border-slate-100 ${
              location.pathname === '/projects' ? 'text-lovable-purple' : 'text-slate-700'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </Link>
          <Link 
            to="/tasks" 
            className={`font-medium hover:text-lovable-purple transition-colors py-2 border-b border-slate-100 ${
              location.pathname === '/tasks' ? 'text-lovable-purple' : 'text-slate-700'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Tasks
          </Link>
          <Link 
            to="/tracker" 
            className={`font-medium hover:text-lovable-purple transition-colors py-2 border-b border-slate-100 ${
              location.pathname === '/tracker' ? 'text-lovable-purple' : 'text-slate-700'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Time Tracker
          </Link>
          <Link 
            to="/settings" 
            className={`font-medium hover:text-lovable-purple transition-colors py-2 border-b border-slate-100 ${
              location.pathname === '/settings' ? 'text-lovable-purple' : 'text-slate-700'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Settings
          </Link>
          
          <div className="flex justify-between pt-3">
            <Button variant="outline" size="sm" className="rounded-lg w-[48%] border-slate-200"
              onClick={() => {
                navigate('/profile');
                setIsMenuOpen(false);
              }}
            >
              Profile
            </Button>
            <Button className="bg-lovable-purple hover:bg-lovable-purple-dark rounded-lg w-[48%]"
              onClick={() => {
                navigate('/tasks/new');
                setIsMenuOpen(false);
              }}
            >
              New Task
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
