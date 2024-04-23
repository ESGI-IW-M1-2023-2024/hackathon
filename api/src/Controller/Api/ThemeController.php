<?php

namespace App\Controller\Api;

use App\Entity\Theme;
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

#[Route('/themes', name: 'themes_')]
class ThemeController extends AbstractController
{
    #[Route('/', name: 'list', methods: ["GET"])]
    public function index(
        Request           $request,
        PaginationService $paginationService
    ): JsonResponse
    {
        $pagination = $paginationService->getPagination($request, Theme::class);

        return $this->json(
            [
                'items' => $pagination,
                'pageCount' => $pagination->getPageCount(),
                'totalItemCount' => $pagination->getTotalItemCount()
            ],
            context: ["groups" => ["theme:list"]]
        );
    }

    #[Route('/{id}', name: 'get', methods: ["GET"])]
    public function get(
        Theme $theme,
    ): JsonResponse
    {
        return $this->json(
            $theme,
            context: ["groups" => ["theme:list"]]
        );
    }

    #[Route('/', name: 'new', methods: ['POST'])]
    #[IsGranted("ROLE_ADMIN")]
    public function new(
        SerializerInterface    $serializer,
        Request                $request,
        ValidatorInterface     $validator,
        EntityManagerInterface $em,
        ApiUploadFileService   $apiUploadFileService
    ): JsonResponse
    {
        $theme = $serializer->deserialize($request->getContent(), Theme::class, 'json');

        $violations = $validator->validate($theme, groups: ["theme:new"]);

        if ($violations->count() > 0) {
            return $this->json($violations);
        }

        $data = json_decode($request->getContent());
        $file = $data->file;

        $filename = $apiUploadFileService->uploadFile($file, "themes_directory", $theme->getHeaderFilename());
        $theme->setHeaderFilename($filename);

        $em->persist($theme);
        $em->flush();

        return $this->json(
            $theme,
            context: ["groups" => ["theme:detail"]]
        );
    }

    #[Route('/{id}', name: 'edit', methods: ["PUT"])]
    #[IsGranted("ROLE_ADMIN")]
    public function edit(
        Request                   $request,
        SerializerInterface       $serializer,
        ValidatorInterface        $validator,
        EntityManagerInterface    $em,
        PropertyAccessorInterface $propertyAccessor,
        ApiUploadFileService      $apiUploadFileService,
        Theme                     $theme
    ): JsonResponse
    {
        $themeRequest = $serializer->deserialize(
            $request->getContent(),
            Theme::class,
            'json',
            ["theme" => $theme]
        );

        $violations = $validator->validate($themeRequest, groups: ["theme:edit"]);

        if ($violations->count() > 0) {
            return $this->json($violations);
        }

        $data = json_decode($request->getContent());

        if (!empty($data->file)) {
            $file = $data->file;
            $filename = $apiUploadFileService->uploadFile($file, "themes_directory", $theme->getHeaderFilename());
            $theme->setHeaderFilename($filename);
        }

        $reflect = new \ReflectionClass($themeRequest);
        $props = $reflect->getProperties(\ReflectionProperty::IS_PRIVATE);

        foreach ($props as $prop) {
            if ($prop->getName() !== "id" && !empty($prop->getValue($themeRequest))) {
                $propertyAccessor->setValue($theme, $prop->getName(), $prop->getValue($themeRequest));
            }
        }

        $em->flush();

        return $this->json(
            $theme,
            context: ["groups" => ["theme:list"]]
        );
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    #[IsGranted("ROLE_ADMIN")]
    public function delete(
        EntityManagerInterface $em,
        Theme $theme
    ): JsonResponse
    {
        $theme->setArchived(true);
        $em->flush();

        return $this->json('', Response::HTTP_NO_CONTENT);
    }
}
