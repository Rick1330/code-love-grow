
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [activeTab, setActiveTab] = useState("login");
  const { isAuthenticated, loading } = useAuth();

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
    <div className="min-h-screen flex items-center justify-center bg-white md:bg-lovable-gray-light/50">
      <div className="md:grid md:grid-cols-2 max-w-6xl w-full">
        <div className="hidden md:flex flex-col items-center justify-center p-10 bg-gradient-to-br from-lovable-purple to-lovable-purple/80 text-white rounded-l-xl">
          <h1 className="text-4xl font-bold mb-6">Task Manager</h1>
          <p className="text-lg mb-8 text-center">
            Organize your work, track your progress, and achieve your goals with our powerful task management system.
          </p>
          <div className="grid grid-cols-2 gap-6 w-full max-w-md">
            <div className="bg-white/10 p-5 rounded-lg hover:bg-white/20 transition-colors duration-300">
              <h3 className="font-semibold text-lg">Project Tracking</h3>
              <p className="text-sm mt-2 text-white/80">Manage projects with ease</p>
            </div>
            <div className="bg-white/10 p-5 rounded-lg hover:bg-white/20 transition-colors duration-300">
              <h3 className="font-semibold text-lg">Time Management</h3>
              <p className="text-sm mt-2 text-white/80">Track your time efficiently</p>
            </div>
            <div className="bg-white/10 p-5 rounded-lg hover:bg-white/20 transition-colors duration-300">
              <h3 className="font-semibold text-lg">Daily Logging</h3>
              <p className="text-sm mt-2 text-white/80">Record your daily activity</p>
            </div>
            <div className="bg-white/10 p-5 rounded-lg hover:bg-white/20 transition-colors duration-300">
              <h3 className="font-semibold text-lg">Achievement Tracking</h3>
              <p className="text-sm mt-2 text-white/80">Celebrate your milestones</p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-10 bg-white rounded-xl md:rounded-l-none md:rounded-r-xl md:shadow-xl">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Welcome back</h2>
          <p className="text-gray-500 mb-8">Please enter your details</p>
          
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
              <p className="text-center mt-6 text-sm text-gray-500">
                Don't have an account?{" "}
                <button 
                  onClick={() => setActiveTab("register")}
                  className="text-lovable-purple font-medium hover:underline"
                >
                  Create an account
                </button>
              </p>
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
              <p className="text-center mt-6 text-sm text-gray-500">
                Already have an account?{" "}
                <button
                  onClick={() => setActiveTab("login")}
                  className="text-lovable-purple font-medium hover:underline"
                >
                  Sign in
                </button>
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Index;
