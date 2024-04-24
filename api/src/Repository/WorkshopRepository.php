<?php

namespace App\Repository;

use App\Entity\Workshop;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Validator\Constraints\Date;

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

        $queryBuilder = $this->createQueryBuilder('u');

        if (!empty($filter['dateStart'])) {
            $queryBuilder
                ->andWhere('u.dateStart >= :dateStart')
                ->setParameter('dateStart', $filter['dateStart']);
        }

        if (!empty($filter['orderBy']) && !empty($filter['orderByDirection'])) {
            $queryBuilder->orderBy('u.' . $filter['orderBy'], $filter['orderByDirection']);
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
}
