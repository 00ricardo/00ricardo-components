import React, { useMemo } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';

const SlotScheduler = ({
  field,
  onSlotSelect,
  defaultValue,
  disabled,
  pickedSlots,
}) => {
  const generatedSlotsByDay = useMemo(() => {
    return field.options.map((config) => {
      if (!config.from || !config.until || !config.slot_time)
        return { ...config, slots: [] };

      const { from, until, slot_time, unavailable = [] } = config;
      const slots = [];
      const start = new Date(`1970-01-01T${from}:00`);
      const end = new Date(`1970-01-01T${until}:00`);
      let current = new Date(start);

      let id = 1;
      while (current < end) {
        const timeString = current.toTimeString().slice(0, 5); // HH:MM
        const next = new Date(current.getTime() + slot_time * 60000);
        const slotTime = `${timeString} - ${next.toTimeString().slice(0, 5)}`;
        const available = !unavailable.includes(timeString);
        slots.push({
          id: `${config.id}-${id}`,
          time: slotTime,
          available,
          startTime: timeString,
          dayId: config.id,
        });
        current = next;
        id++;
      }
      return { ...config, slots };
    });
  }, [field.options]);

  const handleSlotClick = (slot) => {
    if (slot.available) {
      onSlotSelect(slot);
    }
  };

  const pickedByOtherUsers = pickedSlots?.filter(
    (ps) => ps.id !== defaultValue?.id,
  );

  return (
    <Box>
      <Typography variant='subtitle1' gutterBottom>
        {field.label}
      </Typography>
      {defaultValue && (
        <Typography variant='body2' sx={{ color: 'orange' }}>
          Selected: {defaultValue.time} on{' '}
          {generatedSlotsByDay.find((d) => d.id === defaultValue.dayId)?.day}
        </Typography>
      )}
      <Grid
        sx={{ flexWrap: 'nowrap', justifyContent: 'space-between' }}
        container
      >
        {generatedSlotsByDay.map((dayConfig) => (
          <Grid
            sx={{
              minWidth: '40%',
              maxWidth: '50%',
              maxHeight: '400px',
              overflow: 'auto',
            }}
            key={dayConfig.id}
          >
            <Typography variant='subtitle2'>{dayConfig.day}</Typography>
            <Grid
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
              container
              spacing={2}
            >
              {dayConfig.slots.map((slot) => (
                <Grid key={slot.id}>
                  <Button
                    size='small'
                    variant={
                      defaultValue?.id === slot.id ? 'contained' : 'outlined'
                    }
                    color={defaultValue?.id === slot.id ? 'primary' : 'default'}
                    fullWidth
                    disabled={
                      dayConfig.disabled ||
                      !slot.available ||
                      disabled ||
                      pickedByOtherUsers?.some((ps) => ps.id === slot.id)
                    }
                    onClick={() => handleSlotClick(slot)}
                    sx={{
                      py: 1,
                      textTransform: 'none',
                    }}
                  >
                    {slot.time}
                    {!slot.available && ' (Unavailable)'}
                    {pickedByOtherUsers?.some((ps) => ps.id === slot.id) &&
                      ' (Booked)'}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SlotScheduler;
