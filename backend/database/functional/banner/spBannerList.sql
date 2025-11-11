/**
 * @summary
 * Lists active promotional banners for carousel display.
 * Returns banners ordered by displayOrder within valid date range.
 *
 * @procedure spBannerList
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - GET /api/v1/external/banner
 *
 * @parameters
 * @param {INT} idAccount
 *   - Required: Yes
 *   - Description: Account identifier for multi-tenancy
 *
 * @testScenarios
 * - List all active banners within valid date range
 * - Verify expired banners are excluded
 * - Verify future banners are excluded
 * - Verify deleted banners are excluded
 * - Verify ordering by displayOrder
 */
CREATE OR ALTER PROCEDURE [functional].[spBannerList]
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

  DECLARE @currentDate DATETIME2 = GETUTCDATE();

  /**
   * @rule {be-multi-tenancy-pattern,fn-banner-filter} Apply account filtering and date validity
   * @rule {be-soft-delete-pattern} Exclude deleted banners
   * @rule {fn-banner-active} Only show banners within valid date range
   */
  /**
   * @output {BannerList, n, n}
   * @column {INT} idBanner - Banner identifier
   * @column {NVARCHAR} title - Banner title
   * @column {NVARCHAR} subtitle - Banner subtitle (nullable)
   * @column {NVARCHAR} imageUrl - Banner image URL
   * @column {NVARCHAR} destinationUrl - Destination URL when clicked
   * @column {DATETIME2} startDate - Banner start date
   * @column {DATETIME2} endDate - Banner end date
   * @column {INT} displayOrder - Display order in carousel
   * @column {INT} transitionTime - Transition time in seconds
   */
  SELECT
    [ban].[idBanner],
    [ban].[title],
    [ban].[subtitle],
    [ban].[imageUrl],
    [ban].[destinationUrl],
    [ban].[startDate],
    [ban].[endDate],
    [ban].[displayOrder],
    [ban].[transitionTime]
  FROM [functional].[banner] [ban]
  WHERE [ban].[idAccount] = @idAccount
    AND [ban].[deleted] = 0
    AND @currentDate BETWEEN [ban].[startDate] AND [ban].[endDate]
  ORDER BY [ban].[displayOrder];
END;
GO