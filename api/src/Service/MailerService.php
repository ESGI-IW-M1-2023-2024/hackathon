<?php

namespace App\Service;

use EnvProcessorService;
use MailerEnum;
use Symfony\Component\Mailer\MailerInterface;

class MailerService
{
    // Email pour l'envoie des mails
    private $sender;

    public function __construct(
        private MailerInterface $mailerInterface,
    ) {
        $this->sender = getenv('MAILER_SENDER');
    }

    /**
     * Pour chaque mail à envoyer créer la fonction correspondante et l'appeler directement depuis le code
     * Cette fonction ne sert qu'a lister les emails possibles
     */
    public function sendMail(MailerEnum $mailerEnum)
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
