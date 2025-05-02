
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Plus, ArrowUpDown, Search, X, Calendar, Users, AlertTriangle, Bell, Clock } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Task {
  id: string;
  title: string;
  project: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  assignedTo: string[];
  issueCount?: number;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

const Tasks = () => {
  // Mock data - would come from API in real implementation
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Create API documentation',
      project: 'tssk-manager',
      dueDate: '2025-05-10',
      priority: 'high',
      status: 'in_progress',
      assignedTo: ['user1']
    },
    {
      id: '2',
      title: 'Implement user authentication',
      project: 'tssk-manager',
      dueDate: '2025-05-15',
      priority: 'high',
      status: 'pending',
      assignedTo: ['user2'],
      issueCount: 2
    },
    {
      id: '3',
      title: 'Design landing page',
      project: 'Portfolio Site',
      dueDate: '2025-05-20',
      priority: 'medium',
      status: 'completed',
      assignedTo: ['user3', 'user1']
    },
    {
      id: '4',
      title: 'Add dark mode support',
      project: 'tssk-manager',
      dueDate: '2025-05-25',
      priority: 'low',
      status: 'pending',
      assignedTo: []
    },
    {
      id: '5',
      title: 'Write unit tests',
      project: 'E-commerce App',
      dueDate: '2025-05-18',
      priority: 'medium',
      status: 'pending',
      assignedTo: ['user2'],
      issueCount: 1
    }
  ]);

  const teamMembers: TeamMember[] = [
    { id: 'user1', name: 'John Doe', email: 'john@example.com' },
    { id: 'user2', name: 'Sarah Miller', email: 'sarah@example.com' },
    { id: 'user3', name: 'Mike Taylor', email: 'mike@example.com' },
    { id: 'user4', name: 'Emma Roberts', email: 'emma@example.com' },
    { id: 'user5', name: 'Lisa King', email: 'lisa@example.com' }
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    project: '',
    dueDate: '',
    priority: 'medium',
    assignedTo: [] as string[]
  });
  const [newIssue, setNewIssue] = useState({
    title: '',
    description: '',
    severity: 'medium'
  });

  const { toast } = useToast();
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredTasks = tasks.filter(task => {
    // Apply search filter
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.project.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    
    // Apply priority filter
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });
  
  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
  };
  
  const hasSomeFilters = searchQuery !== '' || statusFilter !== 'all' || priorityFilter !== 'all';
  
  // Helper function to render status badge
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge className="bg-slate-400">Pending</Badge>;
      case 'in_progress':
        return <Badge className="bg-tssk-amber">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-slate-600">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  // Helper function to render priority badge
  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'high':
        return <Badge className="bg-tssk-rose">High</Badge>;
      case 'medium':
        return <Badge className="bg-tssk-amber">Medium</Badge>;
      case 'low':
        return <Badge className="bg-tssk-teal">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleIssueInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewIssue(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateTask = () => {
    // Validate required fields
    if (!newTask.title.trim() || !newTask.project.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call to create task
    const newTaskItem: Task = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      project: newTask.project,
      dueDate: newTask.dueDate,
      priority: newTask.priority as 'low' | 'medium' | 'high',
      status: 'pending',
      assignedTo: newTask.assignedTo
    };

    setTasks([...tasks, newTaskItem]);
    setNewTask({
      title: '',
      description: '',
      project: '',
      dueDate: '',
      priority: 'medium',
      assignedTo: []
    });
    setIsTaskDialogOpen(false);

    toast({
      title: "Task Created",
      description: "Your task has been created successfully"
    });
  };

  const handleOpenAssignDialog = (task: Task) => {
    setCurrentTask(task);
    setIsAssignDialogOpen(true);
  };

  const handleOpenIssueDialog = (task: Task) => {
    setCurrentTask(task);
    setIsIssueDialogOpen(true);
  };

  const handleAssignTask = (memberId: string) => {
    if (!currentTask) return;
    
    // Simulate API call to assign task
    const updatedTasks = tasks.map(task => {
      if (task.id === currentTask.id) {
        // Check if already assigned
        if (task.assignedTo.includes(memberId)) {
          return {
            ...task,
            assignedTo: task.assignedTo.filter(id => id !== memberId)
          };
        } else {
          return {
            ...task,
            assignedTo: [...task.assignedTo, memberId]
          };
        }
      }
      return task;
    });
    
    setTasks(updatedTasks);
    
    toast({
      title: "Team Updated",
      description: "Task assignments have been updated",
    });
  };

  const handleCreateIssue = () => {
    if (!currentTask || !newIssue.title.trim()) {
      toast({
        title: "Error",
        description: "Please provide an issue title",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call to create issue
    const updatedTasks = tasks.map(task => {
      if (task.id === currentTask.id) {
        return {
          ...task,
          issueCount: (task.issueCount || 0) + 1
        };
      }
      return task;
    });

    setTasks(updatedTasks);
    setNewIssue({
      title: '',
      description: '',
      severity: 'medium'
    });
    setIsIssueDialogOpen(false);

    toast({
      title: "Issue Tracked",
      description: `Issue added to task "${currentTask.title}"`,
    });
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 pl-64 pt-16">
        <div className="container py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">Tasks</h1>
              <p className="text-slate-500 mt-1">Manage your tasks and track progress</p>
            </div>
            <Button 
              className="bg-tssk-teal hover:bg-tssk-teal-dark text-white rounded-lg flex items-center gap-2"
              onClick={() => setIsTaskDialogOpen(true)}
            >
              <Plus className="w-4 h-4" />
              <span>New Task</span>
            </Button>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 justify-between">
              <div className="relative md:w-1/3">
                <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
                <Input 
                  placeholder="Search tasks..." 
                  className="pl-9 border-slate-200"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px] border-slate-200">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-[150px] border-slate-200">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                
                {hasSomeFilters && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-slate-600"
                  >
                    <X className="w-4 h-4" />
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30%]">
                      <div className="flex items-center gap-2">
                        Task <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> Due Date
                      </div>
                    </TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" /> Assigned
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {task.title}
                            {task.issueCount && task.issueCount > 0 && (
                              <Badge variant="outline" className="text-tssk-rose border-tssk-rose flex gap-1 items-center">
                                <AlertTriangle className="w-3 h-3" />
                                {task.issueCount}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{task.project}</TableCell>
                        <TableCell>
                          {new Date(task.dueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                        <TableCell>{getStatusBadge(task.status)}</TableCell>
                        <TableCell>
                          <div className="flex -space-x-2">
                            {task.assignedTo.map((userId, index) => {
                              const member = teamMembers.find(m => m.id === userId);
                              return member ? (
                                <Avatar key={index} className="h-7 w-7 border-2 border-white">
                                  <AvatarFallback className="bg-lovable-purple text-white text-xs">
                                    {member.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                              ) : null;
                            })}
                            {task.assignedTo.length === 0 && (
                              <span className="text-xs text-slate-400 italic">Unassigned</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleOpenAssignDialog(task)}
                              className="h-8 w-8 p-0" 
                              title="Assign Team Members"
                            >
                              <Users className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleOpenIssueDialog(task)}
                              className="h-8 w-8 p-0 text-tssk-rose" 
                              title="Report Issue"
                            >
                              <AlertTriangle className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Edit">
                              <Clock className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                        No tasks found matching your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {/* Create Task Dialog */}
      <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Add a new task and assign it to team members.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Task Title *</Label>
              <Input 
                id="title" 
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                placeholder="Enter task title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                placeholder="Describe the task"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="project">Project *</Label>
                <Input 
                  id="project" 
                  name="project"
                  value={newTask.project}
                  onChange={handleInputChange}
                  placeholder="Select project"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input 
                  id="dueDate" 
                  name="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select 
                name="priority"
                value={newTask.priority}
                onValueChange={(value) => setNewTask(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsTaskDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleCreateTask} className="bg-tssk-teal hover:bg-tssk-teal-dark">
              Create Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Team Members Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Assign Team Members</DialogTitle>
            <DialogDescription>
              Select team members to work on this task.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {teamMembers.map(member => {
                const isAssigned = currentTask?.assignedTo.includes(member.id);
                return (
                  <div 
                    key={member.id}
                    className={`p-3 flex items-center justify-between rounded-lg border cursor-pointer ${
                      isAssigned ? 'border-tssk-teal bg-tssk-teal/5' : 'border-slate-200'
                    }`}
                    onClick={() => handleAssignTask(member.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-lovable-purple text-white">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-xs text-slate-500">{member.email}</p>
                      </div>
                    </div>
                    {isAssigned && (
                      <Badge className="bg-tssk-teal">Assigned</Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsAssignDialogOpen(false)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Issue Dialog */}
      <Dialog open={isIssueDialogOpen} onOpenChange={setIsIssueDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-tssk-rose" />
              Report Issue
            </DialogTitle>
            <DialogDescription>
              {currentTask && `Report an issue for the task: ${currentTask.title}`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="issueTitle">Issue Title *</Label>
              <Input 
                id="issueTitle" 
                name="title"
                value={newIssue.title}
                onChange={handleIssueInputChange}
                placeholder="Enter issue title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="issueDescription">Description</Label>
              <Textarea 
                id="issueDescription" 
                name="description"
                value={newIssue.description}
                onChange={handleIssueInputChange}
                placeholder="Describe the issue in detail"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="severity">Severity</Label>
              <Select 
                name="severity"
                value={newIssue.severity}
                onValueChange={(value) => setNewIssue(prev => ({ ...prev, severity: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsIssueDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleCreateIssue} 
              className="bg-tssk-rose hover:bg-tssk-rose/90"
            >
              Report Issue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tasks;
