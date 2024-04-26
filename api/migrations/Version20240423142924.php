<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240423142924 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE wine ADD serving_temperature DOUBLE PRECISION DEFAULT NULL, ADD storage VARCHAR(255) DEFAULT NULL, ADD up_to VARCHAR(255) DEFAULT NULL, ADD taste VARCHAR(255) DEFAULT NULL, ADD by_taste VARCHAR(255) DEFAULT NULL, ADD by_eye VARCHAR(255) DEFAULT NULL, ADD on_the_nose VARCHAR(255) DEFAULT NULL, ADD in_the_mouth VARCHAR(255) DEFAULT NULL, ADD wine_pairing VARCHAR(255) DEFAULT NULL, ADD recommanded_pairing VARCHAR(255) DEFAULT NULL, ADD content LONGTEXT DEFAULT NULL, ADD image VARCHAR(255) DEFAULT NULL, CHANGE quantity quantity INT DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE wine DROP serving_temperature, DROP storage, DROP up_to, DROP taste, DROP by_taste, DROP by_eye, DROP on_the_nose, DROP in_the_mouth, DROP wine_pairing, DROP recommanded_pairing, DROP content, DROP image, CHANGE quantity quantity INT NOT NULL');
    }
}
