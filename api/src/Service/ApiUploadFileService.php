<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Uid\Uuid;

class ApiUploadFileService
{
    public function __construct(
        private ParameterBagInterface $parameterBag,
    )
    {
    }

    public function uploadFile(string $base64, string $directory, ?string $existantFile = null): string
    {
        $file = base64_decode($base64);

        $tmpPath = sys_get_temp_dir() . '/sf_upload' . uniqid();
        file_put_contents($tmpPath, $file);

        $file = new File($tmpPath);

        $filename = Uuid::v4() . '.' . $file->guessExtension();
        $file->move($this->parameterBag->get($directory), $filename);

        $filesystem = new Filesystem();
        $filesystem->remove($this->parameterBag->get($directory) . '/' . $existantFile);

        return $filename;
    }
}