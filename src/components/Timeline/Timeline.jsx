import * as React from 'react';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SettingsIcon from '@mui/icons-material/Settings';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import BlurCircularIcon from '@mui/icons-material/BlurCircular';
import RoundaboutRightIcon from '@mui/icons-material/RoundaboutRight';
const steps = [
  {
    id: 1,
    event_code: 'LOT_CREATED',
    event_ts: '2025-12-01 10:00:00',
    source_lotlabel: 'R2540013',
    source_system: 'RBG',
  },
  {
    id: 2,
    event_code: 'RELATION_CREATED',
    event_ts: '2025-12-05 12:43:09',
    source_lotlabel: 'R2540013',
    source_system: 'RBG',
    target_lotlabel: 'K2500123',
    target_source_system: 'KLM',
    relation: 'SOURCE',
  },
  {
    id: 3,
    event_code: 'MAVERICK_CREATED',
    event_ts: '2025-12-29 01:00:09',
    source_lotlabel: 'R2540013',
    source_system: 'RBG',
    relation: 'SPLIT',
    reported: '2025-12-06 18:11:11',
    solved: null,
  },
  {
    id: 4,
    event_code: 'COPY_CREATED',
    event_ts: '2025-12-29 01:00:09',
    source_lotlabel: 'R2540013',
    source_system: 'RBG',
    target_lotlabel: 'R2540013.1',
    target_source_system: 'KLM',
    reported: '2025-12-06 18:11:11',
    parent_lot: 'R2540013',
    parent_system: 'RBG',
    origin_lot: 'R2540013',
    origin_system: 'RBG',
    solved: null,
  },
];

const eventMapping = {
  LOT_CREATED: {
    main_description: 'Lot #SOURCE_LOTLABEL# (#SOURCE_SYSTEM#) Created.',
    description: [],
    icon: () => <BlurCircularIcon color='error' />,
  },
  RELATION_CREATED: {
    main_description:
      'Lot #SOURCE_LOTLABEL# (#SOURCE_SYSTEM#) #RELATION# to #TARGET_LOTLABEL# (#TARGET_SOURCE_SYSTEM#).',
    description: [],
    icon: () => <RoundaboutRightIcon color='info' />,
  },
  MAVERICK_CREATED: {
    main_description: 'Maverick Created.',
    description: ['Date of Deviation: #REPORTED#', 'Solved: #SOLVED#'],
    icon: () => <ErrorOutlineIcon color='info' />,
  },
  COPY_CREATED: {
    main_description: 'Maverick Copied to #SOURCE_LOTLABEL# (#SOURCE_SYSTEM#).',
    description: [
      'Date of Deviation: #REPORTED#',
      'Solved: #SOLVED#',
      'Parent Lot: #PARENT_LOT# (#PARENT_SYSTEM#); Origin Lot: #ORIGIN_LOT# (#ORIGIN_SYSTEM#)',
      '',
    ],

    icon: () => <ErrorOutlineIcon color='info' />,
  },
};

const replaceMetadata = (metadata, step) => {
  return metadata
    .replace('#SOURCE_LOTLABEL#', step.source_lotlabel)
    .replace('#SOURCE_SYSTEM#', step.source_system)
    .replace('#TARGET_LOTLABEL#', step.target_lotlabel)
    .replace('#TARGET_SOURCE_SYSTEM#', step.target_source_system)
    .replace('#RELATION#', step.relation)
    .replace('#REPORTED#', step.reported)
    .replace('#SOLVED#', step.solved ? step.solved : 'No')
    .replace('#PARENT_LOT#', step.parent_lot)
    .replace('#PARENT_SYSTEM#', step.parent_system)
    .replace('#ORIGIN_LOT#', step.origin_lot)
    .replace('#ORIGIN_SYSTEM#', step.origin_system);
};

const Timeline = () => {
  const getStepDescription = (step) => {
    const mapping = eventMapping[step.event_code].description;
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {mapping.map((des) => (
          <Typography variant='caption' color='info.main'>
            {replaceMetadata(des, step)}
          </Typography>
        ))}
      </div>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={10} orientation='vertical'>
        {steps.map((s) => {
          return (
            <Step key={s.id}>
              <StepLabel
                StepIconComponent={eventMapping[s.event_code].icon}
                optional={
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='caption' color='error'>
                      {getStepDescription(s)}
                    </Typography>
                    <Typography variant='caption' color='info.main'>
                      {s.event_ts}
                    </Typography>
                  </div>
                }
              >
                {replaceMetadata(
                  eventMapping[s.event_code].main_description,
                  s
                )}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};
export default Timeline;
