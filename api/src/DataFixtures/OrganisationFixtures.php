<?php

namespace App\DataFixtures;

use App\Factory\OrganisationFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class OrganisationFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        OrganisationFactory::createMany(10);

        $manager->flush();
    }
}
