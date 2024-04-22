<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    public function __construct(private UserPasswordHasherInterface $userPasswordHasher)
    {
    }

    public function load(ObjectManager $manager): void
    {
        $user = new User();
        $user->setEmail("admin@admin.com");
        $user->setPassword($this->userPasswordHasher->hashPassword($user, "admin"));
        $user->setRoles(["ROLE_ADMIN"]);

        $manager->persist($user);

        $manager->flush();
    }
}
