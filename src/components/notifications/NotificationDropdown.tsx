
import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  type: 'task_assigned' | 'task_updated' | 'deadline' | 'issue' | 'mention';
  title: string;
  message: string;
  time: Date;
  read: boolean;
}

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { toast } = useToast();

  // Simulate fetching notifications
  useEffect(() => {
    // Mock data - would come from API
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'task_assigned',
        title: 'New Task Assigned',
        message: 'You have been assigned to create API documentation',
        time: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        read: false
      },
      {
        id: '2',
        type: 'deadline',
        title: 'Deadline Approaching',
        message: 'Task "Implement user authentication" is due tomorrow',
        time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: false
      },
      {
        id: '3',
        type: 'issue',
        title: 'New Issue Reported',
        message: 'Critical issue reported in "User signup flow"',
        time: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        read: false
      },
      {
        id: '4',
        type: 'mention',
        title: 'You were mentioned',
        message: 'Sarah mentioned you in a comment on "Dashboard redesign"',
        time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        read: true
      },
      {
        id: '5',
        type: 'task_updated',
        title: 'Task Updated',
        message: 'The task "Fix responsive layout" has been updated',
        time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        read: true
      }
    ];
    
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);

    // Simulate receiving a new notification after a delay
    const timer = setTimeout(() => {
      const newNotification: Notification = {
        id: '6',
        type: 'task_assigned',
        title: 'New Task Assigned',
        message: 'You have been assigned to review pull request #42',
        time: new Date(),
        read: false
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      setUnreadCount(prev => prev + 1);
      
      toast({
        title: newNotification.title,
        description: newNotification.message,
      });
    }, 10000); // 10 seconds after component mount
    
    return () => clearTimeout(timer);
  }, [toast]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'task_assigned':
        return '📋';
      case 'deadline':
        return '⏰';
      case 'issue':
        return '⚠️';
      case 'mention':
        return '💬';
      case 'task_updated':
        return '🔄';
      default:
        return '📢';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative p-2 h-9 w-9">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 bg-tssk-rose text-white">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <DropdownMenuItem 
                key={notification.id} 
                className={`p-3 cursor-pointer ${!notification.read ? 'bg-slate-50' : ''}`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="flex gap-2 w-full">
                  <div className="text-xl">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <p className="font-semibold text-sm mb-1 truncate">{notification.title}</p>
                      <span className="text-xs text-slate-500 whitespace-nowrap">
                        {formatTimeAgo(notification.time)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2">{notification.message}</p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="py-4 text-center text-slate-500">
              No notifications
            </div>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center">
          <Button variant="ghost" size="sm" className="w-full text-xs">
            View All Notifications
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
