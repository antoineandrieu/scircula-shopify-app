import React, { useEffect, useState } from "react";
import styled from "styled-components";

import StatsComponent from "../components/StatsComponent";
import { useI18n } from "../contexts/I18nContext";
import { useSearchFiltersContext } from "../contexts/SearchFiltersContext";
import { useSessionContext } from "../contexts/SessionContext";
import { getDashboardData } from "../lib/backendMethods";
import Banner from "./Banner";
import HorizontalBarChart from "./charts/HorizontalBarChart";
import LastRecommendationsComponent from "./LastRecommendationsComponent";
import MostRecommendedSizesComponent from "./MostRecommendedSizesComponent";
import SearchFiltersComponent from "./SearchFiltersComponent";
import SettingsMenu from "./Settings/SettingsMenu";
import SettingsPopin from "./Settings/SettingsPopin";
import StyledContainer from "./StyledContainer";
import Tooltip, { places } from "./Tooltip";
import YourCustomersComponent from "./YourCustomersComponents";

const StyledMainContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 20px;
  color: #1f2833;

  h1 {
    font-size: 1.5em;
    font-weight: 100;
    padding: 0;
    margin: 0;
  }

  h2 {
    color: #6a7984;
    font-size: 1.1em;
    font-weight: 400;
    text-align: center;
    padding: 0;
    margin: 0;
  }

  .banner-display-layout {
    width: 100%;
    height: 100%;
    display: grid;
    grid-gap: 20px;
  }

  .no-banner-display-layout {
    width: 100%;
    height: 100%;
    display: grid;
  }

  .main-container {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows:
      minmax(auto, 7.5%) minmax(auto, 15%) minmax(auto, 15%) minmax(auto, 50%)
      minmax(auto, 12.5%);
    grid-template-columns: minmax(auto, 50%) minmax(auto, 50%);
    gap: 20px;
  }

  .header-container {
    height: 100%;
    min-height: 100px;
    width: 100%;
    grid-column-start: 1;
    grid-column-end: 3;
    background-color: white;
    grid-template-rows: 40% 30% 30%;
    display: grid;
    padding-right: 10px;
    padding-left: 10px;
    border-radius: 6px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 8px;
    /* position: relative; */
  }

  .selected-dates {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row: 2;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    color: #6a7984;
    /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
    border-radius: 4px;
    justify-content: flex-start;
  }

  .compare-text-div {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row: 3;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    color: #6a7984;
    /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
    border-radius: 4px;
    justify-content: flex-start;
  }

  .general-container {
    position: relative;
    grid-row: 2;
    grid-column: 1;
    min-height: 200px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 8px;
  }

  .recommendations-container {
    position: relative;
    grid-row: 3;
    grid-column: 1;
    min-height: 200px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 8px;
  }

  .recommended-sizes-container {
    position: relative;
    grid-row-start: 2;
    grid-row-end: 4;
    grid-column: 2;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 8px;
  }

  .products-top-10-container {
    position: relative;
    grid-row-start: 4;
    grid-row-end: 6;
    grid-column: 1;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 8px;
  }

  .last-recommendations-container {
    position: relative;
    grid-row-start: 4;
    grid-row-end: 5;
    grid-column: 2;
    min-height: 360px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 8px;
  }

  .your-customers-container {
    position: relative;
    grid-row-start: 5;
    grid-row-end: 6;
    grid-column: 2;
    min-height: 150px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 8px;
  }

  @media screen and (max-width: 1250px) {
    .main-container {
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: 1fr;
    }

    .header-container {
      grid-column: 1;
      grid-row: 1;
      max-height: 140px;
      min-height: 140px;
      grid-template-rows: 60% 20% 20%;
    }

    .general-container {
      grid-row: 2;
    }

    .recommendations-container {
      grid-row: 3;
    }

    .recommended-sizes-container {
      grid-column: 1;
      grid-row: 4;
    }

    .products-top-10-container {
      grid-column: 1;
      grid-row-start: 5;
      grid-row-end: 6;
    }

    .last-recommendations-container {
      grid-column: 1;
      grid-row-start: 6;
      grid-row-end: 7;
      min-height: 200px;
    }

    .your-customers-container {
      grid-column: 1;
      grid-row: 7;
    }
  }

  @media screen and (max-width: 1000px) {
    .header-container {
      min-height: 230px;
      grid-template-rows: 75% 12% 12%;
    }
  }

  @media screen and (max-height: 600px) {
    height: 600px;
  }
  @media screen and (max-width: 450px) {
    .header-container {
      min-height: 230px;
    }
    .selected-dates {
      padding-top: 15px;
      padding-bottom: 15px;
    }
  }
  @media screen and (max-width: 300px) {
    width: 300px;
  }
`;

interface MainLayoutProps {
  showDemo: boolean;
  bannerTitle: string;
  bannerContent: string;
  currency: string;
}

const MainLayout = ({
  showDemo,
  bannerTitle,
  bannerContent,
  currency,
}: MainLayoutProps) => {
  const {
    currentLanguage,
    currentLanguageCode,
    mainLayout: {
      mainLayoutNoDataText,
      mainLayoutComparedToDateRangeTitle,
      generalContainer: {
        mainLayoutGeneralContainerTitle,
        mainLayoutGeneralContainerTooltipContent,
        mainLayoutGeneralContainerFindMyFitUsersTitle,
        mainLayoutGeneralContainerReturnsRateTitle,
        mainLayoutGeneralContainerFindMyFitSalesTitle,
      },
      recommendationsContainer: {
        mainLayoutRecommendationsContainerTitle,
        mainLayoutRecommendationsContainerTooltipContent,
        mainLayoutRecommendationsContainerRecommendationsTitle,
        mainLayoutRecommendationsContainerAddedToCartTitle,
        mainLayoutRecommendationsContainerPurchasedTitle,
      },
      mainLayoutMostRecommendedSizesTitle,
      mainLayoutRecommendedSizesContainerTooltipContent,
      mainLayoutProductsTop10Title,
      mainLayoutProductsTop10ContainerTooltipContent,
      mainLayoutLastRecommendationsContainerTooltipContent,
      mainLayoutYourCustomersTitle,
      mainLayoutYourCustomersContainerTooltipContent,
      mainLayoutLastRecommendationsTitle,
    },
  } = useI18n().i18n;

  const {
    selectedProduct,
    gender,
    category,
    dates,
  } = useSearchFiltersContext();

  const { scirculaAccessToken, shop } = useSessionContext();

  const [general, setGeneral] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [customers, setCustomers] = useState(null);
  const [topProducts, setTopProducts] = useState(null);
  const [currentSize, setCurrentSize] = useState(null);
  const [sizes, setSizes] = useState(null);
  const [lastRecommendations, setLastRecommendations] = useState(null);
  const [generalComparisonValues, setGeneralComparisonValues] = useState(null);
  const [
    recommendationsComparisonValues,
    setRecommendationsComparisonValues,
  ] = useState(null);

  const [loaderState, setLoaderState] = useState(false);
  const [isTimedOut, setIsTimeOut] = useState(false);

  const [showPlansPopin, setShowPlansPopin] = useState(false);
  const [shouldDisplayMenu, setShouldDisplayMenu] = useState(false);

  useEffect(() => {
    refreshData();
    refreshComparedData();
  }, [dates, gender, category, selectedProduct]);

  function refreshData() {
    setLoaderState(true);

    getDashboardData({
      access_token: scirculaAccessToken,
      shop_url: shop,
      gender,
      start_date: dates.startDate,
      end_date: dates.endDate,
      external_category: category,
      product: selectedProduct?.externalId,
      isDemo: showDemo,
      setIsTimeOut,
    }).then(dashboardDataAll => {
      if (dashboardDataAll) {
        setGeneral(dashboardDataAll.general);
        setRecommendations(dashboardDataAll.recommendations);
        setCustomers(dashboardDataAll.customers);
        setTopProducts(dashboardDataAll.topProducts);
        setSizes(dashboardDataAll.sizes);
        setLastRecommendations(dashboardDataAll.lastRecommendations);
      } else {
        console.error("No data received");
      }
      setLoaderState(false);
    });
  }

  function refreshComparedData() {
    setLoaderState(true);

    getDashboardData({
      access_token: scirculaAccessToken,
      shop_url: shop,
      gender,
      start_date: dates.compareStartDate,
      end_date: dates.compareEndDate,
      external_category: category,
      product: selectedProduct?.externalId,
      isDemo: true,
      setIsTimeOut,
    }).then(dashboardDataAll => {
      if (dashboardDataAll) {
        setGeneralComparisonValues(dashboardDataAll.general);
        setRecommendationsComparisonValues(dashboardDataAll.recommendations);
      } else {
        console.error("No comparison data received");
      }
      setLoaderState(false);
    });
  }
  const getFormatedPercentageOf = (data1: number, data2: number) => {
    if (data1 && data2) {
      return ((data1 / data2) * 100).toFixed(1) + "%";
    } else {
      return "-";
    }
  };

  const getPercentageOf = (data1: number, data2: number) => {
    if (data1 && data2) {
      return (data1 / data2) * 100;
    } else {
      return null;
    }
  };

  const getPercentageEvolution = (data1: number, data2: number) => {
    if (data1 && data2) {
      if (data1 != data2) {
        return (((data1 - data2) / data2) * 100).toFixed(1) + "%";
      } else {
        return "=";
      }
    } else {
      return "-";
    }
  };

  const formatDate = (date: Date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  if (showPlansPopin) {
    return (
      <SettingsPopin
        shouldDisplayPopin={showPlansPopin}
        hidePopinCallBack={() => setShowPlansPopin(false)}
      />
    );
  }

  return (
    <>
      {shouldDisplayMenu && (
        <SettingsMenu
          shouldDisplayMenu={shouldDisplayMenu}
          hideMenuCallBack={() => setShouldDisplayMenu(false)}
          showPlansPopin={() => setShowPlansPopin(true)}
        />
      )}
      <StyledMainContainer>
        <div
          className={
            showDemo ? "banner-display-layout" : "no-banner-display-layout"
          }
        >
          {showDemo && <Banner title={bannerTitle} content={bannerContent} />}
          <div className="main-container">
            <div className="header-container">
              <SearchFiltersComponent
                applySearch={() => {
                  // Search is done automaticaly in useEffect when dates has changed
                }}
                loaderState={loaderState}
                onSettingsButttonMenuClick={() => setShouldDisplayMenu(true)}
              />

              <div className="selected-dates">
                {` ${formatDate(new Date(dates?.startDate))} → ${formatDate(
                  new Date(dates?.endDate),
                )}`}
              </div>

              <div className="compare-text-div">
                {`${mainLayoutComparedToDateRangeTitle} : ${formatDate(
                  new Date(dates?.compareStartDate),
                )} → ${formatDate(new Date(dates?.compareEndDate))}`}
              </div>
            </div>

            <StyledContainer className="general-container">
              <Tooltip
                id="general-container-tooltip"
                place={places.right}
                title={mainLayoutGeneralContainerTitle}
                content={mainLayoutGeneralContainerTooltipContent}
              />
              <StatsComponent
                title={mainLayoutGeneralContainerTitle}
                currency={currency}
                loading={loaderState}
                content={[
                  {
                    title: mainLayoutGeneralContainerFindMyFitUsersTitle,
                    bigData: getFormatedPercentageOf(
                      general?.fmfUsers,
                      general?.visits,
                    ),
                    smallData: getPercentageEvolution(
                      getPercentageOf(general?.fmfUsers, general?.visits),
                      getPercentageOf(
                        generalComparisonValues?.fmfUsers,
                        generalComparisonValues?.visits,
                      ),
                    ),
                    smallData2: general?.fmfUsers ? general?.fmfUsers : "-",
                  },
                  {
                    title: mainLayoutGeneralContainerReturnsRateTitle,
                    bigData: general?.returnsRate
                      ? general?.returnsRate.toFixed(1) + "%"
                      : "-",
                    smallData: getPercentageEvolution(
                      general?.returnsRate,
                      generalComparisonValues?.returnsRate,
                    ),
                    smallData2: general?.returns,
                  },
                  {
                    title: mainLayoutGeneralContainerFindMyFitSalesTitle,
                    bigData: getFormatedPercentageOf(
                      general?.fmfSales,
                      general?.totalSales,
                    ),
                    smallData: getPercentageEvolution(
                      getPercentageOf(general?.fmfSales, general?.totalSales),
                      getPercentageOf(
                        generalComparisonValues?.fmfSales,
                        generalComparisonValues?.totalSales,
                      ),
                    ),
                    smallData2: general?.fmfSales ? general?.fmfSales : 0,
                  },
                ]}
              />
            </StyledContainer>
            <StyledContainer className="recommendations-container">
              <Tooltip
                id="recommendations-container-tooltip"
                place={places.right}
                title={mainLayoutRecommendationsContainerTitle}
                content={mainLayoutRecommendationsContainerTooltipContent}
              />
              <StatsComponent
                title={mainLayoutRecommendationsContainerTitle}
                currency={currency}
                loading={loaderState}
                content={[
                  {
                    title: mainLayoutRecommendationsContainerRecommendationsTitle,
                    bigData: recommendations?.total,
                    smallData: getPercentageEvolution(
                      recommendations?.total,
                      recommendationsComparisonValues?.total,
                    ),
                  },
                  {
                    title: mainLayoutRecommendationsContainerAddedToCartTitle,
                    bigData: getFormatedPercentageOf(
                      recommendations?.addedToCart,
                      recommendations?.total,
                    ),
                    smallData: getPercentageEvolution(
                      getPercentageOf(
                        recommendations?.addedToCart,
                        recommendations?.total,
                      ),
                      getPercentageOf(
                        recommendationsComparisonValues?.addedToCart,
                        recommendationsComparisonValues?.total,
                      ),
                    ),
                    smallData2: recommendations?.addedToCart
                      ? recommendations?.addedToCart
                      : 0,
                  },
                  {
                    title: mainLayoutRecommendationsContainerPurchasedTitle,
                    bigData: getFormatedPercentageOf(
                      recommendations?.purchased,
                      recommendations?.total,
                    ),
                    smallData: getPercentageEvolution(
                      getPercentageOf(
                        recommendations?.purchased,
                        recommendations?.total,
                      ),
                      getPercentageOf(
                        recommendationsComparisonValues?.purchased,
                        recommendationsComparisonValues?.total,
                      ),
                    ),
                    smallData2: recommendations?.purchased
                      ? recommendations?.purchased
                      : 0,
                  },
                ]}
              />
            </StyledContainer>
            <StyledContainer className="recommended-sizes-container">
              <Tooltip
                id="recommended-sizes-container-tooltip"
                place={places.left}
                title={mainLayoutMostRecommendedSizesTitle}
                content={mainLayoutRecommendedSizesContainerTooltipContent}
              />
              <MostRecommendedSizesComponent
                title={mainLayoutMostRecommendedSizesTitle}
                onSizeSelected={selectedSize => {
                  setCurrentSize(selectedSize);
                }}
                sizes={sizes}
                loading={loaderState}
              />
            </StyledContainer>
            <StyledContainer className="products-top-10-container">
              <Tooltip
                id="products-top-10-container-tooltip"
                place={places.right}
                title={mainLayoutProductsTop10Title}
                content={mainLayoutProductsTop10ContainerTooltipContent}
              />
              <HorizontalBarChart
                title={mainLayoutProductsTop10Title}
                data={topProducts}
                loading={loaderState}
              ></HorizontalBarChart>
            </StyledContainer>
            <StyledContainer className="last-recommendations-container">
              <Tooltip
                id="last-recommendations-container-tooltip"
                place={places.right}
                title={mainLayoutLastRecommendationsTitle}
                content={mainLayoutLastRecommendationsContainerTooltipContent}
              />
              <LastRecommendationsComponent
                title={mainLayoutLastRecommendationsTitle}
                currentSize={currentSize}
                lastRecommendations={lastRecommendations}
                loading={loaderState}
              />
            </StyledContainer>
            <StyledContainer className="your-customers-container">
              <Tooltip
                id="your-customers-container-tooltip"
                place={places.right}
                title={mainLayoutYourCustomersTitle}
                content={mainLayoutYourCustomersContainerTooltipContent}
              />
              <YourCustomersComponent
                data={customers}
                title={mainLayoutYourCustomersTitle}
                loading={loaderState}
              />
            </StyledContainer>
          </div>
        </div>
      </StyledMainContainer>
    </>
  );
};

function noScroll() {
  window.scrollTo(0, 0);
}

export default MainLayout;
