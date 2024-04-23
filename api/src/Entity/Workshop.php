<?php

namespace App\Entity;

use App\Repository\WorkshopRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: WorkshopRepository::class)]
class Workshop
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["workshop:read"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["workshop:read"])]
    #[Assert\NotBlank(groups: ["workshop:new", "workshop:edit"])]
    private ?string $label = null;

    #[ORM\Column]
    #[Groups(["workshop:read"])]
    #[Assert\NotBlank(groups: ["workshop:new", "workshop:edit"])]
    private ?\DateTimeImmutable $dateStart = null;

    #[ORM\Column]
    #[Groups(["workshop:read"])]
    #[Assert\NotBlank(groups: ["workshop:new", "workshop:edit"])]
    private ?int $length = null;

    #[ORM\Column]
    #[Groups(["workshop:read"])]
    #[Assert\NotBlank(groups: ["workshop:new", "workshop:edit"])]
    private ?int $maxPerson = null;

    #[ORM\Column(length: 255)]
    #[Groups(["workshop:read"])]
    #[Assert\NotBlank(groups: ["workshop:new", "workshop:edit"])]
    private ?string $location = null;

    #[ORM\Column(length: 255, enumType: \WorkshopStatus::class)]
    #[Groups(["workshop:read"])]
    #[Assert\NotBlank(groups: ["workshop:new", "workshop:edit"])]
    private ?\WorkshopStatus $status = null;

    #[ORM\Column(type: Types::DATE_IMMUTABLE)]
    #[Groups(["workshop:read"])]
    #[Assert\NotBlank(groups: ["workshop:new", "workshop:edit"])]
    private ?\DateTimeImmutable $maxBookingDate = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(["workshop:read"])]
    #[Assert\NotBlank(groups: ["workshop:new", "workshop:edit"])]
    private ?string $content = null;

    #[ORM\ManyToOne(inversedBy: 'workshops')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(["workshop:read"])]
    private ?Organisation $organisation = null;

    #[ORM\ManyToOne(inversedBy: 'workshops')]
    #[Groups(["workshop:read"])]
    private ?Theme $theme = null;

    /**
     * @var Collection<int, Resource>
     */
    #[ORM\OneToMany(targetEntity: Resource::class, mappedBy: 'workshop', orphanRemoval: true)]
    #[Groups(["workshop:read"])]
    private Collection $resources;

    /**
     * @var Collection<int, Booking>
     */
    #[ORM\OneToMany(targetEntity: Booking::class, mappedBy: 'workshop')]
    #[Groups(["workshop:read"])]
    private Collection $bookings;

    /**
     * @var Collection<int, Wine>
     */
    #[ORM\ManyToMany(targetEntity: Wine::class, mappedBy: 'workshops')]
    #[Groups(["workshop:read:status:finished"])]
    private Collection $wines;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $subtitle = null;

    public function __construct()
    {
        $this->resources = new ArrayCollection();
        $this->bookings = new ArrayCollection();
        $this->wines = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): static
    {
        $this->label = $label;

        return $this;
    }

    public function getDateStart(): ?\DateTimeImmutable
    {
        return $this->dateStart;
    }

    public function setDateStart(\DateTimeImmutable $dateStart): static
    {
        $this->dateStart = $dateStart;

        return $this;
    }

    public function getLength(): ?int
    {
        return $this->length;
    }

    public function setLength(int $length): static
    {
        $this->length = $length;

        return $this;
    }

    public function getMaxPerson(): ?int
    {
        return $this->maxPerson;
    }

    public function setMaxPerson(int $maxPerson): static
    {
        $this->maxPerson = $maxPerson;

        return $this;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(string $location): static
    {
        $this->location = $location;

        return $this;
    }

    public function getStatus(): ?\WorkshopStatus
    {
        return $this->status;
    }

    public function setStatus(\WorkshopStatus $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getMaxBookingDate(): ?\DateTimeImmutable
    {
        return $this->maxBookingDate;
    }

    public function setMaxBookingDate(\DateTimeImmutable $maxBookingDate): static
    {
        $this->maxBookingDate = $maxBookingDate;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): static
    {
        $this->content = $content;

        return $this;
    }

    public function getOrganisation(): ?Organisation
    {
        return $this->organisation;
    }

    public function setOrganisation(?Organisation $organisation): static
    {
        $this->organisation = $organisation;

        return $this;
    }

    public function getTheme(): ?Theme
    {
        return $this->theme;
    }

    public function setTheme(?Theme $theme): static
    {
        $this->theme = $theme;

        return $this;
    }

    /**
     * @return Collection<int, Resource>
     */
    public function getResources(): Collection
    {
        return $this->resources;
    }

    public function addResource(Resource $resource): static
    {
        if (!$this->resources->contains($resource)) {
            $this->resources->add($resource);
            $resource->setWorkshop($this);
        }

        return $this;
    }

    public function removeResource(Resource $resource): static
    {
        if ($this->resources->removeElement($resource)) {
            // set the owning side to null (unless already changed)
            if ($resource->getWorkshop() === $this) {
                $resource->setWorkshop(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Booking>
     */
    public function getBookings(): Collection
    {
        return $this->bookings;
    }

    public function addBooking(Booking $booking): static
    {
        if (!$this->bookings->contains($booking)) {
            $this->bookings->add($booking);
            $booking->setWorkshop($this);
        }

        return $this;
    }

    public function removeBooking(Booking $booking): static
    {
        if ($this->bookings->removeElement($booking)) {
            // set the owning side to null (unless already changed)
            if ($booking->getWorkshop() === $this) {
                $booking->setWorkshop(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Wine>
     */
    public function getWines(): Collection
    {
        return $this->wines;
    }

    public function addWine(Wine $wine): static
    {
        if (!$this->wines->contains($wine)) {
            $this->wines->add($wine);
            $wine->addWorkshop($this);
        }

        return $this;
    }

    public function removeWine(Wine $wine): static
    {
        if ($this->wines->removeElement($wine)) {
            $wine->removeWorkshop($this);
        }

        return $this;
    }

    public function getSubtitle(): ?string
    {
        return $this->subtitle;
    }

    public function setSubtitle(string $subtitle): static
    {
        $this->subtitle = $subtitle;

        return $this;
    }
}
