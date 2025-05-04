
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { useAuth } from "@/hooks/useAuth";
import { GoogleOAuthProvider } from '@react-oauth/google';

const Index = () => {
  const [activeTab, setActiveTab] = useState("login");
  const { isAuthenticated, loading } = useAuth();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lovable-purple"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Background gradients */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse-gentle"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse-gentle delay-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-tssk-teal/5 rounded-full blur-3xl animate-pulse-gentle delay-1000"></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TjAgMGgzMHYzMEgweiIgZmlsbD0iI2ZmZmZmZjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        </div>

        <div className="md:grid md:grid-cols-2 max-w-6xl w-full z-10">
          <div className="hidden md:flex flex-col items-center justify-center p-10 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-l-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-tssk-teal/20 to-purple-600/20"></div>
            
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-lg"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 border border-white/10 rounded-full"></div>
              <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white/20 rounded-lg transform rotate-45"></div>
            </div>
            
            <div className="relative z-10 text-center">
              <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-tssk-teal via-blue-400 to-purple-400">Task Manager</h1>
              <p className="text-lg mb-8 text-center text-white/80 max-w-md">
                Organize your work, track your progress, and achieve your goals with our powerful task management system.
              </p>
              
              <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                <div className="group bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-tssk-teal to-blue-400 mb-3 p-2 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg text-white group-hover:text-tssk-teal-light transition-colors">Project Tracking</h3>
                  <p className="text-sm mt-2 text-white/70">Manage projects with ease</p>
                </div>
                
                <div className="group bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 mb-3 p-2 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg text-white group-hover:text-purple-300 transition-colors">Time Management</h3>
                  <p className="text-sm mt-2 text-white/70">Track your time efficiently</p>
                </div>
                
                <div className="group bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 mb-3 p-2 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg text-white group-hover:text-blue-300 transition-colors">Daily Logging</h3>
                  <p className="text-sm mt-2 text-white/70">Record your daily activity</p>
                </div>
                
                <div className="group bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-tssk-amber to-red-400 mb-3 p-2 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg text-white group-hover:text-red-300 transition-colors">Achievement Tracking</h3>
                  <p className="text-sm mt-2 text-white/70">Celebrate your milestones</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl md:rounded-l-none md:rounded-r-2xl relative overflow-hidden">
            <div className="mb-8 relative z-10">
              <h2 className="text-2xl font-bold text-white">Welcome</h2>
              <p className="text-slate-400">Please enter your details</p>
            </div>
            
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="relative z-10">
              <TabsList className="grid grid-cols-2 mb-8 bg-white/10">
                <TabsTrigger 
                  value="login" 
                  className="data-[state=active]:bg-tssk-teal data-[state=active]:text-black"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger 
                  value="register"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  Register
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <LoginForm />
                <p className="text-center mt-6 text-sm text-slate-400">
                  Don't have an account?{" "}
                  <button 
                    onClick={() => setActiveTab("register")}
                    className="text-tssk-teal font-medium hover:text-tssk-teal-light hover:underline transition-colors"
                  >
                    Create an account
                  </button>
                </p>
              </TabsContent>
              
              <TabsContent value="register">
                <RegisterForm />
                <p className="text-center mt-6 text-sm text-slate-400">
                  Already have an account?{" "}
                  <button
                    onClick={() => setActiveTab("login")}
                    className="text-purple-500 font-medium hover:text-purple-400 hover:underline transition-colors"
                  >
                    Sign in
                  </button>
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Index;
