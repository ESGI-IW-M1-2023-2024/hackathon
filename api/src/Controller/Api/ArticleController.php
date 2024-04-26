<?php

namespace App\Controller\Api;

use App\Entity\Article;
use App\Entity\Workshop;
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

#[Route('/articles', name: 'articles')]
class ArticleController extends AbstractController
{
    #[Route('', name: 'list', methods: ['GET'])]
    #[IsGranted('ROLE_ADMIN')]
    public function index(
        PaginationService $paginationService,
        Request           $request
    ): JsonResponse {
        $pagination = $paginationService->getPagination($request, Article::class);

        return $this->json(
            [
                'items' => $pagination,
                'pageCount' => $pagination->getPageCount(),
                'totalItemCount' => $pagination->getTotalItemCount()
            ],
            context: ["groups" => ["article:list"]]
        );
    }

    #[Route('/{id}', name: 'get', methods: ['GET'])]
    public function get(
        Article $article
    ): JsonResponse {
        return $this->json(
            $article,
            context: ["groups" => ["article:detail"]]
        );
    }

    #[Route('', name: 'new', methods: ['POST'])]
    #[IsGranted('ROLE_ADMIN')]
    public function new(
        Request                $request,
        SerializerInterface    $serializer,
        ValidatorInterface     $validator,
        EntityManagerInterface $em,
        ApiUploadFileService $apiUploadFileService
    ): JsonResponse {
        $article = $serializer->deserialize($request->getContent(), Article::class, 'json');
        $violations = $validator->validate($article, groups: ["article:new"]);

        if ($violations->count() > 0) {
            return $this->json($violations, Response::HTTP_BAD_REQUEST);
        }

        $data = json_decode($request->getContent());
        $headerFile = $data->headerFile;
        $imageFile = $data->imageFile;

        $filename = $apiUploadFileService->uploadFile($headerFile, "articles_headers_directory", $article?->getHeaderFilename());
        $article->setHeaderFilename($filename);

        $filename = $apiUploadFileService->uploadFile($imageFile, "articles_images_directory", $article?->getImageFilename());
        $article->setImageFilename($filename);

        $em->persist($article);
        $em->flush();

        return $this->json(
            $article,
            context: ["groups" => ["article:detail"]]
        );
    }

    #[Route('/{id}', name: 'edit', methods: ['PUT'])]
    #[IsGranted('ROLE_ADMIN')]
    public function edit(
        Request                   $request,
        SerializerInterface       $serializer,
        ValidatorInterface        $validator,
        PropertyAccessorInterface $propertyAccessor,
        ApiUploadFileService      $apiUploadFileService,
        EntityManagerInterface    $em,
        Article                   $article
    ): JsonResponse {
        $articleRequest = $serializer->deserialize(
            $request->getContent(),
            Article::class,
            'json',
            ["article" => $article]
        );

        $violations = $validator->validate($articleRequest, groups: ["article:edit"]);

        if ($violations->count() > 0) {
            return $this->json($violations, Response::HTTP_BAD_REQUEST);
        }

        $reflect = new \ReflectionClass($articleRequest);
        $props = $reflect->getProperties(\ReflectionProperty::IS_PRIVATE);

        foreach ($props as $prop) {
            if ($prop->getName() !== "id" && !empty($prop->getValue($articleRequest))) {
                $propertyAccessor->setValue($article, $prop->getName(), $prop->getValue($articleRequest));
            }
        }

        $data = json_decode($request->getContent());
        if (!empty($data->headerFile)) {
            $file = $data->headerFile;
            $filename = $apiUploadFileService->uploadFile($file, "articles_headers_directory", $article?->getHeaderFilename());
            $article->setHeaderFilename($filename);
        }

        if (!empty($data->imageFile)) {
            $file = $data->imageFile;
            $filename = $apiUploadFileService->uploadFile($file, "articles_images_directory", $article?->getImageFilename());
            $article->setImageFilename($filename);
        }

        $em->flush();

        return $this->json(
            $article,
            context: ["groups" => ["article:detail"]]
        );
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    #[IsGranted('ROLE_ADMIN')]
    public function delete(
        Article $workshop,
        EntityManagerInterface $entityManager
    ) {
        $workshop->setArchived(true);
        $entityManager->flush();

        return $this->json([], Response::HTTP_NO_CONTENT);
    }
}
