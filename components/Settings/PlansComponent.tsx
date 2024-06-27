import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import OnePlanComponent from "./OnePlanComponent";
import { ToggleComponent } from "./ToggleComponent";
import { useSessionContext } from "../../contexts/SessionContext";
import { choosePlan } from "../../lib/backendMethods";

const StyledPlansComponent = styled.div`
  .plans-container {
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-column-gap: 20px;
    height: 100%;
    margin: 0 20px;
  }

  .toggle-line-container {
    display: flex;
    width: 100%;
    height: 10%;
  }

  .price-toggle-container {
    width: 500px;
    height: 60px;
    /* margin: auto; */
    margin: 30px auto;
    padding: 10px;
    justify-content: center;
  }

  .currency-price-toggle-container {
    height: 60px;
    width: 200px;
    margin: 30px auto;
    padding: 10px;
  }

  @media (max-width: 1200px) {
    .plans-container {
      min-height: 600px;
    }
  }

  @media (max-width: 1024px) {
    grid-template-rows: 15% 15% 70%;

    .plans-container {
      display: flex;
      flex-direction: column;
    }
  }
`;

export enum ScirculaPlanTitle {
  FIRST_PLAN = "Pro",
  SECOND_PLAN = "Premium",
  THIRD_PLAN = "Plus",
}

export interface PlanInterface {
  title: ScirculaPlanTitle;
  annualDollarPrice: number;
  monthlyDollarPrice: number;
  annualEuroPrice: number;
  monthlyEuroPrice: number;
  features: Array<String>;
  premiumFeaturesTitle?: String;
  premiumFeatures?: Array<String>;
  implementationDollarPrice: number;
  implementationEuroPrice: number;
  implementationDetails: Array<String>;
}

const implementationDetails = [
  "Dedicated Project Implementation Manager - takes the load off you",
  "Design and build a custom model specifically for your brand",
  "Create a fit algorithm that's optimised for your unique garments",
  "Test every garment until we meet our accuracy benchmarks",
  "Evaluate your web-shop theme and aesthetic to optimise UX's",
  "Create designs for you to choose from that align with your brand",
  "Customise fit solution UI so it looks and feels like your brand",
  "End-to-end integration management - no heavy lifting your end",
  "Test every product recommendation on your site when live",
  "Process, test and Scircula power your new collection (2 Collections)",
  "Annual size and fit audits - help you further optimise your business",
];

const scirculaPlans: Array<PlanInterface> = [
  {
    title: ScirculaPlanTitle.FIRST_PLAN,
    annualDollarPrice: 268,
    monthlyDollarPrice: 297,
    annualEuroPrice: 225,
    monthlyEuroPrice: 250,
    features: [
      "eCommerce Fit Solution",
      "Unlimited End-users",
      "Unlimited Fit Recommendations",
      "Up to 150 Products Per Collection",
      "2 Collections Scircula Powered",
      "No Extra Costs on Fit Recommendations",
      "Customised UI (looks + sounds like your brand)",
      "1 UI Language",
    ],
    implementationDollarPrice: 891,
    implementationEuroPrice: 750,
    implementationDetails,
  },
  {
    title: ScirculaPlanTitle.SECOND_PLAN,
    annualDollarPrice: 642,
    monthlyDollarPrice: 713,
    annualEuroPrice: 540,
    monthlyEuroPrice: 600,
    features: [
      "eCommerce Fit Solution",
      "Unlimited End-users",
      "Unlimited Fit Recommendations",
      "Up to 500 Products Per Collection",
      "2 Collections Scircula Powered",
      "No Extra Costs on Fit Recommendations",
      "Customised UI (looks + sounds like your brand)",
      "1 UI Language",
    ],
    premiumFeaturesTitle: "Premium Data Analytics",
    premiumFeatures: [
      "Customer Size + Fit Analytics",
      "Garment Returns Analytics",
      "Garment Sales Analytics",
    ],
    implementationDollarPrice: 1188,
    implementationEuroPrice: 1000,
    implementationDetails,
  },
  {
    title: ScirculaPlanTitle.THIRD_PLAN,
    annualDollarPrice: 1070,
    monthlyDollarPrice: 1288,
    annualEuroPrice: 900,
    monthlyEuroPrice: 1000,
    features: [
      "eCommerce Fit Solution",
      "Unlimited End-users",
      "Unlimited Fit Recommendations",
      "Up to 1000 Products Per Collection",
      "2 Collections Scircula Powered",
      "No Extra Costs on Fit Recommendations",
      "Customised UI (looks + sounds like your brand)",
      "2 UI Languages",
      "Communication + Engagement Toolkits",
    ],
    premiumFeaturesTitle: "Plus Data Analytics + Insights",
    premiumFeatures: [
      "Customer Size + Fit Analytics",
      "Garment Returns Analytics",
      "Garment Sales Analytics",
      "Bi-annual Size + Fit audits enable you to respond with agility and further optimise your business",
    ],
    implementationDollarPrice: 1544,
    implementationEuroPrice: 1300,
    implementationDetails,
  },
];

interface PlansComponentProps {
  plan: string;
}

const PlansComponent = ({ plan }: PlansComponentProps) => {
  const router = useRouter();
  const [currentUserPlan, setCurrentUserPlan] = useState(plan);
  const [nextUserPlan, setNextUserPlan] = useState(null);

  const [isAnnuallyPricingSelected, setIsAnnuallyPricingSelected] = useState(
    true,
  );

  const { scirculaAccessToken, shop, host } = useSessionContext();

  const getConfirmationUrl = async (shop, host, input) => {
    const confirmationUrl = await choosePlan(shop, host, input);
    window.top.location.href = confirmationUrl;
  };

  const [currentCurrency, setCurrentCurrency] = useState("$");

  useEffect(() => {
    if (nextUserPlan) {
      let planInput = null;
      let input = null;
      if (nextUserPlan == ScirculaPlanTitle.FIRST_PLAN) {
        planInput = scirculaPlans[0];
      } else if (nextUserPlan == ScirculaPlanTitle.SECOND_PLAN) {
        planInput = scirculaPlans[1];
      } else if (nextUserPlan == ScirculaPlanTitle.THIRD_PLAN) {
        planInput = scirculaPlans[2];
      }
      if (isAnnuallyPricingSelected) {
        input = {
          name: planInput.title,
          amount: planInput.annualDollarPrice * 12,
          interval: "ANNUAL",
        };
      } else {
        input = {
          name: planInput.title,
          amount: planInput.monthlyDollarPrice,
          interval: "EVERY_30_DAYS",
        };
      }

      getConfirmationUrl(shop, host, input);
    }
  }, [nextUserPlan]);

  return (
    <StyledPlansComponent>
      <h1 className="plan-settings-title">
        Plans for every fashion brand no matter your shape, stage or size
      </h1>
      <div className="toggle-line-container">
        <div className="price-toggle-container">
          <ToggleComponent
            isFirstActiveDefault={true}
            firstOption={
              <>
                <label>ANNUALLY</label>
                <span>SAVE 10%</span>
              </>
            }
            secondOption={"MONTHLY"}
            firstOptionSelectedCallBack={() => {
              setIsAnnuallyPricingSelected(true);
            }}
            secondOptionSelectedCallBack={() => {
              setIsAnnuallyPricingSelected(false);
            }}
          />
        </div>
        <div className="currency-price-toggle-container">
          <ToggleComponent
            isFirstActiveDefault={true}
            firstOption={"US$"}
            secondOption={"€"}
            firstOptionSelectedCallBack={() => setCurrentCurrency("$")}
            secondOptionSelectedCallBack={() => setCurrentCurrency("€")}
          />
        </div>{" "}
      </div>

      <div className="plans-container">
        {scirculaPlans.map(plan => (
          <OnePlanComponent
            key={plan.title}
            isAnnuallyPricingSelected={isAnnuallyPricingSelected}
            isCurrentPlan={currentUserPlan === plan.title}
            plan={plan}
            selectPlan={setNextUserPlan}
            currentCurrency={currentCurrency}
          />
        ))}
      </div>
    </StyledPlansComponent>
  );
};

export default PlansComponent;
