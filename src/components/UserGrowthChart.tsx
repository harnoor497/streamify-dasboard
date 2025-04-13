import { useTheme } from '@mui/material';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart
} from 'recharts';

interface UserGrowthChartProps {
  data: Array<{
    month: string;
    totalUsers: number;
    activeUsers: number;
  }>;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
  }>;
  label?: string;
}

const UserGrowthChart = ({ data }: UserGrowthChartProps) => {
  const theme = useTheme();

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: theme.palette.background.paper,
            padding: '12px 16px',
            border: 'none',
            borderRadius: 8,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          }}
        >
          <p style={{ 
            margin: 0, 
            color: theme.palette.text.primary,
            fontWeight: 600,
            fontSize: '0.875rem'
          }}>
            {label}
          </p>
          {payload?.map((entry, index) => (
            <p
              key={index}
              style={{ 
                margin: '4px 0 0', 
                color: entry.color,
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                backgroundColor: entry.color,
                display: 'inline-block'
              }}/>
              {entry.name}: {(entry.value / 1000).toFixed(1)}k
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 0,
          bottom: 20
        }}
      >
        <defs>
          <linearGradient id="totalUsersGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6B46C1" stopOpacity={0.2}/>
            <stop offset="95%" stopColor="#6B46C1" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="activeUsersGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#38B2AC" stopOpacity={0.2}/>
            <stop offset="95%" stopColor="#38B2AC" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="rgba(0,0,0,0.06)"
          horizontal={true}
          vertical={false}
        />
        <XAxis
          dataKey="month"
          tick={{ 
            fill: theme.palette.text.primary,
            fontSize: '0.75rem',
            fontWeight: 500
          }}
          axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
          tickLine={false}
          dy={8}
          height={35}
          padding={{ left: 0, right: 0 }}
        />
        <YAxis
          yAxisId="left"
          tick={{ 
            fill: theme.palette.text.primary,
            fontSize: '0.75rem',
            fontWeight: 500
          }}
          axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
          tickLine={false}
          tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          width={35}
          domain={[0, 'auto']}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="top"
          height={30}
          iconType="circle"
          iconSize={8}
          wrapperStyle={{
            paddingTop: '0px',
            paddingBottom: '0px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px'
          }}
          formatter={(value) => (
            <span style={{ 
              color: theme.palette.text.primary,
              fontSize: '0.875rem',
              fontWeight: 500,
              padding: '0 4px'
            }}>
              {value}
            </span>
          )}
        />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="totalUsers"
          name="Total Users"
          stroke="#6B46C1"
          strokeWidth={2}
          fill="url(#totalUsersGradient)"
          dot={{ 
            r: 4, 
            fill: "#6B46C1",
            strokeWidth: 2,
            stroke: "#fff"
          }}
          activeDot={{ 
            r: 6,
            strokeWidth: 2,
            stroke: "#fff",
            fill: "#6B46C1"
          }}
        />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="activeUsers"
          name="Active Users"
          stroke="#38B2AC"
          strokeWidth={2}
          fill="url(#activeUsersGradient)"
          dot={{ 
            r: 4, 
            fill: "#38B2AC",
            strokeWidth: 2,
            stroke: "#fff"
          }}
          activeDot={{ 
            r: 6,
            strokeWidth: 2,
            stroke: "#fff",
            fill: "#38B2AC"
          }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default UserGrowthChart; 