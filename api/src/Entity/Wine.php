<?php

namespace App\Entity;

use App\Enum\WineBottleSize;
use App\Repository\WineRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Context\ExecutionContextInterface;

#[ORM\Entity(repositoryClass: WineRepository::class)]
class Wine
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["wine:read"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["wine:read"])]
    #[Assert\NotBlank(groups: ["wine:new"])]
    private ?string $label = null;

    #[ORM\Column]
    #[Groups(["wine:read"])]
    private ?int $productYear = null;

    #[ORM\Column(length: 255)]
    #[Groups(["wine:read"])]
    #[Assert\NotBlank(groups: ["wine:new"])]
    private ?string $producer = null;

    #[ORM\Column(length: 255)]
    #[Groups(["wine:read"])]
    #[Assert\NotBlank(groups: ["wine:new"])]
    private ?string $grapeVariety = null;

    #[ORM\Column]
    #[Groups(["wine:read"])]
    private ?float $alcoholLevel = null;

    #[ORM\Column(length: 255)]
    #[Groups(["wine:read"])]
    #[Assert\NotBlank(groups: ["wine:new"])]
    #[Assert\CssColor(groups: ["wine:new", "wine:edit"])]
    private ?string $color = null;

    #[ORM\Column]
    #[Groups(["wine:read"])]
    #[Assert\NotNull(groups: ["wine:new"])]
    private ?int $quantity = null;

    #[ORM\Column(length: 255, enumType: WineBottleSize::class)]
    #[Groups(["wine:read"])]
    private ?WineBottleSize $bottleSize = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(["wine:read"])]
    private ?string $comments = null;

    #[ORM\ManyToOne(inversedBy: 'wines')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["wine:read"])]
    #[Assert\NotNull(groups: ["wine:new"])]
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

    #[Assert\Callback(groups: ["wine:new", "wine:edit"])]
    public function validate(ExecutionContextInterface $context): void
    {
        if (false === in_array($this->getBottleSize(), WineBottleSize::cases())) {
            $context->buildViolation("The specified bottle size does not exist.")
                ->atPath("bottleSize")
                ->addViolation();
        }
    }

    /********************************/
    /* CONTENT AUTO GENERATED BELOW */
    /********************************/

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

    public function getBottleSize(): ?WineBottleSize
    {
        return $this->bottleSize;
    }

    public function setBottleSize(WineBottleSize $bottleSize): static
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
