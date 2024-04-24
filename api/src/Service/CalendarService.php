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
            'startDate' => new \DateTime($request->request->get('start')),
            'endDate' => new \DateTime($request->request->get('end'))
        ];

        return $this->em->getRepository(Workshop::class)->findByInterval($params['startDate'], $params['endDate']);

    }
}
