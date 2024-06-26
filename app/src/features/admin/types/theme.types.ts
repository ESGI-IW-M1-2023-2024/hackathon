export interface Theme {
  id: number;
  label: string;
  content: string;
  subtitle: string;
  headerFilename: string;
  archived: 0 | 1;
}

export interface NewTheme extends Omit<Theme, 'headerFilename' | 'id'> {
  file?: string;
}

export interface EditTheme extends NewTheme {
  id: number;
}

export enum ThemesSortableField {
  'ID' = 'id',
  'LABEL' = 'label',
}
