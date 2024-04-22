<?php

namespace App\Controller\Api;

use App\Entity\Region;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route("/regions", name: "regions_")]
class RegionController extends AbstractController
{
    #[Route('/', name: 'list', methods: ['GET'])]
    public function index(
        EntityManagerInterface $em,
        PaginatorInterface $paginator,
        Request $request,
    ): JsonResponse
    {
        $queryBuilder = $em->getRepository(Region::class)->getBaseQueryBuilder();

        $pagination = $paginator->paginate(
            $queryBuilder, /* query NOT result */
            $request->query->getInt('page', 1), /*page number*/
            10 /*limit per page*/
        );

        return $this->json(
            [
                'items' => $pagination,
                'page' => ceil($pagination->getTotalItemCount() / 10)
            ],
            context: ["groups" => ["region:read"]]
        );
    }
}
