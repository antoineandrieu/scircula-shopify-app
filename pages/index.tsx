import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import MainLayout from "../components/MainLayout";
import ImplementationComponent from "../components/Settings/ImplementationComponent";
import PlansComponent from "../components/Settings/PlansComponent";
import { useSearchFiltersContext } from "../contexts/SearchFiltersContext";
import { useSessionContext } from "../contexts/SessionContext";
import {
  createVendor,
  getDashboardProducts,
  getVendorInfo,
} from "../lib/backendMethods";
import { getApolloClient } from "../lib/shopifyApi";

const SHOP_INFO = gql`
  query {
    shop {
      name
      email
      myshopifyDomain
      plan {
        displayName
      }
      currencyCode
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async context => {
  const scirculaAccessToken = context.req["scirculaAccessToken"];
  const accessToken = context.req["accessToken"];
  const shop = context.req["shop"];
  const host = context.req["host"];
  let vendorInfos = await getVendorInfo(scirculaAccessToken, shop);
  // Put subscriptionId in sessions (context)

  if (!vendorInfos) {
    const apolloClient = getApolloClient(shop, accessToken);
    const { data } = await apolloClient.query({
      query: SHOP_INFO,
    });
    const shopInfo = {
      name: data.shop.name,
      email: data.shop.email,
      adminUrl: `${data.shop.myshopifyDomain}/admin`,
      shopUrl: shop,
      platform: "shopify",
      platformPlan: data.shop.plan.displayName,
      currency: data.shop.currencyCode,
    };
    vendorInfos = await createVendor(scirculaAccessToken, shopInfo);
  }
  if (!vendorInfos.shopifySubscriptionId && !vendorInfos.legacy) {
    return {
      props: {
        showPlan: true,
        shop,
        host,
      },
    };
  }
  const scirculaPlan = vendorInfos.scirculaPlan;
  if (vendorInfos.integrationToBePaid) {
    return {
      props: {
        showImplementation: true,
        shop,
        host,
        plan: scirculaPlan,
      },
    };
  }
  let bannerTitle = null;
  let bannerContent = null;
  let dashboardProducts = null;
  let showDemo = false;
  if (!vendorInfos.integratedAt) {
    bannerTitle = "You're Visualising Sample Data";
    bannerContent = `Thanks for installing Scircula’s 97% accurate Fit Solution.\n
          We will contact you shortly to begin your easy, zero-code 4 step onboarding process.`;
    showDemo = true;
  } else {
    if (scirculaPlan === "Pro") {
      bannerTitle = "Super-charge Your Sales Today";
      bannerContent =
        "You can upgrade to Premium to get your data on this dashboard.";
      showDemo = true;
    }
    vendorInfos = await getVendorInfo(scirculaAccessToken, shop, showDemo);
    dashboardProducts = await getDashboardProducts(
      scirculaAccessToken,
      shop,
      showDemo,
    );
  }

  return {
    props: {
      showDemo,
      bannerTitle,
      bannerContent,
      genders: vendorInfos.genders,
      integratedAt: vendorInfos.integratedAt,
      categories: vendorInfos.externalCategories,
      dashboardProducts,
      accessToken,
      scirculaAccessToken,
      shop,
      host,
      currency: vendorInfos.currency,
      plan: scirculaPlan,
      scriptTagId: vendorInfos.scriptExternalId,
      fmfSettingsOn: vendorInfos.buttonUrl ? true : false,
      buttonUrl: vendorInfos.buttonUrl,
      scirculaPlan,
    },
  };
};

const StyledSettingsPage = styled.div`
  height: 100vh;
  padding: 20px;
`;

interface IndexProps {
  showDemo: boolean;
  bannerTitle: string;
  bannerContent: string;
  integratedAt: Date;
  genders: Array<string>;
  categories: Array<string>;
  dashboardProducts: Array<{ externalId: string; name: string }>;
  accessToken: string;
  scirculaAccessToken: string;
  shop: string;
  host: string;
  currency: string;
  plan: string;
  scriptTagId: string;
  fmfSettingsOn: boolean;
  buttonUrl?: string;
  showPlan?: boolean;
  showImplementation?: boolean;
}

const Index = ({
  showDemo,
  bannerTitle,
  bannerContent,
  integratedAt,
  genders,
  categories,
  dashboardProducts,
  accessToken,
  scirculaAccessToken,
  shop,
  host,
  currency,
  plan,
  scriptTagId,
  fmfSettingsOn,
  buttonUrl,
  showPlan,
  showImplementation,
}: IndexProps) => {
  const {
    setGendersData,
    setCategoriesData,
    setSearchProductsData,
    setMinDate,
  } = useSearchFiltersContext();

  const {
    setAccessToken,
    setScirculaAccessToken,
    setShop,
    setHost,
    setCurrency,
    setPlan,
    setScriptTagId,
    setFmfSettingsOn,
    setButtonUrl,
    setIsDemo,
  } = useSessionContext();

  const [isBusy, setIsBusy] = useState(true);

  useEffect(() => {
    setAccessToken(accessToken);
    setScirculaAccessToken(scirculaAccessToken);
    setShop(shop);
    setHost(host);
    setCurrency(currency);
    setIsBusy(false);
    setPlan(plan);
    setScriptTagId(scriptTagId);
    setFmfSettingsOn(fmfSettingsOn);
    setButtonUrl(buttonUrl);
    setIsDemo(showDemo);
  }, [
    accessToken,
    scirculaAccessToken,
    shop,
    host,
    plan,
    scriptTagId,
    fmfSettingsOn,
    buttonUrl,
    showDemo,
  ]);

  useEffect(() => {
    setSearchProductsData(dashboardProducts);
  }, [dashboardProducts]);

  useEffect(() => {
    // Always put women first and null in last position
    genders &&
      genders.sort(a => {
        if (a === "women" || a === "woman") {
          return -1;
        }
        if (a === null) {
          return 1;
        }
      });

    setGendersData(genders);
    setCategoriesData(categories);
    setMinDate(integratedAt);
    setSearchProductsData(dashboardProducts);
  }, [genders, categories, integratedAt]);
  console.log(showDemo);

  if (!isBusy) {
    if (showPlan) {
      return (
        <StyledSettingsPage>
          <PlansComponent plan={plan} />
        </StyledSettingsPage>
      );
    }
    if (showImplementation) {
      return <ImplementationComponent plan={plan} />;
    }
    return (
      <MainLayout
        showDemo={showDemo}
        bannerTitle={bannerTitle}
        bannerContent={bannerContent}
        currency={currency}
      />
    );
  } else {
    return <></>;
  }
};

export default Index;
