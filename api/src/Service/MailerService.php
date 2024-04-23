<?php

namespace App\Service;

use MailerEnum;
use Symfony\Component\Mailer\MailerInterface;

class MailerService
{
    public function __construct(
        private MailerInterface $mailerInterface
    ) {
    }

    public function sendMail(MailerEnum $mailerEnum, array $options)
    {
        match ($mailerEnum) {
            MailerEnum::BOOKING => null,
            MailerEnum::BOOKING_REMINDER => null,
            MailerEnum::BOOKING_VALIDATION => null,
            MailerEnum::BOOKING_VALIDATION => null,
            MailerEnum::WORKSHOP_REMINDER => null,
            MailerEnum::WORKSHOP_CANCELED => null,
            MailerEnum::WORKSHOP_FINISHED => null
        };
    }
}
