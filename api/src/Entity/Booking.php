<?php

namespace App\Entity;

use App\Repository\BookingRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: BookingRepository::class)]
class Booking
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["workshop:list"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["workshop:list"])]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    #[Groups(["workshop:list"])]
    private ?string $lastname = null;

    #[ORM\Column(length: 255)]
    #[Groups(["workshop:list"])]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    #[Groups(["workshop:list"])]
    private ?string $schoolClass = null;

    #[ORM\Column(length: 255)]
    #[Groups(["workshop:list"])]
    private ?string $status = null;

    #[ORM\Column(length: 255)]
    #[Groups(["workshop:list"])]
    private ?string $reference = null;

    #[ORM\ManyToOne(inversedBy: 'bookings')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Workshop $workshop = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getSchoolClass(): ?string
    {
        return $this->schoolClass;
    }

    public function setSchoolClass(string $schoolClass): static
    {
        $this->schoolClass = $schoolClass;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getReference(): ?string
    {
        return $this->reference;
    }

    public function setReference(string $reference): static
    {
        $this->reference = $reference;

        return $this;
    }

    public function getWorkshop(): ?Workshop
    {
        return $this->workshop;
    }

    public function setWorkshop(?Workshop $workshop): static
    {
        $this->workshop = $workshop;

        return $this;
    }
}
