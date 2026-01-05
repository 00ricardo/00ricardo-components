import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import InfoIcon from '@mui/icons-material/Info';
import SummarizeIcon from '@mui/icons-material/Summarize';
import GroupsIcon from '@mui/icons-material/Groups';
import Button from '@mui/material/Button';
const ConnectorCSS = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgba(60, 60, 60, 1) 50%,rgba(242,113,33) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgba(60, 60, 60, 1) 50%,rgba(242,113,33) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));

const StepCSS = styled('div')(({ theme }) => ({
  backgroundColor: '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        backgroundImage:
          'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(242,113,33) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        backgroundImage:
          'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(242,113,33) 100%)',
      },
    },
  ],
}));

const steps = [
  {
    label: 'SH Case',
    // store a factory that returns the styled root with the icon inside
    icon: ({ ownerState }) => (
      <StepCSS ownerState={ownerState}>
        <InfoIcon />
      </StepCSS>
    ),
    active: false,
    completed: true,
  },
  {
    label: 'Data Overview',
    icon: ({ ownerState }) => (
      <StepCSS ownerState={ownerState}>
        <SummarizeIcon />
      </StepCSS>
    ),
    active: true,
    completed: false,
  },
  {
    label: 'Approval & Distribution List',
    icon: ({ ownerState }) => (
      <StepCSS ownerState={ownerState}>
        <GroupsIcon />
      </StepCSS>
    ),
    active: false,
    completed: false,
  },
];

const SHWizard = () => {
  const initial = steps.findIndex((s) => s.active);
  const [activeStep, setActiveStep] = useState(initial === -1 ? 0 : initial);

  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper alternativeLabel connector={<ConnectorCSS />}>
        {steps.map(({ label, icon, completed }, index) => {
          const isActive = index === activeStep;
          // treat `completed` as a distinct state from `active`
          const isCompleted = !!completed;
          return (
            <Step key={label} active={isActive} completed={isCompleted}>
              <StepLabel
                sx={{
                  '& .MuiStepLabel-label': {
                    color: isActive ? 'rgb(242,113,33)' : undefined,
                    fontWeight: isActive ? 600 : undefined,
                  },
                }}
                icon={
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveStep(index);
                    }}
                    aria-label={`Go to step ${index + 1}`}
                    sx={{
                      p: 0,
                      minWidth: 0,
                      background: 'transparent',
                      borderRadius: '50%',
                      display: 'inline-flex',
                    }}
                  >
                    {icon({
                      ownerState: { active: isActive, completed: isCompleted },
                    })}
                  </Button>
                }
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Stack>
  );
};
export default SHWizard;
