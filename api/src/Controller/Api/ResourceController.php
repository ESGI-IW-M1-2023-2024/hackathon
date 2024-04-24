<?php

namespace App\Controller\Api;

use App\Entity\Resource;
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

#[Route('/resources', name: 'resources_')]
class ResourceController extends AbstractController
{
    #[Route('', name: 'list', methods: ["GET"])]
    public function index(
        PaginationService $paginationService,
        Request           $request
    ): JsonResponse {
        $pagination = $paginationService->getPagination($request, Resource::class);

        return $this->json(
            [
                'items' => $pagination,
                'pageCount' => $pagination->getPageCount(),
                'totalItemCount' => $pagination->getTotalItemCount()
            ],
            context: ["groups" => ["resource:list"]]
        );
    }

    #[Route('/{id}', name: 'get', methods: ["GET"])]
    public function get(
        Resource $resource,
    ): JsonResponse {
        return $this->json(
            $resource,
            context: ["groups" => ["resource:detail"]]
        );
    }

    #[Route('', name: 'new', methods: ['POST'])]
    #[IsGranted("ROLE_ADMIN")]
    public function new(
        SerializerInterface    $serializer,
        Request                $request,
        ValidatorInterface     $validator,
        EntityManagerInterface $em,
        ApiUploadFileService $apiUploadFileService
    ): JsonResponse {
        $resource = $serializer->deserialize($request->getContent(), Resource::class, 'json');

        $violations = $validator->validate($resource, groups: ["resource:new"]);

        if ($violations->count() > 0) {
            return $this->json($violations);
        }

        $data = json_decode($request->getContent());
        $file = $data->file;

        $filename = $apiUploadFileService->uploadFile($file, "resources_directory", $resource?->getFilename());
        $resource->setFilename($filename);

        $em->persist($resource);
        $em->flush();

        return $this->json(
            $resource,
            context: ["groups" => ["resource:list"]]
        );
    }

    #[Route('/{id}', name: 'edit', methods: ["PUT"])]
    #[IsGranted("ROLE_ADMIN")]
    public function edit(
        Request             $request,
        SerializerInterface $serializer,
        ValidatorInterface  $validator,
        EntityManagerInterface $em,
        PropertyAccessorInterface $propertyAccessor,
        ApiUploadFileService $apiUploadFileService,
        Resource $resource
    ): JsonResponse {
        $resourceRequest = $serializer->deserialize(
            $request->getContent(),
            Resource::class,
            'json',
            ["resource" => $resource]
        );

        $violations = $validator->validate($resourceRequest, groups: ["resource:edit"]);

        if ($violations->count() > 0) {
            return $this->json($violations);
        }

        $reflect = new \ReflectionClass($resourceRequest);
        $props = $reflect->getProperties(\ReflectionProperty::IS_PRIVATE);

        foreach ($props as $prop) {
            if ($prop->getName() !== "id" && !empty($prop->getValue($resourceRequest))) {
                $propertyAccessor->setValue($resource, $prop->getName(), $prop->getValue($resourceRequest));
            }
        }

        $data = json_decode($request->getContent());
        if (!empty($data->file)) {
            $file = $data->file;
            $filename = $apiUploadFileService->uploadFile($file, "resources_directory", $resource?->getFilename());
            $resource->setFilename($filename);
        }

        $em->flush();

        return $this->json(
            $resource,
            context: ["groups" => ["resource:list"]]
        );
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    #[IsGranted("ROLE_ADMIN")]
    public function delete(
        EntityManagerInterface $em,
        Resource $resource
    ): JsonResponse {
        $resource->setArchived(true);
        $em->flush();

        return $this->json('', Response::HTTP_NO_CONTENT);
    }
}
