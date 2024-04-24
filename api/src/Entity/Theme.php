<?php

namespace App\Entity;

use App\Repository\ThemeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ThemeRepository::class)]
class Theme
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["workshop:list", "workshop:detail", "theme:list", "theme:detail"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["workshop:list", "workshop:detail", "theme:list", "theme:detail"])]
    #[Assert\NotBlank(groups: ["theme:new"])]
    private ?string $label = null;
    /**
     * @var Collection<int, Workshop>
     */
    #[ORM\OneToMany(targetEntity: Workshop::class, mappedBy: 'theme')]
    private Collection $workshops;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(["workshop:detail", "theme:detail"])]
    #[Assert\NotBlank(groups: ["theme:new"])]
    private ?string $content = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["workshop:list", "theme:list", "theme:detail", "workshop:detail"])]
    private ?string $subtitle = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["workshop:list", "theme:list", "theme:detail", "workshop:detail"])]
    private ?string $headerFilename = null;

    #[Assert\NotBlank(groups: ["theme:new"])]
    public ?string $file = null;

    #[ORM\Column]
    #[Groups(["workshop:list", "theme:list", "theme:detail", "workshop:detail"])]
    private bool $archived = false;

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
            $workshop->setTheme($this);
        }

        return $this;
    }

    public function removeWorkshop(Workshop $workshop): static
    {
        if ($this->workshops->removeElement($workshop)) {
            // set the owning side to null (unless already changed)
            if ($workshop->getTheme() === $this) {
                $workshop->setTheme(null);
            }
        }

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

    public function getSubtitle(): ?string
    {
        return $this->subtitle;
    }

    public function setSubtitle(string $subtitle): static
    {
        $this->subtitle = $subtitle;

        return $this;
    }

    public function getHeaderFilename(): ?string
    {
        return $this->headerFilename;
    }

    public function setHeaderFilename(string $headerFilename): static
    {
        $this->headerFilename = $headerFilename;

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
