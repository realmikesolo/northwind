import { MigrationInterface, QueryRunner } from "typeorm";

export class FixSupplier1699272536852 implements MigrationInterface {
    name = 'FixSupplier1699272536852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "suppliers" ALTER COLUMN "homePage" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "suppliers" ALTER COLUMN "homePage" SET NOT NULL`);
    }

}
