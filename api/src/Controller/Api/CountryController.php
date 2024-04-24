<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Intl\Countries;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/countries', name: 'countries_')]
class CountryController extends AbstractController
{
    #[Route('', name: 'countries_list', methods: ["GET"])]
    public function index(): JsonResponse
    {
        $countries = Countries::getNames();

        $data = [];
        foreach ($countries as $key => $country) {
            $data[] = [
                "value" => $key,
                "text" => $country,
            ];
        }

        return $this->json($data);
    }
}
