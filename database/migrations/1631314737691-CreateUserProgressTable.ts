import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserProgressTable1631314737691 implements MigrationInterface {
    name = 'CreateUserProgressTable1631314737691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_progress" ("id" SERIAL NOT NULL, "responses" json NOT NULL, "user_id" integer, "course_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7b5eb2436efb0051fdf05cbe839" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_progress" ADD CONSTRAINT "FK_c41601eeb8415a9eb15c8a4e557" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_progress" ADD CONSTRAINT "FK_d24cab105e80261c2c9b7799ccb" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_progress" DROP CONSTRAINT "FK_d24cab105e80261c2c9b7799ccb"`);
        await queryRunner.query(`ALTER TABLE "user_progress" DROP CONSTRAINT "FK_c41601eeb8415a9eb15c8a4e557"`);
        await queryRunner.query(`DROP TABLE "user_progress"`);
    }

}
