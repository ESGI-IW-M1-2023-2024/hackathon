<?php

enum WorkshopStatus: string
{
    case HIDDEN = 'hidden';

    case BOOKING = 'booking';
    case CLOSED = 'closed';
    case FINISHED = 'finished';
    case CANCELED = 'canceled';
}

