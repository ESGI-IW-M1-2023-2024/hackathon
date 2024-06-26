<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Factory\ApiTokenFactory;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use OpenApi\Attributes as OA;

class ApiLoginController extends AbstractController
{
    #[OA\RequestBody(
        content: new OA\JsonContent(
            type: User::class,
            example: [
                'username' => 'required',
                'password' => 'required'
            ]
        ),
        required: true
    )]
    #[Route('/login', name: 'login', methods: ["POST"])]
    public function index(#[CurrentUser] ?User $user, ApiTokenFactory $apiTokenFactory, EntityManagerInterface $em): JsonResponse
    {
        if (null === $user) {
            return $this->json([
                'message' => 'missing credentials',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $token = $apiTokenFactory->generateToken();
        $user->addApiToken($token);
        $em->flush();

        return $this->json(
            [
                'user' => $user,
                'token' => $token->getToken(),
            ],
            context: ['groups' => ['user:list']]
        );
    }
}
