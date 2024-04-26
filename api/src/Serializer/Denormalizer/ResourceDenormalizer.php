<?php

namespace App\Serializer\Denormalizer;

use App\Entity\Resource;
use App\Entity\Workshop;
use App\Service\ApiUploadFileService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PropertyAccess\PropertyAccessorInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

/**
 * @method array getSupportedTypes(?string $format)
 */
class ResourceDenormalizer implements DenormalizerInterface
{
    public function __construct(
        private EntityManagerInterface    $em,
        private PropertyAccessorInterface $propertyAccessor,
        private ApiUploadFileService $apiUploadFileService
    )
    {
    }

    public function denormalize(mixed $data, string $type, ?string $format = null, array $context = [])
    {
        $resource = new Resource();

        $reflect = new \ReflectionClass($resource);
        $props = $reflect->getProperties(\ReflectionProperty::IS_PRIVATE | \ReflectionProperty::IS_PUBLIC);

        $keys = [];

        foreach ($props as $prop) {
            $keys[] = $prop->getName();
        }

        foreach ($data as $key => $datum) {
            if ($key !== "workshopId") {
                if (in_array($key, $keys)) {
                    $this->propertyAccessor->setValue($resource, $key, $datum);
                }
            } else {
                $workshopId = $data['workshopId'];
                $workshop = $this->em->getRepository(Workshop::class)->find($workshopId);
                $resource->setWorkshop($workshop);
            }
        }

        return $resource;
    }

    public function supportsDenormalization(mixed $data, string $type, ?string $format = null)
    {
        return $type === Resource::class;
    }

    public function __call(string $name, array $arguments)
    {
        // TODO: Implement @method array getSupportedTypes(?string $format)
    }
}