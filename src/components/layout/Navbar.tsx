
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md py-4 px-6 md:px-12 fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-lovable-purple flex items-center justify-center">
            <span className="text-white text-lg font-bold">L</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-lovable-purple to-lovable-purple-dark bg-clip-text text-transparent">
            lovable.dev
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="font-medium hover:text-lovable-purple transition-colors">
            Home
          </Link>
          <Link to="/dashboard" className="font-medium hover:text-lovable-purple transition-colors">
            Dashboard
          </Link>
          <Link to="/projects" className="font-medium hover:text-lovable-purple transition-colors">
            Projects
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" className="rounded-full">Log In</Button>
          <Button className="bg-lovable-purple hover:bg-lovable-purple-dark rounded-full">Get Started Free</Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-gray-600" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-6 flex flex-col gap-4">
          <Link 
            to="/" 
            className="font-medium hover:text-lovable-purple transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className="font-medium hover:text-lovable-purple transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            to="/projects" 
            className="font-medium hover:text-lovable-purple transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </Link>
          <div className="flex flex-col gap-3 pt-3 border-t">
            <Button variant="outline" className="rounded-full w-full">Log In</Button>
            <Button className="bg-lovable-purple hover:bg-lovable-purple-dark rounded-full w-full">Get Started Free</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
