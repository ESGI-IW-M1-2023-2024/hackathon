<?php

namespace App\DataFixtures;

use App\Factory\WorkshopFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class WorkshopFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        WorkshopFactory::createMany(10);

        $manager->flush();
    }
}
