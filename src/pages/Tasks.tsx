
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
import { Plus, ArrowUpDown, Search, X } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';

interface Task {
  id: string;
  title: string;
  project: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
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
      status: 'in_progress'
    },
    {
      id: '2',
      title: 'Implement user authentication',
      project: 'tssk-manager',
      dueDate: '2025-05-15',
      priority: 'high',
      status: 'pending'
    },
    {
      id: '3',
      title: 'Design landing page',
      project: 'Portfolio Site',
      dueDate: '2025-05-20',
      priority: 'medium',
      status: 'completed'
    },
    {
      id: '4',
      title: 'Add dark mode support',
      project: 'tssk-manager',
      dueDate: '2025-05-25',
      priority: 'low',
      status: 'pending'
    },
    {
      id: '5',
      title: 'Write unit tests',
      project: 'E-commerce App',
      dueDate: '2025-05-18',
      priority: 'medium',
      status: 'pending'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  
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
            <Button className="bg-tssk-teal hover:bg-tssk-teal-dark text-white rounded-lg flex items-center gap-2">
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
                    <TableHead className="w-[40%]">
                      <div className="flex items-center gap-2">
                        Task <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.title}</TableCell>
                        <TableCell>{task.project}</TableCell>
                        <TableCell>
                          {new Date(task.dueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                        <TableCell>{getStatusBadge(task.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-slate-500">
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
    </div>
  );
};

export default Tasks;
