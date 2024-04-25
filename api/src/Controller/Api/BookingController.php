<?php

namespace App\Controller\Api;

use App\Entity\Booking;
use App\Enum\BookingStatus;
use App\Service\BookingService;
use App\Service\MailerService;
use App\Service\PaginationService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\PropertyAccess\PropertyAccessorInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use OpenApi\Attributes as OA;

#[Route('/bookings', name: 'bookings_')]
#[IsGranted("ROLE_ADMIN")]
class BookingController extends AbstractController
{

    public function __construct(
        private EntityManagerInterface $em
    ) {
    }

    #[Route('', name: 'list', methods: ["GET"])]
    public function index(
        Request $request,
        PaginationService $paginationService
    ): JsonResponse {
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
            context: ["groups" => ["booking:list",]]
        );
    }

    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            type: Booking::class,
            example: [
                'firstname' => 'required',
                'lastname' => 'required',
                'email' => 'required',
                'schoolClass' => 'required',
                'workshopId' => 0
            ]
        )
    )]
    #[Route('', name: 'new', methods: ["POST"])]
    public function new(
        Request                     $request,
        SerializerInterface         $serializer,
        ValidatorInterface          $validator,
        MailerService $mailerService,
    ): JsonResponse {
        $booking = $serializer->deserialize($request->getContent(), Booking::class, 'json');

        $violations = $validator->validate($booking, groups: ["booking:new"]);

        if ($violations->count() > 0) {
            return $this->json($violations, Response::HTTP_BAD_REQUEST);
        }

        $this->em->persist($booking);
        $this->em->flush();

        $booking->setReference(rand(1000, 9999). $booking->getId());
        $this->em->flush();

        $mailerService->sendMail(
            \MailerEnum::BOOKING,
            [
                "booking" => $booking
            ]
        );

        return $this->json($booking, context: ["groups" => ["booking:list"]]);
    }

    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            type: Booking::class,
            example: [
                'firstname' => 'required',
                'lastname' => 'required',
                'email' => 'required',
                'schoolClass' => 'required',
                'workshopId' => 1
            ]
        )
    )]
    #[Route('/{id}', name: 'update', methods: ["PUT"])]
    public function update(
        Booking                        $booking,
        Request                             $request,
        SerializerInterface                 $serializer,
        ValidatorInterface                  $validator,
        PropertyAccessorInterface $propertyAccessor
    ): JsonResponse {
        $bookingRequest = $serializer->deserialize(
            $request->getContent(),
            Booking::class,
            'json',
            context: ["booking" => $booking]
        );

        $violations = $validator->validate($bookingRequest, groups: ["booking:edit"]);

        if ($violations->count() > 0) {
            return $this->json($violations, Response::HTTP_BAD_REQUEST);
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
    public function delete(
        Booking $booking
    ): JsonResponse {
        $booking->setArchived(true);
        $this->em->flush();

        return $this->json([], Response::HTTP_NO_CONTENT);
    }

    #[Route('/{id}/validate', name: 'validate', methods: ["POST"])]
    public function validate(
        Booking $booking,
        MailerService $mailerService
    ) {
        $booking->setStatus(BookingStatus::PAID);
        $this->em->flush();

        $mailerService->sendMail(
            \MailerEnum::BOOKING_VALIDATION,
            [
                "booking" => $booking
            ]
        );

        return $this->json(
            $booking,
            context: ["groups" => ["booking:list"]]
        );
    }

    #[Route('/{id}/cancel', name: 'cancel', methods: ["POST"])]
    public function cancel(
        Booking $booking,
        MailerService $mailerService
    ): JsonResponse {
        $booking->setStatus(BookingStatus::CANCELED);
        $this->em->flush();

        $mailerService->sendMail(
            \MailerEnum::BOOKING_CANCELED,
            [
                "booking" => $booking
            ]
        );

        return $this->json(
            $booking,
            context: ["groups" => ["booking:list"]]
        );
    }
}
