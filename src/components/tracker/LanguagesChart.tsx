
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LanguagesChartProps {
  languageData: {
    name: string;
    hours: number;
  }[];
}

const LanguagesChart = ({ languageData }: LanguagesChartProps) => {
  return (
    <div className="tssk-card">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Languages & Tools</h2>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={languageData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#64748B', fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis 
              tick={{ fill: '#64748B', fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
              }}
              itemStyle={{ color: '#38BDF8' }}
            />
            <Area 
              type="monotone" 
              dataKey="hours" 
              stroke="#38BDF8" 
              fill="#BAE6FD" 
              name="Hours"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LanguagesChart;
