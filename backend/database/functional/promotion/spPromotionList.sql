/**
 * @summary
 * Lists active promotions with product details and discount calculations.
 * Returns promotions ordered by discount percentage (highest first).
 *
 * @procedure spPromotionList
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - GET /api/v1/external/promotion
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
 * @param {INT} minDiscount
 *   - Required: No
 *   - Description: Minimum discount percentage filter (NULL for no filter)
 *
 * @param {INT} maxDiscount
 *   - Required: No
 *   - Description: Maximum discount percentage filter (NULL for no filter)
 *
 * @param {VARCHAR} sortBy
 *   - Required: No
 *   - Description: Sort criteria (maior_desconto, menor_preco, maior_preco, alfabetica)
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
 * - List all active promotions without filters
 * - List promotions filtered by category
 * - List promotions filtered by discount range
 * - Pagination with different page sizes
 * - Verify products with expired promotions are excluded
 * - Verify deleted products/promotions are excluded
 */
CREATE OR ALTER PROCEDURE [functional].[spPromotionList]
  @idAccount INTEGER,
  @idCategory INTEGER = NULL,
  @minDiscount INTEGER = NULL,
  @maxDiscount INTEGER = NULL,
  @sortBy VARCHAR(20) = 'maior_desconto',
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

  /**
   * @validation Validate sort criteria
   * @throw {invalidSortCriteria}
   */
  IF (@sortBy NOT IN ('maior_desconto', 'menor_preco', 'maior_preco', 'alfabetica'))
  BEGIN
    ;THROW 51000, 'invalidSortCriteria', 1;
  END;

  DECLARE @offset INTEGER = (@page - 1) * @pageSize;
  DECLARE @currentDate DATETIME2 = GETUTCDATE();

  /**
   * @rule {be-multi-tenancy-pattern,fn-promotion-filter} Apply account filtering and promotion validity
   * @rule {be-soft-delete-pattern} Exclude deleted products and promotions
   * @rule {fn-promotion-active} Only show active promotions within valid date range
   */
  WITH [PromotionData] AS (
    SELECT
      [prd].[idProduct],
      [prd].[name],
      [prd].[mainImage],
      [prd].[price],
      [prd].[promotionalPrice],
      [prd].[unitOfMeasure],
      [cat].[name] AS [categoryName],
      [cat].[idCategory],
      [prm].[idPromotion],
      [prm].[title] AS [promotionTitle],
      [prm].[startDate],
      [prm].[endDate],
      [prm].[limitPerCustomer],
      CAST(ROUND((([prd].[price] - [prd].[promotionalPrice]) / [prd].[price]) * 100, 0) AS INTEGER) AS [discountPercentage],
      CASE
        WHEN DATEDIFF(HOUR, @currentDate, [prm].[endDate]) < 24 THEN 1
        ELSE 0
      END AS [lastChance]
    FROM [functional].[product] [prd]
      JOIN [functional].[category] [cat] ON ([cat].[idAccount] = [prd].[idAccount] AND [cat].[idCategory] = [prd].[idCategory])
      JOIN [functional].[promotionProduct] [prp] ON ([prp].[idAccount] = [prd].[idAccount] AND [prp].[idProduct] = [prd].[idProduct])
      JOIN [functional].[promotion] [prm] ON ([prm].[idAccount] = [prp].[idAccount] AND [prm].[idPromotion] = [prp].[idPromotion])
    WHERE [prd].[idAccount] = @idAccount
      AND [prd].[deleted] = 0
      AND [prd].[onPromotion] = 1
      AND [prd].[promotionalPrice] IS NOT NULL
      AND [cat].[deleted] = 0
      AND [cat].[active] = 1
      AND [prm].[deleted] = 0
      AND [prm].[status] = 'ativa'
      AND @currentDate BETWEEN [prm].[startDate] AND [prm].[endDate]
      AND ((@idCategory IS NULL) OR ([prd].[idCategory] = @idCategory))
      AND ((@minDiscount IS NULL) OR (CAST(ROUND((([prd].[price] - [prd].[promotionalPrice]) / [prd].[price]) * 100, 0) AS INTEGER) >= @minDiscount))
      AND ((@maxDiscount IS NULL) OR (CAST(ROUND((([prd].[price] - [prd].[promotionalPrice]) / [prd].[price]) * 100, 0) AS INTEGER) <= @maxDiscount))
  )
  /**
   * @output {PromotionList, n, n}
   * @column {INT} idProduct - Product identifier
   * @column {NVARCHAR} name - Product name
   * @column {NVARCHAR} mainImage - Main product image URL
   * @column {NUMERIC} price - Regular price
   * @column {NUMERIC} promotionalPrice - Promotional price
   * @column {VARCHAR} unitOfMeasure - Unit of measure
   * @column {NVARCHAR} categoryName - Category name
   * @column {INT} discountPercentage - Discount percentage
   * @column {NVARCHAR} promotionTitle - Promotion title
   * @column {DATETIME2} startDate - Promotion start date
   * @column {DATETIME2} endDate - Promotion end date
   * @column {INT} limitPerCustomer - Limit per customer (nullable)
   * @column {BIT} lastChance - Last chance flag (less than 24h remaining)
   */
  SELECT
    [idProduct],
    [name],
    [mainImage],
    [price],
    [promotionalPrice],
    [unitOfMeasure],
    [categoryName],
    [discountPercentage],
    [promotionTitle],
    [startDate],
    [endDate],
    [limitPerCustomer],
    [lastChance]
  FROM [PromotionData]
  ORDER BY
    CASE WHEN @sortBy = 'maior_desconto' THEN [discountPercentage] END DESC,
    CASE WHEN @sortBy = 'menor_preco' THEN [promotionalPrice] END ASC,
    CASE WHEN @sortBy = 'maior_preco' THEN [promotionalPrice] END DESC,
    CASE WHEN @sortBy = 'alfabetica' THEN [name] END ASC
  OFFSET @offset ROWS
  FETCH NEXT @pageSize ROWS ONLY;

  /**
   * @output {TotalCount, 1, 1}
   * @column {INT} total - Total number of promotions matching filters
   */
  SELECT COUNT(*) AS [total]
  FROM [PromotionData];
END;
GO