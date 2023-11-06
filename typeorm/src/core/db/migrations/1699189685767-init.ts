import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1699189685767 implements MigrationInterface {
  name = 'Init1699189685767';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "regions" ("id" SERIAL NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "PK_4fcd12ed6a046276e2deb08801c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "territories" ("id" character varying(20) NOT NULL, "description" text NOT NULL, "regionId" integer NOT NULL, CONSTRAINT "PK_5fd98f342e49509ee461d86f54f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "employee-territories" ("employeeId" integer NOT NULL, "territoryId" character varying(20) NOT NULL, CONSTRAINT "PK_354badfd54b6c0701c0e5c4c3e9" PRIMARY KEY ("employeeId", "territoryId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "employees" ("id" SERIAL NOT NULL, "firstName" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, "title" character varying(255) NOT NULL, "titleOfCourtesy" character varying(255) NOT NULL, "birthDate" date NOT NULL, "hireDate" date NOT NULL, "address" character varying(60) NOT NULL, "city" character varying(15) NOT NULL, "region" character varying(15), "postalCode" character varying(10) NOT NULL, "country" character varying(15) NOT NULL, "homePhone" character varying(24) NOT NULL, "extension" character varying(4) NOT NULL, "notes" text NOT NULL, "reportsTo" integer, CONSTRAINT "REL_a93d5b0114ba615524a73f16d9" UNIQUE ("reportsTo"), CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "customers" ("id" character varying(5) NOT NULL, "companyName" character varying(40) NOT NULL, "contactName" character varying(30) NOT NULL, "contactTitle" character varying(30) NOT NULL, "address" character varying(60), "city" character varying(15), "region" character varying(15), "postalCode" character varying(10), "country" character varying(15), "phone" character varying(24), "fax" character varying(24), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "shippers" ("id" SERIAL NOT NULL, "companyName" character varying(40) NOT NULL, "phone" character varying(24) NOT NULL, CONSTRAINT "PK_8010d7e1a3c4e14fe35fcd4a597" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" SERIAL NOT NULL, "employeeId" integer NOT NULL, "customerId" character varying(5) NOT NULL, "orderDate" date NOT NULL, "requiredDate" date NOT NULL, "shippedDate" date, "shipVia" integer NOT NULL, "freight" numeric(10,4) NOT NULL, "shipName" character varying(40) NOT NULL, "shipAddress" character varying(60) NOT NULL, "shipCity" character varying(15) NOT NULL, "shipRegion" character varying(15), "shipPostalCode" character varying(10) NOT NULL, "shipCountry" character varying(15) NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order-details" ("orderId" integer NOT NULL, "productId" integer NOT NULL, "unitPrice" numeric(10,4) NOT NULL, "quantity" integer NOT NULL, "discount" real NOT NULL, CONSTRAINT "PK_126c1f710ebdc8d2137b416b768" PRIMARY KEY ("orderId", "productId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "suppliers" ("id" SERIAL NOT NULL, "companyName" character varying(40) NOT NULL, "contactName" character varying(30) NOT NULL, "contactTitle" character varying(30) NOT NULL, "address" character varying(60) NOT NULL, "city" character varying(15) NOT NULL, "region" character varying(15), "postalCode" character varying(10) NOT NULL, "country" character varying(15) NOT NULL, "phone" character varying(24) NOT NULL, "fax" character varying(24), "homePage" text NOT NULL, CONSTRAINT "PK_b70ac51766a9e3144f778cfe81e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(40) NOT NULL, "supplierId" integer NOT NULL, "categoryId" integer NOT NULL, "quantityPerUnit" character varying(20) NOT NULL, "unitPrice" numeric(10,4) NOT NULL, "unitsInStock" integer NOT NULL, "unitsOnOrder" integer NOT NULL, "reorderLevel" integer NOT NULL, "discontinued" boolean NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "territories" ADD CONSTRAINT "FK_53305e8908fb701a129d6c9d9ec" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee-territories" ADD CONSTRAINT "FK_ea0e81f1d33f4525b0ad0917150" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee-territories" ADD CONSTRAINT "FK_b6167d306f5b29ab7e52efdf33f" FOREIGN KEY ("territoryId") REFERENCES "territories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_a93d5b0114ba615524a73f16d9b" FOREIGN KEY ("reportsTo") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_59fadea46c0451b6663017f4c51" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_b46fc7e299ba2e110bc86991e9c" FOREIGN KEY ("shipVia") REFERENCES "shippers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order-details" ADD CONSTRAINT "FK_0c68ae620c5afc63469e3e46b09" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order-details" ADD CONSTRAINT "FK_a0876f5d25e1d85008f68ba3809" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_c143cbc0299e1f9220c4b5debd8" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
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
    await queryRunner.query(
      `ALTER TABLE "employee-territories" DROP CONSTRAINT "FK_b6167d306f5b29ab7e52efdf33f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee-territories" DROP CONSTRAINT "FK_ea0e81f1d33f4525b0ad0917150"`,
    );
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
