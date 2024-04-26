<?php

namespace App\DataFixtures;

use App\Entity\Theme;
use App\Entity\Workshop;
use App\Factory\OrganisationFactory;
use App\Factory\WineFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use WorkshopStatus;

class WorkshopFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {

        $themeHidden = (new Theme())
            ->setLabel("Ma première dégustation")
            ->setSubtitle("Tour de france")
            ->setContent("Embarquez pour un voyage sensoriel à travers les régions viticoles de France avec notre atelier spécialement pensé pour initier les novices à l\'art de la dégustation de vins. Découvrez la diversité et la richesse des domaines viticoles français, de la Bourgogne au Rhône, en passant par Bordeaux, l’Alsace ou encore la Loire<br />
            Au cours de cet atelier, vous apprendrez à identifier les caractéristiques uniques des vins de chaque grande région viticole, en explorant leurs cépages emblématiques et leurs arômes associés.<br />
            Cet atelier est une célébration de la tradition viticole française, une aventure gustative qui vous guide à travers les paysages de notre patrimoine œnologique.<br />
            Ce premier tour de France des régions viticoles promet de belles découvertes et vous propose une expérience enrichissante. Faites le premier pas vers la maîtrise de l\'art de la dégustation du vin.");

        $themeBooking = (new Theme())
            ->setLabel("Rouge passion")
            ->setSubtitle("Éclats et arômes des vins rouges")
        ->setContent("Embarquez pour un voyage sensoriel à travers les régions viticoles de France avec notre atelier spécialement pensé pour initier les novices à l\'art de la dégustation de vins. Découvrez la diversité et la richesse des domaines viticoles français, de la Bourgogne au Rhône, en passant par Bordeaux, l’Alsace ou encore la Loire<br />
            Au cours de cet atelier, vous apprendrez à identifier les caractéristiques uniques des vins de chaque grande région viticole, en explorant leurs cépages emblématiques et leurs arômes associés.<br />
            Cet atelier est une célébration de la tradition viticole française, une aventure gustative qui vous guide à travers les paysages de notre patrimoine œnologique.<br />
            Ce premier tour de France des régions viticoles promet de belles découvertes et vous propose une expérience enrichissante. Faites le premier pas vers la maîtrise de l\'art de la dégustation du vin.");
        $themeClosed = (new Theme())
            ->setLabel("Les trésors du Rhône")
            ->setSubtitle("Un parcours épicurien")
        ->setContent("Embarquez pour un voyage sensoriel à travers les régions viticoles de France avec notre atelier spécialement pensé pour initier les novices à l\'art de la dégustation de vins. Découvrez la diversité et la richesse des domaines viticoles français, de la Bourgogne au Rhône, en passant par Bordeaux, l’Alsace ou encore la Loire<br />
            Au cours de cet atelier, vous apprendrez à identifier les caractéristiques uniques des vins de chaque grande région viticole, en explorant leurs cépages emblématiques et leurs arômes associés.<br />
            Cet atelier est une célébration de la tradition viticole française, une aventure gustative qui vous guide à travers les paysages de notre patrimoine œnologique.<br />
            Ce premier tour de France des régions viticoles promet de belles découvertes et vous propose une expérience enrichissante. Faites le premier pas vers la maîtrise de l\'art de la dégustation du vin.");

        $manager->persist($themeHidden);
        $manager->persist($themeBooking);
        $manager->persist($themeClosed);
        $manager->flush();

        $workshop = new Workshop();
        $workshop->setStatus(WorkshopStatus::HIDDEN);
        $workshop->setTheme($themeHidden);
        $workshop->setLength(120);
        $workshop->setLocation("Lyon");
        $workshop->setDateStart(new \DateTimeImmutable("+3 days"));
        $workshop->setMaxBookingDate(new \DateTimeImmutable("+2 days"));
        $workshop->setMaxPerson(14);
        $workshop->setPrice(35);
        $workshop->setReminderSent(false);
        $workshop->setOrganisation(OrganisationFactory::random()->object());
        $workshop->addWine(WineFactory::random()->object());
        $workshop->addWine(WineFactory::random()->object());

        $manager->persist($workshop);

        $workshop = new Workshop();
        $workshop->setStatus(WorkshopStatus::BOOKING);
        $workshop->setTheme($themeBooking);
        $workshop->setLength(120);
        $workshop->setLocation("Lyon");
        $workshop->setDateStart(new \DateTimeImmutable("+5 days"));
        $workshop->setMaxBookingDate(new \DateTimeImmutable("+2 days"));
        $workshop->setMaxPerson(14);
        $workshop->setPrice(35);
        $workshop->setReminderSent(false);
        $workshop->setOrganisation(OrganisationFactory::random()->object());
        $workshop->addWine(WineFactory::random()->object());
        $workshop->addWine(WineFactory::random()->object());

        $manager->persist($workshop);

        $workshop = new Workshop();
        $workshop->setStatus(WorkshopStatus::BOOKING);
        $workshop->setTheme($themeBooking);
        $workshop->setLength(120);
        $workshop->setLocation("Lyon");
        $workshop->setDateStart(new \DateTimeImmutable("+5 days"));
        $workshop->setMaxBookingDate(new \DateTimeImmutable("+2 days"));
        $workshop->setMaxPerson(14);
        $workshop->setPrice(35);
        $workshop->setReminderSent(false);
        $workshop->setOrganisation(OrganisationFactory::random()->object());
        $workshop->addWine(WineFactory::random()->object());
        $workshop->addWine(WineFactory::random()->object());

        $manager->persist($workshop);

        $workshop = new Workshop();
        $workshop->setStatus(WorkshopStatus::BOOKING);
        $workshop->setTheme($themeBooking);
        $workshop->setLength(60);
        $workshop->setLocation("Lyon");
        $workshop->setDateStart(new \DateTimeImmutable("+5 days"));
        $workshop->setMaxBookingDate(new \DateTimeImmutable("+2 days"));
        $workshop->setMaxPerson(40);
        $workshop->setPrice(70);
        $workshop->setReminderSent(false);
        $workshop->setOrganisation(OrganisationFactory::random()->object());
        $workshop->addWine(WineFactory::random()->object());
        $workshop->addWine(WineFactory::random()->object());

        $manager->persist($workshop);

        $workshop = new Workshop();
        $workshop->setStatus(WorkshopStatus::CLOSED);
        $workshop->setTheme($themeClosed);
        $workshop->setLength(60);
        $workshop->setLocation("Lyon");
        $workshop->setDateStart(new \DateTimeImmutable("+5 days"));
        $workshop->setMaxBookingDate(new \DateTimeImmutable("+2 days"));
        $workshop->setMaxPerson(40);
        $workshop->setPrice(400);
        $workshop->setReminderSent(false);
        $workshop->setOrganisation(OrganisationFactory::random()->object());
        $workshop->addWine(WineFactory::random()->object());
        $workshop->addWine(WineFactory::random()->object());

        $manager->persist($workshop);


        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            OrganisationFixtures::class,
            ThemeFixtures::class,
            WineFixtures::class,
        ];
    }
}
