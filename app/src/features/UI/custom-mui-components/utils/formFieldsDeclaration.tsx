/* eslint-disable @typescript-eslint/no-explicit-any */
import { ControllerFieldState, ControllerRenderProps, FieldValues } from 'react-hook-form';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { CheckboxField, ChoiceField, SimpleField } from '../../../../types/formField.types';

export const CustomTextField = (
  field: ControllerRenderProps<FieldValues, string>,
  fieldState: ControllerFieldState,
  options: SimpleField,
  props: { [key: string]: any },
): JSX.Element => {
  return (
    <TextField
      id={options.fieldId}
      label={options.label}
      fullWidth
      {...field}
      {...props}
      error={fieldState.error?.message !== undefined}
      helperText={fieldState.error?.message}
    />
  );
};

export const CustomCheckboxField = (
  field: ControllerRenderProps<FieldValues, string>,
  options: CheckboxField,
  props: { [key: string]: any },
): JSX.Element => {
  return (
    <FormControlLabel
      label={options.label}
      control={<Checkbox checked={options.checked ? true : false} />}
      {...field}
      {...props}
      sx={{ '& .MuiSvgIcon-root': { fontSize: options.size ?? 24 } }}
    />
  );
};

export const CustomSelect = (
  field: ControllerRenderProps<FieldValues, string>,
  fieldState: ControllerFieldState,
  options: ChoiceField,
  props: { [key: string]: any },
): JSX.Element => {
  const generateSelectOptions = () => {
    return options.items.map((option, index) => (
      <MenuItem key={option.value + index} value={option.value}>
        {option.text}
      </MenuItem>
    ));
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{options.label}</InputLabel>
      <Select label={options.label} {...field} {...props}>
        {generateSelectOptions()}
      </Select>
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
};
