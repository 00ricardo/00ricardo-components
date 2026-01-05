import React, { useState, Fragment } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SHWizard from './SHWizard';
const SHForm = ({ req_id, req_title, open, handleClose, userid }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;
    console.log(email);
    handleClose();
  };

  return (
    <Fragment>
      <Dialog open={open} fullWidth>
        <DialogTitle>{req_title}</DialogTitle>
        <SHWizard />
        <DialogContent>
          <form onSubmit={handleSubmit} id='subscription-form'></form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit' form='subscription-form'>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default SHForm;
