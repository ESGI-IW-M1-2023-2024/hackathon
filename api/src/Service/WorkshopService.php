<?php

namespace App\Service;

use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class WorkshopService
{
    public function __construct(
        private ParameterBagInterface $parameterBag
    ) {
    }

    public function workshopReminderHandler(OutputInterface $outputInterface)
    {
        // Fetch workshop delay
        $delay = $this->parameterBag->get('app.workshop.reminder_delay');
        $outputInterface->writeln($delay);
    }
}
