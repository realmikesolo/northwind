import { MigrationInterface, QueryRunner } from "typeorm";

export class FixOrder1699273032426 implements MigrationInterface {
    name = 'FixOrder1699273032426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "shipPostalCode" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "shipPostalCode" SET NOT NULL`);
    }

}
