import { MigrationInterface, QueryRunner } from "typeorm";

export class FixEmployee1699271290943 implements MigrationInterface {
    name = 'FixEmployee1699271290943'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_a93d5b0114ba615524a73f16d9b"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "REL_a93d5b0114ba615524a73f16d9"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_a93d5b0114ba615524a73f16d9b" FOREIGN KEY ("reportsTo") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_a93d5b0114ba615524a73f16d9b"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "REL_a93d5b0114ba615524a73f16d9" UNIQUE ("reportsTo")`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_a93d5b0114ba615524a73f16d9b" FOREIGN KEY ("reportsTo") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
