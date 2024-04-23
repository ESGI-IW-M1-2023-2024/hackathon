<?php

namespace App\Controller\Api;

use App\Entity\Workshop;
use App\Service\PaginationService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/workshops', name: 'workshops_')]
class WorkshopController extends AbstractController
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
        $pagination = $paginationService->getPagination($request, Workshop::class);

        return $this->json(
            [
                'items' => $pagination,
                'pageCount' => $pagination->getPageCount(),
                'totalItemCount' => $pagination->getTotalItemCount()
            ],
            context: ["groups" => ["workshop:read"]]
        );
    }

    #[Route('/{id}', name: 'get', methods: ["GET"])]
    public function get(Workshop $workshop): JsonResponse
    {
        return $this->json(
            $workshop,
            context: ["groups" => ["workshop:read"]]
        );
    }
    #[Route('/{id}/finished', name: 'get_finished', methods: ["GET"])]
    public function getFinished(Workshop $workshop): JsonResponse
    {
        return $this->json(
            $workshop,
            context: ["groups" => ["workshop:read", "workshop:read:status:finished"]]
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
        $workshop = $serializer->deserialize($request->getContent(), Workshop::class, 'json');

        $violations = $validator->validate($workshop, groups: ["workshop:new"]);

        if ($violations->count() > 0) {
            return $this->json($violations);
        }

        $this->em->persist($workshop);
        $this->em->flush();

        return $this->json($workshop, context: ["groups" => ["workshop:read"]]);
    }

    #[Route('/{id}', name: 'update', methods: ["PUT"])]
    #[IsGranted("ROLE_ADMIN")]
    public function update(
        Workshop                        $workshop,
        Request                             $request,
        SerializerInterface                 $serializer,
        ValidatorInterface                  $validator,
    ): JsonResponse
    {
        $workshopRequest = $serializer->deserialize($request->getContent(), Workshop::class, 'json');

        $violations = $validator->validate($workshopRequest, groups: ["workshop:edit"]);

        if ($violations->count() > 0) {
            return $this->json($violations);
        }

        if (!empty($workshopRequest->getLabel())) {
            $workshop->setLabel($workshopRequest->getLabel());
        }
        if (!empty($workshopRequest->getDateStart())) {
            $workshop->setDateStart($workshopRequest->getDateStart());
        }
        if (!empty($workshopRequest->getLength())) {
            $workshop->setLength($workshopRequest->getLength());
        }
        if (!empty($workshopRequest->getMaxPerson())) {
            $workshop->setMaxPerson($workshopRequest->getMaxPerson());
        }
        if (!empty($workshopRequest->getLocation())) {
            $workshop->setLocation($workshopRequest->getLocation());
        }
        if (!empty($workshopRequest->getStatus())) {
            $workshop->setStatus($workshopRequest->getStatus());
        }


        $this->em->flush();

        return $this->json($workshop, context: ["groups" => "workshop:read"]);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    #[IsGranted("ROLE_ADMIN")]
    public function delete(
        Workshop $workshop
    ): JsonResponse
    {
//        $workshop->setArchived(true);
        $this->em->flush();

        return $this->json(
            $workshop,
            context: ["groups" => ["workshop:read"]]
        );
    }
}
