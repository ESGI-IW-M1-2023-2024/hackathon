<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240423130010 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE theme ADD content LONGTEXT NOT NULL, ADD subtitle VARCHAR(255) DEFAULT NULL, ADD header_filename VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE workshop ADD price DOUBLE PRECISION NOT NULL, DROP label, DROP content, DROP subtitle');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE theme DROP content, DROP subtitle, DROP header_filename');
        $this->addSql('ALTER TABLE workshop ADD label VARCHAR(255) NOT NULL, ADD content LONGTEXT NOT NULL, ADD subtitle VARCHAR(255) DEFAULT NULL, DROP price');
    }
}
