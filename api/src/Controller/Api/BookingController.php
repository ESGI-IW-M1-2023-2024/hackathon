<?php

namespace App\Controller\Api;

use App\Entity\Booking;
use App\Service\PaginationService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PropertyAccess\PropertyAccessorInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/bookings', name: 'bookings_')]
class BookingController extends AbstractController
{

    public function __construct(
        private EntityManagerInterface $em
    ) {}

    #[Route('/', name: 'list', methods: ["GET"])]
    public function index(
        Request $request,
        PaginationService $paginationService
    ): JsonResponse
    {
        $pagination = $paginationService->getPagination($request, Booking::class);

        return $this->json(
            [
                'items' => $pagination,
                'pageCount' => $pagination->getPageCount(),
                'totalItemCount' => $pagination->getTotalItemCount()
            ],
            context: ["groups" => ["booking:list"]]
        );
    }

    #[Route('/{id}', name: 'get', methods: ["GET"])]
    public function get(Booking $booking): JsonResponse
    {
        return $this->json(
            $booking,
            context: ["groups" => ["booking:list", ]]
        );
    }

    #[Route('/', name: 'new', methods: ["POST"])]
    #[IsGranted("ROLE_ADMIN")]
    public function new(
        Request                     $request,
        SerializerInterface         $serializer,
        ValidatorInterface          $validator,
    ): JsonResponse
    {
        $booking = $serializer->deserialize($request->getContent(), Booking::class, 'json');

        $violations = $validator->validate($booking, groups: ["booking:new"]);

        if ($violations->count() > 0) {
            return $this->json($violations);
        }

        $this->em->persist($booking);
        $this->em->flush();

        return $this->json($booking, context: ["groups" => ["booking:list"]]);
    }

    #[Route('/{id}', name: 'update', methods: ["PUT"])]
    #[IsGranted("ROLE_ADMIN")]
    public function update(
        Booking                        $booking,
        Request                             $request,
        SerializerInterface                 $serializer,
        ValidatorInterface                  $validator,
        PropertyAccessorInterface $propertyAccessor
    ): JsonResponse
    {
        $bookingRequest = $serializer->deserialize(
            $request->getContent(),
            Booking::class,
            'json',
            context: ["booking" => $booking]
        );

        $violations = $validator->validate($bookingRequest, groups: ["booking:edit"]);

        if ($violations->count() > 0) {
            return $this->json($violations);
        }

        $reflect = new \ReflectionClass($bookingRequest);
        $props = $reflect->getProperties(\ReflectionProperty::IS_PRIVATE);

        foreach ($props as $prop) {
            if ($prop->getName() !== "id" && !empty($prop->getValue($bookingRequest))) {
                $propertyAccessor->setValue($booking, $prop->getName(), $prop->getValue($bookingRequest));
            }
        }

        $this->em->flush();

        return $this->json($booking, context: ["groups" => "booking:list"]);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    #[IsGranted("ROLE_ADMIN")]
    public function delete(
        Booking $booking
    ): JsonResponse
    {
//      Supprimer ici une réservation
        $this->em->flush();

        return $this->json(
            $booking,
            context: ["groups" => ["booking:list"]]
        );
    }
}
