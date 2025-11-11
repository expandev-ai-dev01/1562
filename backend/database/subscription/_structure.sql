/**
 * @schema subscription
 * Subscription and account management schema
 */
CREATE SCHEMA [subscription];
GO

/**
 * @table account Brief description: Account entities for multi-tenancy
 * @multitenancy false
 * @softDelete false
 * @alias acc
 */
CREATE TABLE [subscription].[account] (
  [idAccount] INTEGER IDENTITY(1, 1) NOT NULL,
  [name] NVARCHAR(100) NOT NULL,
  [active] BIT NOT NULL DEFAULT (1),
  [dateCreated] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [dateModified] DATETIME2 NOT NULL DEFAULT (GETUTCDATE())
);
GO

/**
 * @primaryKey pkAccount
 * @keyType Object
 */
ALTER TABLE [subscription].[account]
ADD CONSTRAINT [pkAccount] PRIMARY KEY CLUSTERED ([idAccount]);
GO
