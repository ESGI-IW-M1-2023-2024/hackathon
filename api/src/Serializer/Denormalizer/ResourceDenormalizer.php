<?php

namespace App\Serializer\Denormalizer;

use App\Entity\Resource;
use App\Entity\Workshop;
use App\Service\ApiUploadFileService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\PropertyAccess\PropertyAccessorInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Uid\Uuid;

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
        $existantResource = null;

        if (!empty($context["resource"])) {
            $existantResource = $context["resource"];
        }

        $resource = new Resource();

        foreach ($data as $key => $datum) {
            if ($key !== "workshopId") {
                if ($key === "file" && !empty($datum)) {
                    $filename = $this->apiUploadFileService->uploadFile($datum, "resources_directory", $existantResource?->getFilename());
                    $resource->setFilename($filename);
                } else {
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