<?php

namespace App\Controller\Api;

use App\Entity\Workshop;
use App\Service\CalendarServiceInterface;
use App\Service\PaginationService;
use App\Service\WorkshopService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PropertyAccess\PropertyAccessorInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use OpenApi\Attributes as OA;

#[Route('/workshops', name: 'workshops_')]
class WorkshopController extends AbstractController
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
        $pagination = $paginationService->getPagination($request, Workshop::class);

        return $this->json(
            [
                'items' => $pagination,
                'pageCount' => $pagination->getPageCount(),
                'totalItemCount' => $pagination->getTotalItemCount()
            ],
            context: ["groups" => ["workshop:list"]]
        );
    }

    #[Route('/calendar', name: 'list_calendar', methods: ["GET"])]
    public function calendar(
        Request $request,
        CalendarServiceInterface $calendarService
    ): JsonResponse {

        $data = $calendarService->handleRequest($request);

        return $this->json($data,
            Response::HTTP_OK,
            context: ["groups" => ["workshop:list"]]

        );
    }

    #[Route('/{id}', name: 'get', methods: ["GET"])]
    public function get(Workshop $workshop): JsonResponse
    {
        return $this->json(
            $workshop,
            context: ["groups" => ["workshop:list", "workshop:detail"]]
        );
    }

    #[Route('/{id}/open', name: 'open', methods: ["POST"])]
    #[IsGranted('ROLE_ADMIN')]
    public function open(Workshop $workshop, EntityManagerInterface $em): JsonResponse
    {
        $workshop->setStatus(\WorkshopStatus::BOOKING);

        $em->flush();

        return $this->json(
            $workshop,
            context: ["groups" => ["workshop:detail"]]
        );
    }

    #[Route('/{id}/finished', name: 'finish', methods: ["POST"])]
    #[IsGranted('ROLE_ADMIN')]
    public function finish(Workshop $workshop, WorkshopService $workshopService): JsonResponse
    {
        $workshopService->workshopFinishedHandler($workshop);

        return $this->json(
            $workshop,
            context: ["groups" => ["workshop:detail"]]
        );
    }

    #[Route('/{id}/cancel', name: 'cancel', methods: ["POST"])]
    #[IsGranted('ROLE_ADMIN')]
    public function cancel(Workshop $workshop, WorkshopService $workshopService): JsonResponse
    {
        $workshopService->workshopCancelHandler($workshop);

        return $this->json(
            $workshop,
            context: ["groups" => ["workshop:detail"]]
        );
    }

    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            type: Workshop::class,
            example: [
                'label' => 'required',
                'dateStart' => 'required',
                'length' => 90,
                'maxPerson' => 14,
                'location' => 'required',
                'status' => 'required',
                'maxBookingDate' => 'required',
                'price' => 35,
            ]
        ),
    )]
    #[Route('', name: 'new', methods: ["POST"])]
    #[IsGranted("ROLE_ADMIN")]
    public function new(
        Request                     $request,
        SerializerInterface         $serializer,
        ValidatorInterface          $validator,
    ): JsonResponse {
        $workshop = $serializer->deserialize($request->getContent(), Workshop::class, 'json');

        $violations = $validator->validate($workshop, groups: ["workshop:new"]);

        if ($violations->count() > 0) {
            return $this->json($violations, Response::HTTP_BAD_REQUEST);
        }

        $this->em->persist($workshop);
        $this->em->flush();

        return $this->json($workshop, context: ["groups" => ["workshop:detail"]]);
    }

    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            type: Workshop::class,
            example: [
                'label' => 'required',
                'dateStart' => 'required',
                'length' => 90,
                'maxPerson' => 14,
                'location' => 'required',
                'status' => 'required',
                'maxBookingDate' => 'required',
                'price' => 35,
            ]
        )
    )]
    #[Route('/{id}', name: 'update', methods: ["PUT"])]
    #[IsGranted("ROLE_ADMIN")]
    public function update(
        Workshop                        $workshop,
        Request                             $request,
        SerializerInterface                 $serializer,
        ValidatorInterface                  $validator,
        PropertyAccessorInterface $propertyAccessor
    ): JsonResponse {
        $workshopRequest = $serializer->deserialize($request->getContent(), Workshop::class, 'json');

        $violations = $validator->validate($workshopRequest, groups: ["workshop:edit"]);

        if ($violations->count() > 0) {
            return $this->json($violations, Response::HTTP_BAD_REQUEST);
        }

        $reflect = new \ReflectionClass($workshopRequest);
        $props = $reflect->getProperties(\ReflectionProperty::IS_PRIVATE);

        foreach ($props as $prop) {
            if (!empty($prop->getValue($workshopRequest)) && !in_array($prop->getName(), ['id', 'bookings', 'resources'])) {
                $propertyAccessor->setValue($workshop, $prop->getName(), $prop->getValue($workshopRequest));
            }
        }
        $this->em->flush();

        return $this->json($workshop, context: ["groups" => "workshop:list"]);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    #[IsGranted("ROLE_ADMIN")]
    public function delete(
        Workshop $workshop
    ): JsonResponse {
        $workshop->setArchived(true);
        $this->em->flush();

        return $this->json([], Response::HTTP_NO_CONTENT);
    }
}
