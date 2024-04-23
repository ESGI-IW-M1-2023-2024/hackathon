<?php

namespace App\Enum;
enum BookingStatus: string
{
    case PENDING = 'pending';
    case PAID = 'paid';
    case CANCELED = 'canceled';
}

