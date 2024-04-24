export interface Region {
  id: number;
  label: string|null;
  country: string|null;
}

export interface NewRegion extends Omit<Region, 'id'> {

}

export enum RegionsSortableField {
  'ID' = 'id',
  'LABEL' = 'label',
}
