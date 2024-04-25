import { Region } from '@/features/admin/types/region.types';

export interface Wine {
  id: number;
  label: string | null;
  productYear: number | null;
  producer: string | null;
  grapeVariety: string | null;
  alcoholLevel: number | null;
  color: string | null;
  quantity: number | null;
  bottleSize: string | null;
  comments: string | null;
  region: Region | null;
  servingTemperature: number | null;
  storage: string | null;
  upTo: string | null;
  byTaste: string | null;
  byEye: string | null;
  onTheNose: string | null;
  inTheMouth: string | null;
  winePairing: string | null;
  recommandedPairing: string | null;
  content: string | null;
  imageFilename: string | null;
  archived: 0 | 1;
}

export interface NewWine extends Omit<Wine, 'id' | 'imageFilename' | 'archived'> {
  file: string | null;
}

export interface EditWine extends Wine {}

export enum WinesSortableField {
  'ID' = 'id',
  'LABEL' = 'label',
}
