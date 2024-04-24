<?php

namespace App\Service;

use App\Repository\WorkshopRepository;
use Doctrine\ORM\EntityManagerInterface;
use MailerEnum;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class WorkshopService
{
    public function __construct(
        private ParameterBagInterface $parameterBag,
        private WorkshopRepository $workshopRepository,
        private MailerService $mailerService,
        private EntityManagerInterface $entityManager
    ) {
    }

    public function workshopReminderHandler(OutputInterface $outputInterface)
    {
        $delay = $this->parameterBag->get('app.workshop.reminder_delay');

        $workshops = $this->workshopRepository->findByDelay($delay);

        if (empty($workshops)) {
            $outputInterface->writeln('Aucun atelier à venir dans les ' . $delay . ' jours');
            return;
        }

        $outputInterface->writeln(sizeof($workshops) . ' ateliers à venir');

        /** @var App\Entity\Workshop $workshop */
        foreach ($workshops as $workshop) {

            $outputInterface->writeln(
                sizeof($workshop->getValidatedBookings())
                    . ' mails à envoyer pour l\'atelier ' . $workshop->getTheme()->getLabel()
            );

            foreach ($workshop->getValidatedBookings() as $booking) {
                $this->mailerService->sendMail(MailerEnum::WORKSHOP_REMINDER, ['booking' => $booking]);
            }
            $workshop->setReminderSent(true);
        }

        $this->entityManager->flush();
    }
}