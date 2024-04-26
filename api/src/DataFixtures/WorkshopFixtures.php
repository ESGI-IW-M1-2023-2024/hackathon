<?php

namespace App\DataFixtures;

use App\Entity\Workshop;
use App\Factory\OrganisationFactory;
use App\Factory\ThemeFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use WorkshopStatus;

class WorkshopFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {

        $themeHidden = ThemeFactory::random()->object();
        $themeBooking = ThemeFactory::random()->object();
        $themeClosed = ThemeFactory::random()->object();

        $workshop = new Workshop();
        $workshop->setStatus(WorkshopStatus::HIDDEN);
        $workshop->setTheme($themeHidden);
        $workshop->setLength(120);
        $workshop->setLocation("Lyon");
        $workshop->setDateStart(new \DateTimeImmutable("+3 days"));
        $workshop->setMaxBookingDate(new \DateTimeImmutable("+10 days"));
        $workshop->setMaxPerson(20);
        $workshop->setPrice(200);
        $workshop->setReminderSent(false);
        $workshop->setOrganisation(OrganisationFactory::random()->object());

        $manager->persist($workshop);

        $workshop = new Workshop();
        $workshop->setStatus(WorkshopStatus::BOOKING);
        $workshop->setTheme($themeBooking);
        $workshop->setLength(60);
        $workshop->setLocation("Lyon");
        $workshop->setDateStart(new \DateTimeImmutable("+5 days"));
        $workshop->setMaxBookingDate(new \DateTimeImmutable("+7 days"));
        $workshop->setMaxPerson(40);
        $workshop->setPrice(400);
        $workshop->setReminderSent(false);
        $workshop->setOrganisation(OrganisationFactory::random()->object());

        $manager->persist($workshop);

        $workshop = new Workshop();
        $workshop->setStatus(WorkshopStatus::BOOKING);
        $workshop->setTheme($themeBooking);
        $workshop->setLength(60);
        $workshop->setLocation("Lyon");
        $workshop->setDateStart(new \DateTimeImmutable("+5 days"));
        $workshop->setMaxBookingDate(new \DateTimeImmutable("+7 days"));
        $workshop->setMaxPerson(40);
        $workshop->setPrice(400);
        $workshop->setReminderSent(false);
        $workshop->setOrganisation(OrganisationFactory::random()->object());

        $manager->persist($workshop);

        $workshop = new Workshop();
        $workshop->setStatus(WorkshopStatus::BOOKING);
        $workshop->setTheme($themeBooking);
        $workshop->setLength(60);
        $workshop->setLocation("Lyon");
        $workshop->setDateStart(new \DateTimeImmutable("+5 days"));
        $workshop->setMaxBookingDate(new \DateTimeImmutable("+7 days"));
        $workshop->setMaxPerson(40);
        $workshop->setPrice(400);
        $workshop->setReminderSent(false);
        $workshop->setOrganisation(OrganisationFactory::random()->object());

        $manager->persist($workshop);

        $workshop = new Workshop();
        $workshop->setStatus(WorkshopStatus::CLOSED);
        $workshop->setTheme($themeClosed);
        $workshop->setLength(60);
        $workshop->setLocation("Lyon");
        $workshop->setDateStart(new \DateTimeImmutable("+5 days"));
        $workshop->setMaxBookingDate(new \DateTimeImmutable("+7 days"));
        $workshop->setMaxPerson(40);
        $workshop->setPrice(400);
        $workshop->setReminderSent(false);
        $workshop->setOrganisation(OrganisationFactory::random()->object());

        $manager->persist($workshop);


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
