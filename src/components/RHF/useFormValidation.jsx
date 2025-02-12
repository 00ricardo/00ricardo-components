import React, { lazy } from 'react';
const TextField = lazy(() => import('@mui/material/TextField'));
const Select = lazy(() => import('@mui/material/Select'));
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import { useForm, FormProvider } from 'react-hook-form';
import yupValidationSchema from './yupValidationSchema';
const useFormValidation = ({
  name = '',
  label = '',
  variant = 'outlined',
  fieldType = '',
  error = false,
  helperText = '',
  helperTextError = '',
  options = [],
  style = {
    labelColor: 'inherit',
    borderColor: 'inherit',
    borderColorFocus: 'inherit',
    borderColorHover: 'inherit',
  },
  disabled = false,
  maxRows = 1,
}) => {
  const methods = useForm({
    resolver: async (data) => {
      const validationResult = await yupValidationSchema.validate(data, {
        abortEarly: false,
      });
      return {
        values: validationResult,
        errors: {},
      };
    },
  });
  const onSubmit = async (data) => {
    try {
      await yupValidationSchema.validate(data, { abortEarly: false });
      console.log(data); // Only log if validation passes
    } catch (err) {
      console.error(err); // Log validation errors
    }
  };
  const errors = methods.formState.errors;
  console.log(errors);
  console.log(methods);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {fieldType === 'text' && (
          <TextField
            sx={{
              '& .MuiInputLabel-root.Mui-focused': {
                color: style.labelColor,
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: style.borderColor,
                },
                '&:hover fieldset': {
                  borderColor: style.borderColorHover,
                },
                '&.Mui-focused fieldset': {
                  borderColor: style.borderColorFocus,
                },
              },
            }}
            label={label}
            variant={variant}
            error={error}
            helperText={error ? helperTextError : helperText}
            disabled={disabled}
            multiline={maxRows > 1}
            rows={maxRows}
          />
        )}
        {fieldType === 'select' && (
          <FormControl
            sx={{
              '& .MuiInputLabel-root.Mui-focused': {
                color: style.labelColor, // Label color when focused
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: style.borderColor, // Default border color
                },
                '&:hover fieldset': {
                  borderColor: style.borderColorHover, // Border color when hovered
                },
                '&.Mui-focused fieldset': {
                  borderColor: style.borderColorFocus, // Border color when focused
                },
              },
            }}
            fullWidth
            error={error}
            disabled={disabled}
          >
            <InputLabel>{label}</InputLabel>
            <Select label={label}>
              {options.map((opt, idx) => (
                <MenuItem key={idx} value={opt.r}>
                  {opt.v}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {error ? helperTextError : helperText}
            </FormHelperText>
          </FormControl>
        )}
        <Button type='submit'>Submit</Button>
      </form>
    </FormProvider>
  );
};

export default useFormValidation;
