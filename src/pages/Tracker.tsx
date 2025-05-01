
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Tracker = () => {
  // Dummy data for charts
  const dailyData = [
    { day: 'Mon', hours: 2.5, mood: 4 },
    { day: 'Tue', hours: 3.2, mood: 5 },
    { day: 'Wed', hours: 1.8, mood: 3 },
    { day: 'Thu', hours: 4.1, mood: 5 },
    { day: 'Fri', hours: 3.5, mood: 4 },
    { day: 'Sat', hours: 5.2, mood: 5 },
    { day: 'Sun', hours: 2.0, mood: 3 },
  ];

  const languageData = [
    { name: 'JavaScript', hours: 10.5 },
    { name: 'React', hours: 8.2 },
    { name: 'CSS', hours: 4.7 },
    { name: 'HTML', hours: 3.3 },
    { name: 'Node.js', hours: 5.1 },
  ];

  // Calendar data for streaks
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // Generate days for the current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Dummy data for coding days (random days in the month)
  const codingDays = Array.from({ length: 15 }, () => 
    Math.floor(Math.random() * daysInMonth) + 1
  );

  return (
    <div className="min-h-screen bg-lovable-gray-light/50">
      <Sidebar />
      <div className="pl-20 lg:pl-64 pt-6">
        <div className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">Coding Tracker</h1>
            <div className="flex items-center gap-4">
              <Button className="bg-lovable-purple hover:bg-lovable-purple-dark rounded-full">
                Log Today's Progress
              </Button>
            </div>
          </div>
          
          {/* Daily Tracker Graph */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Daily Coding Hours</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={dailyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="#9b87f5" 
                    fill="#E5DEFF" 
                    name="Hours Coded"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Weekly Mood Timeline */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Weekly Mood</h2>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={dailyData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[1, 5]} tickCount={5} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value) => [`${value} / 5`, 'Mood Rating']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="#FDE1D3" 
                      fill="#FDE1D3" 
                      name="Mood"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Languages & Tools Used */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Languages & Tools</h2>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={languageData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="hours" 
                      stroke="#D3E4FD" 
                      fill="#D3E4FD" 
                      name="Hours"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* Streak Calendar */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Coding Streak Calendar</h2>
            <p className="text-gray-500 mb-6">Track your daily coding streaks. Green squares indicate days you've coded.</p>
            
            <div className="grid grid-cols-7 gap-2">
              {/* Day labels */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <div key={index} className="text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
              
              {/* Calendar squares */}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const dayNumber = i + 1;
                const hasCoded = codingDays.includes(dayNumber);
                const isToday = dayNumber === today.getDate();
                
                return (
                  <div 
                    key={dayNumber}
                    className={`aspect-square rounded-md flex items-center justify-center border ${
                      isToday 
                        ? 'border-lovable-purple' 
                        : hasCoded 
                          ? 'bg-lovable-purple-light border-none' 
                          : 'border-gray-200'
                    }`}
                  >
                    <span className={`text-sm ${hasCoded && !isToday ? 'text-lovable-purple' : ''}`}>
                      {dayNumber}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-lovable-purple-light rounded"></div>
                <span className="text-sm">Coded</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border border-lovable-purple rounded"></div>
                <span className="text-sm">Today</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border border-gray-200 rounded"></div>
                <span className="text-sm">No Activity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracker;
