<?php

namespace App\Entity;

use App\Repository\RegionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: RegionRepository::class)]
class Region
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["region:read"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["region:read"])]
    private ?string $label = null;

    #[ORM\Column(length: 255)]
    #[Groups(["region:read"])]
    private ?string $country = null;

    /**
     * @var Collection<int, Wine>
     */
    #[ORM\OneToMany(targetEntity: Wine::class, mappedBy: 'region')]
    private Collection $wines;

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
}
