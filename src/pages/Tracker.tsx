
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { useTracker } from "@/hooks/useTracker";
import { Loader2 } from "lucide-react";
import TrackerHeader from "@/components/tracker/TrackerHeader";
import DailyCodingChart from "@/components/tracker/DailyCodingChart";
import CurrentStats from "@/components/tracker/CurrentStats";
import LanguagesChart from "@/components/tracker/LanguagesChart";
import StreakCalendar from "@/components/tracker/StreakCalendar";

const Tracker = () => {
  const { entries, stats, streak, loading, addTrackerEntry } = useTracker();

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
          <TrackerHeader onSubmit={addTrackerEntry} />
          
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-lovable-purple" />
            </div>
          ) : (
            <>
              <DailyCodingChart dailyData={dailyData} />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <CurrentStats 
                  stats={stats} 
                  streak={streak} 
                  entriesCount={entries.length} 
                />
                <LanguagesChart languageData={languageData} />
              </div>
              
              <StreakCalendar 
                daysInMonth={daysInMonth}
                codingDays={codingDays}
                today={today}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tracker;
