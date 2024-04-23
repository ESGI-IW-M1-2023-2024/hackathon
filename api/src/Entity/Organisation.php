<?php

namespace App\Entity;

use App\Repository\OrganisationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: OrganisationRepository::class)]
#[UniqueEntity(["label"], groups: ["organisation:new", "organisation:edit"])]
class Organisation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["organisation:read", "workshop:read"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["organisation:read"])]
    #[Assert\NotBlank(groups: ["organisation:new", "workshop:read"])]
    private ?string $label = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["organisation:read", "workshop:read"])]
    private ?string $logoFilename = null;

    /**
     * @var Collection<int, Workshop>
     */
    #[ORM\OneToMany(targetEntity: Workshop::class, mappedBy: 'organisation')]
    private Collection $workshops;

    #[ORM\Column]
    #[Groups(["organisation:read", "workshop:read"])]
    private ?bool $isArchived = false;

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

    public function getLogoFilename(): ?string
    {
        return $this->logoFilename;
    }

    public function setLogoFilename(?string $logoFilename): static
    {
        $this->logoFilename = $logoFilename;

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
            $workshop->setOrganisation($this);
        }

        return $this;
    }

    public function removeWorkshop(Workshop $workshop): static
    {
        if ($this->workshops->removeElement($workshop)) {
            // set the owning side to null (unless already changed)
            if ($workshop->getOrganisation() === $this) {
                $workshop->setOrganisation(null);
            }
        }

        return $this;
    }

    public function isArchived(): ?bool
    {
        return $this->isArchived;
    }

    public function setArchived(bool $isArchived): static
    {
        $this->isArchived = $isArchived;

        return $this;
    }
}
