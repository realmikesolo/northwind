-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "supplierId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "quantityPerUnit" TEXT NOT NULL,
    "unitPrice" DECIMAL(10,4) NOT NULL,
    "unitsInStock" INTEGER NOT NULL,
    "unitsOnOrder" INTEGER NOT NULL,
    "reorderLevel" INTEGER NOT NULL,
    "discontinued" BOOLEAN NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suppliers" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "contactTitle" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "region" TEXT,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "fax" TEXT,
    "homePage" TEXT,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_details" (
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "unitPrice" DECIMAL(10,4) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "discount" REAL NOT NULL,

    CONSTRAINT "order_details_pkey" PRIMARY KEY ("orderId","productId")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "customerId" TEXT NOT NULL,
    "orderDate" DATE NOT NULL,
    "requiredDate" DATE NOT NULL,
    "shippedDate" DATE,
    "shipVia" INTEGER NOT NULL,
    "freight" DECIMAL(10,4) NOT NULL,
    "shipName" TEXT NOT NULL,
    "shipAddress" TEXT NOT NULL,
    "shipCity" TEXT NOT NULL,
    "shipRegion" TEXT,
    "shipPostalCode" TEXT,
    "shipCountry" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shippers" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "shippers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" VARCHAR(5) NOT NULL,
    "companyName" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "contactTitle" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "region" TEXT,
    "postalCode" TEXT,
    "country" TEXT,
    "phone" TEXT,
    "fax" TEXT,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleOfCourtesy" TEXT NOT NULL,
    "birthDate" DATE NOT NULL,
    "hireDate" DATE NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "region" TEXT,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "homePhone" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "reportsTo" INTEGER,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_territories" (
    "employeeId" INTEGER NOT NULL,
    "territoryId" TEXT NOT NULL,

    CONSTRAINT "employee_territories_pkey" PRIMARY KEY ("employeeId","territoryId")
);

-- CreateTable
CREATE TABLE "territories" (
    "id" VARCHAR(20) NOT NULL,
    "description" TEXT NOT NULL,
    "regionId" INTEGER NOT NULL,

    CONSTRAINT "territories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regions" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "regions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_shipVia_fkey" FOREIGN KEY ("shipVia") REFERENCES "shippers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_reportsTo_fkey" FOREIGN KEY ("reportsTo") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_territories" ADD CONSTRAINT "employee_territories_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_territories" ADD CONSTRAINT "employee_territories_territoryId_fkey" FOREIGN KEY ("territoryId") REFERENCES "territories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "territories" ADD CONSTRAINT "territories_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
