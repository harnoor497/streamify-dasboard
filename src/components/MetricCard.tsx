import { Paper, Typography, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { format } from 'date-fns';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: number;
  lastUpdated?: Date;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend = 0,
  lastUpdated = new Date()
}) => {
  const theme = useTheme();
  const isPositive = trend >= 0;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Paper
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          height: 180,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 500 }}>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ opacity: 0.2, position: 'absolute', right: 16, top: 16 }}>
            {icon}
          </Typography>
        </Box>
        
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h3" component="div" sx={{ fontWeight: 600, mb: 1 }}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isPositive ? (
              <TrendingUpIcon sx={{ color: '#4caf50' }} />
            ) : (
              <TrendingDownIcon sx={{ color: '#f44336' }} />
            )}
            <Typography variant="body2" sx={{ color: isPositive ? '#4caf50' : '#f44336' }}>
              {Math.abs(trend)}% {isPositive ? 'increase' : 'decrease'} from last month
            </Typography>
          </Box>
        </Box>

        <Typography 
          variant="caption" 
          sx={{ 
            opacity: 0.7,
            position: 'absolute',
            bottom: 8,
            right: 16
          }}
        >
          Last updated: {format(lastUpdated, 'MMM d, h:mm a')}
        </Typography>
      </Paper>
    </motion.div>
  );
};

export default MetricCard; 