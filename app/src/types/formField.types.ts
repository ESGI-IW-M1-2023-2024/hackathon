import { AutocompleteInputChangeReason } from '@mui/material';
import { SyntheticEvent } from 'react';

export type ChoiceItems = {
  text: string;
  value: string;
};

export interface SimpleField {
  label: string;
  fieldId?: string;
}

export interface CheckboxField extends SimpleField {
  checked?: boolean;
  size?: number;
}

export interface ChoiceField extends SimpleField {
  items: ChoiceItems[];
}

export type Option = { label: string; id: number };

export interface AutoCompleteFieldOpts {
  items: Option[];
  inputLabel: string;
  noOptionsText: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChangeExtraProcessing?: (value?: any) => void;
  handleOnInputChange?: (
    event: SyntheticEvent<Element, Event>,
    value: string,
    reason: AutocompleteInputChangeReason,
  ) => void | undefined;
  fieldId?: string;
  required?: boolean;
  checkbox?: boolean;
}
