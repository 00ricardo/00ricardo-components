import React, { Fragment } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import './style.css';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const caption = [
  { description: 'Origin Lot', color: 'orange' },
  { description: 'Lot Belongs to Source System', color: 'green' },
  { description: 'Cross Site Lot Relation', color: 'blue' },
  { description: 'Selected Lot', color: 'yellow' },
];

export default function HelperDialog({
  openHelperDialog,
  setOpenHelperDialog,
}) {
  return (
    <Fragment>
      <Dialog
        open={openHelperDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenHelperDialog(false)}
      >
        <DialogTitle sx={{ backgroundColor: '#282828', color: '#fff' }}>
          What does this graph mean?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is a Lot Relationship Graph which represents all the relations
            associated to an origin lot. Here you can find the branching of all
            the relationships that LDS found for the given lot.
          </DialogContentText>
          <DialogContentText>
            {caption.map((cap, idx) => (
              <div
                key={idx}
                style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
              >
                <div className={`circle ${cap.color}`} />
                <span>{cap.description}</span>
              </div>
            ))}
          </DialogContentText>
          <DialogContentText>
            The network may change over the time according to the lot activity
            and party operations.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            sx={{ backgroundColor: '#282828' }}
            onClick={() => setOpenHelperDialog(false)}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
