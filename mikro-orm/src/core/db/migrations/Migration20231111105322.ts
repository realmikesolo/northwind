import { Migration } from '@mikro-orm/migrations';

export class Migration20231111105322 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "categories" ("id" serial primary key, "name" text not null, "description" text not null);');

    this.addSql('create table "customers" ("id" varchar(5) not null, "companyName" text not null, "contactName" text not null, "contactTitle" text not null, "address" text null, "city" text null, "region" text null, "postalCode" text null, "country" text null, "phone" text null, "fax" text null, constraint "customers_pkey" primary key ("id"));');

    this.addSql('create table "employees" ("id" serial primary key, "firstName" text not null, "lastName" text not null, "title" text not null, "titleOfCourtesy" text not null, "birthDate" timestamptz(0) not null, "hireDate" timestamptz(0) not null, "address" text not null, "city" text not null, "region" text null, "postalCode" text not null, "country" text not null, "homePhone" text not null, "extension" text not null, "notes" text not null, "reportsTo" int null);');

    this.addSql('create table "regions" ("id" serial primary key, "description" text not null);');

    this.addSql('create table "shippers" ("id" serial primary key, "companyName" text not null, "phone" text not null);');

    this.addSql('create table "orders" ("id" serial primary key, "employeeId" int not null, "customerId" varchar(5) not null, "orderDate" timestamptz(0) not null, "requiredDate" timestamptz(0) not null, "shippedDate" timestamptz(0) null, "shipVia" int not null, "freight" numeric(10,4) not null, "shipName" text not null, "shipAddress" text not null, "shipCity" text not null, "shipRegion" text null, "shipPostalCode" text null, "shipCountry" text not null);');

    this.addSql('create table "suppliers" ("id" serial primary key, "companyName" text not null, "contactName" text not null, "contactTitle" text not null, "address" text not null, "city" text not null, "region" text null, "postalCode" text not null, "country" text not null, "phone" text not null, "fax" text null, "homePage" text null);');

    this.addSql('create table "products" ("id" serial primary key, "name" text not null, "supplierId" int not null, "categoryId" int not null, "quantityPerUnit" text not null, "unitPrice" numeric(10,4) not null, "unitsInStock" int not null, "unitsOnOrder" int not null, "reorderLevel" int not null, "discontinued" boolean not null);');

    this.addSql('create table "order-details" ("orderId" int not null, "productId" int not null, "unitPrice" numeric(10,4) not null, "quantity" int not null, "discount" real not null, constraint "order-details_pkey" primary key ("orderId", "productId"));');

    this.addSql('create table "territories" ("id" varchar(20) not null, "description" text not null, "regionId" int not null, constraint "territories_pkey" primary key ("id"));');

    this.addSql('create table "employee-territories" ("employeeId" int not null, "territoryId" varchar(20) not null, constraint "employee-territories_pkey" primary key ("employeeId", "territoryId"));');

    this.addSql('alter table "employees" add constraint "employees_reportsTo_foreign" foreign key ("reportsTo") references "employees" ("id") on update cascade;');

    this.addSql('alter table "orders" add constraint "orders_employeeId_foreign" foreign key ("employeeId") references "employees" ("id") on update cascade;');
    this.addSql('alter table "orders" add constraint "orders_customerId_foreign" foreign key ("customerId") references "customers" ("id") on update cascade;');
    this.addSql('alter table "orders" add constraint "orders_shipVia_foreign" foreign key ("shipVia") references "shippers" ("id") on update cascade;');

    this.addSql('alter table "products" add constraint "products_categoryId_foreign" foreign key ("categoryId") references "categories" ("id") on update cascade;');
    this.addSql('alter table "products" add constraint "products_supplierId_foreign" foreign key ("supplierId") references "suppliers" ("id") on update cascade;');

    this.addSql('alter table "order-details" add constraint "order-details_orderId_foreign" foreign key ("orderId") references "orders" ("id") on update cascade;');
    this.addSql('alter table "order-details" add constraint "order-details_productId_foreign" foreign key ("productId") references "products" ("id") on update cascade;');

    this.addSql('alter table "territories" add constraint "territories_regionId_foreign" foreign key ("regionId") references "regions" ("id") on update cascade;');

    this.addSql('alter table "employee-territories" add constraint "employee-territories_employeeId_foreign" foreign key ("employeeId") references "employees" ("id") on update cascade;');
    this.addSql('alter table "employee-territories" add constraint "employee-territories_territoryId_foreign" foreign key ("territoryId") references "territories" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "products" drop constraint "products_categoryId_foreign";');

    this.addSql('alter table "orders" drop constraint "orders_customerId_foreign";');

    this.addSql('alter table "employees" drop constraint "employees_reportsTo_foreign";');

    this.addSql('alter table "orders" drop constraint "orders_employeeId_foreign";');

    this.addSql('alter table "employee-territories" drop constraint "employee-territories_employeeId_foreign";');

    this.addSql('alter table "territories" drop constraint "territories_regionId_foreign";');

    this.addSql('alter table "orders" drop constraint "orders_shipVia_foreign";');

    this.addSql('alter table "order-details" drop constraint "order-details_orderId_foreign";');

    this.addSql('alter table "products" drop constraint "products_supplierId_foreign";');

    this.addSql('alter table "order-details" drop constraint "order-details_productId_foreign";');

    this.addSql('alter table "employee-territories" drop constraint "employee-territories_territoryId_foreign";');

    this.addSql('drop table if exists "categories" cascade;');

    this.addSql('drop table if exists "customers" cascade;');

    this.addSql('drop table if exists "employees" cascade;');

    this.addSql('drop table if exists "regions" cascade;');

    this.addSql('drop table if exists "shippers" cascade;');

    this.addSql('drop table if exists "orders" cascade;');

    this.addSql('drop table if exists "suppliers" cascade;');

    this.addSql('drop table if exists "products" cascade;');

    this.addSql('drop table if exists "order-details" cascade;');

    this.addSql('drop table if exists "territories" cascade;');

    this.addSql('drop table if exists "employee-territories" cascade;');
  }

}
