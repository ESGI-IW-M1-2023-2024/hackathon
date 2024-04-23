<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240423182458 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE booking DROP deleted_at');
        $this->addSql('ALTER TABLE organisation DROP deleted_at');
        $this->addSql('ALTER TABLE region DROP deleted_at');
        $this->addSql('ALTER TABLE resource DROP deleted_at');
        $this->addSql('ALTER TABLE theme DROP deleted_at');
        $this->addSql('ALTER TABLE user DROP deleted_at');
        $this->addSql('ALTER TABLE wine DROP deleted_at, CHANGE image image_filename VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE workshop DROP deleted_at');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE resource ADD deleted_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE wine ADD deleted_at DATETIME DEFAULT NULL, CHANGE image_filename image VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE workshop ADD deleted_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE `user` ADD deleted_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE theme ADD deleted_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE organisation ADD deleted_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE booking ADD deleted_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE region ADD deleted_at DATETIME DEFAULT NULL');
    }
}
