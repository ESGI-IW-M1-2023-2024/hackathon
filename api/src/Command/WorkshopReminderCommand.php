<?php

namespace App\Command;

use App\Service\WorkshopService;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'app:workshop:reminder',
    description: 'Remind next workshop',
    hidden: false,
    aliases: ['app:w:r']
)]
class WorkshopReminderCommand extends Command
{
    public function __construct(
        private WorkshopService $workshopService
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->workshopService->workshopReminderHandler($output);

        return Command::SUCCESS;
    }
}
