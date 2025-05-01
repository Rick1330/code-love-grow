
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import FeatureCard from "@/components/ui/custom/FeatureCard";
import { Award, Calendar, Clock, Smile } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 gradient-bg">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Fall in Love with Your <span className="text-lovable-purple">Code Journey.</span>
            </h1>
            <p className="text-xl mb-8 text-gray-700">
              Track your growth, celebrate wins, and stay inspired every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="bg-lovable-purple hover:bg-lovable-purple-dark rounded-full text-lg py-6 px-8">
                Get Started Free
              </Button>
              <Button variant="outline" className="rounded-full text-lg py-6 px-8 border-lovable-purple text-lovable-purple">
                Watch Demo
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-lovable-gray-light">
                <img
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                  alt="Developer dashboard"
                  className="rounded-xl mb-4"
                />
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">Your Coding Journey</h3>
                    <p className="text-sm text-gray-500">Keep track of your progress</p>
                  </div>
                  <div className="bg-lovable-purple-light text-lovable-purple p-2 rounded-lg">
                    <Calendar className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-lovable-peach p-4 rounded-xl shadow-lg animate-float">
                <div className="font-bold text-lovable-purple-dark">5 Day Streak! 🔥</div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-lovable-blue p-4 rounded-xl shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <div className="font-bold text-lovable-purple-dark">New Badge Earned! 🏆</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Preview Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Features You'll Love</h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Tools designed to keep you motivated and make your coding journey more enjoyable.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              title="Daily Tracker"
              description="Log your coding hours and build consistent habits that stick."
              icon={<Clock className="w-6 h-6 text-lovable-purple" />}
            />
            <FeatureCard
              title="Project Progress"
              description="Visualize your advancement and celebrate each milestone."
              icon={<Award className="w-6 h-6 text-lovable-purple" />}
            />
            <FeatureCard
              title="Personal Achievements"
              description="Earn badges and rewards as you improve your skills."
              icon={<Award className="w-6 h-6 text-lovable-purple" />}
            />
            <FeatureCard
              title="Mood & Motivation"
              description="Track how you feel and get personalized encouragement."
              icon={<Smile className="w-6 h-6 text-lovable-purple" />}
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-lovable-gray-light">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Lovable.dev?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <p className="italic mb-6 text-gray-600">
                "Lovable.dev has completely changed how I approach my side projects. The gamification keeps me motivated!"
              </p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-lovable-purple-light flex items-center justify-center">
                  <span className="font-bold text-lovable-purple">T</span>
                </div>
                <div>
                  <p className="font-bold">Taylor M.</p>
                  <p className="text-sm text-gray-500">Full Stack Developer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <p className="italic mb-6 text-gray-600">
                "The streaks feature has helped me code consistently for over 30 days now. I've never been so productive!"
              </p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-lovable-purple-light flex items-center justify-center">
                  <span className="font-bold text-lovable-purple">A</span>
                </div>
                <div>
                  <p className="font-bold">Alex R.</p>
                  <p className="text-sm text-gray-500">Frontend Developer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <p className="italic mb-6 text-gray-600">
                "As a self-taught developer, seeing my progress visually has been incredibly motivating. Love this tool!"
              </p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-lovable-purple-light flex items-center justify-center">
                  <span className="font-bold text-lovable-purple">J</span>
                </div>
                <div>
                  <p className="font-bold">Jordan K.</p>
                  <p className="text-sm text-gray-500">React Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 bg-lovable-purple text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to love your dev life?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of developers who've transformed their coding journey with Lovable.dev
          </p>
          <Button className="bg-white text-lovable-purple hover:bg-lovable-gray-light rounded-full text-lg py-6 px-8">
            Start Your Journey Now
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-6 bg-white border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-lovable-purple flex items-center justify-center">
                  <span className="text-white text-lg font-bold">L</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-lovable-purple to-lovable-purple-dark bg-clip-text text-transparent">
                  lovable.dev
                </span>
              </Link>
              <p className="text-gray-600 mt-2">Fall in love with your code journey</p>
            </div>
            <div className="flex flex-wrap gap-8">
              <div>
                <h4 className="font-bold mb-3">Product</h4>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-600 hover:text-lovable-purple">Features</Link></li>
                  <li><Link to="/" className="text-gray-600 hover:text-lovable-purple">Pricing</Link></li>
                  <li><Link to="/" className="text-gray-600 hover:text-lovable-purple">FAQ</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-3">Company</h4>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-600 hover:text-lovable-purple">About</Link></li>
                  <li><Link to="/" className="text-gray-600 hover:text-lovable-purple">Blog</Link></li>
                  <li><Link to="/" className="text-gray-600 hover:text-lovable-purple">Careers</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-3">Resources</h4>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-600 hover:text-lovable-purple">Community</Link></li>
                  <li><Link to="/" className="text-gray-600 hover:text-lovable-purple">Support</Link></li>
                  <li><Link to="/" className="text-gray-600 hover:text-lovable-purple">Contact</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t text-center">
            <p className="text-gray-600">© 2025 Lovable.dev. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
