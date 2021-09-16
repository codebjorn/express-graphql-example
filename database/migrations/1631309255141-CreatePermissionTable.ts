import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePermissionTable1631309255141 implements MigrationInterface {
    name = 'CreatePermissionTable1631309255141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, "name" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_240853a0c3353c25fb12434ad33" UNIQUE ("name"), CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission_role" ("role_id" integer NOT NULL, "permission_id" integer NOT NULL, CONSTRAINT "PK_559155e68c73c7b70d216b3e2e9" PRIMARY KEY ("role_id", "permission_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_693f65986d1bd7b5bc973e30d7" ON "permission_role" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ea144050277434b1ec4a307061" ON "permission_role" ("permission_id") `);
        await queryRunner.query(`ALTER TABLE "permission_role" ADD CONSTRAINT "FK_693f65986d1bd7b5bc973e30d76" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "permission_role" ADD CONSTRAINT "FK_ea144050277434b1ec4a3070614" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission_role" DROP CONSTRAINT "FK_ea144050277434b1ec4a3070614"`);
        await queryRunner.query(`ALTER TABLE "permission_role" DROP CONSTRAINT "FK_693f65986d1bd7b5bc973e30d76"`);
        await queryRunner.query(`DROP INDEX "IDX_ea144050277434b1ec4a307061"`);
        await queryRunner.query(`DROP INDEX "IDX_693f65986d1bd7b5bc973e30d7"`);
        await queryRunner.query(`DROP TABLE "permission_role"`);
        await queryRunner.query(`DROP TABLE "permission"`);
    }

}
