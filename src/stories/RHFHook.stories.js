import useFormValidation from '../components/RHF/useFormValidation';

const meta = {
  title: 'Hooks/useFormValidation',
  component: useFormValidation,
  argTypes: {
    name: { type: 'string' },
    label: { type: 'string' },
    variant: {
      control: {
        type: 'select', // This creates a dropdown for variants
      },
      options: ['outlined', 'filled', 'standard'], // Your variant options
    },
    fieldType: {
      control: {
        type: 'select', // This creates a dropdown for field types
      },
      options: ['text', 'select'], // Your field type options
    },
    error: {
      type: 'boolean',
    },
    helperText: { type: 'string' },
    helperTextError: { type: 'string' },
    options: { type: 'array' },
    style: {
      type: 'object',
    },
    disabled: {
      type: 'boolean',
    },
  },
};
export default meta;
export const TextInput = {
  args: {
    name: 'system',
    label: 'System Code',
    variant: 'outlined',
    fieldType: 'text',
    error: false,
    helperText: 'String Field',
    helperTextError: 'Error',
    style: {
      labelColor: 'orange',
      borderColor: 'pink',
      borderColorFocus: 'green',
      borderColorHover: 'blue',
    },
    disabled: false,
    maxRows: 3,
  },
};
export const SelectInput = {
  args: {
    name: 'system',
    label: 'System Code',
    variant: 'outlined',
    fieldType: 'select',
    error: false,
    helperText: 'Select Field',
    helperTextError: 'Error',
    options: [
      {
        v: 'Promis and External Production',
        r: 'PROMIS_AND_EXTERNAL_PRODUCTION',
      },
      { v: 'RBG', r: 'RBG' },
      { v: 'KLM', r: 'KLM' },
      { v: 'PEN', r: 'PEN' },
      { v: 'WUX', r: 'WUX' },
    ],
    style: {
      labelColor: 'inherit',
      borderColor: 'inherit',
      borderColorFocus: 'inherit',
      borderColorHover: 'inherit',
    },
    disabled: true,
  },
};
