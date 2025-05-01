
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";

interface DailyCodingChartProps {
  dailyData: {
    day: string;
    hours: number;
    mood: number;
  }[];
}

const DailyCodingChart = ({ dailyData }: DailyCodingChartProps) => {
  const [activeTab, setActiveTab] = useState("daily");

  return (
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
  );
};

export default DailyCodingChart;
