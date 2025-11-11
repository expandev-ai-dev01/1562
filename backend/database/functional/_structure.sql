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
 * @table promotion Brief description: Promotion configurations for products
 * @multitenancy true
 * @softDelete true
 * @alias prm
 */
CREATE TABLE [functional].[promotion] (
  [idPromotion] INTEGER IDENTITY(1, 1) NOT NULL,
  [idAccount] INTEGER NOT NULL,
  [title] NVARCHAR(100) NOT NULL,
  [promotionType] VARCHAR(20) NOT NULL,
  [discountValue] NUMERIC(18, 6) NOT NULL,
  [startDate] DATETIME2 NOT NULL,
  [endDate] DATETIME2 NOT NULL,
  [daysOfWeek] NVARCHAR(100) NULL,
  [quantityLimit] INTEGER NULL,
  [limitPerCustomer] INTEGER NULL,
  [status] VARCHAR(20) NOT NULL DEFAULT ('agendada'),
  [deleted] BIT NOT NULL DEFAULT (0),
  [dateCreated] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [dateModified] DATETIME2 NOT NULL DEFAULT (GETUTCDATE())
);
GO

/**
 * @table promotionProduct Brief description: Products associated with promotions
 * @multitenancy true
 * @softDelete false
 * @alias prp
 */
CREATE TABLE [functional].[promotionProduct] (
  [idAccount] INTEGER NOT NULL,
  [idPromotion] INTEGER NOT NULL,
  [idProduct] INTEGER NOT NULL,
  [dateCreated] DATETIME2 NOT NULL DEFAULT (GETUTCDATE())
);
GO

/**
 * @table banner Brief description: Promotional banners for carousel display
 * @multitenancy true
 * @softDelete true
 * @alias ban
 */
CREATE TABLE [functional].[banner] (
  [idBanner] INTEGER IDENTITY(1, 1) NOT NULL,
  [idAccount] INTEGER NOT NULL,
  [title] NVARCHAR(50) NOT NULL,
  [subtitle] NVARCHAR(100) NULL,
  [imageUrl] NVARCHAR(500) NOT NULL,
  [destinationUrl] NVARCHAR(500) NOT NULL,
  [startDate] DATETIME2 NOT NULL,
  [endDate] DATETIME2 NOT NULL,
  [displayOrder] INTEGER NOT NULL,
  [transitionTime] INTEGER NOT NULL DEFAULT (5),
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
 * @primaryKey pkPromotion
 * @keyType Object
 */
ALTER TABLE [functional].[promotion]
ADD CONSTRAINT [pkPromotion] PRIMARY KEY CLUSTERED ([idPromotion]);
GO

/**
 * @primaryKey pkPromotionProduct
 * @keyType Relationship
 */
ALTER TABLE [functional].[promotionProduct]
ADD CONSTRAINT [pkPromotionProduct] PRIMARY KEY CLUSTERED ([idAccount], [idPromotion], [idProduct]);
GO

/**
 * @primaryKey pkBanner
 * @keyType Object
 */
ALTER TABLE [functional].[banner]
ADD CONSTRAINT [pkBanner] PRIMARY KEY CLUSTERED ([idBanner]);
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
 * @foreignKey fkPromotion_Account Account isolation for promotions
 * @target subscription.account
 * @tenancy true
 */
ALTER TABLE [functional].[promotion]
ADD CONSTRAINT [fkPromotion_Account] FOREIGN KEY ([idAccount])
REFERENCES [subscription].[account]([idAccount]);
GO

/**
 * @foreignKey fkPromotionProduct_Account Account isolation for promotion products
 * @target subscription.account
 * @tenancy true
 */
ALTER TABLE [functional].[promotionProduct]
ADD CONSTRAINT [fkPromotionProduct_Account] FOREIGN KEY ([idAccount])
REFERENCES [subscription].[account]([idAccount]);
GO

/**
 * @foreignKey fkPromotionProduct_Promotion Promotion relationship
 * @target functional.promotion
 */
ALTER TABLE [functional].[promotionProduct]
ADD CONSTRAINT [fkPromotionProduct_Promotion] FOREIGN KEY ([idPromotion])
REFERENCES [functional].[promotion]([idPromotion]);
GO

/**
 * @foreignKey fkPromotionProduct_Product Product relationship
 * @target functional.product
 */
ALTER TABLE [functional].[promotionProduct]
ADD CONSTRAINT [fkPromotionProduct_Product] FOREIGN KEY ([idProduct])
REFERENCES [functional].[product]([idProduct]);
GO

/**
 * @foreignKey fkBanner_Account Account isolation for banners
 * @target subscription.account
 * @tenancy true
 */
ALTER TABLE [functional].[banner]
ADD CONSTRAINT [fkBanner_Account] FOREIGN KEY ([idAccount])
REFERENCES [subscription].[account]([idAccount]);
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
 * @check chkPromotion_Type Valid promotion type values
 * @enum {percentual} Percentage discount
 * @enum {valor_fixo} Fixed value discount
 * @enum {compre_leve_mais} Buy more get more
 */
ALTER TABLE [functional].[promotion]
ADD CONSTRAINT [chkPromotion_Type] CHECK ([promotionType] IN ('percentual', 'valor_fixo', 'compre_leve_mais'));
GO

/**
 * @check chkPromotion_Status Valid promotion status values
 * @enum {agendada} Scheduled
 * @enum {ativa} Active
 * @enum {encerrada} Ended
 * @enum {cancelada} Cancelled
 */
ALTER TABLE [functional].[promotion]
ADD CONSTRAINT [chkPromotion_Status] CHECK ([status] IN ('agendada', 'ativa', 'encerrada', 'cancelada'));
GO

/**
 * @check chkPromotion_DiscountValue Discount value must be positive
 */
ALTER TABLE [functional].[promotion]
ADD CONSTRAINT [chkPromotion_DiscountValue] CHECK ([discountValue] > 0);
GO

/**
 * @check chkPromotion_Dates End date must be after start date
 */
ALTER TABLE [functional].[promotion]
ADD CONSTRAINT [chkPromotion_Dates] CHECK ([endDate] > [startDate]);
GO

/**
 * @check chkBanner_TransitionTime Transition time must be between 3 and 10 seconds
 */
ALTER TABLE [functional].[banner]
ADD CONSTRAINT [chkBanner_TransitionTime] CHECK ([transitionTime] BETWEEN 3 AND 10);
GO

/**
 * @check chkBanner_Dates End date must be after start date
 */
ALTER TABLE [functional].[banner]
ADD CONSTRAINT [chkBanner_Dates] CHECK ([endDate] > [startDate]);
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

/**
 * @index ixPromotion_Account Account filtering for promotions
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixPromotion_Account]
ON [functional].[promotion]([idAccount])
WHERE [deleted] = 0;
GO

/**
 * @index ixPromotion_Account_Status Promotions by status
 * @type Search
 */
CREATE NONCLUSTERED INDEX [ixPromotion_Account_Status]
ON [functional].[promotion]([idAccount], [status])
INCLUDE ([title], [startDate], [endDate])
WHERE [deleted] = 0;
GO

/**
 * @index ixPromotion_Account_Dates Active promotions by date range
 * @type Search
 */
CREATE NONCLUSTERED INDEX [ixPromotion_Account_Dates]
ON [functional].[promotion]([idAccount], [startDate], [endDate])
INCLUDE ([status])
WHERE [deleted] = 0;
GO

/**
 * @index ixPromotionProduct_Account Account filtering for promotion products
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixPromotionProduct_Account]
ON [functional].[promotionProduct]([idAccount]);
GO

/**
 * @index ixPromotionProduct_Account_Promotion Products by promotion
 * @type Search
 */
CREATE NONCLUSTERED INDEX [ixPromotionProduct_Account_Promotion]
ON [functional].[promotionProduct]([idAccount], [idPromotion]);
GO

/**
 * @index ixPromotionProduct_Account_Product Promotions by product
 * @type Search
 */
CREATE NONCLUSTERED INDEX [ixPromotionProduct_Account_Product]
ON [functional].[promotionProduct]([idAccount], [idProduct]);
GO

/**
 * @index ixBanner_Account Account filtering for banners
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixBanner_Account]
ON [functional].[banner]([idAccount])
WHERE [deleted] = 0;
GO

/**
 * @index ixBanner_Account_Dates Active banners by date range
 * @type Search
 */
CREATE NONCLUSTERED INDEX [ixBanner_Account_Dates]
ON [functional].[banner]([idAccount], [startDate], [endDate])
INCLUDE ([displayOrder])
WHERE [deleted] = 0;
GO