<?php

namespace App\Controller\Api;

use App\Entity\Organisation;
use App\Service\PaginationService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use OpenApi\Attributes as OA;

#[Route('/organisations', name: 'organisations_')]
class OrganisationController extends AbstractController
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
        $pagination = $paginationService->getPagination($request, Organisation::class);

        return $this->json(
            [
                'items' => $pagination,
                'pageCount' => $pagination->getPageCount(),
                'totalItemCount' => $pagination->getTotalItemCount()
            ],
            context: ["groups" => ["organisation:list"]]
        );
    }

    #[Route('/{id}', name: 'get', methods: ["GET"])]
    public function get(Organisation $organisation): JsonResponse
    {
        return $this->json(
            $organisation,
            context: ["groups" => ["organisation:detail"]]
        );
    }

    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            type: Organisation::class,
            example: [
                'label' => 'required',
                'logoFilename' => 'nullable',
            ]
        )
    )]
    #[Route('', name: 'new', methods: ["POST"])]
    #[IsGranted("ROLE_ADMIN")]
    public function new(
        Request                     $request,
        SerializerInterface         $serializer,
        ValidatorInterface          $validator,
    ): JsonResponse {
        $organisation = $serializer->deserialize($request->getContent(), Organisation::class, 'json');

        $violations = $validator->validate($organisation, groups: ["organisation:new"]);

        if ($violations->count() > 0) {
            return $this->json($violations, Response::HTTP_BAD_REQUEST);
        }

        $this->em->persist($organisation);
        $this->em->flush();

        return $this->json($organisation, context: ["groups" => ["organisation:list"]]);
    }

    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            type: Organisation::class,
            example: [
                'label' => 'required',
                'logoFilename' => 'nullable',
            ]
        )
    )]
    #[Route('/{id}', name: 'update', methods: ["PUT"])]
    #[IsGranted("ROLE_ADMIN")]
    public function update(
        Organisation                        $organisation,
        Request                             $request,
        SerializerInterface                 $serializer,
        ValidatorInterface                  $validator,
    ): JsonResponse {
        $organisationRequest = $serializer->deserialize($request->getContent(), Organisation::class, 'json');

        $violations = $validator->validate($organisationRequest, groups: ["organisation:edit"]);

        if ($violations->count() > 0) {
            return $this->json($violations, Response::HTTP_BAD_REQUEST);
        }

        if (!empty($organisationRequest->getLabel())) {
            $organisation->setLabel($organisationRequest->getLabel());
        }

        $this->em->flush();

        return $this->json($organisation, context: ["groups" => "organisation:list"]);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    #[IsGranted("ROLE_ADMIN")]
    public function delete(
        Organisation $organisation
    ): JsonResponse {
        $organisation->setArchived(true);
        $this->em->flush();

        return $this->json([], Response::HTTP_NO_CONTENT);
    }
}
