<?php

namespace App\Entity;

use App\Repository\ArticleRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Constraints\NotBlank;

#[ORM\Entity(repositoryClass: ArticleRepository::class)]
class Article
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["article:list", "article:detail"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["article:list", "article:detail"])]
    private ?string $headerFilename = null;

    #[Assert\NotBlank(groups: ["article:new"])]
    public ?string $headerFile = null;

    #[ORM\Column(length: 255)]
    #[Groups(["article:list", "article:detail"])]
    #[Assert\NotBlank(groups: ["article:new"])]
    private ?string $title = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["article:list", "article:detail"])]
    private ?string $subtitle = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(["article:list", "article:detail"])]
    #[Assert\NotBlank(groups: ["article:new"])]
    private ?string $content = null;

    #[ORM\Column(length: 255)]
    #[Groups(["article:list", "article:detail"])]
    private ?string $imageFilename = null;

    #[Assert\NotBlank(groups: ["article:new"])]
    public ?string $imageFile = null;

    #[ORM\Column]
    #[Groups(["article:list", "article:detail"])]
    private bool $archived = false;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getSubtitle(): ?string
    {
        return $this->subtitle;
    }

    public function setSubtitle(?string $subtitle): static
    {
        $this->subtitle = $subtitle;

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

    public function getImageFilename(): ?string
    {
        return $this->imageFilename;
    }

    public function setImageFilename(string $imageFilename): static
    {
        $this->imageFilename = $imageFilename;

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
