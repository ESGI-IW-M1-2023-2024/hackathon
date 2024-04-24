/* eslint-disable @typescript-eslint/no-explicit-any */
import { ControllerFieldState, ControllerRenderProps, FieldValues } from 'react-hook-form';
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { HTMLAttributes, useState } from 'react';
import { AutoCompleteFieldOpts, CheckboxField, ChoiceField, FileField, SimpleField } from '@/types/formField.types';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { MuiFileInput } from 'mui-file-input';
import { convertFileToBase64 } from './convert-file.util';

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

export const CustomAutocomplete = (
  field: ControllerRenderProps<FieldValues, string>,
  options: AutoCompleteFieldOpts,
  props: { [key: string]: any } = {},
): JSX.Element => {
  const renderOption = (props: HTMLAttributes<HTMLLIElement>, option: any, selected: boolean) => {
    if (options.checkbox) {
      return (
        <Box component='li' {...props} key={option.id}>
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
            checkedIcon={<CheckBoxIcon fontSize='small' />}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.label}
        </Box>
      );
    }
    return (
      <Box component='li' {...props} key={option.id}>
        {option.label}
      </Box>
    );
  };

  return (
    <Autocomplete
      {...field}
      options={options.items || []}
      getOptionLabel={(option) => option.label ?? ''}
      value={field.value}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'flip',
              enabled: false,
            },
          ],
        },
      }}
      ListboxProps={{
        style: {
          maxHeight: '250px',
        },
      }}
      onChange={(_event, data: AutoCompleteFieldOpts['items']) => {
        const selectAll = data?.find((option) => option.id === 0);
        if (data && selectAll) {
          return field.onChange(options.items.filter((obj) => obj.id !== selectAll.id));
        }

        if (data) {
          return field.onChange(data);
        }
      }}
      {...props}
      noOptionsText={options.noOptionsText}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option, { selected }) => renderOption(props, option, selected)}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            required={options.required ?? false}
            label={options.inputLabel}
            margin='dense'
            fullWidth
          />
        );
      }}
    />
  );
};

export const CustomFileField = (
  field: ControllerRenderProps<FieldValues, string>,
  fieldState: ControllerFieldState,
  options: FileField,
  props: { [key: string]: any },
): JSX.Element => {
  const handleChangeFileToBase64 = async (file: File | null) => {
    if (file) {
      const newFile = await convertFileToBase64(file);
      options.setValue('file', newFile);
    }
  };

  return (
    <MuiFileInput
      id={options.fieldId}
      label={options.label}
      placeholder={options.placeholder}
      fullWidth
      {...field}
      {...props}
      onChange={(event) => handleChangeFileToBase64(event)}
      error={fieldState.error?.message !== undefined}
      helperText={fieldState.error?.message}
      inputProps={options.fileTypes ? { accept: options.fileTypes.join(', ') } : {}}
      clearIconButtonProps={options.iconButton}
    />
  );
};
