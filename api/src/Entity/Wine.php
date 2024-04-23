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
    #[Groups(["wine:read", "workshop:read"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["wine:read", "workshop:read"])]
    #[Assert\NotBlank(groups: ["wine:new"])]
    private ?string $label = null;

    #[ORM\Column]
    #[Groups(["wine:read", "workshop:read"])]
    #[Assert\NotBlank(groups: ["wine:new"])]
    private ?int $productYear = null;

    #[ORM\Column(length: 255)]
    #[Groups(["wine:read", "workshop:read"])]
    #[Assert\NotBlank(groups: ["wine:new"])]
    private ?string $producer = null;

    #[ORM\Column(length: 255)]
    #[Groups(["wine:read", "workshop:read"])]
    #[Assert\NotBlank(groups: ["wine:new"])]
    private ?string $grapeVariety = null;

    #[ORM\Column]
    #[Groups(["wine:read", "workshop:read"])]
    private ?float $alcoholLevel = null;

    #[ORM\Column(length: 255)]
    #[Groups(["wine:read", "workshop:read"])]
    #[Assert\NotBlank(groups: ["wine:new"])]
    #[Assert\CssColor(groups: ["wine:new", "wine:edit"])]
    private ?string $color = null;

    #[ORM\Column(nullable: true)]
    #[Groups(["wine:read", "workshop:read"])]
    private ?int $quantity = null;

    #[ORM\Column(length: 255, enumType: WineBottleSize::class)]
    #[Groups(["wine:read", "workshop:read"])]
    private ?WineBottleSize $bottleSize = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(["wine:read", "workshop:read"])]
    private ?string $comments = null;

    #[ORM\ManyToOne(inversedBy: 'wines')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["wine:read", "workshop:read"])]
    #[Assert\NotNull(groups: ["wine:new"])]
    private ?Region $region = null;

    /**
     * @var Collection<int, Workshop>
     */
    #[ORM\ManyToMany(targetEntity: Workshop::class, inversedBy: 'wines')]
    private Collection $workshops;

    #[ORM\Column(nullable: true)]
    private ?float $servingTemperature = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $storage = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $upTo = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $taste = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $byTaste = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $byEye = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $onTheNose = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $inTheMouth = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $winePairing = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $recommandedPairing = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $content = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $image = null;

    public function __construct()
    {
        $this->workshops = new ArrayCollection();
    }

    #[Assert\Callback(groups: ["wine:new", "wine:edit"])]
    public function validate(ExecutionContextInterface $context): void
    {
        if (false === in_array($this->getBottleSize(), WineBottleSize::cases()) && !empty($this->getBottleSize())) {
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

    public function getServingTemperature(): ?float
    {
        return $this->servingTemperature;
    }

    public function setServingTemperature(?float $servingTemperature): static
    {
        $this->servingTemperature = $servingTemperature;

        return $this;
    }

    public function getStorage(): ?string
    {
        return $this->storage;
    }

    public function setStorage(?string $storage): static
    {
        $this->storage = $storage;

        return $this;
    }

    public function getUpTo(): ?string
    {
        return $this->upTo;
    }

    public function setUpTo(?string $upTo): static
    {
        $this->upTo = $upTo;

        return $this;
    }

    public function getTaste(): ?string
    {
        return $this->taste;
    }

    public function setTaste(?string $taste): static
    {
        $this->taste = $taste;

        return $this;
    }

    public function getByTaste(): ?string
    {
        return $this->byTaste;
    }

    public function setByTaste(?string $byTaste): static
    {
        $this->byTaste = $byTaste;

        return $this;
    }

    public function getByEye(): ?string
    {
        return $this->byEye;
    }

    public function setByEye(?string $byEye): static
    {
        $this->byEye = $byEye;

        return $this;
    }

    public function getOnTheNose(): ?string
    {
        return $this->onTheNose;
    }

    public function setOnTheNose(?string $onTheNose): static
    {
        $this->onTheNose = $onTheNose;

        return $this;
    }

    public function getInTheMouth(): ?string
    {
        return $this->inTheMouth;
    }

    public function setInTheMouth(?string $inTheMouth): static
    {
        $this->inTheMouth = $inTheMouth;

        return $this;
    }

    public function getWinePairing(): ?string
    {
        return $this->winePairing;
    }

    public function setWinePairing(?string $winePairing): static
    {
        $this->winePairing = $winePairing;

        return $this;
    }

    public function getRecommandedPairing(): ?string
    {
        return $this->recommandedPairing;
    }

    public function setRecommandedPairing(?string $recommandedPairing): static
    {
        $this->recommandedPairing = $recommandedPairing;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(?string $content): static
    {
        $this->content = $content;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): static
    {
        $this->image = $image;

        return $this;
    }
}
