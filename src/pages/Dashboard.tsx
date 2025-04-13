import { Box, Paper, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import MetricCard from '../components/MetricCard';
import UserGrowthChart from '../components/UserGrowthChart';
import RevenueDistributionChart from '../components/RevenueDistributionChart';
import TopSongsChart from '../components/TopSongsChart';
import StreamsTable from '../components/StreamsTable';
import { mockData } from '../utils/mockData';

const Dashboard = () => {
  const theme = useTheme();
  const { currentMetrics, monthlyMetrics, revenueDistribution, topSongs } = mockData;

  // Calculate trends
  const calculateTrend = (current: number, previous: number) => {
    return Math.round(((current - previous) / previous) * 100);
  };

  const trends = {
    totalUsers: calculateTrend(
      currentMetrics.totalUsers,
      monthlyMetrics[monthlyMetrics.length - 2].totalUsers
    ),
    activeUsers: calculateTrend(
      currentMetrics.activeUsers,
      monthlyMetrics[monthlyMetrics.length - 2].activeUsers
    ),
    totalStreams: calculateTrend(
      currentMetrics.totalStreams,
      monthlyMetrics[monthlyMetrics.length - 2].totalStreams
    ),
    revenue: calculateTrend(
      currentMetrics.revenue,
      monthlyMetrics[monthlyMetrics.length - 2].revenue
    ),
  };

  // Transform topSongs data
  const formattedTopSongs = topSongs
    .filter((song): song is typeof song & { title: string } => Boolean(song.title))
    .map(song => ({
      name: song.title,
      streams: Number(song.streams)
    }));

  const metricCards = [
    {
      title: 'Total Users',
      value: currentMetrics.totalUsers,
      icon: '👥',
      trend: trends.totalUsers,
    },
    {
      title: 'Active Users',
      value: currentMetrics.activeUsers,
      icon: '🎵',
      trend: trends.activeUsers,
    },
    {
      title: 'Revenue',
      value: `$${currentMetrics.revenue.toLocaleString()}`,
      icon: '💰',
      trend: trends.revenue,
    },
    {
      title: 'Total Streams',
      value: currentMetrics.totalStreams,
      icon: '🎤',
      trend: trends.totalStreams,
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, minHeight: '100vh', background: theme.palette.background.default }}>
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          mb: 4
        }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600,
              color: theme.palette.text.primary,
              flex: 1
            }}
          >
            Streamify Analytics
          </Typography>
        </Box>
        
        {/* Metric Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2, mb: 4 }}>
          {metricCards.map((card, index) => (
            <Box key={index} sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
              <Paper 
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: '2px solid #6B46C1',
                  background: 'white',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 16px rgba(107, 70, 193, 0.2)'
                  }
                }}
              >
                <MetricCard {...card} />
              </Paper>
            </Box>
          ))}
        </Box>

        {/* Charts */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4, height: '500px' }}>
          {/* User Growth Chart */}
          <Box sx={{ flex: '1 1 calc(33.333% - 16px)', minWidth: 300, height: '100%' }}>
            <Paper elevation={0} sx={{ height: '100%', p: 3 }}>
              <UserGrowthChart data={monthlyMetrics} />
            </Paper>
          </Box>

          {/* Revenue Distribution Chart */}
          <Box sx={{ flex: '1 1 calc(33.333% - 16px)', minWidth: 300, height: '100%' }}>
            <Paper elevation={0} sx={{ height: '100%', p: 3 }}>
              <RevenueDistributionChart data={revenueDistribution} />
            </Paper>
          </Box>

          {/* Top Songs Chart */}
          <Box sx={{ flex: '1 1 calc(33.333% - 16px)', minWidth: 300, height: '100%' }}>
            <Paper elevation={0} sx={{ height: '100%', p: 3 }}>
              <TopSongsChart data={formattedTopSongs} />
            </Paper>
          </Box>
        </Box>

        {/* Streams Table */}
        <Box sx={{ p: 3, background: theme.palette.background.paper, borderRadius: 2, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 3 }}>
            Recent Streams
          </Typography>
          <StreamsTable />
        </Box>
      </Box>
    </motion.div>
  );
};

export default Dashboard; 