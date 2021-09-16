import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateChatTable1631314293061 implements MigrationInterface {
    name = 'CreateChatTable1631314293061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chat" ("id" SERIAL NOT NULL, "discussion" json NOT NULL, "teacher_id" integer, "student_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_f2ba793996267140f3819275930" FOREIGN KEY ("teacher_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_308aa3f07b5edceb78033503347" FOREIGN KEY ("student_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_308aa3f07b5edceb78033503347"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_f2ba793996267140f3819275930"`);
        await queryRunner.query(`DROP TABLE "chat"`);
    }

}
