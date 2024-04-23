export interface Theme {
  id: number;
  label: string;
  content: string;
  subtitle?: string;
  headerFilename: string;
}

export enum ThemesSortableField {
  'ID' = 'id',
  'LABEL' = 'label',
}
