import { AutoCompleteFieldOpts, CheckboxField, ChoiceField, FileField, SimpleField } from '@/types/formField.types';
import { Controller, ControllerFieldState, ControllerRenderProps, FieldValues } from 'react-hook-form';
import {
  CustomAutocomplete,
  CustomCheckboxField,
  CustomFileField,
  CustomSelect,
  CustomTextField,
} from '../utils/formFieldsDeclaration';

export interface CustomFormFieldProps {
  control: any;
  controlName: string;
  options: SimpleField | CheckboxField | ChoiceField | AutoCompleteFieldOpts | FileField;
  props?: { [key: string]: any };
  childrenComponentType: 'TEXT_FIELD' | 'CHECKBOX' | 'SELECT' | 'AUTOCOMPLETE' | 'FILE_FIELD';
  label?: string;
}

const CustomFormField = ({ control, controlName, options, childrenComponentType, props }: CustomFormFieldProps) => {
  options.fieldId = controlName;
  const renderSwitch = (field: ControllerRenderProps<FieldValues, string>, fieldState: ControllerFieldState) => {
    switch (childrenComponentType) {
      case 'TEXT_FIELD': {
        const opts = options as SimpleField;
        return CustomTextField(field, fieldState, opts, props || {});
      }
      case 'CHECKBOX': {
        const opts = options as CheckboxField;
        return CustomCheckboxField(field, fieldState, opts, props || {});
      }
      case 'SELECT': {
        const opts = options as ChoiceField;
        return CustomSelect(field, fieldState, opts, props || {});
      }
      case 'AUTOCOMPLETE': {
        const opts = options as AutoCompleteFieldOpts;
        return CustomAutocomplete(field, opts, props || {});
      }
      case 'FILE_FIELD': {
        const opts = options as FileField;
        return CustomFileField(field, fieldState, opts, props || {});
      }
    }
  };

  return (
    <Controller
      name={controlName}
      control={control}
      render={({ field, fieldState }) => renderSwitch(field, fieldState)}
    />
  );
};

export default CustomFormField;
