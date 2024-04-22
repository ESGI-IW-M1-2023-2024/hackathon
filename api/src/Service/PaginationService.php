<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\Pagination\PaginationInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\HttpFoundation\Request;

class PaginationService
{
    public function __construct(
        private PaginatorInterface     $paginator,
        private EntityManagerInterface $em
    )
    {
    }

    public function getPagination(Request $request, string $entity): PaginationInterface
    {
        $queryBuilder = $this->em->getRepository($entity)->getBaseQueryBuilder($request->query->all());

        return $this->paginator->paginate(
            $queryBuilder, /* query NOT result */
            $request->query->getInt('page', 1), /*page number*/
            $request->query->getInt('limit', 10) /*limit per page*/
        );
    }
}