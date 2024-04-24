export interface Organisation {
    id: number;
    label: string|null;
    logoFilename: string|null;
    archived: 0 | 1;
}

export interface NewOrganisation extends Omit<Organisation, 'logoFilename' | 'id' | 'archived'> {
    logoFile?: string|null;
}

export interface EditOrganisation extends NewOrganisation {
    id: number;
}

export enum OrganisationsSortableField {
    'ID' = 'id',
    'LABEL' = 'label',
}