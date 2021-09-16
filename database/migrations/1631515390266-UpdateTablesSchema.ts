import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateTablesSchema1631515390266 implements MigrationInterface {
    name = 'UpdateTablesSchema1631515390266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."lesson" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."lesson" DROP CONSTRAINT "UQ_ea6aa4b6228f4941691a9be2620"`);
        await queryRunner.query(`ALTER TABLE "public"."course" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."course" DROP CONSTRAINT "UQ_6694f68765de7f95192cb8f5d4f"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."course" ADD CONSTRAINT "UQ_6694f68765de7f95192cb8f5d4f" UNIQUE ("description")`);
        await queryRunner.query(`ALTER TABLE "public"."course" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."lesson" ADD CONSTRAINT "UQ_ea6aa4b6228f4941691a9be2620" UNIQUE ("description")`);
        await queryRunner.query(`ALTER TABLE "public"."lesson" ALTER COLUMN "description" SET NOT NULL`);
    }

}
