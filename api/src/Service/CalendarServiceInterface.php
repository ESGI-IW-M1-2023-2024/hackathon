<?php

namespace App\Service;

interface CalendarServiceInterface
{
    public function handleRequest(\Symfony\Component\HttpFoundation\Request $request): ?array;
}
