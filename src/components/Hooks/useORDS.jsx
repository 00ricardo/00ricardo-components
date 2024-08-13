import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useCustomFetch from '../../hooks/useORDS';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
const useORDS = ({ baseURL }) => {
  const [url, setURL] = useState(baseURL);
  const { data, isLoading, isError, refetch, mutate } = useCustomFetch(
    async () => await axios.get(url),
    null,
    {
      onSuccess: (data) => console.log('Data fetched successfully', data),
      onError: (error) => console.error('Error fetching data', error),
      intervalFetch: null,
      enabled: true, // Auto-fetch is enabled
      manual: true,
    }
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '2rem',
      }}
    >
      <TextField
        sx={{ minWidth: 600 }}
        required
        label='API URL'
        defaultValue={url}
        onChange={(e) => setURL(e.target.value)}
      />
      <Button variant='outlined' onClick={() => refetch()}>
        API Call
      </Button>
      <span>{JSON.stringify(data)}</span>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
};

export default useORDS;
