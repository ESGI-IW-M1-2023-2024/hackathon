<?php

namespace App\Entity;

use App\Repository\ResourceRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ResourceRepository::class)]
class Resource
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["workshop:read", "resource:read"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["workshop:read", "resource:read"])]
    #[Assert\NotBlank(groups: ["resource:new"])]
    private ?string $label = null;

    #[ORM\Column(length: 255)]
    #[Groups(["workshop:read", "resource:read"])]
    private ?string $filename = null;

    #[Assert\NotBlank(groups: ["resource:new"])]
    public ?string $file = null;

    #[ORM\ManyToOne(inversedBy: 'resources')]
    #[ORM\JoinColumn(nullable: false)]
    #[Assert\NotNull(groups: ["resource:new"])]
    private ?Workshop $workshop = null;

    #[ORM\Column]
    private bool $archived = false;

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

    public function getFilename(): ?string
    {
        return $this->filename;
    }

    public function setFilename(string $filename): static
    {
        $this->filename = $filename;

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
