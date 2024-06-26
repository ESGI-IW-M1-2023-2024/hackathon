<?php

namespace App\Controller\Api;

use App\Entity\Wine;
use App\Service\ApiUploadFileService;
use App\Service\PaginationService;
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

#[Route('/wines', name: 'wines_')]
class WineController extends AbstractController
{
    #[Route('', name: 'list', methods: ["GET"])]
    public function index(
        Request           $request,
        PaginationService $paginationService,
        EntityManagerInterface $em,
    ): JsonResponse {
        if ($request->query->getBoolean('pagination', true)) {
            $pagination = $paginationService->getPagination($request, Wine::class);
    
            return $this->json(
                [
                    "items" => $pagination->getItems(),
                    "pageCount" => $pagination->getPageCount(),
                    'totalItemCount' => $pagination->getTotalItemCount()
                ],
                context: ["groups" => ["wine:list"]]
            );
        } else {
            $wines = $em->getRepository(Wine::class)->findAll();

            return $this->json(
                [
                    'items' => $wines,
                    'totalItemCount' => count($wines)
                ],
                context: ["groups" => ["wine:list"]]
            );
        }
    }

    #[Route('/{id}', name: 'get', methods: ["GET"])]
    public function get(
        Wine $wine,
    ): JsonResponse {
        return $this->json(
            $wine,
            context: ["groups" => ["wine:detail"]]
        );
    }

    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            type: Wine::class,
            example: [
                'label' => 'required',
                'producerPassword' => 'required',
                'grapeVariety' => 'required',
                'alcoholLevel' => 'required',
                'color' => 'required',
                'quantity' => 'required',
                'bottleSize' => 'required',
                'comments' => 'required',
            ]
        )
    )]
    #[Route('', name: 'new', methods: ["POST"])]
    #[IsGranted("ROLE_ADMIN")]
    public function new(
        Request                $request,
        SerializerInterface    $serializer,
        ValidatorInterface     $validator,
        EntityManagerInterface $em,
        ApiUploadFileService $apiUploadFileService
    ): JsonResponse {
        $wine = $serializer->deserialize($request->getContent(), Wine::class, 'json');

        $violations = $validator->validate($wine, groups: ["wine:new"]);

        if ($violations->count() > 0) {
            return $this->json($violations, Response::HTTP_BAD_REQUEST);
        }

        $data = json_decode($request->getContent());
        $file = $data->file;

        $filename = $apiUploadFileService->uploadFile($file, "wines_directory", $wine?->getImageFilename());
        $wine->setImageFilename($filename);

        $em->persist($wine);
        $em->flush();

        return $this->json(
            $wine,
            context: ["groups" => ["wine:list"]]
        );
    }

    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            type: Wine::class,
            example: [
                'label' => 'required',
                'producerPassword' => 'required',
                'grapeVariety' => 'required',
                'alcoholLevel' => 'required',
                'color' => 'required',
                'quantity' => 'required',
                'bottleSize' => 'required',
                'comments' => 'required',
            ]
        )
    )]
    #[Route('/{id}', name: 'edit', methods: ["PUT"])]
    #[IsGranted("ROLE_ADMIN")]
    public function edit(
        Request             $request,
        SerializerInterface $serializer,
        ValidatorInterface  $validator,
        EntityManagerInterface $em,
        PropertyAccessorInterface $propertyAccessor,
        ApiUploadFileService $apiUploadFileService,
        Wine $wine
    ): JsonResponse {
        $wineRequest = $serializer->deserialize($request->getContent(), Wine::class, 'json');

        $violations = $validator->validate($wineRequest, groups: ["wine:edit"]);

        if ($violations->count() > 0) {
            return $this->json($violations, Response::HTTP_BAD_REQUEST);
        }

        $reflect = new \ReflectionClass($wineRequest);
        $props = $reflect->getProperties(\ReflectionProperty::IS_PRIVATE);

        foreach ($props as $prop) {
            if ($prop->getName() !== "id" && !empty($prop->getValue($wineRequest))) {
                $propertyAccessor->setValue($wine, $prop->getName(), $prop->getValue($wineRequest));
            }
        }

        $data = json_decode($request->getContent());
        if (!empty($data->imageFile)) {
            $file = $data->imageFile;
            $filename = $apiUploadFileService->uploadFile($file, "wines_directory", $wine?->getImageFilename());
            $wine->setImageFilename($filename);
        }

        $em->flush();

        return $this->json(
            $wine,
            context: ["groups" => ["wine:list"]]
        );
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    #[IsGranted("ROLE_ADMIN")]
    public function delete(
        EntityManagerInterface $em,
        Wine $wine
    ): JsonResponse {
        $wine->setArchived(false);
        $em->flush();

        return $this->json([], Response::HTTP_NO_CONTENT);
    }
}
