<?php

namespace App\Repository;

use App\Entity\Wine;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Wine>
 *
 * @method Wine|null find($id, $lockMode = null, $lockVersion = null)
 * @method Wine|null findOneBy(array $criteria, array $orderBy = null)
 * @method Wine[]    findAll()
 * @method Wine[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WineRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Wine::class);
    }

    /**
     * Requête de base
     */
    public function getBaseQueryBuilder(array $filter): QueryBuilder
    {
        $queryBuilder = $this->createQueryBuilder('w');

        if (!empty($filter['label'])) {
            $queryBuilder->andWhere('w.label LIKE :label')
                ->setParameter('label', '%' . $filter['label'] . '%');
        }

        if (!empty($filter['productYear'])) {
            $queryBuilder->andWhere('w.productYear = :productYar')
                ->setParameter('productYar', $filter['productYear']);
        }

        if (!empty($filter['producer'])) {
            $queryBuilder->andWhere('w.producer LIKE :producer')
                ->setParameter('producer', '%' . $filter['producer'] . '%');
        }

        if (!empty($filter['region'])) {
            $queryBuilder->andWhere('w.region = :region')
                ->setParameter('region', $filter['region']);
        }


        return $queryBuilder;
    }
}
