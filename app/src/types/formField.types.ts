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
