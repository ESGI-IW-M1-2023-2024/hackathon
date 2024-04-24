import { Organisation } from "./organisation.types";
import { Theme } from "./theme.types";

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
    resources: [];
    bookings: [];
    price: number;
}
