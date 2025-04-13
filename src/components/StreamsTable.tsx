import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  TablePagination,
  TableSortLabel,
  useTheme,
  Typography,
  Chip,
} from '@mui/material';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { mockData } from '../utils/mockData';

const StreamsTable = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState<keyof typeof mockData.streams[0]>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof typeof mockData.streams[0]) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortField(field);
  };

  const filteredAndSortedData = mockData.streams
    .filter((row) => {
      if (!filter) return true;
      const searchTerm = filter.toLowerCase();
      
      // Get related song and user data
      const song = mockData.songs.find(s => s.id === row.songId);
      const user = mockData.users.find(u => u.id === row.userId);
      
      // Search across multiple fields
      return (
        song?.title?.toLowerCase().includes(searchTerm) ||
        song?.artist?.toLowerCase().includes(searchTerm) ||
        song?.genre?.toLowerCase().includes(searchTerm) ||
        user?.name?.toLowerCase().includes(searchTerm) ||
        row.country.toLowerCase().includes(searchTerm) ||
        row.device.toLowerCase().includes(searchTerm)
      );
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const direction = sortDirection === 'asc' ? 1 : -1;

      if (aValue instanceof Date && bValue instanceof Date) {
        return direction * (aValue.getTime() - bValue.getTime());
      }
      return direction * (String(aValue).localeCompare(String(bValue)));
    });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Recent Streams
          </Typography>
          <TextField
            label="Search streams"
            placeholder="Search by song, artist, genre, user, country, or device"
            variant="outlined"
            fullWidth
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{ mb: 1 }}
          />
          <Typography variant="caption" color="text.secondary">
            Try searching for: "Taylor Swift", "Sardar", "Pop", "Punjabi", "Mobile", "US"
          </Typography>
        </Box>

        <TableContainer 
          component={Paper}
          sx={{ 
            borderRadius: 2,
            boxShadow: theme.shadows[2]
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortField === 'timestamp'}
                    direction={sortField === 'timestamp' ? sortDirection : 'asc'}
                    onClick={() => handleSort('timestamp')}
                  >
                    Date
                  </TableSortLabel>
                </TableCell>
                <TableCell>Song</TableCell>
                <TableCell>Artist</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell>User</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === 'device'}
                    direction={sortField === 'device' ? sortDirection : 'asc'}
                    onClick={() => handleSort('device')}
                  >
                    Device
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === 'country'}
                    direction={sortField === 'country' ? sortDirection : 'asc'}
                    onClick={() => handleSort('country')}
                  >
                    Country
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAndSortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const song = mockData.songs.find(s => s.id === row.songId);
                  const user = mockData.users.find(u => u.id === row.userId);
                  return (
                    <TableRow key={row.id}>
                      <TableCell>
                        {format(row.timestamp, 'MMM d, yyyy h:mm a')}
                      </TableCell>
                      <TableCell>{song?.title}</TableCell>
                      <TableCell>{song?.artist}</TableCell>
                      <TableCell>
                        <Chip 
                          label={song?.genre} 
                          size="small"
                          color={song?.genre === 'Pop' ? 'primary' : 'secondary'}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{user?.name}</TableCell>
                      <TableCell>
                        <Chip 
                          label={row.device} 
                          size="small"
                          color="default"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{row.country}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredAndSortedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </motion.div>
  );
};

export default StreamsTable; 