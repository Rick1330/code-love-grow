
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
        <div className="hidden md:flex flex-col items-center justify-center p-10 bg-lovable-purple text-white rounded-l-xl">
          <h1 className="text-3xl font-bold mb-6">Task Manager</h1>
          <p className="text-lg mb-6 text-center">
            Organize your work, track your progress, and achieve your goals with our powerful task management system.
          </p>
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold">Project Tracking</h3>
              <p className="text-sm mt-1">Manage projects with ease</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold">Time Management</h3>
              <p className="text-sm mt-1">Track your time efficiently</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold">Daily Logging</h3>
              <p className="text-sm mt-1">Record your daily activity</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold">Achievement Tracking</h3>
              <p className="text-sm mt-1">Celebrate your milestones</p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-10 bg-white rounded-r-xl md:shadow-md">
          <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
          <p className="text-gray-500 mb-6">Please enter your details</p>
          
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
              <p className="text-center mt-4 text-sm text-gray-500">
                Don't have an account?{" "}
                <button 
                  onClick={() => setActiveTab("register")}
                  className="text-lovable-purple hover:underline"
                >
                  Create an account
                </button>
              </p>
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
              <p className="text-center mt-4 text-sm text-gray-500">
                Already have an account?{" "}
                <button
                  onClick={() => setActiveTab("login")}
                  className="text-lovable-purple hover:underline"
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
};

export default Index;
