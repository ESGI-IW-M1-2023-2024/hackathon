<?php

namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserController extends AbstractController
{
    #[Route('/users', name: 'users_list', methods: ["GET"])]
    public function index(EntityManagerInterface $em, PaginatorInterface $paginator, Request $request): JsonResponse
    {
        $queryBuilder = $em->getRepository(User::class)->getBaseQueryBuilder();

        $pagination = $paginator->paginate(
            $queryBuilder, /* query NOT result */
            $request->query->getInt('page', 1), /*page number*/
            10 /*limit per page*/
        );

        return $this->json(
            $pagination,
            context: ["groups" => ["user:read"]]
        );
    }

    #[Route('/users/{id}', name: 'users', methods: ["GET"])]
    public function get(User $user): JsonResponse
    {
        return $this->json(
            $user,
            context: ["groups" => ["user:read"]]
        );
    }

    #[Route('/users', name: 'users_new', methods: ["POST"])]
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

        $userExist = $em->getRepository(User::class)->findOneByEmail($user->getEmail());

        if ($userExist) {
            return $this->json([
                "message" => "User already exist.",
            ]);
        }

        $user->setRoles(["ROLE_ADMIN"]);
        $user->setPassword($userPasswordHasher->hashPassword($user, $user->plainPassword));
        $user->eraseCredentials();

        $em->persist($user);
        $em->flush();

        return $this->json($user, context: ["groups" => ["user:read"]]);
    }

    #[Route('/users/{id}', name: 'users_update', methods: ["PUT"])]
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

        $violations = $validator->validate($userRequest);

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

            $userExist = $em->getRepository(User::class)->findOneByEmail($user->getEmail());

            if (!empty($userExist)) {
                return $this->json([
                   "message" => "User already exist.",
                ]);
            }
        }

        if (!empty($userRequest->plainPassword)) {
            $user->setPassword($userPasswordHasher->hashPassword($user, $userRequest->plainPassword));
        }

        $em->flush();

        return $this->json($user, context: ["groups" => "user:read"]);
    }
}
