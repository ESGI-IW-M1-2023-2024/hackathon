<?php

namespace App\Serializer\Denormalizer;

use App\Entity\Booking;
use App\Entity\Workshop;
use App\Enum\BookingStatus;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PropertyAccess\PropertyAccessorInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

/**
 * @method array getSupportedTypes(?string $format)
 */
class BookingDenormalizer implements DenormalizerInterface
{
    public function __construct(
        private EntityManagerInterface    $em,
        private PropertyAccessorInterface $propertyAccessor
    )
    {
    }

    public function denormalize(mixed $data, string $type, ?string $format = null, array $context = [])
    {
        $booking = new Booking();

        $reflect = new \ReflectionClass($booking);
        $props = $reflect->getProperties(\ReflectionProperty::IS_PRIVATE | \ReflectionProperty::IS_PUBLIC);

        $keys = [];

        foreach ($props as $prop) {
            $keys[] = $prop->getName();
        }

        foreach ($data as $key => $datum) {
            if ($key !== "workshopId") {
                if ($key === "status" && !empty($datum)) {
                    $this->propertyAccessor->setValue($booking, $key, BookingStatus::tryFrom($datum));
                } else {
                    if (in_array($key, $keys)) {
                        $this->propertyAccessor->setValue($booking, $key, $datum);
                    }
                }
            } else {
                $workshopId = $data['workshopId'];
                $region = $this->em->getRepository(Workshop::class)->find($workshopId);
                $booking->setWorkshop($region);
            }
        }

        return $booking;
    }

    public function supportsDenormalization(mixed $data, string $type, ?string $format = null)
    {
        return $type === Booking::class;
    }

    public function __call(string $name, array $arguments)
    {
        // TODO: Implement @method array getSupportedTypes(?string $format)
    }
}
