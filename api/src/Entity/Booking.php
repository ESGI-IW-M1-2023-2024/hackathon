<?php

namespace App\Entity;

use App\Enum\BookingStatus;
use App\Repository\BookingRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: BookingRepository::class)]
class Booking
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["workshop:list", "booking:list"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["workshop:list", "booking:list"])]
    #[Assert\NotBlank(groups: ["booking:new"])]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    #[Groups(["workshop:list", "booking:list"])]
    #[Assert\NotBlank(groups: ["booking:new"])]
    private ?string $lastname = null;

    #[ORM\Column(length: 255)]
    #[Groups(["workshop:list", "booking:list"])]
    #[Assert\NotBlank(groups: ["booking:new"])]
    #[Assert\Email(groups: ["booking:new"])]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    #[Groups(["workshop:list", "booking:list"])]
    #[Assert\NotBlank(groups: ["booking:new"])]
    private ?string $schoolClass = null;

    #[ORM\Column(length: 255, enumType: \BookingStatus::class)]
    #[Groups(["workshop:list", "booking:list"])]
    private ?BookingStatus $status = BookingStatus::PENDING;

    #[ORM\Column(length: 255)]
    #[Groups(["workshop:list", "booking:list"])]
    private ?string $reference = "1";

    #[ORM\ManyToOne(inversedBy: 'bookings')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["booking:list"])]
    #[Assert\NotNull(groups: ["booking:new"])]
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

    public function getStatus(): ?BookingStatus
    {
        return $this->status;
    }

    public function setStatus(BookingStatus $status): static
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
