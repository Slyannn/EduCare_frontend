<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231122232205 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE admin ADD COLUMN password VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TEMPORARY TABLE __temp__admin AS SELECT id, email, roles FROM admin');
        $this->addSql('DROP TABLE admin');
        $this->addSql('CREATE TABLE admin (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles CLOB NOT NULL --(DC2Type:json)
        )');
        $this->addSql('INSERT INTO admin (id, email, roles) SELECT id, email, roles FROM __temp__admin');
        $this->addSql('DROP TABLE __temp__admin');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_880E0D76E7927C74 ON admin (email)');
    }
}
