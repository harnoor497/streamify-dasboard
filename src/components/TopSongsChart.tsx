import { useTheme } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell
} from 'recharts';

interface TopSongsChartProps {
  data: Array<{
    name: string;
    streams: number;
  }>;
}

const TopSongsChart = ({ data }: TopSongsChartProps) => {
  const theme = useTheme();
  const maxValue = Math.max(...data.map(item => item.streams));

  const CustomTooltip = ({ active, payload, label }: any) => {
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
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ 
              width: '10px', 
              height: '10px', 
              borderRadius: '2px', 
              backgroundColor: '#48BB78',
              display: 'inline-block'
            }}/>
            {label}
          </p>
          <p style={{ 
            margin: '8px 0 0', 
            color: theme.palette.text.primary,
            fontSize: '1rem',
            fontWeight: 600
          }}>
            {payload[0].value.toLocaleString()} streams
          </p>
          <p style={{ 
            margin: '4px 0 0', 
            color: theme.palette.text.secondary,
            fontSize: '0.75rem'
          }}>
            {((payload[0].value / maxValue) * 100).toFixed(1)}% of top streams
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = (props: any) => {
    const { x, y, width, value } = props;
    return (
      <g>
        <text
          x={x + width / 2}
          y={y - 12}
          fill={theme.palette.text.primary}
          textAnchor="middle"
          fontSize="0.875rem"
          fontWeight={500}
        >
          {value.toLocaleString()}
        </text>
        <text
          x={x + width / 2}
          y={y - 28}
          fill={theme.palette.text.secondary}
          textAnchor="middle"
          fontSize="0.75rem"
        >
          {((value / maxValue) * 100).toFixed(0)}%
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 40,
          right: 30,
          left: 30,
          bottom: 50
        }}
        barSize={40}
        maxBarSize={60}
      >
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#48BB78" stopOpacity={1}/>
            <stop offset="100%" stopColor="#48BB78" stopOpacity={0.6}/>
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(0,0,0,0.06)"
          horizontal={true}
          vertical={false}
        />
        <XAxis
          dataKey="name"
          tick={{ 
            fill: theme.palette.text.primary,
            fontSize: '0.75rem',
            fontWeight: 500
          }}
          axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
          tickLine={false}
          interval={0}
          angle={-35}
          textAnchor="end"
          height={60}
          dy={20}
          padding={{ left: 10, right: 10 }}
        />
        <YAxis
          tick={{ 
            fill: theme.palette.text.primary,
            fontSize: '0.75rem',
            fontWeight: 500
          }}
          axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
          tickLine={false}
          tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          width={40}
          domain={[0, maxValue * 1.1]}
          padding={{ top: 20 }}
        />
        <Tooltip 
          content={<CustomTooltip />}
          cursor={{ fill: 'rgba(72, 187, 120, 0.1)' }}
        />
        <Bar
          dataKey="streams"
          radius={[6, 6, 0, 0]}
          animationBegin={200}
          animationDuration={1000}
          animationEasing="ease-out"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill="url(#barGradient)"
              style={{
                filter: 'drop-shadow(0px 2px 8px rgba(72, 187, 120, 0.2))',
                cursor: 'pointer',
              }}
            />
          ))}
          <LabelList
            dataKey="streams"
            position="top"
            content={<CustomLabel />}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopSongsChart; 