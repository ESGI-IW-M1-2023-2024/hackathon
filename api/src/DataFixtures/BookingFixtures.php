<?php

namespace App\DataFixtures;

use App\Factory\BookingFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class BookingFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        BookingFactory::createMany(30);
        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            WorkshopFixtures::class,
        ];
    }
}
