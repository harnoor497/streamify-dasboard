import { useTheme } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface RevenueDistributionChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

const RevenueDistributionChart = ({ data }: RevenueDistributionChartProps) => {
  const theme = useTheme();

  const COLORS = [
    '#6B46C1', // Primary purple
    '#38B2AC', // Teal
    '#48BB78', // Green
    '#4299E1', // Blue
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <g>
        <text
          x={x}
          y={y}
          fill="#FFFFFF"
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
          style={{ 
            fontSize: '0.875rem',
            fontWeight: 600,
            textShadow: '0 1px 4px rgba(0,0,0,0.2)'
          }}
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
        <text
          x={x + (x > cx ? 8 : -8)}
          y={y + 16}
          fill={theme.palette.text.secondary}
          textAnchor={x > cx ? 'start' : 'end'}
          style={{ 
            fontSize: '0.75rem',
            fontWeight: 500
          }}
        >
          ${value.toLocaleString()}
        </text>
      </g>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
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
            color: data.payload.fill,
            fontWeight: 600,
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ 
              width: '10px', 
              height: '10px', 
              borderRadius: '50%', 
              backgroundColor: data.payload.fill,
              display: 'inline-block'
            }}/>
            {data.name}
          </p>
          <p style={{ 
            margin: '8px 0 0', 
            color: theme.palette.text.primary,
            fontSize: '1rem',
            fontWeight: 600
          }}>
            ${data.value.toLocaleString()}
          </p>
          <p style={{ 
            margin: '4px 0 0', 
            color: theme.palette.text.secondary,
            fontSize: '0.75rem'
          }}>
            {((data.value / total) * 100).toFixed(1)}% of total revenue
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          innerRadius={80}
          paddingAngle={4}
          dataKey="value"
          animationBegin={200}
          animationDuration={1000}
          animationEasing="ease-out"
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={COLORS[index % COLORS.length]}
              stroke="none"
              style={{
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                cursor: 'pointer',
              }}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="bottom"
          align="center"
          layout="horizontal"
          wrapperStyle={{
            position: 'absolute',
            bottom: '0px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            padding: '8px'
          }}
          formatter={(value, entry: any) => (
            <span style={{ 
              color: theme.palette.text.primary,
              fontSize: '0.875rem',
              fontWeight: 500,
              padding: '4px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              borderRadius: '16px',
              transition: 'all 0.2s ease',
              ':hover': {
                backgroundColor: 'rgba(0,0,0,0.04)'
              }
            }}>
              <span style={{ 
                width: '10px', 
                height: '10px', 
                borderRadius: '50%', 
                backgroundColor: entry.color,
                display: 'inline-block'
              }}/>
              {value}
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default RevenueDistributionChart; 