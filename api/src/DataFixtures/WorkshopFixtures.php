<?php

namespace App\DataFixtures;

use App\Factory\WorkshopFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class WorkshopFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        WorkshopFactory::createMany(15);

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            OrganisationFixtures::class,
            ThemeFixtures::class,
        ];
    }
}
