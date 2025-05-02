
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  return (
    <div className="pl-20 lg:pl-64 pt-16">
      <div className="p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">User Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">John Doe</h2>
                  <p className="text-gray-500 mb-4">Developer</p>
                  
                  <Button className="w-full mb-4">Edit Profile</Button>
                  
                  <div className="w-full">
                    <Separator className="my-4" />
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500">Email</span>
                      <span>john.doe@example.com</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500">Joined</span>
                      <span>March 2023</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500">Role</span>
                      <span>Team Lead</span>
                    </div>
                    <Separator className="my-4" />
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Badge variant="outline">React</Badge>
                      <Badge variant="outline">TypeScript</Badge>
                      <Badge variant="outline">UI/UX</Badge>
                      <Badge variant="outline">Project Management</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="activity">
              <TabsList className="mb-6">
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-2 border-lovable-purple pl-4 pb-6 relative">
                        <div className="absolute w-3 h-3 bg-lovable-purple rounded-full -left-[7px]"></div>
                        <p className="text-sm text-gray-500">Today</p>
                        <p>Completed task "Update dashboard UI"</p>
                      </div>
                      
                      <div className="border-l-2 border-lovable-gray-mid pl-4 pb-6 relative">
                        <div className="absolute w-3 h-3 bg-lovable-gray-mid rounded-full -left-[7px]"></div>
                        <p className="text-sm text-gray-500">Yesterday</p>
                        <p>Added comments to task "Implement authentication"</p>
                      </div>
                      
                      <div className="border-l-2 border-lovable-gray-mid pl-4 pb-6 relative">
                        <div className="absolute w-3 h-3 bg-lovable-gray-mid rounded-full -left-[7px]"></div>
                        <p className="text-sm text-gray-500">3 days ago</p>
                        <p>Created new project "Task Manager Redesign"</p>
                      </div>
                      
                      <div className="border-l-2 border-lovable-gray-mid pl-4 relative">
                        <div className="absolute w-3 h-3 bg-lovable-gray-mid rounded-full -left-[7px]"></div>
                        <p className="text-sm text-gray-500">1 week ago</p>
                        <p>Completed 5-day coding streak</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="projects">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Your projects will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="tasks">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Your assigned tasks will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Profile settings will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
