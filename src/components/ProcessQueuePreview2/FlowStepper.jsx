import * as React from 'react';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import UndoIcon from '@mui/icons-material/Undo';
import { GREEN, GREY_DISABLED, ORANGE, GREY } from './colors';
const steps = [
  {
    label: 'Send a Request from LDS UI',
    description: `This is the initial step of the workflow. 
        A user can perform multiple and different operations in the LDS application (e.g., report a maverick, postpone, delegate, solve, etc...).
        If the request is made for an OS object, an "INITIAL_REQUEST" message is added to the Process Queue. 
        In the other hand, whether the request is made for a CSA object, a "CHANGE_REQUEST" message is created.
        The "INITIAL_REQUEST" is a generic message indicating that a new UI request must be routed/propagated to the appropriate OS instance.`,
  },
  {
    label: 'Request Propagation/Local Execution',
    description: `The Process Queue parses the payload and sends a "CHANGE_REQUEST" to the appropriate OS instance.
        If the request concerns a CSA change, it is handled locally by LDSI_OWNER meaning that it is not propagated.`,
  },
  {
    label: 'Remote change',
    description: `This step is only relevant for OS changes. The process queue parses the payload and execute the changes locally. 
    As a result, a "SYNC_REQUEST" message is created and sent back to the global instance (LDSI_OWNER).
    The "SYNC_REQUEST" message serves two purposes: 
    (1) Indicates whether the change in the OS instance was successfully processed or failed; 
    (2) Instructs the global instance to proceed with data replication. In other words, it must synchronize its state with the global instance.`,
  },
  {
    label: 'Request confirmation',
    description: `Either success or failure, the global instance (LDSI_OWNER) must confirm it's synchonization status to the instance.
    That said, a "SYNC_RESPONSE" message is created and sent as confirmation. 
    This message is used to inform the OS instance about the success or failure of the synchronization process. 
    In case of failure, the OS instance is responsible to react upon and take appropriate actions to resync. 
    This means that the OS instance must reprocess the request and send a new "SYNC_REQUEST" message to the global instance (LDSI_OWNER).
    A maximun of 5 retries is allowed. If the request fails after 5 retries, the OS instance stops resyncing and developers are notified for further analysis.`,
  },
];

export default function FlowStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 300 }}>
      <AppBar
        position='static'
        sx={{
          backgroundColor: GREY,

          padding: '0.25rem',
        }}
      >
        <Typography variant='h6' color='inherit' component='div'>
          Process Queue Flow
        </Typography>
      </AppBar>
      <div style={{ padding: '10px' }}>
        <Stepper activeStep={activeStep} orientation='vertical'>
          {steps.map((step, index) => (
            <Step
              key={step.label}
              sx={{
                '& .MuiStepIcon-root': {
                  '&.Mui-active': {
                    color: ORANGE,
                  },
                  '&.Mui-completed': {
                    color: GREEN,
                  },
                  'color': GREY_DISABLED,
                },
              }}
            >
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography style={{ maxHeight: 195, overflowY: 'auto' }}>
                  {step.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant='contained'
                    size='small'
                    onClick={handleBack}
                    disabled={index === 0}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Step Back
                  </Button>
                  <Button
                    variant='contained'
                    size='small'
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Next Step'}
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ width: 300 }}>
            <Typography>Process Queue flow finished.</Typography>
            <Button
              variant='contained'
              size='small'
              onClick={handleReset}
              sx={{ mt: 1, mr: 1 }}
              endIcon={<UndoIcon />}
            >
              Recap flow
            </Button>
          </Paper>
        )}
      </div>
    </Box>
  );
}
