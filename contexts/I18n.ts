const i18n = {
  en: {
    currentLanguage: "english",
    currentLanguageCode: "en",
    mainLayout: {
      mainLayoutComparedToDateRangeTitle: "Compared to date range",
      mainLayoutNoDataText: "no data",
      generalContainer: {
        mainLayoutGeneralContainerTitle: "Performance Metrics",
        mainLayoutGeneralContainerTooltipContent: `Find My Fit Users: total number of customers using Find My Fit\n
          Returns Rate: estimation of returns based on the total number of refunded order lines\n
          Find My Fit Sales: total sales made by Find My Fit recommendations`,
        mainLayoutGeneralContainerFindMyFitUsersTitle: "Find My Fit Users",
        mainLayoutGeneralContainerReturnsRateTitle: "Returns Rate",
        mainLayoutGeneralContainerFindMyFitSalesTitle: "Find My Fit Sales",
      },
      recommendationsContainer: {
        mainLayoutRecommendationsContainerTitle: "Fit Recommendations",
        mainLayoutRecommendationsContainerTooltipContent: `Total: total number of recommendations provided\n
          Added to Cart: fit recommendations that have been added to cart\n
          Purchased: fit recommendations that have resulted in a sale `,
        mainLayoutRecommendationsContainerRecommendationsTitle: "Total",
        mainLayoutRecommendationsContainerAddedToCartTitle: "Added to Cart",
        mainLayoutRecommendationsContainerPurchasedTitle: "Purchased",
      },
      mainLayoutRecommendedSizesContainerTooltipTitle: "Recommended Sizes",
      mainLayoutRecommendedSizesContainerTooltipContent:
        "Top 5 most recommended sizes",
      mainLayoutProductsTop10Title: "Top 10 Performing Products",
      mainLayoutProductsTop10ContainerTooltipTitle:
        "Top 10 Performing Products",
      mainLayoutProductsTop10ContainerTooltipContent:
        "Top 10 that have the highest rate of Scircula fit recommendations",
      mainLayoutMostRecommendedSizesTitle: "Recommended Sizes",
      mainLayoutLastRecommendationsContainerTooltipTitle:
        "Most Recent Recommendations",
      mainLayoutLastRecommendationsTitle: "Most Recent Recommendations",
      mainLayoutLastRecommendationsContainerTooltipContent:
        "Your customers size and fit data based on the last 10 product recommendations provided",
      mainLayoutYourCustomersTitle: "Your Customers Body Measurements",
      mainLayoutYourCustomersContainerTooltipTitle:
        "Your Customers Body Measurements",
      mainLayoutYourCustomersContainerTooltipContent:
        "Average body measurements across customers using Find My Fit",
    },
  },
};

export default i18n;

export type I18NType = typeof i18n.en;
