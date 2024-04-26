<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240422144828 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE booking (id INT AUTO_INCREMENT NOT NULL, workshop_id INT NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, school_class VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, reference VARCHAR(255) NOT NULL, INDEX IDX_E00CEDDE1FDCE57C (workshop_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE organisation (id INT AUTO_INCREMENT NOT NULL, label VARCHAR(255) NOT NULL, logo_filename VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE region (id INT AUTO_INCREMENT NOT NULL, label VARCHAR(255) NOT NULL, country VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE resource (id INT AUTO_INCREMENT NOT NULL, workshop_id INT NOT NULL, label VARCHAR(255) NOT NULL, filename VARCHAR(255) NOT NULL, INDEX IDX_BC91F4161FDCE57C (workshop_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE theme (id INT AUTO_INCREMENT NOT NULL, label VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE wine (id INT AUTO_INCREMENT NOT NULL, region_id INT NOT NULL, label VARCHAR(255) NOT NULL, product_year INT NOT NULL, producer VARCHAR(255) NOT NULL, grape_variety VARCHAR(255) NOT NULL, alcohol_level DOUBLE PRECISION NOT NULL, color VARCHAR(255) NOT NULL, quantity INT NOT NULL, bottle_size VARCHAR(255) NOT NULL, comments LONGTEXT DEFAULT NULL, INDEX IDX_560C646898260155 (region_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE wine_workshop (wine_id INT NOT NULL, workshop_id INT NOT NULL, INDEX IDX_1BC24BC728A2BD76 (wine_id), INDEX IDX_1BC24BC71FDCE57C (workshop_id), PRIMARY KEY(wine_id, workshop_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE workshop (id INT AUTO_INCREMENT NOT NULL, organisation_id INT DEFAULT NULL, theme_id INT DEFAULT NULL, label VARCHAR(255) NOT NULL, date_start DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', length INT NOT NULL, max_person INT NOT NULL, location VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, max_booking_date DATE NOT NULL COMMENT \'(DC2Type:date_immutable)\', content LONGTEXT NOT NULL, INDEX IDX_9B6F02C49E6B1585 (organisation_id), INDEX IDX_9B6F02C459027487 (theme_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDE1FDCE57C FOREIGN KEY (workshop_id) REFERENCES workshop (id)');
        $this->addSql('ALTER TABLE resource ADD CONSTRAINT FK_BC91F4161FDCE57C FOREIGN KEY (workshop_id) REFERENCES workshop (id)');
        $this->addSql('ALTER TABLE wine ADD CONSTRAINT FK_560C646898260155 FOREIGN KEY (region_id) REFERENCES region (id)');
        $this->addSql('ALTER TABLE wine_workshop ADD CONSTRAINT FK_1BC24BC728A2BD76 FOREIGN KEY (wine_id) REFERENCES wine (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE wine_workshop ADD CONSTRAINT FK_1BC24BC71FDCE57C FOREIGN KEY (workshop_id) REFERENCES workshop (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE workshop ADD CONSTRAINT FK_9B6F02C49E6B1585 FOREIGN KEY (organisation_id) REFERENCES organisation (id)');
        $this->addSql('ALTER TABLE workshop ADD CONSTRAINT FK_9B6F02C459027487 FOREIGN KEY (theme_id) REFERENCES theme (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE booking DROP FOREIGN KEY FK_E00CEDDE1FDCE57C');
        $this->addSql('ALTER TABLE resource DROP FOREIGN KEY FK_BC91F4161FDCE57C');
        $this->addSql('ALTER TABLE wine DROP FOREIGN KEY FK_560C646898260155');
        $this->addSql('ALTER TABLE wine_workshop DROP FOREIGN KEY FK_1BC24BC728A2BD76');
        $this->addSql('ALTER TABLE wine_workshop DROP FOREIGN KEY FK_1BC24BC71FDCE57C');
        $this->addSql('ALTER TABLE workshop DROP FOREIGN KEY FK_9B6F02C49E6B1585');
        $this->addSql('ALTER TABLE workshop DROP FOREIGN KEY FK_9B6F02C459027487');
        $this->addSql('DROP TABLE booking');
        $this->addSql('DROP TABLE organisation');
        $this->addSql('DROP TABLE region');
        $this->addSql('DROP TABLE resource');
        $this->addSql('DROP TABLE theme');
        $this->addSql('DROP TABLE wine');
        $this->addSql('DROP TABLE wine_workshop');
        $this->addSql('DROP TABLE workshop');
    }
}
