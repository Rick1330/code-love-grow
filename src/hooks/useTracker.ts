
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { trackerAPI, TrackerEntry, TrackerStats, StreakData } from '../services/api';

export const useTracker = () => {
  const [entries, setEntries] = useState<TrackerEntry[]>([]);
  const [stats, setStats] = useState<TrackerStats | null>(null);
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTrackerData = async () => {
    try {
      setLoading(true);
      // In a real scenario, we'd connect to the backend API
      // Currently we'll use mock data similar to what we have
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock data based on our existing dummy data in the Tracker component
      const mockEntries = [
        { date: new Date(), hours: 2.5, mood: 4, languages: [{ name: 'JavaScript', hours: 1.5 }, { name: 'React', hours: 1 }] },
        { date: new Date(Date.now() - 86400000), hours: 3.2, mood: 5, languages: [{ name: 'CSS', hours: 1.2 }, { name: 'React', hours: 2 }] },
        { date: new Date(Date.now() - 172800000), hours: 1.8, mood: 3, languages: [{ name: 'HTML', hours: 0.8 }, { name: 'JavaScript', hours: 1 }] },
        { date: new Date(Date.now() - 259200000), hours: 4.1, mood: 5, languages: [{ name: 'Node.js', hours: 2.1 }, { name: 'JavaScript', hours: 2 }] },
        { date: new Date(Date.now() - 345600000), hours: 3.5, mood: 4, languages: [{ name: 'React', hours: 2.5 }, { name: 'CSS', hours: 1 }] },
      ];
      
      setEntries(mockEntries);
      
      // Mock stats
      const mockStats = {
        totalHours: 15.1,
        languageStats: [
          { _id: 'JavaScript', hours: 4.5 },
          { _id: 'React', hours: 5.5 },
          { _id: 'CSS', hours: 2.2 },
          { _id: 'HTML', hours: 0.8 },
          { _id: 'Node.js', hours: 2.1 },
        ],
        dailyAverage: mockEntries.map(entry => ({
          _id: entry.date.toString().split('T')[0],
          hours: entry.hours,
          mood: entry.mood
        }))
      };
      
      setStats(mockStats);
      
      // Mock streak data
      setStreak({
        currentStreak: 5,
        maxStreak: 7
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tracker data:', error);
      toast({
        title: "Error",
        description: "Failed to load tracking data",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const addTrackerEntry = async (entryData: TrackerEntry) => {
    try {
      // In a real scenario, we'd connect to the backend API
      // For now, we'll just update our local state
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Add new entry to the beginning of the array
      setEntries([entryData, ...entries]);
      
      toast({
        title: "Success",
        description: "Your coding progress has been logged!",
      });
      
      // Refetch data to update stats and streak
      fetchTrackerData();
      
      return true;
    } catch (error) {
      console.error('Error adding tracker entry:', error);
      toast({
        title: "Error",
        description: "Failed to log your progress",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchTrackerData();
  }, []);

  return {
    entries,
    stats,
    streak,
    loading,
    fetchTrackerData,
    addTrackerEntry
  };
};
