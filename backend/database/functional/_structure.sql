/**
 * @schema functional
 * Business logic schema for HORTifruti application
 */
CREATE SCHEMA [functional];
GO

/**
 * @table category Brief description: Product categories for organizing items
 * @multitenancy true
 * @softDelete true
 * @alias cat
 */
CREATE TABLE [functional].[category] (
  [idCategory] INTEGER IDENTITY(1, 1) NOT NULL,
  [idAccount] INTEGER NOT NULL,
  [name] NVARCHAR(30) NOT NULL,
  [icon] NVARCHAR(500) NULL,
  [displayOrder] INTEGER NOT NULL,
  [active] BIT NOT NULL DEFAULT (1),
  [deleted] BIT NOT NULL DEFAULT (0),
  [dateCreated] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [dateModified] DATETIME2 NOT NULL DEFAULT (GETUTCDATE())
);
GO

/**
 * @table product Brief description: Products available in the catalog
 * @multitenancy true
 * @softDelete true
 * @alias prd
 */
CREATE TABLE [functional].[product] (
  [idProduct] INTEGER IDENTITY(1, 1) NOT NULL,
  [idAccount] INTEGER NOT NULL,
  [idCategory] INTEGER NOT NULL,
  [name] NVARCHAR(50) NOT NULL,
  [mainImage] NVARCHAR(500) NOT NULL,
  [price] NUMERIC(18, 6) NOT NULL,
  [unitOfMeasure] VARCHAR(20) NOT NULL,
  [onPromotion] BIT NOT NULL DEFAULT (0),
  [promotionalPrice] NUMERIC(18, 6) NULL,
  [availability] VARCHAR(20) NOT NULL DEFAULT ('Disponível'),
  [cultivationType] VARCHAR(20) NULL DEFAULT ('Convencional'),
  [featured] BIT NOT NULL DEFAULT (0),
  [deleted] BIT NOT NULL DEFAULT (0),
  [dateCreated] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [dateModified] DATETIME2 NOT NULL DEFAULT (GETUTCDATE())
);
GO

/**
 * @primaryKey pkCategory
 * @keyType Object
 */
ALTER TABLE [functional].[category]
ADD CONSTRAINT [pkCategory] PRIMARY KEY CLUSTERED ([idCategory]);
GO

/**
 * @primaryKey pkProduct
 * @keyType Object
 */
ALTER TABLE [functional].[product]
ADD CONSTRAINT [pkProduct] PRIMARY KEY CLUSTERED ([idProduct]);
GO

/**
 * @foreignKey fkCategory_Account Account isolation for categories
 * @target subscription.account
 * @tenancy true
 */
ALTER TABLE [functional].[category]
ADD CONSTRAINT [fkCategory_Account] FOREIGN KEY ([idAccount])
REFERENCES [subscription].[account]([idAccount]);
GO

/**
 * @foreignKey fkProduct_Account Account isolation for products
 * @target subscription.account
 * @tenancy true
 */
ALTER TABLE [functional].[product]
ADD CONSTRAINT [fkProduct_Account] FOREIGN KEY ([idAccount])
REFERENCES [subscription].[account]([idAccount]);
GO

/**
 * @foreignKey fkProduct_Category Product category relationship
 * @target functional.category
 */
ALTER TABLE [functional].[product]
ADD CONSTRAINT [fkProduct_Category] FOREIGN KEY ([idCategory])
REFERENCES [functional].[category]([idCategory]);
GO

/**
 * @check chkProduct_UnitOfMeasure Valid unit of measure values
 * @enum {kg} Kilogram
 * @enum {g} Gram
 * @enum {unidade} Unit
 * @enum {maço} Bunch
 * @enum {bandeja} Tray
 * @enum {dúzia} Dozen
 */
ALTER TABLE [functional].[product]
ADD CONSTRAINT [chkProduct_UnitOfMeasure] CHECK ([unitOfMeasure] IN ('kg', 'g', 'unidade', 'maço', 'bandeja', 'dúzia'));
GO

/**
 * @check chkProduct_Availability Valid availability status values
 * @enum {Disponível} Available
 * @enum {Poucas unidades} Low stock
 * @enum {Esgotado} Out of stock
 */
ALTER TABLE [functional].[product]
ADD CONSTRAINT [chkProduct_Availability] CHECK ([availability] IN ('Disponível', 'Poucas unidades', 'Esgotado'));
GO

/**
 * @check chkProduct_CultivationType Valid cultivation type values
 * @enum {Convencional} Conventional
 * @enum {Orgânico} Organic
 * @enum {Hidropônico} Hydroponic
 */
ALTER TABLE [functional].[product]
ADD CONSTRAINT [chkProduct_CultivationType] CHECK ([cultivationType] IN ('Convencional', 'Orgânico', 'Hidropônico'));
GO

/**
 * @check chkProduct_Price Price must be positive
 */
ALTER TABLE [functional].[product]
ADD CONSTRAINT [chkProduct_Price] CHECK ([price] > 0);
GO

/**
 * @check chkProduct_PromotionalPrice Promotional price must be positive when set
 */
ALTER TABLE [functional].[product]
ADD CONSTRAINT [chkProduct_PromotionalPrice] CHECK ([promotionalPrice] IS NULL OR [promotionalPrice] > 0);
GO

/**
 * @index ixCategory_Account Account filtering for categories
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixCategory_Account]
ON [functional].[category]([idAccount])
WHERE [deleted] = 0;
GO

/**
 * @index ixCategory_Account_Active Active categories by account
 * @type Search
 */
CREATE NONCLUSTERED INDEX [ixCategory_Account_Active]
ON [functional].[category]([idAccount], [active])
INCLUDE ([name], [displayOrder])
WHERE [deleted] = 0;
GO

/**
 * @index uqCategory_Account_Name Unique category name per account
 * @type Search
 * @unique true
 */
CREATE UNIQUE NONCLUSTERED INDEX [uqCategory_Account_Name]
ON [functional].[category]([idAccount], [name])
WHERE [deleted] = 0;
GO

/**
 * @index ixProduct_Account Account filtering for products
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixProduct_Account]
ON [functional].[product]([idAccount])
WHERE [deleted] = 0;
GO

/**
 * @index ixProduct_Account_Category Products by category
 * @type Search
 */
CREATE NONCLUSTERED INDEX [ixProduct_Account_Category]
ON [functional].[product]([idAccount], [idCategory])
INCLUDE ([name], [price], [availability])
WHERE [deleted] = 0;
GO

/**
 * @index ixProduct_Account_Featured Featured products
 * @type Search
 */
CREATE NONCLUSTERED INDEX [ixProduct_Account_Featured]
ON [functional].[product]([idAccount], [featured])
INCLUDE ([name], [price], [onPromotion])
WHERE [deleted] = 0 AND [featured] = 1;
GO

/**
 * @index ixProduct_Account_Promotion Products on promotion
 * @type Search
 */
CREATE NONCLUSTERED INDEX [ixProduct_Account_Promotion]
ON [functional].[product]([idAccount], [onPromotion])
INCLUDE ([name], [price], [promotionalPrice])
WHERE [deleted] = 0 AND [onPromotion] = 1;
GO
