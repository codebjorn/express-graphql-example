import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCourseLessonTable1631313840221 implements MigrationInterface {
    name = 'CreateCourseLessonTable1631313840221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lesson" ("id" SERIAL NOT NULL, "title" text NOT NULL, "slug" text NOT NULL, "description" text NOT NULL, "exercises" json NOT NULL, "course_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_19967be71e1113334304a55fa63" UNIQUE ("title"), CONSTRAINT "UQ_db1819e1834a90ab442530d7c2c" UNIQUE ("slug"), CONSTRAINT "UQ_ea6aa4b6228f4941691a9be2620" UNIQUE ("description"), CONSTRAINT "PK_0ef25918f0237e68696dee455bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" SERIAL NOT NULL, "title" text NOT NULL, "slug" text NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ac5edecc1aefa58ed0237a7ee4a" UNIQUE ("title"), CONSTRAINT "UQ_a101f48e5045bcf501540a4a5b8" UNIQUE ("slug"), CONSTRAINT "UQ_6694f68765de7f95192cb8f5d4f" UNIQUE ("description"), CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_5b2678a83db14ed1bfe89de5774" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_5b2678a83db14ed1bfe89de5774"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "lesson"`);
    }

}
