
import React from "react";
import {
  Home,
  BarChart,
  Folder,
  Calendar,
  Settings,
  Award,
  LogOut,
  Check,
  User,
  Bell
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import NotificationDropdown from "../notifications/NotificationDropdown";

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    { href: "/dashboard", icon: Home, text: "Dashboard" },
    { href: "/projects", icon: Folder, text: "Projects" },
    { href: "/tasks", icon: Check, text: "Tasks" },
    { href: "/tracker", icon: BarChart, text: "Tracker" },
    { href: "/schedule", icon: Calendar, text: "Schedule" },
    { href: "/achievements", icon: Award, text: "Achievements" },
    { href: "/settings", icon: Settings, text: "Settings" },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-20 lg:w-64 bg-lovable-gray-dark text-white flex flex-col">
      <div className="p-4 lg:p-6 border-b border-lovable-gray-mid/20">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold hidden lg:block">Task Manager</span>
          <span className="text-xl font-bold lg:hidden">TM</span>
        </Link>
      </div>
      
      <nav className="flex-1 py-6">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={`flex items-center px-4 lg:px-6 py-3 hover:bg-lovable-purple-dark/20 transition-colors ${
                  path === item.href
                    ? "bg-lovable-purple-dark/30 text-lovable-purple-light border-r-4 border-lovable-purple"
                    : ""
                }`}
              >
                <item.icon className="w-6 h-6 lg:mr-3" />
                <span className="hidden lg:block">{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-lovable-gray-mid/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <User className="w-6 h-6 lg:mr-3" />
            <span className="hidden lg:block">John Doe</span>
          </div>
          <div className="flex items-center gap-3">
            <NotificationDropdown />
            <LogOut className="w-5 h-5 cursor-pointer" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
