<?php

namespace App\Repository;

use App\Entity\Theme;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Theme>
 *
 * @method Theme|null find($id, $lockMode = null, $lockVersion = null)
 * @method Theme|null findOneBy(array $criteria, array $orderBy = null)
 * @method Theme[]    findAll()
 * @method Theme[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ThemeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Theme::class);
    }

    /**
     * Requête de base
     */
    public function getBaseQueryBuilder(array $filter): QueryBuilder
    {
        $queryBuilder = $this->createQueryBuilder('t');

        if (!empty($filter["archived"])) {
            $queryBuilder->andWhere('t.archived = :archived')
            ->setParameter("archived", $filter["archived"]);
        }

        return $queryBuilder;
    }
}
