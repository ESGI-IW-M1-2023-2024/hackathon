<?php

namespace App\Entity;

use App\Repository\RegionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: RegionRepository::class)]
#[UniqueEntity(["country", "label"], groups: ["region:new", "region:edit"])]
class Region
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["region:read", "wine:read", "workshop:read"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["region:read", "wine:read", "workshop:read"])]
    #[Assert\NotBlank(groups: ["region:new"])]
    private ?string $label = null;

    #[ORM\Column(length: 255)]
    #[Groups(["region:read", "wine:read", "workshop:read"])]
    #[Assert\NotBlank(groups: ["region:new"])]
    #[Assert\Country(groups: ["region:new", "region:edit"])]
    private ?string $country = null;

    /**
     * @var Collection<int, Wine>
     */
    #[ORM\OneToMany(targetEntity: Wine::class, mappedBy: 'region')]
    private Collection $wines;

    #[ORM\Column]
    #[Groups(["region:read" , "workshop:read"])]
    private bool $archived = false;

    public function __construct()
    {
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

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): static
    {
        $this->country = $country;

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
            $wine->setRegion($this);
        }

        return $this;
    }

    public function removeWine(Wine $wine): static
    {
        if ($this->wines->removeElement($wine)) {
            // set the owning side to null (unless already changed)
            if ($wine->getRegion() === $this) {
                $wine->setRegion(null);
            }
        }

        return $this;
    }

    public function isArchived(): bool
    {
        return $this->archived;
    }

    public function setArchived(bool $archived): static
    {
        $this->archived = $archived;

        return $this;
    }
}
