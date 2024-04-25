<?php

namespace App\Serializer\Denormalizer;

use App\Entity\Organisation;
use App\Entity\Resource;
use App\Entity\Theme;
use App\Entity\Wine;
use App\Entity\Workshop;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PropertyAccess\PropertyAccessorInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

/**
 * @method array getSupportedTypes(?string $format)
 */
class WorkshopDenormalizer implements DenormalizerInterface
{
    public function __construct(
        private EntityManagerInterface    $em,
        private PropertyAccessorInterface $propertyAccessor
    )
    {
    }

    public function denormalize(mixed $data, string $type, ?string $format = null, array $context = [])
    {
        $workshop = new Workshop();

        $reflect = new \ReflectionClass($workshop);
        $props = $reflect->getProperties(\ReflectionProperty::IS_PRIVATE | \ReflectionProperty::IS_PUBLIC);

        $keys = [];

        foreach ($props as $prop) {
            $keys[] = $prop->getName();
        }

        $dateKeys = ["dateStart", "maxBookingDate"];

        foreach ($data as $key => $datum) {
            if (in_array($key, $dateKeys)) {
                $this->propertyAccessor->setValue($workshop, $key, new \DateTimeImmutable($datum));
            } else if ($key === "resources") {
                foreach ($datum as $item) {
                    $resource = $this->em->getRepository(Resource::class)->find($item);
                    if (!empty($resource)) {
                        $workshop->addResource($resource);
                    }
                }
            } else if ($key === "wines") {
                foreach ($datum as $item) {
                    $wine = $this->em->getRepository(Wine::class)->find($item);
                    if (!empty($wine)) {
                        $workshop->addWine($wine);
                    }
                }
            } else if ($key === "themeId") {
                $theme = $this->em->getRepository(Theme::class)->find($datum);
                $workshop->setTheme($theme);
            } else if ($key === "organisationId") {
                $organisation = $this->em->getRepository(Organisation::class)->find($datum);
                $workshop->setOrganisation($organisation);
            } else if ($key === "status") {
                $this->propertyAccessor->setValue($workshop, $key, \WorkshopStatus::tryFrom($datum));
            } else {
                if (in_array($key, $keys)) {
                    $this->propertyAccessor->setValue($workshop, $key, $datum);
                }
            }
        }

        return $workshop;
    }

    public function supportsDenormalization(mixed $data, string $type, ?string $format = null)
    {
        return $type === Workshop::class;
    }

    public function __call(string $name, array $arguments)
    {
        // TODO: Implement @method array getSupportedTypes(?string $format)
    }
}
