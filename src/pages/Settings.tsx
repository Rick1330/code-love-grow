
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/sonner";
import Sidebar from "@/components/layout/Sidebar";

const Settings = () => {
  const [loading, setLoading] = useState(false);
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Profile settings saved successfully");
    }, 1000);
  };
  
  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Notification preferences updated");
    }, 1000);
  };
  
  const handleSaveAppearance = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Appearance settings saved");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 pl-64 pt-16">
        <div className="container py-8 px-4 max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Settings</h1>
              <p className="text-slate-500">Manage your account preferences and application settings</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid grid-cols-3 max-w-md mb-6">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-800 mb-1">Personal Information</h2>
                  <p className="text-slate-500 text-sm mb-4">Update your personal details and information</p>
                  <Separator className="mb-6" />
                  
                  <form onSubmit={handleSaveProfile} className="max-w-xl">
                    <div className="grid grid-cols-1 gap-4 mb-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <Label htmlFor="firstName" className="text-sm font-medium text-slate-700 mb-1.5 block">First Name</Label>
                          <Input 
                            id="firstName" 
                            defaultValue="Alex" 
                            className="rounded-lg border-slate-200"
                          />
                        </div>
                        <div className="flex-1">
                          <Label htmlFor="lastName" className="text-sm font-medium text-slate-700 mb-1.5 block">Last Name</Label>
                          <Input 
                            id="lastName" 
                            defaultValue="Morgan" 
                            className="rounded-lg border-slate-200"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium text-slate-700 mb-1.5 block">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          defaultValue="alex.morgan@example.com"
                          className="rounded-lg border-slate-200" 
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="username" className="text-sm font-medium text-slate-700 mb-1.5 block">Username</Label>
                        <Input 
                          id="username" 
                          defaultValue="alexmorgan"
                          className="rounded-lg border-slate-200" 
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="bg-tssk-teal hover:bg-tssk-teal-dark"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </div>
                
                <div className="pt-4">
                  <h2 className="text-xl font-semibold text-slate-800 mb-1">Password</h2>
                  <p className="text-slate-500 text-sm mb-4">Update your password regularly to keep your account secure</p>
                  <Separator className="mb-6" />
                  
                  <form className="max-w-xl space-y-4">
                    <div>
                      <Label htmlFor="currentPassword" className="text-sm font-medium text-slate-700 mb-1.5 block">Current Password</Label>
                      <Input 
                        id="currentPassword" 
                        type="password"
                        className="rounded-lg border-slate-200" 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="newPassword" className="text-sm font-medium text-slate-700 mb-1.5 block">New Password</Label>
                      <Input 
                        id="newPassword" 
                        type="password"
                        className="rounded-lg border-slate-200" 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700 mb-1.5 block">Confirm New Password</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password"
                        className="rounded-lg border-slate-200" 
                      />
                    </div>
                    
                    <Button className="mt-2 bg-tssk-teal hover:bg-tssk-teal-dark">
                      Update Password
                    </Button>
                  </form>
                </div>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-800 mb-1">Notification Preferences</h2>
                  <p className="text-slate-500 text-sm mb-4">Configure how you receive notifications and alerts</p>
                  <Separator className="mb-6" />
                  
                  <form onSubmit={handleSaveNotifications} className="max-w-xl">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-notifications" className="font-medium text-slate-700">Email Notifications</Label>
                          <p className="text-xs text-slate-500">Receive notifications via email</p>
                        </div>
                        <Switch id="email-notifications" defaultChecked />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-notifications" className="font-medium text-slate-700">Push Notifications</Label>
                          <p className="text-xs text-slate-500">Receive notifications in-app</p>
                        </div>
                        <Switch id="push-notifications" defaultChecked />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="task-reminders" className="font-medium text-slate-700">Task Reminders</Label>
                          <p className="text-xs text-slate-500">Get reminders for upcoming tasks</p>
                        </div>
                        <Switch id="task-reminders" />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="project-updates" className="font-medium text-slate-700">Project Updates</Label>
                          <p className="text-xs text-slate-500">Receive updates on project progress</p>
                        </div>
                        <Switch id="project-updates" defaultChecked />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit"
                      className="mt-6 bg-tssk-teal hover:bg-tssk-teal-dark"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Preferences"}
                    </Button>
                  </form>
                </div>
              </TabsContent>
              
              <TabsContent value="appearance" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-800 mb-1">Appearance Settings</h2>
                  <p className="text-slate-500 text-sm mb-4">Customize how the application looks and feels</p>
                  <Separator className="mb-6" />
                  
                  <form onSubmit={handleSaveAppearance} className="max-w-xl">
                    <div className="space-y-6">
                      <div>
                        <Label className="text-sm font-medium text-slate-700 mb-3 block">Color Theme</Label>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="border border-slate-200 rounded-lg p-3 flex flex-col items-center cursor-pointer bg-white">
                            <div className="w-full h-8 bg-tssk-teal rounded-md mb-2"></div>
                            <span className="text-sm font-medium">Default</span>
                          </div>
                          <div className="border border-slate-200 rounded-lg p-3 flex flex-col items-center cursor-pointer bg-white">
                            <div className="w-full h-8 bg-tssk-indigo rounded-md mb-2"></div>
                            <span className="text-sm font-medium">Indigo</span>
                          </div>
                          <div className="border border-slate-200 rounded-lg p-3 flex flex-col items-center cursor-pointer bg-white">
                            <div className="w-full h-8 bg-tssk-amber rounded-md mb-2"></div>
                            <span className="text-sm font-medium">Amber</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-slate-700 mb-3 block">Display Mode</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="border border-tssk-teal rounded-lg p-3 flex flex-col items-center cursor-pointer bg-white">
                            <div className="w-full h-8 bg-white border border-slate-200 rounded-md mb-2"></div>
                            <span className="text-sm font-medium text-tssk-teal">Light</span>
                          </div>
                          <div className="border border-slate-200 rounded-lg p-3 flex flex-col items-center cursor-pointer bg-white">
                            <div className="w-full h-8 bg-slate-800 rounded-md mb-2"></div>
                            <span className="text-sm font-medium">Dark</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-slate-700 mb-3 block">Sidebar Position</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="border border-tssk-teal rounded-lg p-3 flex flex-col items-center cursor-pointer bg-white">
                            <div className="w-full h-8 rounded-md mb-2 flex">
                              <div className="w-1/4 bg-slate-200 rounded-l-md"></div>
                              <div className="w-3/4 bg-white border-t border-r border-b border-slate-200 rounded-r-md"></div>
                            </div>
                            <span className="text-sm font-medium text-tssk-teal">Left</span>
                          </div>
                          <div className="border border-slate-200 rounded-lg p-3 flex flex-col items-center cursor-pointer bg-white">
                            <div className="w-full h-8 rounded-md mb-2 flex">
                              <div className="w-3/4 bg-white border-t border-l border-b border-slate-200 rounded-l-md"></div>
                              <div className="w-1/4 bg-slate-200 rounded-r-md"></div>
                            </div>
                            <span className="text-sm font-medium">Right</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit"
                      className="mt-6 bg-tssk-teal hover:bg-tssk-teal-dark"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Appearance"}
                    </Button>
                  </form>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
