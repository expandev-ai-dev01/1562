/**
 * @summary
 * Lists active categories with product counts for filtering purposes.
 * Only returns categories that have at least one active product.
 *
 * @procedure spCategoryList
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - GET /api/v1/external/category
 *
 * @parameters
 * @param {INT} idAccount
 *   - Required: Yes
 *   - Description: Account identifier for multi-tenancy
 *
 * @testScenarios
 * - List all active categories with product counts
 * - Verify categories without products are excluded
 * - Verify deleted categories are excluded
 * - Verify ordering by displayOrder
 */
CREATE OR ALTER PROCEDURE [functional].[spCategoryList]
  @idAccount INTEGER
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
   * @rule {be-multi-tenancy-pattern,fn-category-filter} Apply account filtering
   * @rule {be-soft-delete-pattern} Exclude deleted categories
   * @rule {fn-category-with-products} Only show categories with active products
   */
  /**
   * @output {CategoryList, n, n}
   * @column {INT} idCategory - Category identifier
   * @column {NVARCHAR} name - Category name
   * @column {NVARCHAR} icon - Category icon URL (nullable)
   * @column {INT} displayOrder - Display order
   * @column {INT} productCount - Number of active products in category
   */
  SELECT
    [cat].[idCategory],
    [cat].[name],
    [cat].[icon],
    [cat].[displayOrder],
    COUNT([prd].[idProduct]) AS [productCount]
  FROM [functional].[category] [cat]
    JOIN [functional].[product] [prd] ON ([prd].[idAccount] = [cat].[idAccount] AND [prd].[idCategory] = [cat].[idCategory] AND [prd].[deleted] = 0)
  WHERE [cat].[idAccount] = @idAccount
    AND [cat].[deleted] = 0
    AND [cat].[active] = 1
  GROUP BY
    [cat].[idCategory],
    [cat].[name],
    [cat].[icon],
    [cat].[displayOrder]
  HAVING COUNT([prd].[idProduct]) > 0
  ORDER BY [cat].[displayOrder];
END;
GO
