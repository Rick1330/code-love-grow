
interface StreakCalendarProps {
  daysInMonth: number;
  codingDays: number[];
  today: number;
}

const StreakCalendar = ({ daysInMonth, codingDays, today }: StreakCalendarProps) => {
  return (
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
  );
};

export default StreakCalendar;
