import { Box, Typography } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend: number;
  valueColor?: string;
  trendColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend,
  valueColor = '#1F2937',
  trendColor = trend >= 0 ? '#059669' : '#DC2626'
}) => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: 1,
        mb: 2
      }}>
        <span style={{ fontSize: '1.5rem' }}>{icon}</span>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            fontWeight: 500,
            color: '#6B7280'
          }}
        >
          {title}
        </Typography>
      </Box>
      
      <Typography 
        variant="h4" 
        sx={{ 
          fontWeight: 600,
          color: valueColor,
          mb: 1
        }}
      >
        {typeof value === 'number' ? value.toLocaleString() : value}
      </Typography>

      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        gap: 0.5
      }}>
        {trend >= 0 ? (
          <TrendingUp sx={{ color: trendColor }} />
        ) : (
          <TrendingDown sx={{ color: trendColor }} />
        )}
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 600,
            color: trendColor
          }}
        >
          {Math.abs(trend)}%
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#6B7280',
            ml: 1
          }}
        >
          vs last month
        </Typography>
      </Box>
    </Box>
  );
};

export default MetricCard; 