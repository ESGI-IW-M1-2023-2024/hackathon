<?php

namespace App\Entity;

use App\Repository\WineRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: WineRepository::class)]
class Wine
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $label = null;

    #[ORM\Column]
    private ?int $productYear = null;

    #[ORM\Column(length: 255)]
    private ?string $producer = null;

    #[ORM\Column(length: 255)]
    private ?string $grapeVariety = null;

    #[ORM\Column]
    private ?float $alcoholLevel = null;

    #[ORM\Column(length: 255)]
    private ?string $color = null;

    #[ORM\Column]
    private ?int $quantity = null;

    #[ORM\Column(length: 255)]
    private ?string $bottleSize = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $comments = null;

    #[ORM\ManyToOne(inversedBy: 'wines')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Region $region = null;

    /**
     * @var Collection<int, Workshop>
     */
    #[ORM\ManyToMany(targetEntity: Workshop::class, inversedBy: 'wines')]
    private Collection $workshops;

    public function __construct()
    {
        $this->workshops = new ArrayCollection();
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

    public function getProductYear(): ?int
    {
        return $this->productYear;
    }

    public function setProductYear(int $productYear): static
    {
        $this->productYear = $productYear;

        return $this;
    }

    public function getProducer(): ?string
    {
        return $this->producer;
    }

    public function setProducer(string $producer): static
    {
        $this->producer = $producer;

        return $this;
    }

    public function getGrapeVariety(): ?string
    {
        return $this->grapeVariety;
    }

    public function setGrapeVariety(string $grapeVariety): static
    {
        $this->grapeVariety = $grapeVariety;

        return $this;
    }

    public function getAlcoholLevel(): ?float
    {
        return $this->alcoholLevel;
    }

    public function setAlcoholLevel(float $alcoholLevel): static
    {
        $this->alcoholLevel = $alcoholLevel;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(string $color): static
    {
        $this->color = $color;

        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): static
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getBottleSize(): ?string
    {
        return $this->bottleSize;
    }

    public function setBottleSize(string $bottleSize): static
    {
        $this->bottleSize = $bottleSize;

        return $this;
    }

    public function getComments(): ?string
    {
        return $this->comments;
    }

    public function setComments(?string $comments): static
    {
        $this->comments = $comments;

        return $this;
    }

    public function getRegion(): ?Region
    {
        return $this->region;
    }

    public function setRegion(?Region $region): static
    {
        $this->region = $region;

        return $this;
    }

    /**
     * @return Collection<int, Workshop>
     */
    public function getWorkshops(): Collection
    {
        return $this->workshops;
    }

    public function addWorkshop(Workshop $workshop): static
    {
        if (!$this->workshops->contains($workshop)) {
            $this->workshops->add($workshop);
        }

        return $this;
    }

    public function removeWorkshop(Workshop $workshop): static
    {
        $this->workshops->removeElement($workshop);

        return $this;
    }
}
