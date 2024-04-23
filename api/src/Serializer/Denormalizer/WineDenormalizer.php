<?php

namespace App\Serializer\Denormalizer;

use App\Entity\Region;
use App\Entity\Wine;
use App\Enum\WineBottleSize;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PropertyAccess\PropertyAccessorInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

/**
 * @method array getSupportedTypes(?string $format)
 */
class WineDenormalizer implements DenormalizerInterface
{
    public function __construct(
        private EntityManagerInterface    $em,
        private PropertyAccessorInterface $propertyAccessor
    )
    {
    }

    public function denormalize(mixed $data, string $type, ?string $format = null, array $context = [])
    {
        $wine = new Wine();

        $reflect = new \ReflectionClass($wine);
        $props = $reflect->getProperties(\ReflectionProperty::IS_PRIVATE | \ReflectionProperty::IS_PUBLIC);

        $keys = [];

        foreach ($props as $prop) {
            $keys[] = $prop->getName();
        }

        foreach ($data as $key => $datum) {
            if ($key !== "regionId") {
                if ($key === "bottleSize" && !empty($datum)) {
                    $this->propertyAccessor->setValue($wine, $key, WineBottleSize::tryFrom($datum));
                } else {
                    if (in_array($key, $keys)) {
                        $this->propertyAccessor->setValue($wine, $key, $datum);
                    }
                }
            } else {
                $regionId = $data['regionId'];
                $region = $this->em->getRepository(Region::class)->find($regionId);
                $wine->setRegion($region);
            }
        }

        return $wine;
    }

    public function supportsDenormalization(mixed $data, string $type, ?string $format = null)
    {
        return $type === Wine::class;
    }

    public function __call(string $name, array $arguments)
    {
        // TODO: Implement @method array getSupportedTypes(?string $format)
    }
}