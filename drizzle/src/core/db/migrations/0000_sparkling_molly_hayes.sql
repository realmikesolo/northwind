CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customers" (
	"id" varchar(5) PRIMARY KEY NOT NULL,
	"companyName" text NOT NULL,
	"contactName" text NOT NULL,
	"contactTitle" text NOT NULL,
	"address" text,
	"city" text,
	"region" text,
	"postalCode" text,
	"country" text,
	"phone" text,
	"fax" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employee_territories" (
	"employeeId" integer,
	"territoryId" text,
	CONSTRAINT employee_territories_employeeId_territoryId PRIMARY KEY("employeeId","territoryId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employees" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"title" text NOT NULL,
	"titleOfCourtesy" text NOT NULL,
	"birthDate" date NOT NULL,
	"hireDate" date NOT NULL,
	"address" text NOT NULL,
	"city" text NOT NULL,
	"region" text,
	"postalCode" text NOT NULL,
	"country" text NOT NULL,
	"homePhone" text NOT NULL,
	"extension" text NOT NULL,
	"notes" text NOT NULL,
	"reportsTo" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_details" (
	"orderId" integer,
	"productId" integer,
	"unitPrice" numeric(10, 4) NOT NULL,
	"quantity" integer NOT NULL,
	"discount" real NOT NULL,
	CONSTRAINT order_details_orderId_productId PRIMARY KEY("orderId","productId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"employeeId" integer NOT NULL,
	"customerId" text NOT NULL,
	"orderDate" date NOT NULL,
	"requiredDate" date NOT NULL,
	"shippedDate" date,
	"shipVia" integer NOT NULL,
	"freight" numeric(10, 4) NOT NULL,
	"shipName" text NOT NULL,
	"shipAddress" text NOT NULL,
	"shipCity" text NOT NULL,
	"shipRegion" text,
	"shipPostalCode" text,
	"shipCountry" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"supplierId" integer NOT NULL,
	"categoryId" integer NOT NULL,
	"quantityPerUnit" text NOT NULL,
	"unitPrice" numeric(10, 4) NOT NULL,
	"unitsInStock" integer NOT NULL,
	"unitsOnOrder" integer NOT NULL,
	"reorderLevel" integer NOT NULL,
	"discontinued" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "regions" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shippers" (
	"id" serial PRIMARY KEY NOT NULL,
	"companyName" text NOT NULL,
	"phone" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "suppliers" (
	"id" serial PRIMARY KEY NOT NULL,
	"companyName" text NOT NULL,
	"contactName" text NOT NULL,
	"contactTitle" text NOT NULL,
	"address" text NOT NULL,
	"city" text NOT NULL,
	"region" text,
	"postalCode" text NOT NULL,
	"country" text NOT NULL,
	"phone" text NOT NULL,
	"fax" text,
	"homePage" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "territories" (
	"id" varchar(20) PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"regionId" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_territories" ADD CONSTRAINT "employee_territories_employeeId_employees_id_fk" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_territories" ADD CONSTRAINT "employee_territories_territoryId_territories_id_fk" FOREIGN KEY ("territoryId") REFERENCES "territories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employees" ADD CONSTRAINT "employees_reportsTo_employees_id_fk" FOREIGN KEY ("reportsTo") REFERENCES "employees"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_details" ADD CONSTRAINT "order_details_orderId_orders_id_fk" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_details" ADD CONSTRAINT "order_details_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_employeeId_employees_id_fk" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_customerId_customers_id_fk" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_shipVia_shippers_id_fk" FOREIGN KEY ("shipVia") REFERENCES "shippers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_supplierId_suppliers_id_fk" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "territories" ADD CONSTRAINT "territories_regionId_regions_id_fk" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
