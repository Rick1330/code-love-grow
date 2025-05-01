
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTracker } from "@/hooks/useTracker";
import LogProgressDialog from "@/components/tracker/LogProgressDialog";
import { Loader2 } from "lucide-react";

const Tracker = () => {
  const { entries, stats, streak, loading, addTrackerEntry } = useTracker();
  const [activeTab, setActiveTab] = useState("daily");

  // Format data for charts
  const formatDailyData = () => {
    if (!entries) return [];
    
    return entries.map(entry => {
      const date = new Date(entry.date);
      return {
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        hours: entry.hours,
        mood: entry.mood
      };
    }).reverse();
  };
  
  const formatLanguageData = () => {
    if (!stats) return [];
    
    return stats.languageStats.map(lang => ({
      name: lang._id,
      hours: lang.hours
    }));
  };
  
  // Generate calendar data
  const generateCalendarData = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Generate days for the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Convert entries to day numbers
    const codingDays = entries
      .map(entry => new Date(entry.date).getDate())
      .filter(day => {
        const entryDate = new Date(currentYear, currentMonth, day);
        return entryDate.getMonth() === currentMonth;
      });
    
    return {
      daysInMonth,
      codingDays,
      today: today.getDate()
    };
  };
  
  const { daysInMonth, codingDays, today } = generateCalendarData();
  
  const dailyData = formatDailyData();
  const languageData = formatLanguageData();

  return (
    <div className="min-h-screen bg-lovable-gray-light/50">
      <Sidebar />
      <div className="pl-20 lg:pl-64 pt-6">
        <div className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">Coding Tracker</h1>
            <div className="flex items-center gap-4">
              <LogProgressDialog onSubmit={addTrackerEntry} />
            </div>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-lovable-purple" />
            </div>
          ) : (
            <>
              {/* Daily Tracker Graph */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Daily Coding Hours</h2>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant={activeTab === "daily" ? "default" : "outline"}
                      onClick={() => setActiveTab("daily")}
                      className={activeTab === "daily" ? "bg-lovable-purple" : ""}
                    >
                      Hours
                    </Button>
                    <Button 
                      size="sm" 
                      variant={activeTab === "mood" ? "default" : "outline"}
                      onClick={() => setActiveTab("mood")}
                      className={activeTab === "mood" ? "bg-lovable-purple" : ""}
                    >
                      Mood
                    </Button>
                  </div>
                </div>
                
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={dailyData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis 
                        domain={activeTab === "mood" ? [1, 5] : ['auto', 'auto']} 
                        tickCount={activeTab === "mood" ? 5 : undefined}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white',
                          borderRadius: '8px',
                          border: 'none',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }}
                        formatter={(value, name) => {
                          if (name === "mood") return [`${value} / 5`, 'Mood Rating'];
                          return [value, name];
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey={activeTab === "daily" ? "hours" : "mood"} 
                        stroke={activeTab === "daily" ? "#9b87f5" : "#FDE1D3"} 
                        fill={activeTab === "daily" ? "#E5DEFF" : "#FDE1D3"} 
                        name={activeTab === "daily" ? "Hours Coded" : "Mood"}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Weekly Mood Timeline */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4">Current Stats</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-lovable-purple-light rounded-lg p-4 flex flex-col items-center justify-center">
                      <p className="text-sm text-gray-600">Current Streak</p>
                      <p className="text-3xl font-bold text-lovable-purple">
                        {streak?.currentStreak || 0} <span className="text-sm">days</span>
                      </p>
                    </div>
                    <div className="bg-lovable-peach rounded-lg p-4 flex flex-col items-center justify-center">
                      <p className="text-sm text-gray-600">Total Hours</p>
                      <p className="text-3xl font-bold text-lovable-purple-dark">
                        {stats?.totalHours || 0}
                      </p>
                    </div>
                    <div className="bg-lovable-blue rounded-lg p-4 flex flex-col items-center justify-center">
                      <p className="text-sm text-gray-600">Best Streak</p>
                      <p className="text-3xl font-bold text-lovable-purple">
                        {streak?.maxStreak || 0} <span className="text-sm">days</span>
                      </p>
                    </div>
                    <div className="bg-lovable-gray-light rounded-lg p-4 flex flex-col items-center justify-center">
                      <p className="text-sm text-gray-600">Avg. Daily</p>
                      <p className="text-3xl font-bold text-lovable-purple">
                        {(stats?.totalHours && entries.length > 0) ? 
                          (stats.totalHours / entries.length).toFixed(1) : 0} <span className="text-sm">hrs</span>
                      </p>
                    </div>
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
                <p className="text-gray-500 mb-6">Track your daily coding streaks. Purple squares indicate days you've coded.</p>
                
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
                    const isToday = dayNumber === today;
                    
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tracker;
