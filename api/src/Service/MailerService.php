<?php

namespace App\Service;

use EnvProcessorService;
use MailerEnum;
use Psr\Log\LoggerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;

class MailerService
{
    private const EMAIL_SENDER = "noreply@boennologie.fr";
    private $sender;

    public function __construct(
        private MailerInterface $mailer,
        private LoggerInterface $logger,
        private ParameterBagInterface $parameterBag
    ) {
        $this->sender = $parameterBag->get('app.mailer.sender');
    }

    /**
     * Pour chaque mail à envoyer créer la fonction correspondante et l'appeler directement depuis le code
     * Cette fonction ne sert qu'a lister les emails possibles
     */
    public function sendMail(MailerEnum $mailerEnum, array $context)
    {
        $email = match ($mailerEnum) {
            MailerEnum::BOOKING => $this->sendMailBooking($context),
            MailerEnum::BOOKING_REMINDER => $this->sendMailBookingReminder($context),
            MailerEnum::BOOKING_VALIDATION => $this->sendMailBookingValidation($context),
            MailerEnum::BOOKING_CANCELED => $this->sendMailBookingCanceled($context),
            MailerEnum::WORKSHOP_REMINDER => $this->sendMailWorkshopReminder($context),
            MailerEnum::WORKSHOP_CANCELED => null,
            MailerEnum::WORKSHOP_FINISHED => $this->sendMailWorkshopFinished($context)
        };

        try {
            $this->mailer->send($email);
        } catch (TransportExceptionInterface $e) {
            $this->logger->error($e->getMessage());
        }
    }

    private function sendMailBookingReminder(array $context): TemplatedEmail
    {
        return (new TemplatedEmail())
            ->from(self::EMAIL_SENDER)
            ->to($context["booking"]->getEmail())
            ->subject("Rappel paiement atelier : " . $context["booking"]->getWorkshop()->getTheme()->getLabel())
            ->htmlTemplate('emails/booking/booking_reminder.html.twig')
            ->context(['booking' => $context["booking"]]);
    }

    private function sendMailBookingCanceled(array $context): TemplatedEmail
    {
        return (new TemplatedEmail())
            ->from(self::EMAIL_SENDER)
            ->to($context["booking"]->getEmail())
            ->subject("Annulation inscription sur l'atelier : " . $context["booking"]->getWorkshop()->getTheme()->getLabel())
            ->htmlTemplate('emails/booking/booking_canceled.html.twig')
            ->context(['booking' => $context["booking"]]);
    }

    private function sendMailBookingValidation(array $context): TemplatedEmail
    {
        return (new TemplatedEmail())
            ->from(self::EMAIL_SENDER)
            ->to($context["booking"]->getEmail())
            ->subject("Confirmation inscription sur l'atelier : " . $context["booking"]->getWorkshop()->getTheme()->getLabel())
            ->htmlTemplate('emails/booking/booking_validation.html.twig')
            ->context(['booking' => $context["booking"]]);
    }

    private function sendMailBooking(array $context): TemplatedEmail
    {
        return (new TemplatedEmail())
            ->from(self::EMAIL_SENDER)
            ->to($context["booking"]->getEmail())
            ->subject("Inscription sur l'atelier : " . $context["booking"]->getWorkshop()->getTheme()->getLabel())
            ->htmlTemplate('emails/booking/booking_request.html.twig')
            ->context(['booking' => $context["booking"]]);
    }

    private function sendMailWorkshopReminder(array $context): TemplatedEmail
    {
        /**
         * @var Booking $booking
         */
        $booking = $context["booking"];

        return (new TemplatedEmail())
            ->from($this->sender)
            ->to($booking->getEmail())
            ->subject("Boennologie - Rappel d'atelier")
            ->htmlTemplate('emails/workshop/reminder.html.twig')
            ->context(['workshop' => $booking->getWorkshop()]);
    }

    private function sendMailWorkshopFinished(array $context)
    {
        /** @var Booking $booking */
        $booking = $context['booking'];

        return (new TemplatedEmail())
            ->from($this->sender)
            ->to($booking->getEmail())
            ->subject('Boennologie - Récapitulatif d\'atelier')
            ->htmlTemplate('emails/workshop/finished.html.twig')
            ->context(['workshop' => $booking->getWorkshop()]);
    }
}
