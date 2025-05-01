
import { StreakData, TrackerStats } from "@/services/api";

interface CurrentStatsProps {
  stats: TrackerStats | null;
  streak: StreakData | null;
  entriesCount: number;
}

const CurrentStats = ({ stats, streak, entriesCount }: CurrentStatsProps) => {
  return (
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
            {(stats?.totalHours && entriesCount > 0) ? 
              (stats.totalHours / entriesCount).toFixed(1) : 0} <span className="text-sm">hrs</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentStats;
