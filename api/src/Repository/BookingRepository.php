<?php

namespace App\Repository;

use App\Entity\Booking;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Booking>
 *
 * @method Booking|null find($id, $lockMode = null, $lockVersion = null)
 * @method Booking|null findOneBy(array $criteria, array $orderBy = null)
 * @method Booking[]    findAll()
 * @method Booking[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BookingRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Booking::class);
    }

    /**
     * Requête de base
     */
    public function getBaseQueryBuilder(array $filter): QueryBuilder
    {
        $queryBuilder = $this->createQueryBuilder('b');

        if (!empty($filter["email"])) {
            $queryBuilder->andWhere('b.email LIKE :email')
                ->setParameter('email', "%" . $filter["email"] . "%");
        }

        if (!empty($filter["firstname"])) {
            $queryBuilder->andWhere('b.firstname LIKE :firstname')
                ->setParameter('email', "%" . $filter["firstname"] . "%");
        }

        if (!empty($filter["lastname"])) {
            $queryBuilder->andWhere('b.lastname LIKE :lastname')
                ->setParameter('email', "%" . $filter["lastname"] . "%");
        }

        if (!empty($filter["status"])) {
            $queryBuilder->andWhere('b.status = :status')
            ->setParameter('status', $filter["status"]);
        }

        if (!empty($filter["archived"])) {
            $queryBuilder->andWhere('b.archived = :archived')
                ->setParameter('archived', $filter["archived"]);
        }

        return $queryBuilder;
    }
}
