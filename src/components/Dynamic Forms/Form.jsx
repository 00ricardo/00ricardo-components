import React, { Fragment, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';
import Badge from '@mui/material/Badge';
import SlotScheduler from './SlotScheduler';

const Form = ({ open, setOpen, form, userid }) => {
  const isDueDatePassed = form.due_date
    ? new Date(form.due_date) < new Date()
    : false;
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const initialValues = {};
    form.fields.forEach((field) => {
      const response = getUserResponseForField(field.label);
      if (response !== null) {
        initialValues[field.label] = {
          field_id: field.id,
          field_type: field.type,
          value: response,
          timestamp: new Date().toISOString(),
          userid: userid,
        };
      }
    });
    setFormValues(initialValues);
  }, [form, userid]);

  const validateForm = () => {
    const newErrors = {};
    form.fields.forEach((field) => {
      if (field.required) {
        const value = formValues[field.label]?.value;

        if (!value || (field.type === 'text' && value.trim() === '')) {
          newErrors[field.id] = `${field.label} is required.`;
        }

        if (!value || (Array.isArray(value) && value.length === 0)) {
          newErrors[field.id] = `${field.label} is required.`;
        }
      }
    });
    setErrors(newErrors);
    console.log('Validation Errors:', newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (validateForm()) {
      // Implement save logic here
      console.log('Form Values:', formValues);
      handleClose();
    }
  };

  const getUserResponseForField = (field) => {
    const formFields = form.fields || [];
    const response = formFields.find((f) => f.label === field && f.responses);
    const userResponse = response.responses.find((r) => r.userid === userid);
    console.log('User Response:', userResponse.value); // Replace with actual user ID
    return userResponse ? userResponse.value : null;
  };

  const MUIFields = {
    text: (field) => (
      <TextField
        key={field.id}
        label={field.label}
        variant='outlined'
        fullWidth
        required={field.required}
        defaultValue={
          formValues[field.label]?.value ||
          getUserResponseForField(field.label) ||
          ''
        }
        disabled={isDueDatePassed}
        error={!!errors[field.id]}
        helperText={errors[field.id]}
        onChange={(e) => {
          setFormValues((prev) => ({
            ...prev,
            [field.label]: {
              field_id: field.id,
              field_type: field.type,
              value: e.target.value,
              timestamp: new Date().toISOString(),
              userid: userid,
            },
          }));
          if (errors[field.id]) {
            setErrors((prev) => ({ ...prev, [field.id]: undefined }));
          }
        }}
      />
    ),
    select: (field) => (
      <FormControl
        key={field.id}
        fullWidth
        required={field.required}
        disabled={isDueDatePassed}
        error={!!errors[field.id]}
      >
        <InputLabel>{field.label}</InputLabel>
        <Select
          label={field.label}
          defaultValue={
            formValues[field.label]?.value ||
            getUserResponseForField(field.label) ||
            ''
          }
          onChange={(e) => {
            setFormValues((prev) => ({
              ...prev,
              [field.label]: {
                field_id: field.id,
                field_type: field.type,
                value: e.target.value,
                timestamp: new Date().toISOString(),
                userid: userid,
              },
            }));
            if (errors[field.id]) {
              setErrors((prev) => ({ ...prev, [field.id]: undefined }));
            }
          }}
        >
          {field.options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        {errors[field.id] && (
          <Typography variant='caption' color='error' sx={{ mt: 1, ml: 1 }}>
            {errors[field.id]}
          </Typography>
        )}
      </FormControl>
    ),
    checkbox: (field) => (
      <FormControlLabel
        disabled={isDueDatePassed}
        key={field.id}
        control={
          <Checkbox
            defaultChecked={
              formValues[field.label]?.value ||
              getUserResponseForField(field.label) ||
              false
            }
            onChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                [field.label]: {
                  field_id: field.id,
                  field_type: field.type,
                  value: e.target.checked,
                  timestamp: new Date().toISOString(),
                  userid: userid,
                },
              }));
              if (errors[field.id]) {
                setErrors((prev) => ({ ...prev, [field.id]: undefined }));
              }
            }}
          />
        }
        label={field.label}
      />
    ),
    multiselect: (field) => (
      <FormGroup key={field.id}>
        <Typography variant='subtitle1'>{field.label}</Typography>
        {field.options.map((option) => (
          <FormControlLabel
            disabled={isDueDatePassed}
            key={option}
            control={
              <Checkbox
                defaultChecked={(
                  formValues[field.label]?.value ||
                  getUserResponseForField(field.label) ||
                  []
                ).includes(option)}
                onChange={(e) => {
                  const current = formValues[field.label]?.value || [];
                  const newValue = e.target.checked
                    ? [...current, option]
                    : current.filter((o) => o !== option);
                  setFormValues((prev) => ({
                    ...prev,
                    [field.label]: {
                      field_id: field.id,
                      field_type: field.type,
                      value: newValue,
                      timestamp: new Date().toISOString(),
                      userid: userid,
                    },
                  }));
                  if (errors[field.id]) {
                    setErrors((prev) => ({ ...prev, [field.id]: undefined }));
                  }
                }}
              />
            }
            label={option}
          />
        ))}
        {errors[field.id] && (
          <Typography variant='caption' color='error' sx={{ mt: 1 }}>
            {errors[field.id]}
          </Typography>
        )}
      </FormGroup>
    ),
    radio: (field) => (
      <FormControl
        key={field.id}
        component='fieldset'
        disabled={isDueDatePassed}
        error={!!errors[field.id]}
      >
        <Typography variant='subtitle1'>{field.label}</Typography>
        <RadioGroup
          defaultValue={
            formValues[field.label]?.value ||
            getUserResponseForField(field.label) ||
            ''
          }
          onChange={(e) => {
            setFormValues((prev) => ({
              ...prev,
              [field.label]: {
                field_id: field.id,
                field_type: field.type,
                value: e.target.value,
                timestamp: new Date().toISOString(),
                userid: userid,
              },
            }));
            if (errors[field.id]) {
              setErrors((prev) => ({ ...prev, [field.id]: undefined }));
            }
          }}
        >
          {field.options.map((option) => (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
        {errors[field.id] && (
          <Typography variant='caption' color='error' sx={{ mt: 1 }}>
            {errors[field.id]}
          </Typography>
        )}
      </FormControl>
    ),
    slot: (field) => {
      // Placeholder for SlotScheduler component
      return (
        <SlotScheduler
          key={field.id}
          field={field}
          defaultValue={
            formValues[field.label]?.value ||
            getUserResponseForField(field.label) ||
            null
          }
          disabled={isDueDatePassed}
          pickedSlots={
            field.responses
              ? field.responses
                  .filter((v) => v.userid !== userid)
                  .map((r) => r.value)
              : []
          }
          onSlotSelect={(slot) => {
            setFormValues((prev) => ({
              ...prev,
              [field.label]: {
                field_id: field.id,
                field_type: field.type,
                value: { ...slot },
                timestamp: new Date().toISOString(),
                userid: userid,
              },
            }));
            if (errors[field.id]) {
              setErrors((prev) => ({ ...prev, [field.id]: undefined }));
            }
          }}
        />
      );
    },
  };

  return (
    <Dialog sx={{ minWidth: 900 }} onClose={handleClose} open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }}>{form.title}</DialogTitle>
      <IconButton
        aria-label='close'
        onClick={handleClose}
        sx={() => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'grey',
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        dividers
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant='subtitle2'>
              Funchal in Office — {form.title}
            </Typography>
            {form.due_date && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
                  Due Date: {new Date(form.due_date).toLocaleDateString()}
                </Typography>
                {form.due_date && (
                  <Fragment>
                    <Badge
                      color={isDueDatePassed ? 'error' : 'success'}
                      variant='dot'
                    />
                    <Typography
                      variant='subtitle2'
                      sx={{ fontWeight: 'bold' }}
                      color={isDueDatePassed ? 'error' : 'success'}
                    >
                      {isDueDatePassed ? '(Past Due)' : '(Active)'}
                    </Typography>
                  </Fragment>
                )}
              </Box>
            )}
            {form.due_date && isDueDatePassed && (
              <Typography
                variant='subtitle2'
                sx={{ fontWeight: 'bold' }}
                color='error'
              >
                This form has expired and became read-only.
              </Typography>
            )}
          </Box>

          <Typography variant='subtitle2'>Created by {form.owner}</Typography>
        </Box>
        <Typography variant='body1'>{form.description}</Typography>
        {form.fields.map(
          (field) =>
            MUIFields[field.type]?.(field) || (
              <Typography key={field.id} color='error'>
                Unsupported field type: {field.type}
              </Typography>
            ),
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          startIcon={<SaveIcon />}
          onClick={handleSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Form;
