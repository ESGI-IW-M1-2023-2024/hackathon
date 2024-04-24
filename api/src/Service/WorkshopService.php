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
        // Fetch workshop delay
        $delay = $this->parameterBag->get('app.workshop.reminder_delay');

        $workshops = $this->workshopRepository->findByDelay($delay);

        $outputInterface->writeln($delay);
    }
}
