<?php

namespace App\Service;

use EnvProcessorService;
use MailerEnum;
use Psr\Log\LoggerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;

class MailerService
{
    private const EMAIL_SENDER = "noreply@boennologie.fr";

    public function __construct(
        private MailerInterface $mailer,
        private LoggerInterface $logger
    ) {
        $this->sender = getenv('MAILER_SENDER');
    }

    /**
     * Pour chaque mail à envoyer créer la fonction correspondante et l'appeler directement depuis le code
     * Cette fonction ne sert qu'a lister les emails possibles
     */
    public function sendMail(MailerEnum $mailerEnum, array $context)
    {
        match ($mailerEnum) {
            MailerEnum::BOOKING => $this->sendMailBooking($context),
            MailerEnum::BOOKING_REMINDER => $this->sendMailBookingReminder($context),
            MailerEnum::BOOKING_VALIDATION => $this->sendMailBookingValidation($context),
            MailerEnum::BOOKING_CANCELED => $this->sendMailBookingCanceled($context),
            MailerEnum::WORKSHOP_REMINDER => null,
            MailerEnum::WORKSHOP_CANCELED => null,
            MailerEnum::WORKSHOP_FINISHED => null
        };
    }

    private function sendMailBookingReminder(array $context): void
    {
        $email = (new TemplatedEmail())
            ->from(self::EMAIL_SENDER)
            ->to($context["booking"]->getEmail())
            ->subject("Rappel paiement atelier : " . $context["booking"]->getWorkshop()->getTheme()->getLabel())
            ->htmlTemplate('emails/booking/booking_reminder.html.twig')
            ->context(['booking' => $context["booking"]]);

        try {
            $this->mailer->send($email);
        } catch (TransportExceptionInterface $e) {
            $this->logger->error($e->getMessage());
        }
    }

    private function sendMailBookingCanceled(array $context): void
    {
        $email = (new TemplatedEmail())
            ->from(self::EMAIL_SENDER)
            ->to($context["booking"]->getEmail())
            ->subject("Annulation inscription sur l'atelier : " . $context["booking"]->getWorkshop()->getTheme()->getLabel())
            ->htmlTemplate('emails/booking/booking_canceled.html.twig')
            ->context(['booking' => $context["booking"]]);

        try {
            $this->mailer->send($email);
        } catch (TransportExceptionInterface $e) {
            $this->logger->error($e->getMessage());
        }
    }

    private function sendMailBookingValidation(array $context): void
    {
        $email = (new TemplatedEmail())
            ->from(self::EMAIL_SENDER)
            ->to($context["booking"]->getEmail())
            ->subject("Confirmation inscription sur l'atelier : " . $context["booking"]->getWorkshop()->getTheme()->getLabel())
            ->htmlTemplate('emails/booking/booking_validation.html.twig')
            ->context(['booking' => $context["booking"]]);

        try {
            $this->mailer->send($email);
        } catch (TransportExceptionInterface $e) {
            $this->logger->error($e->getMessage());
        }
    }

    private function sendMailBooking(array $context): void
    {
        $email = (new TemplatedEmail())
            ->from(self::EMAIL_SENDER)
            ->to($context["booking"]->getEmail())
            ->subject("Inscription sur l'atelier : " . $context["booking"]->getWorkshop()->getTheme()->getLabel())
            ->htmlTemplate('emails/booking/booking_request.html.twig')
            ->context(['booking' => $context["booking"]]);

        try {
            $this->mailer->send($email);
        } catch (TransportExceptionInterface $e) {
            $this->logger->error($e->getMessage());
        }
    }
}
