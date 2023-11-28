<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231127221148 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE organism_admin_need (organism_admin_id INTEGER NOT NULL, need_id INTEGER NOT NULL, PRIMARY KEY(organism_admin_id, need_id), CONSTRAINT FK_8DDF2664276CF21 FOREIGN KEY (organism_admin_id) REFERENCES organism_admin (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_8DDF266624AF264 FOREIGN KEY (need_id) REFERENCES need (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('CREATE INDEX IDX_8DDF2664276CF21 ON organism_admin_need (organism_admin_id)');
        $this->addSql('CREATE INDEX IDX_8DDF266624AF264 ON organism_admin_need (need_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE organism_admin_need');
    }
}
