import { BookingGivenWorkshop } from './workshop.types';

export interface Booking {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  schoolClass: string;
  status: string;
  reference: string;
  workshop: BookingGivenWorkshop;
  archived: boolean;
}

export interface CreateBooking {
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  schoolClass: string | null;
  workshopId: number;
}

export interface WorkshopBooking extends Omit<Booking, 'workshop' | 'archived'> {}

export enum BookingStatus {
  'PENDING' = 'pending',
  'PAID' = 'paid',
  'CANCELED' = 'canceled',
}
