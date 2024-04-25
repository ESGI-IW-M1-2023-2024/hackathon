import { Organisation } from './organisation.types';
import { Theme } from './theme.types';

export interface WorkshopBooking {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  schoolClass: string;
  status: string;
  reference: string;
}

export interface Workshop {
  id: number;
  dateStart: Date;
  length: number;
  maxPerson: number;
  location: string;
  status: string;
  maxBookingDate: Date;
  organisation: Organisation;
  theme: Theme;
  numberOfWines: number;
  numberOfBookings: number;
  price: number;
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
