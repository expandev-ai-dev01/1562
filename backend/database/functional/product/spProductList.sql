/**
 * @summary
 * Lists products from the catalog with filtering by category and pagination support.
 * Returns products ordered by featured status, promotion status, and name.
 *
 * @procedure spProductList
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - GET /api/v1/external/product
 *
 * @parameters
 * @param {INT} idAccount
 *   - Required: Yes
 *   - Description: Account identifier for multi-tenancy
 *
 * @param {INT} idCategory
 *   - Required: No
 *   - Description: Category filter (NULL for all categories)
 *
 * @param {INT} page
 *   - Required: No
 *   - Description: Page number for pagination (default: 1)
 *
 * @param {INT} pageSize
 *   - Required: No
 *   - Description: Items per page (default: 12)
 *
 * @testScenarios
 * - List all products without category filter
 * - List products filtered by specific category
 * - Pagination with different page sizes
 * - Verify featured and promotion products appear first
 * - Verify deleted products are excluded
 */
CREATE OR ALTER PROCEDURE [functional].[spProductList]
  @idAccount INTEGER,
  @idCategory INTEGER = NULL,
  @page INTEGER = 1,
  @pageSize INTEGER = 12
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @validation Validate required parameters
   * @throw {parameterRequired}
   */
  IF (@idAccount IS NULL)
  BEGIN
    ;THROW 51000, 'idAccountRequired', 1;
  END;

  /**
   * @validation Validate pagination parameters
   * @throw {invalidPageNumber}
   */
  IF (@page < 1)
  BEGIN
    ;THROW 51000, 'invalidPageNumber', 1;
  END;

  /**
   * @validation Validate page size
   * @throw {invalidPageSize}
   */
  IF (@pageSize NOT IN (12, 24, 36))
  BEGIN
    ;THROW 51000, 'invalidPageSize', 1;
  END;

  DECLARE @offset INTEGER = (@page - 1) * @pageSize;

  /**
   * @rule {be-multi-tenancy-pattern,fn-product-catalog} Apply account filtering and category filter
   * @rule {be-soft-delete-pattern} Exclude deleted products
   * @rule {fn-product-ordering} Order by featured, promotion, and name
   */
  /**
   * @output {ProductList, n, n}
   * @column {INT} idProduct - Product identifier
   * @column {NVARCHAR} name - Product name
   * @column {NVARCHAR} mainImage - Main product image URL
   * @column {NUMERIC} price - Regular price
   * @column {VARCHAR} unitOfMeasure - Unit of measure
   * @column {NVARCHAR} categoryName - Category name
   * @column {BIT} onPromotion - Promotion flag
   * @column {NUMERIC} promotionalPrice - Promotional price (nullable)
   * @column {VARCHAR} availability - Availability status
   * @column {VARCHAR} cultivationType - Cultivation type
   * @column {BIT} featured - Featured flag
   */
  SELECT
    [prd].[idProduct],
    [prd].[name],
    [prd].[mainImage],
    [prd].[price],
    [prd].[unitOfMeasure],
    [cat].[name] AS [categoryName],
    [prd].[onPromotion],
    [prd].[promotionalPrice],
    [prd].[availability],
    [prd].[cultivationType],
    [prd].[featured]
  FROM [functional].[product] [prd]
    JOIN [functional].[category] [cat] ON ([cat].[idAccount] = [prd].[idAccount] AND [cat].[idCategory] = [prd].[idCategory])
  WHERE [prd].[idAccount] = @idAccount
    AND [prd].[deleted] = 0
    AND [cat].[deleted] = 0
    AND [cat].[active] = 1
    AND ((@idCategory IS NULL) OR ([prd].[idCategory] = @idCategory))
  ORDER BY
    [prd].[featured] DESC,
    [prd].[onPromotion] DESC,
    [prd].[name]
  OFFSET @offset ROWS
  FETCH NEXT @pageSize ROWS ONLY;

  /**
   * @output {TotalCount, 1, 1}
   * @column {INT} total - Total number of products matching filters
   */
  SELECT COUNT(*) AS [total]
  FROM [functional].[product] [prd]
    JOIN [functional].[category] [cat] ON ([cat].[idAccount] = [prd].[idAccount] AND [cat].[idCategory] = [prd].[idCategory])
  WHERE [prd].[idAccount] = @idAccount
    AND [prd].[deleted] = 0
    AND [cat].[deleted] = 0
    AND [cat].[active] = 1
    AND ((@idCategory IS NULL) OR ([prd].[idCategory] = @idCategory));
END;
GO
