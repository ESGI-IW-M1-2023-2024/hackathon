/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, ControllerFieldState, ControllerRenderProps, FieldValues } from 'react-hook-form';
import { CheckboxField, ChoiceField, SimpleField } from '../../../../types/formField.types';
import { CustomCheckboxField, CustomSelect, CustomTextField } from '../utils/formFieldsDeclaration';

export interface CustomFormFieldProps {
  control: any;
  controlName: string;
  options: SimpleField | CheckboxField | ChoiceField;
  props?: { [key: string]: any };
  childrenComponentType: 'TEXT_FIELD' | 'CHECKBOX' | 'SELECT';
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
        return CustomCheckboxField(field, opts, props || {});
      }
      case 'SELECT': {
        const opts = options as ChoiceField;
        return CustomSelect(field, fieldState, opts, props || {});
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
