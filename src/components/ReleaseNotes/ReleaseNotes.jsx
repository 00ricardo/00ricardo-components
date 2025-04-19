import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import Editor from './Editor';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
export default function ReleaseNotes() {
  const [title, setTitle] = useState('');
  const [component, setComponent] = useState('DASHBOARD');
  const [releaseDate, setReleaseDate] = useState(dayjs());
  const handleChange = (event) => {
    setComponent(event.target.value);
  };

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            LDS Release Note
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: '50px 0px' }}>
        <Box sx={{ display: 'flex', gap: 1, padding: '5px 0px' }}>
          <TextField
            label='Release Title'
            value={title}
            placeholder='Release Title'
            onChange={(event) => setTitle(event.target.value)}
          />
          <FormControl sx={{ width: 200 }}>
            <InputLabel>Component</InputLabel>
            <Select value={component} label='Component' onChange={handleChange}>
              <MenuItem value={'DASHBOARD'}>Dashboard</MenuItem>
              <MenuItem value={'TASK_MANAGER'}>Task Manager</MenuItem>
              <MenuItem value={'REPORT_MAVERICK'}>Report Maverick</MenuItem>
              <MenuItem value={'CASE_MANAGEMENT_TOOL'}>
                Case Management
              </MenuItem>
              <MenuItem value={'SHIPMENT_HOLD'}>Shipment Hold</MenuItem>
              <MenuItem value={'OTHER'}>Other</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format='D/M/YYYY'
              label='Release Date'
              value={releaseDate}
              onChange={(newDate) => setReleaseDate(newDate)}
            />
          </LocalizationProvider>
        </Box>
        <Editor />
      </Box>
    </div>
  );
}
