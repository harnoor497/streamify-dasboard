import { Grid, Paper, Typography, Box, useTheme } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/system';
import type { GridProps } from '@mui/material';
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

  // Transform topSongs data to match the expected format
  const formattedTopSongs = topSongs.map(song => ({
    name: song.title,
    streams: Number(song.streams)
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box 
        sx={{ 
          p: { xs: 2, sm: 3, md: 4 },
          minHeight: '100vh',
          background: theme.palette.background.default,
        }}
      >
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
        <Grid 
          container 
          spacing={3} 
          sx={{ 
            mb: 4,
            display: 'flex',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            pb: 1,
            '&::-webkit-scrollbar': {
              height: 6
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'rgba(0,0,0,0.05)',
              borderRadius: 3
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(107, 70, 193, 0.2)',
              borderRadius: 3,
              '&:hover': {
                backgroundColor: 'rgba(107, 70, 193, 0.3)'
              }
            }
          }}
        >
          <Grid item xs={3} sx={{ minWidth: 280 }}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                background: '#6B46C1',
                color: 'white',
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              }}
            >
              <MetricCard
                title="Total Users"
                value={currentMetrics.totalUsers}
                icon="👥"
                trend={trends.totalUsers}
              />
            </Paper>
          </Grid>
          <Grid item xs={3} sx={{ minWidth: 280 }}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                background: '#6B46C1',
                color: 'white',
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              }}
            >
              <MetricCard
                title="Active Users"
                value={currentMetrics.activeUsers}
                icon="🎵"
                trend={trends.activeUsers}
              />
            </Paper>
          </Grid>
          <Grid item component="div" xs={3} sx={{ minWidth: 280 }}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                background: '#6B46C1',
                color: 'white',
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              }}
            >
              <MetricCard
                title="Total Streams"
                value={currentMetrics.totalStreams}
                icon="▶️"
                trend={trends.totalStreams}
              />
            </Paper>
          </Grid>
          <Grid item component="div" xs={3} sx={{ minWidth: 280 }}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                background: '#6B46C1',
                color: 'white',
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              }}
            >
              <MetricCard
                title="Revenue"
                value={`$${currentMetrics.revenue.toLocaleString()}`}
                icon="💰"
                trend={trends.revenue}
              />
            </Paper>
          </Grid>
        </Grid>

        {/* Charts */}
        <Grid 
          container
          component="div"
          spacing={3} 
          sx={{ 
            mb: 4,
            mx: 0,
            width: '100%',
            height: '500px'
          }}
        >
          {/* User Growth Chart */}
          <Grid 
            item 
            component="div"
            xs={12} 
            md={4} 
            sx={{ px: 2, height: '100%' }}
          >
            <Paper 
              elevation={0}
              sx={{ 
                p: 3,
                height: '100%',
                background: theme.palette.background.paper,
                borderRadius: 3,
                border: '1px solid rgba(107, 70, 193, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 8px 25px rgba(107, 70, 193, 0.15)',
                  borderColor: 'rgba(107, 70, 193, 0.25)'
                }
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Box 
                  sx={{ 
                    width: 4, 
                    height: 20, 
                    backgroundColor: '#6B46C1',
                    borderRadius: 1,
                    mr: 1
                  }} 
                />
                User Growth
              </Typography>
              <Box sx={{ 
                flex: 1,
                width: '100%',
                height: 'calc(100% - 40px)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '.recharts-wrapper': {
                  width: '100% !important',
                  height: '100% !important',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  left: 'auto',
                  right: 'auto',
                  bottom: 'auto',
                  top: 'auto',
                  '.recharts-surface': {
                    overflow: 'visible',
                    width: '100%',
                    height: '100%'
                  }
                }
              }}>
                <UserGrowthChart data={monthlyMetrics} />
              </Box>
            </Paper>
          </Grid>

          {/* Revenue Distribution Chart */}
          <Grid 
            item 
            component="div"
            xs={12} 
            md={4} 
            sx={{ px: 2, height: '100%' }}
          >
            <Paper 
              elevation={0}
              sx={{ 
                p: 3,
                height: '100%',
                background: theme.palette.background.paper,
                borderRadius: 3,
                border: '1px solid rgba(56, 178, 172, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 8px 25px rgba(56, 178, 172, 0.15)',
                  borderColor: 'rgba(56, 178, 172, 0.25)'
                }
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Box 
                  sx={{ 
                    width: 4, 
                    height: 20, 
                    backgroundColor: '#38B2AC',
                    borderRadius: 1,
                    mr: 1
                  }} 
                />
                Revenue Distribution
              </Typography>
              <Box sx={{ 
                flex: 1,
                width: '100%',
                height: 'calc(100% - 80px)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '.recharts-wrapper': {
                  width: '100% !important',
                  height: '100% !important',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  left: 'auto',
                  right: 'auto',
                  bottom: 'auto',
                  top: 'auto',
                  '.recharts-surface': {
                    overflow: 'visible',
                    width: '100%',
                    height: '100%'
                  },
                  '.recharts-legend-wrapper': {
                    position: 'absolute !important',
                    width: '100% !important',
                    height: 'auto !important',
                    bottom: '-40px !important',
                    left: '0 !important',
                    display: 'flex !important',
                    justifyContent: 'center !important',
                    alignItems: 'center !important'
                  }
                }
              }}>
                <RevenueDistributionChart data={revenueDistribution} />
              </Box>
            </Paper>
          </Grid>

          {/* Top Songs Chart */}
          <Grid 
            item 
            component="div"
            xs={12} 
            md={4} 
            sx={{ px: 2, height: '100%' }}
          >
            <Paper 
              elevation={0}
              sx={{ 
                p: 3,
                height: '100%',
                background: theme.palette.background.paper,
                borderRadius: 3,
                border: '1px solid rgba(72, 187, 120, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 8px 25px rgba(72, 187, 120, 0.15)',
                  borderColor: 'rgba(72, 187, 120, 0.25)'
                }
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Box 
                  sx={{ 
                    width: 4, 
                    height: 20, 
                    backgroundColor: '#48BB78',
                    borderRadius: 1,
                    mr: 1
                  }} 
                />
                Top Songs
              </Typography>
              <Box sx={{ 
                flex: 1,
                width: '100%',
                height: 'calc(100% - 40px)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '.recharts-wrapper': {
                  width: '100% !important',
                  height: '100% !important',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  left: 'auto',
                  right: 'auto',
                  bottom: 'auto',
                  top: 'auto',
                  '.recharts-surface': {
                    overflow: 'visible',
                    width: '100%',
                    height: '100%'
                  }
                }
              }}>
                <TopSongsChart data={formattedTopSongs} />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Streams Table */}
        <Grid container component="div" spacing={3}>
          <Grid item component="div" xs={12}>
            <Paper 
              sx={{ 
                p: 3,
                background: theme.palette.background.paper,
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  mb: 3
                }}
              >
                Recent Streams
              </Typography>
              <StreamsTable />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
};

export default Dashboard; 