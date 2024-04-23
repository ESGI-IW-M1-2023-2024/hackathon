<?php

namespace App\DataFixtures;

use App\Factory\WineFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class WineFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        WineFactory::createMany(30);

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            RegionFixtures::class,
        ];
    }
}
