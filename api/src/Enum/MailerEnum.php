<?php

enum MailerEnum: string
{
        // BOOKING Mails
    case BOOKING = "booking";
    case BOOKING_VALIDATION = "booking_validation";
    case BOOKING_REMINDER = "booking_reminder";
    case BOOKING_CANCELED = "booking_canceled";

        // WORKSHOP Mails
    case WORKSHOP_REMINDER = "workshop_reminder";
    case WORKSHOP_CANCELED = "workshop_canceled";
    case WORKSHOP_FINISHED = "workshop_finished";
}
