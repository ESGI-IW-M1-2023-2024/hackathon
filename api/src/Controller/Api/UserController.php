<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Service\PaginationService;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/users', name: 'users_')]
class UserController extends AbstractController
{
    #[Route('/', name: 'list', methods: ["GET"])]
    public function index(
        Request $request,
        PaginationService $paginationService
    ): JsonResponse
    {
        $pagination = $paginationService->getPagination($request, User::class);

        return $this->json(
            $pagination,
            context: ["groups" => ["user:list"]]
        );
    }

    #[Route('/{id}', name: 'show', methods: ["GET"])]
    public function get(User $user): JsonResponse
    {
        return $this->json(
            $user,
            context: ["groups" => ["user:list"]]
        );
    }

    #[Route('/', name: '_new', methods: ["POST"])]
    public function new(
        Request                     $request,
        SerializerInterface         $serializer,
        ValidatorInterface          $validator,
        EntityManagerInterface      $em,
        UserPasswordHasherInterface $userPasswordHasher
    ): JsonResponse
    {
        $user = $serializer->deserialize($request->getContent(), User::class, 'json');

        $violations = $validator->validate($user, groups: ["user:new"]);

        if ($violations->count() > 0) {
            return $this->json($violations);
        }

        $user->setRoles(["ROLE_ADMIN"]);
        $user->setPassword($userPasswordHasher->hashPassword($user, $user->plainPassword));
        $user->eraseCredentials();

        $em->persist($user);
        $em->flush();

        return $this->json($user, context: ["groups" => ["user:list"]]);
    }

    #[Route('/{id}', name: 'update', methods: ["PUT"])]
    public function update(
        User $user,
        Request             $request,
        SerializerInterface $serializer,
        ValidatorInterface  $validator,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $userPasswordHasher
    ): JsonResponse
    {
        $userRequest = $serializer->deserialize($request->getContent(), User::class, 'json');

        $violations = $validator->validate($userRequest, groups: ["user:edit"]);

        if ($violations->count() > 0) {
            return $this->json($violations);
        }

        if (!empty($userRequest->getFirstname())) {
            $user->setFirstname($userRequest->getFirstname());
        }

        if (!empty($userRequest->getLastname())) {
            $user->setLastname($userRequest->getLastname());
        }

        if (!empty($userRequest->getEmail())) {
            $user->setEmail($userRequest->getEmail());
        }

        if (!empty($userRequest->plainPassword)) {
            $user->setPassword($userPasswordHasher->hashPassword($user, $userRequest->plainPassword));
        }

        $em->flush();

        return $this->json($user, context: ["groups" => "user:list"]);
    }
}
