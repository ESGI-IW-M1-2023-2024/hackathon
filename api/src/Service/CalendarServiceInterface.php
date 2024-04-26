<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\Request;

interface CalendarServiceInterface
{
    public function handleRequest(Request $request): ?array;
}
