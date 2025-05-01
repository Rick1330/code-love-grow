
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  return (
    <div className="min-h-screen bg-lovable-gray-light/50">
      <Sidebar />
      <div className="pl-20 lg:pl-64 pt-6">
        <div className="p-6 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-8">Settings</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Profile Section */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-6">Your Profile</h2>
                
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-lovable-purple flex items-center justify-center mb-4">
                      <span className="text-white text-2xl font-bold">U</span>
                    </div>
                    <Button variant="outline" className="w-full">Change Avatar</Button>
                  </div>
                  
                  <div className="md:w-2/3 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Your first name" defaultValue="User" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Your last name" defaultValue="Name" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Your email" defaultValue="user@example.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        placeholder="Tell us about yourself" 
                        defaultValue="Passionate developer working on improving my skills every day."
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Notification Preferences */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-6">Notification Preferences</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Daily Reminders</p>
                      <p className="text-sm text-gray-500">Get reminded to log your coding progress</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Achievement Notifications</p>
                      <p className="text-sm text-gray-500">Be notified when you earn new badges</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weekly Summaries</p>
                      <p className="text-sm text-gray-500">Receive a weekly email of your progress</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Tips & Motivation</p>
                      <p className="text-sm text-gray-500">Get occasional tips to improve your coding</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              {/* Theme Section */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-6">Display Settings</h2>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="font-medium">Theme Mode</p>
                    <div className="flex items-center gap-4">
                      <Button
                        variant={!isDarkMode ? "default" : "outline"}
                        className={`flex-1 ${!isDarkMode ? 'bg-lovable-purple hover:bg-lovable-purple-dark' : ''}`}
                        onClick={() => setIsDarkMode(false)}
                      >
                        <Sun className="w-5 h-5 mr-2" />
                        Light
                      </Button>
                      
                      <Button
                        variant={isDarkMode ? "default" : "outline"}
                        className={`flex-1 ${isDarkMode ? 'bg-lovable-purple hover:bg-lovable-purple-dark' : ''}`}
                        onClick={() => setIsDarkMode(true)}
                      >
                        <Moon className="w-5 h-5 mr-2" />
                        Dark
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="font-medium">Color Theme</p>
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-full bg-lovable-purple border-2 border-white ring-2 ring-lovable-purple cursor-pointer" />
                      <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white cursor-pointer" />
                      <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white cursor-pointer" />
                      <div className="w-8 h-8 rounded-full bg-orange-500 border-2 border-white cursor-pointer" />
                      <div className="w-8 h-8 rounded-full bg-pink-500 border-2 border-white cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Account Section */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Account Settings</h2>
                
                <div className="space-y-4">
                  <Button variant="outline" className="w-full">Change Password</Button>
                  <Button variant="outline" className="w-full">Connect GitHub</Button>
                  <Button variant="outline" className="w-full text-red-500 hover:bg-red-50">Delete Account</Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <Button className="bg-lovable-purple hover:bg-lovable-purple-dark rounded-full px-8">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
