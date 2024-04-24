<?php

namespace App\Service;

use App\Repository\WorkshopRepository;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class WorkshopService
{
    public function __construct(
        private ParameterBagInterface $parameterBag,
        private WorkshopRepository $workshopRepository
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

        // Send email for each bookers
        foreach ($workshops as $workshop) {
            foreach ($workshop->getValidatedBookings as $booking) {
                
            }
        }
}
