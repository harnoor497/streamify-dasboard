import { Box, Drawer, AppBar, Toolbar, Typography, List, ListItemButton, ListItemIcon, ListItemText, TextField, Autocomplete } from '@mui/material';
import { MusicNote, Dashboard as DashboardIcon, Analytics, People } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 240;

// Sample data for filters
const artists = [
  { label: 'Taylor Swift', genre: 'Pop' },
  { label: 'Sardar', genre: 'Punjabi' },
  { label: 'Ed Sheeran', genre: 'Pop' },
  { label: 'Arijit Singh', genre: 'Bollywood' },
  { label: 'BTS', genre: 'K-Pop' }
];

const genres = ['Pop', 'Punjabi', 'Rock', 'Hip Hop', 'Classical', 'Bollywood', 'K-Pop'];
const regions = ['US', 'India', 'UK', 'Canada', 'Australia'];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const [searchFilters, setSearchFilters] = useState({
    artist: '',
    genre: '',
    region: ''
  });

  const handleFilterChange = (type: 'artist' | 'genre' | 'region', value: string) => {
    setSearchFilters(prev => ({
      ...prev,
      [type]: value
    }));
    // Here you would typically trigger a search/filter action
    console.log('Search filters updated:', { ...searchFilters, [type]: value });
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Analytics', icon: <Analytics />, path: '/analytics' },
    { text: 'Users', icon: <People />, path: '/users' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'white',
        color: '#1F2937',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <Toolbar sx={{ gap: 2 }}>
          <MusicNote sx={{ color: '#6B46C1' }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <Typography 
              variant="h6" 
              noWrap 
              component="div"
              sx={{ 
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              Streamify
              <Typography 
                component="span" 
                sx={{ 
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: '#6B7280',
                  ml: 1
                }}
              >
                Analytics Dashboard
              </Typography>
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Autocomplete
                size="small"
                options={artists}
                getOptionLabel={(option) => option.label}
                value={artists.find(a => a.label === searchFilters.artist) || null}
                onChange={(_, newValue) => handleFilterChange('artist', newValue?.label || '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search Artist"
                    sx={{ 
                      width: 200,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: '#F3F4F6'
                      }
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body2">{option.label}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {option.genre}
                      </Typography>
                    </Box>
                  </li>
                )}
              />
              <Autocomplete
                size="small"
                options={genres}
                value={searchFilters.genre}
                onChange={(_, newValue) => handleFilterChange('genre', newValue || '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search Genre"
                    sx={{ 
                      width: 200,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: '#F3F4F6'
                      }
                    }}
                  />
                )}
              />
              <Autocomplete
                size="small"
                options={regions}
                value={searchFilters.region}
                onChange={(_, newValue) => handleFilterChange('region', newValue || '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search Region"
                    sx={{ 
                      width: 200,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: '#F3F4F6'
                      }
                    }}
                  />
                )}
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.text}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 