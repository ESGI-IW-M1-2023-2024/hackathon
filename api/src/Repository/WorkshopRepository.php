<?php

namespace App\Repository;

use App\Entity\Workshop;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Workshop>
 *
 * @method Workshop|null find($id, $lockMode = null, $lockVersion = null)
 * @method Workshop|null findOneBy(array $criteria, array $orderBy = null)
 * @method Workshop[]    findAll()
 * @method Workshop[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WorkshopRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Workshop::class);
    }

    /**
     * Requête de base
     */
    public function getBaseQueryBuilder(array $filter): QueryBuilder
    {

        $queryBuilder = $this->createQueryBuilder('w')
            ->innerJoin('w.theme', "t");

        if (!empty($filter["archived"])) {
            $queryBuilder->andWhere('w.archived = :archived')
                ->setParameter('archived', $filter["archived"]);
        }

        if (!empty($filter["status"])) {
            $queryBuilder->andWhere('w.status = :status')
                ->setParameter('status', $filter["status"]);
        }

        if (!empty($filter['label'])) {
            $queryBuilder
                ->andWhere('t.label LIKE :label')
                ->setParameter('label', '%' . $filter['label'] . '%');
        }

        if (!empty($filter['theme'])) {
            $queryBuilder
                ->andWhere('w.theme = :theme')
                ->setParameter('theme', $filter['theme']);
        }

        if (!empty($filter['dateStart'])) {
            $queryBuilder
                ->andWhere('w.dateStart >= :dateStart')
                ->setParameter('dateStart', $filter['dateStart']);
        }

        if (!empty($filter['orderBy']) && !empty($filter['orderByDirection'])) {
            $queryBuilder->orderBy('w.' . $filter['orderBy'], $filter['orderByDirection']);
        }

        return $queryBuilder;
    }

    public function findByDelay($delay)
    {
        return $this->createQueryBuilder('w')
            ->where('w.dateStart >= :date')
            ->andWhere('w.dateStart <= :dateDelayed')
            ->setParameter('date', new DateTime())
            ->setParameter('dateDelayed', (new DateTime())->modify('+' . $delay . ' days'))
            ->andWhere('w.reminderSent = false')
            ->getQuery()
            ->getResult();
    }

    public function findByInterval($start, $end)
    {
        return $this->createQueryBuilder('w')
            ->where('w.dateStart >= :start')
            ->andWhere('w.dateStart <= :end')
            ->setParameter('start', $start)
            ->setParameter('end', $end)
            ->getQuery()
            ->getResult();
    }
}
