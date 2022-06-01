PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id"                    TEXT PRIMARY KEY NOT NULL,
    "checksum"              TEXT NOT NULL,
    "finished_at"           DATETIME,
    "migration_name"        TEXT NOT NULL,
    "logs"                  TEXT,
    "rolled_back_at"        DATETIME,
    "started_at"            DATETIME NOT NULL DEFAULT current_timestamp,
    "applied_steps_count"   INTEGER UNSIGNED NOT NULL DEFAULT 0
);
INSERT INTO _prisma_migrations VALUES('0302cfac-90d5-43e9-9b02-b4a9187748fd','5304a4fb1b67ec57e8f48de627316bb787229f7b93c8384d1dd5906cef56ce28',1653800959629,'20220529050643_projects',NULL,NULL,1653800959242,1);
INSERT INTO _prisma_migrations VALUES('fe67e791-677b-4f18-9146-c706aea7d93c','391a0ba004419389375f1e7055700953609f6ab7fd77ab8cdb3189ef179fdea1',1653800969741,'20220529050928_add_columns',NULL,NULL,1653800968971,1);
INSERT INTO _prisma_migrations VALUES('f17b8d41-03c3-46b2-b29d-95628ebfd384','7d5c86c656e539ba02d580b48b22d90a1908f26e056f7bbd9fe1d56dddd9df99',1653801210414,'20220529051329_columns_options',NULL,NULL,1653801209394,1);
INSERT INTO _prisma_migrations VALUES('e224a5b6-be8f-4047-98e5-dbdab5659408','5094e69cfdd08ac5e5d1b63f286f5477c8fb15007d25f393780f14fb8809c315',1653803639584,'20220529055359_name_unique',NULL,NULL,1653803639034,1);
CREATE TABLE IF NOT EXISTS "cods_products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "portal" TEXT NOT NULL,
    "ios" TEXT NOT NULL,
    "versionWeb" TEXT,
    "versionIos" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO products VALUES(1,'achelocal','https://app.achelocal.appmarketplace.com.br','https://apps.apple.com/us/app/ache-local/id1504708811?l=pt&ls=1','feature.23003','2.13.9',1653801184063,1653859518478);
INSERT INTO products VALUES(2,'ajudaai','https://app.ajudaai.appmarketplace.com.br','https://apps.apple.com/us/app/ajuda-ai/id1603669928','2.21.0','2.13.7',1653801788472,1653859519342);
INSERT INTO products VALUES(3,'freefood','https://app.freefood.appmarketplace.com.br','https://apps.apple.com/in/app/freefood/id1529160011','2.21.0','2.13.5',1653801875393,1653859535968);
INSERT INTO products VALUES(4,'mariamariabox','https://app.mariamariabox.appmarketplace.com.br','https://apps.apple.com/br/app/mariamariabox/id1604821083','2.21.0','2.14.2',1653802020459,1653859528860);
INSERT INTO products VALUES(5,'medicol','https://app.medicol.appmarketplace.com.br','https://apps.apple.com/br/app/medicol/id1574241148','2.21.0','2.14.1',1653804122435,1653859536844);
INSERT INTO products VALUES(6,'molde','https://app.molde.appmarketplace.com.br','https://apps.apple.com/us/app/molde/id1571195191','2.21.0','2.13.3',1653804173800,1653859534931);
INSERT INTO products VALUES(7,'pedenobairro','https://app.pedenobairro.appmarketplace.com.br','https://apps.apple.com/br/app/pede-no-bairro/id1527831739','2.21.0','2.13.5',1653804221467,1653859529060);
INSERT INTO products VALUES(8,'pidao','https://app.pidao.appmarketplace.com.br','https://apps.apple.com/br/app/pid%C3%A3o/id1534631942','2.20.2','2.11.2',1653804292700,1653859532156);
INSERT INTO products VALUES(9,'dusha','https://app.dusha.appmarketplace.com.br','https://apps.apple.com/app/id1612306654','2.21.0','2.13.7',1653857520091,1653859534570);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('cods_products',9);
CREATE UNIQUE INDEX "cods_products_name_key" ON "cods_products"("name");
COMMIT;
