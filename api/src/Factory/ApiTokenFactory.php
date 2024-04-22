<?php

namespace App\Factory;

use App\Entity\ApiToken;

class ApiTokenFactory
{
    public function generateToken(): ApiToken
    {
        $token = $this->generateRandomToken();

        $apiToken = new ApiToken();
        $apiToken->setToken($token);
        $apiToken->setExpiredAt(new \DateTimeImmutable("+1 hour"));

        return $apiToken;
    }

    private function generateRandomToken(): string
    {
        return bin2hex(random_bytes(32)); // Convert bytes to hex
    }
}