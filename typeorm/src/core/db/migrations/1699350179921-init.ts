import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1699350179921 implements MigrationInterface {
    name = 'Init1699350179921'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "regions" ("id" SERIAL NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_4fcd12ed6a046276e2deb08801c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "territories" ("id" character varying(20) NOT NULL, "description" text NOT NULL, "regionId" integer NOT NULL, CONSTRAINT "PK_5fd98f342e49509ee461d86f54f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee-territories" ("employeeId" integer NOT NULL, "territoryId" character varying NOT NULL, CONSTRAINT "PK_354badfd54b6c0701c0e5c4c3e9" PRIMARY KEY ("employeeId", "territoryId"))`);
        await queryRunner.query(`CREATE TABLE "employees" ("id" SERIAL NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "title" text NOT NULL, "titleOfCourtesy" text NOT NULL, "birthDate" date NOT NULL, "hireDate" date NOT NULL, "address" text NOT NULL, "city" text NOT NULL, "region" text, "postalCode" text NOT NULL, "country" text NOT NULL, "homePhone" text NOT NULL, "extension" text NOT NULL, "notes" text NOT NULL, "reportsTo" integer, CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" character varying(5) NOT NULL, "companyName" text NOT NULL, "contactName" text NOT NULL, "contactTitle" text NOT NULL, "address" text, "city" text, "region" text, "postalCode" text, "country" text, "phone" text, "fax" text, CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shippers" ("id" SERIAL NOT NULL, "companyName" text NOT NULL, "phone" text NOT NULL, CONSTRAINT "PK_8010d7e1a3c4e14fe35fcd4a597" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "employeeId" integer NOT NULL, "customerId" character varying NOT NULL, "orderDate" date NOT NULL, "requiredDate" date NOT NULL, "shippedDate" date, "shipVia" integer NOT NULL, "freight" numeric(10,4) NOT NULL, "shipName" text NOT NULL, "shipAddress" text NOT NULL, "shipCity" text NOT NULL, "shipRegion" text, "shipPostalCode" text, "shipCountry" text NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order-details" ("orderId" integer NOT NULL, "productId" integer NOT NULL, "unitPrice" numeric(10,4) NOT NULL, "quantity" integer NOT NULL, "discount" real NOT NULL, CONSTRAINT "PK_126c1f710ebdc8d2137b416b768" PRIMARY KEY ("orderId", "productId"))`);
        await queryRunner.query(`CREATE TABLE "suppliers" ("id" SERIAL NOT NULL, "companyName" text NOT NULL, "contactName" text NOT NULL, "contactTitle" text NOT NULL, "address" text NOT NULL, "city" text NOT NULL, "region" text, "postalCode" text NOT NULL, "country" text NOT NULL, "phone" text NOT NULL, "fax" text, "homePage" text, CONSTRAINT "PK_b70ac51766a9e3144f778cfe81e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" text NOT NULL, "supplierId" integer NOT NULL, "categoryId" integer NOT NULL, "quantityPerUnit" text NOT NULL, "unitPrice" numeric(10,4) NOT NULL, "unitsInStock" integer NOT NULL, "unitsOnOrder" integer NOT NULL, "reorderLevel" integer NOT NULL, "discontinued" boolean NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "territories" ADD CONSTRAINT "FK_53305e8908fb701a129d6c9d9ec" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee-territories" ADD CONSTRAINT "FK_ea0e81f1d33f4525b0ad0917150" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee-territories" ADD CONSTRAINT "FK_b6167d306f5b29ab7e52efdf33f" FOREIGN KEY ("territoryId") REFERENCES "territories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_a93d5b0114ba615524a73f16d9b" FOREIGN KEY ("reportsTo") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_59fadea46c0451b6663017f4c51" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_b46fc7e299ba2e110bc86991e9c" FOREIGN KEY ("shipVia") REFERENCES "shippers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order-details" ADD CONSTRAINT "FK_0c68ae620c5afc63469e3e46b09" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order-details" ADD CONSTRAINT "FK_a0876f5d25e1d85008f68ba3809" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_c143cbc0299e1f9220c4b5debd8" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_c143cbc0299e1f9220c4b5debd8"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "order-details" DROP CONSTRAINT "FK_a0876f5d25e1d85008f68ba3809"`);
        await queryRunner.query(`ALTER TABLE "order-details" DROP CONSTRAINT "FK_0c68ae620c5afc63469e3e46b09"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_b46fc7e299ba2e110bc86991e9c"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_59fadea46c0451b6663017f4c51"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_a93d5b0114ba615524a73f16d9b"`);
        await queryRunner.query(`ALTER TABLE "employee-territories" DROP CONSTRAINT "FK_b6167d306f5b29ab7e52efdf33f"`);
        await queryRunner.query(`ALTER TABLE "employee-territories" DROP CONSTRAINT "FK_ea0e81f1d33f4525b0ad0917150"`);
        await queryRunner.query(`ALTER TABLE "territories" DROP CONSTRAINT "FK_53305e8908fb701a129d6c9d9ec"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "suppliers"`);
        await queryRunner.query(`DROP TABLE "order-details"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "shippers"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TABLE "employees"`);
        await queryRunner.query(`DROP TABLE "employee-territories"`);
        await queryRunner.query(`DROP TABLE "territories"`);
        await queryRunner.query(`DROP TABLE "regions"`);
    }

}
