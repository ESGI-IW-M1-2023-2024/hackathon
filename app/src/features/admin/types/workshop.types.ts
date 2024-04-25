import { Organisation } from './organisation.types';
import { Theme } from './theme.types';
import { WorkshopWine } from './wine.types';

export interface WorkshopBooking {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  schoolClass: string;
  status: string;
  reference: string;
}

export enum WorkshopStatus {
  'HIDDEN' = 'hidden',
  'BOOKING' = 'booking',
  'CLOSED' = 'closed',
  'FINISHED' = 'finished',
  'CANCELED' = 'canceled',
}

export interface Workshop {
  id: number;
  dateStart: Date;
  length: number;
  maxPerson: number;
  location: string;
  status: WorkshopStatus;
  maxBookingDate: Date;
  organisation: Organisation;
  theme: Theme;
  numberOfWines: number;
  numberOfBookings: number;
  price: number;
}

export interface GetOneWorkshop extends Workshop {
  resources: [];
  booking: WorkshopBooking;
  wines: WorkshopWine[];
}

export interface BookingGivenWorkshop {
  id: number;
  dateStart: Date;
  length: number;
  maxPerson: number;
  location: string;
  status: string;
  maxBookingDate: Date;
  organisation: Organisation;
  price: number;
}

export enum WorkshopSortableField {
  'ID' = 'id',
}

export interface CreateWorkshop {
  dateStart: string;
  length: string;
  maxPerson: string;
  location: string;
  maxBookingDate: string;
  price: string;
  themeId: string;
  organisationId: string;
  wines: string[];
}

export interface EditWorkshop extends CreateWorkshop {
  id: number;
}
