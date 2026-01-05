import React, { useState } from 'react';
import SHForm from './SHForm';
import SHDetailsOverview from './SHDetailsOverview';
import SHApprovalDistributionList from './SHApprovalDistributionList';
import Box from '@mui/material/Box';
const SHWrapper = ({
  req_id = undefined,
  req_title = undefined,
  userid = 'DBRI',
}) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <SHForm
        req_id={req_id}
        req_title={req_title}
        userid={userid}
        open={open}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default SHWrapper;
