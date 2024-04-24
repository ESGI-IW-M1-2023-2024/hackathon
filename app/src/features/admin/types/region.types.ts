export interface Region {
  id: number;
  label: string|null;
  country: string|null;
  countryName: string|null;
}

export interface NewRegion extends Omit<Region, 'id' | 'countryName'> {

}

export interface EditRegion extends Omit<Region, 'countryName'> {

}

export enum RegionsSortableField {
  'ID' = 'id',
  'LABEL' = 'label',
}
