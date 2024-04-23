<?php

namespace App\Controller\Api;

use App\Entity\Wine;
use App\Service\PaginationService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PropertyAccess\PropertyAccessorInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/wines', name: 'wines_')]
class WineController extends AbstractController
{
    #[Route('/', name: 'list', methods: ["GET"])]
    public function index(
        Request           $request,
        PaginationService $paginationService
    ): JsonResponse
    {
        $pagination = $paginationService->getPagination($request, Wine::class);

        return $this->json(
            [
                "items" => $pagination->getItems(),
                "pageCount" => $pagination->getPageCount(),
            ],
            context: ["groups" => ["wine:read"]]
        );
    }

    #[Route('/{id}', name: 'get', methods: ["GET"])]
    public function get(
        Wine $wine,
    ): JsonResponse
    {
        return $this->json(
            $wine,
            context: ["groups" => ["wine:read"]]
        );
    }

    #[Route('/', name: 'new', methods: ["POST"])]
    public function new(
        Request                $request,
        SerializerInterface    $serializer,
        ValidatorInterface     $validator,
        EntityManagerInterface $em,
    ): JsonResponse
    {
        $wine = $serializer->deserialize($request->getContent(), Wine::class, 'json');

        $violations = $validator->validate($wine, groups: ["wine:new"]);

        if ($violations->count() > 0) {
            return $this->json($violations);
        }

        $em->persist($wine);
        $em->flush();

        return $this->json(
            $wine,
            context: ["groups" => ["wine:read"]]
        );
    }

    #[Route('/{id}', name: 'edit', methods: ["PUT"])]
    public function edit(
        Request             $request,
        SerializerInterface $serializer,
        ValidatorInterface  $validator,
        EntityManagerInterface $em,
        PropertyAccessorInterface $propertyAccessor,
        Wine $wine
    ): JsonResponse
    {
        $wineRequest = $serializer->deserialize($request->getContent(), Wine::class, 'json');

        $violations = $validator->validate($wineRequest, groups: ["wine:edit"]);

        if ($violations->count() > 0) {
            return $this->json($violations);
        }

        $reflect = new \ReflectionClass($wineRequest);
        $props = $reflect->getProperties(\ReflectionProperty::IS_PRIVATE);

        foreach ($props as $prop) {
            if ($prop->getName() !== "id" && !empty($prop->getValue($wineRequest))) {
                $propertyAccessor->setValue($wine, $prop->getName(), $prop->getValue($wineRequest));
            }
        }

        $em->flush();

        return $this->json(
            $wine,
            context: ["groups" => ["wine:read"]]
        );
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(
        EntityManagerInterface $em,
        Wine $wine
    ): JsonResponse
    {
        $em->remove($wine);
        $em->flush();

        return $this->json(
            $wine,
            context: ["groups" => ["region:read"]]
        );
    }
}
