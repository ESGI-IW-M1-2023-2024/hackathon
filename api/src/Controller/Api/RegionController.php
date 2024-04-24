<?php

namespace App\Controller\Api;

use App\Entity\Region;
use App\Service\PaginationService;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route("/regions", name: "regions_")]
class RegionController extends AbstractController
{
    #[Route('', name: 'list', methods: ['GET'])]
    public function index(
        PaginationService $paginationService,
        Request $request
    ): JsonResponse {
        $pagination = $paginationService->getPagination($request, Region::class);

        return $this->json(
            [
                'items' => $pagination,
                'pageCount' => $pagination->getPageCount(),
                'totalItemCount' => $pagination->getTotalItemCount()
            ],
            context: ["groups" => ["region:list"]]
        );
    }

    #[Route('/{id}', name: 'get', methods: ['GET'])]
    public function get(
        Region $region,
    ): JsonResponse {
        return $this->json(
            $region,
            context: ["groups" => ["region:detail"]]
        );
    }

    #[Route('', name: 'new', methods: ['POST'])]
    #[IsGranted("ROLE_ADMIN")]
    public function new(
        SerializerInterface    $serializer,
        Request                $request,
        ValidatorInterface     $validator,
        EntityManagerInterface $em,
    ): JsonResponse {
        $region = $serializer->deserialize($request->getContent(), Region::class, 'json');

        $violations = $validator->validate($region, groups: ["region:new"]);

        if ($violations->count() > 0) {
            return $this->json($violations, Response::HTTP_BAD_REQUEST);
        }

        $em->persist($region);
        $em->flush();

        return $this->json(
            $region,
            context: ["groups" => ["region:list"]]
        );
    }

    #[Route('/{id}', name: 'edit', methods: ['PUT'])]
    #[IsGranted("ROLE_ADMIN")]
    public function edit(
        SerializerInterface    $serializer,
        Request                $request,
        ValidatorInterface     $validator,
        EntityManagerInterface $em,
        Region                 $region
    ): JsonResponse {
        $regionRequest = $serializer->deserialize($request->getContent(), Region::class, 'json');

        $violations = $validator->validate($regionRequest, groups: ["region:edit"]);

        if ($violations->count() > 0) {
            return $this->json($violations, Response::HTTP_BAD_REQUEST);
        }

        if (!empty($regionRequest->getCountry())) {
            $region->setCountry($regionRequest->getCountry());
        }

        if (!empty($regionRequest->getLabel())) {
            $region->setLabel($regionRequest->getLabel());
        }

        $em->flush();

        return $this->json(
            $region,
            context: ["groups" => ["region:list"]]
        );
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(
        EntityManagerInterface $em,
        Region                 $region
    ): JsonResponse {
        $region->setArchived(true);
        $em->flush();

        return $this->json([], Response::HTTP_NO_CONTENT);
    }
}
