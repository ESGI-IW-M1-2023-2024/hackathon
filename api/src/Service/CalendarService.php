<?php

namespace App\Service;

use App\Entity\Workshop;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class CalendarService implements CalendarServiceInterface
{

    public function __construct(
        private EntityManagerInterface $em
    ) {
    }
    public function handleRequest(Request $request): array
    {

        $params = [
            'startDate' => (new \DateTime($request->query->get('start')))->modify('first day of this month')->format('Y-m-d'),
            'endDate' => (new \DateTime($request->query->get('end')))->modify('last day of this month')->format('Y-m-d')
        ];


        return $this->em->getRepository(Workshop::class)->findByInterval($params['startDate'], $params['endDate']);

    }
}
