
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface TeamMember {
  id: string;
  name: string;
  role: string;
}

interface ScheduleSlot {
  day: string;
  slots: {
    time: string;
    title: string;
    type: "task" | "meeting" | "break" | "unavailable";
    team?: string[];
  }[];
}

const Schedule = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const team: TeamMember[] = [
    { id: "user1", name: "John Doe", role: "Developer" },
    { id: "user2", name: "Sarah Miller", role: "Designer" },
    { id: "user3", name: "Mike Taylor", role: "Project Manager" },
    { id: "user4", name: "Emma Roberts", role: "QA Engineer" },
    { id: "user5", name: "Lisa King", role: "UX Designer" },
  ];
  
  const scheduleData: ScheduleSlot[] = [
    {
      day: "Monday",
      slots: [
        { time: "09:00 - 10:00", title: "Team Standup", type: "meeting", team: ["user1", "user2", "user3", "user4", "user5"] },
        { time: "10:00 - 12:00", title: "API Development", type: "task" },
        { time: "13:00 - 14:00", title: "Lunch Break", type: "break" },
        { time: "14:00 - 16:00", title: "Project Planning", type: "meeting", team: ["user1", "user3"] },
        { time: "16:00 - 17:30", title: "Bug Fixes", type: "task" }
      ]
    },
    {
      day: "Tuesday",
      slots: [
        { time: "09:00 - 09:30", title: "Quick Standup", type: "meeting", team: ["user1", "user2", "user3", "user4", "user5"] },
        { time: "09:30 - 11:30", title: "Frontend Development", type: "task" },
        { time: "11:30 - 12:30", title: "Design Review", type: "meeting", team: ["user1", "user2", "user5"] },
        { time: "13:30 - 16:00", title: "Feature Implementation", type: "task" },
        { time: "16:00 - 17:00", title: "Code Review", type: "meeting", team: ["user1", "user3", "user4"] }
      ]
    },
    {
      day: "Wednesday",
      slots: [
        { time: "09:00 - 10:00", title: "Team Standup", type: "meeting", team: ["user1", "user2", "user3", "user4", "user5"] },
        { time: "10:00 - 12:00", title: "Documentation", type: "task" },
        { time: "13:00 - 14:00", title: "Lunch Break", type: "break" },
        { time: "14:00 - 15:30", title: "Testing Session", type: "meeting", team: ["user1", "user4"] },
        { time: "15:30 - 17:30", title: "Bug Fixes", type: "task" }
      ]
    },
    {
      day: "Thursday",
      slots: [
        { time: "09:00 - 09:30", title: "Quick Standup", type: "meeting", team: ["user1", "user2", "user3", "user4", "user5"] },
        { time: "09:30 - 12:00", title: "Feature Development", type: "task" },
        { time: "13:00 - 14:00", title: "Lunch Break", type: "break" },
        { time: "14:00 - 15:00", title: "Client Demo Prep", type: "meeting", team: ["user1", "user3", "user5"] },
        { time: "15:00 - 17:30", title: "Integration Testing", type: "task" }
      ]
    },
    {
      day: "Friday",
      slots: [
        { time: "09:00 - 10:00", title: "Team Standup", type: "meeting", team: ["user1", "user2", "user3", "user4", "user5"] },
        { time: "10:00 - 11:00", title: "Weekly Review", type: "meeting", team: ["user1", "user2", "user3", "user4", "user5"] },
        { time: "11:00 - 13:00", title: "Planning Next Sprint", type: "meeting", team: ["user1", "user3"] },
        { time: "14:00 - 15:00", title: "Documentation", type: "task" },
        { time: "15:00 - 16:30", title: "Tech Talk", type: "meeting", team: ["user1", "user2", "user3", "user4", "user5"] }
      ]
    }
  ];
  
  const handleAddToSchedule = () => {
    toast({
      title: "Schedule Updated",
      description: "Your new schedule item has been added",
    });
    setIsDialogOpen(false);
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "task":
        return "bg-tssk-teal";
      case "meeting":
        return "bg-tssk-amber";
      case "break":
        return "bg-gray-400";
      case "unavailable":
        return "bg-tssk-rose";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="min-h-screen bg-lovable-gray-light/50">
      <Sidebar />
      <div className="pl-20 lg:pl-64 pt-6">
        <div className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Work Schedule</h1>
              <p className="text-gray-600 mt-1">
                Manage your team's schedule and availability
              </p>
            </div>
            <Button
              className="bg-tssk-teal hover:bg-tssk-teal-dark rounded-full flex items-center gap-2"
              onClick={() => setIsDialogOpen(true)}
            >
              <Clock className="w-5 h-5" />
              <span>Adjust Schedule</span>
            </Button>
          </div>

          <Tabs defaultValue="week" className="w-full">
            <TabsList className="grid w-full md:w-[400px] grid-cols-2">
              <TabsTrigger value="week">Weekly Schedule</TabsTrigger>
              <TabsTrigger value="team">Team Availability</TabsTrigger>
            </TabsList>
            
            <TabsContent value="week" className="mt-4">
              <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
                {scheduleData.map((day) => (
                  <Card key={day.day} className="overflow-hidden">
                    <CardHeader className="bg-tssk-teal/10 pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {day.day}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {day.slots.map((slot, index) => (
                          <div
                            key={index}
                            className="p-3 border rounded-lg bg-white hover:shadow-md transition-shadow"
                          >
                            <div className="text-xs text-gray-500 mb-1">
                              {slot.time}
                            </div>
                            <div className="font-medium text-sm mb-1">
                              {slot.title}
                            </div>
                            <div className="flex justify-between items-center">
                              <Badge className={getBadgeColor(slot.type)}>
                                {slot.type.charAt(0).toUpperCase() + slot.type.slice(1)}
                              </Badge>
                              
                              {slot.team && slot.team.length > 0 && (
                                <div className="flex -space-x-2">
                                  {slot.team.slice(0, 3).map((userId, i) => {
                                    const member = team.find(m => m.id === userId);
                                    return member ? (
                                      <Avatar
                                        key={i}
                                        className="h-6 w-6 border-2 border-white"
                                        title={member.name}
                                      >
                                        <AvatarFallback className="bg-tssk-teal text-white text-xs">
                                          {member.name.charAt(0)}
                                        </AvatarFallback>
                                      </Avatar>
                                    ) : null;
                                  })}
                                  {slot.team.length > 3 && (
                                    <Avatar className="h-6 w-6 border-2 border-white">
                                      <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                                        +{slot.team.length - 3}
                                      </AvatarFallback>
                                    </Avatar>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="team" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Team Member Availability</CardTitle>
                  <CardDescription>
                    See the availability of your team members for the current week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {team.map((member) => (
                      <div
                        key={member.id}
                        className="p-4 border rounded-lg bg-white flex flex-col md:flex-row gap-4 items-start md:items-center"
                      >
                        <div className="flex items-center gap-3 min-w-[200px]">
                          <Avatar>
                            <AvatarFallback className="bg-tssk-teal text-white">
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-gray-500">
                              {member.role}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1 grid grid-cols-5 gap-2 w-full">
                          {["M", "T", "W", "T", "F"].map((day, i) => {
                            // Simulate availability data
                            const isAvailable = Math.random() > 0.2;
                            return (
                              <div
                                key={i}
                                className={`h-10 rounded flex items-center justify-center text-sm ${
                                  isAvailable
                                    ? "bg-green-100 text-green-700 border border-green-200"
                                    : "bg-gray-100 text-gray-400 border border-gray-200"
                                }`}
                              >
                                {day}
                              </div>
                            );
                          })}
                        </div>
                        
                        <Button variant="outline" size="sm" className="shrink-0">
                          <User className="w-4 h-4 mr-1" /> Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Adjust Schedule Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adjust Work Schedule</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="day" className="text-sm font-medium mb-1 block">Day</label>
                <select id="day" className="w-full p-2 border rounded-md">
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                </select>
              </div>
              <div>
                <label htmlFor="type" className="text-sm font-medium mb-1 block">Type</label>
                <select id="type" className="w-full p-2 border rounded-md">
                  <option value="task">Task</option>
                  <option value="meeting">Meeting</option>
                  <option value="break">Break</option>
                  <option value="unavailable">Unavailable</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startTime" className="text-sm font-medium mb-1 block">Start Time</label>
                <input type="time" id="startTime" className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label htmlFor="endTime" className="text-sm font-medium mb-1 block">End Time</label>
                <input type="time" id="endTime" className="w-full p-2 border rounded-md" />
              </div>
            </div>
            <div>
              <label htmlFor="title" className="text-sm font-medium mb-1 block">Title</label>
              <input type="text" id="title" className="w-full p-2 border rounded-md" placeholder="Enter title" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Assign Team Members</label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {team.map((member) => (
                  <label key={member.id} className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" name="team" value={member.id} />
                    <span>{member.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddToSchedule}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Schedule;
