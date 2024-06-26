<?php

namespace App\Serializer\Denormalizer;

use App\Entity\Theme;
use App\Service\ApiUploadFileService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PropertyAccess\PropertyAccessorInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

/**
 * @method array getSupportedTypes(?string $format)
 */
class ThemeDenormalizer implements DenormalizerInterface
{
    public function __construct(
        private EntityManagerInterface    $em,
        private PropertyAccessorInterface $propertyAccessor,
        private ApiUploadFileService      $apiUploadFileService
    )
    {
    }

    public function denormalize(mixed $data, string $type, ?string $format = null, array $context = [])
    {
        $theme = new Theme();

        $reflect = new \ReflectionClass($theme);
        $props = $reflect->getProperties(\ReflectionProperty::IS_PRIVATE | \ReflectionProperty::IS_PUBLIC);

        $keys = [];

        foreach ($props as $prop) {
            $keys[] = $prop->getName();
        }

        foreach ($data as $key => $datum) {
            if (in_array($key, $keys)) {
                $this->propertyAccessor->setValue($theme, $key, $datum);
            }
        }

        return $theme;
    }

    public function supportsDenormalization(mixed $data, string $type, ?string $format = null)
    {
        return $type === Theme::class;
    }

    public function __call(string $name, array $arguments)
    {
        // TODO: Implement @method array getSupportedTypes(?string $format)
    }
}