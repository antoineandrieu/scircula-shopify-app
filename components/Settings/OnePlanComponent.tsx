import React from "react";
import styled from "styled-components";

import { StyledButton } from "../SearchFiltersComponent";
import HideDataComponent from "./HideDataComponent";
import { PlanInterface } from "./PlansComponent";
import { StyledUL } from "./SettingsStyledComponents";

const StyledOnePlanComponent = styled.div<{ borderColor }>`
  border: 1px solid ${props => props.borderColor};
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  place-items: center;

  .your-plan-header {
    position: absolute;
    top: -16px;
    width: 100%;
    display: grid;
    place-items: center;
    left: 0px;

    > div {
      width: 50%;
    }
  }
  .plan-header {
    padding: 0 20px;
    width: 100%;
    display: grid;
    grid-template-columns: 40% 60%;
    height: 150px;
    place-items: center;
    border: 1px solid #f1f1f1;
    border-radius: 5px 5px 0px 0px;
    .plan-price-text {
      color: #657a83;
      justify-content: center;
    }
  }

  .plan-title {
  }

  .plan-price > div {
    display: flex;
    align-items: baseline;
    .plan-price-devise {
      margin-bottom: auto;
      margin-top: 3%;
    }
    .plan-price-highlight {
      font-size: 2.5em;
      margin: unset;
    }
  }

  .plan-content {
    /* padding: 5px 10px; */

    display: flex;
    flex-direction: column;
    height: 100%;

    .plan-content-title {
      text-align: left;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .plan-price-details {
      max-width: 400px;
    }

    h2 {
      margin-top: auto;
      margin-bottom: auto;
      text-align: left;
    }
    .free-trial-text {
      margin-top: auto;
    }
  }

  .plan-implementation-content {
    width: 100%;
    margin-bottom: 20px;
    .plan-implementation-header {
      padding: 0 20px;
      width: 100%;
      display: grid;
      height: 100px;
      place-items: center;
      border-top: 1px solid #f1f1f1;
    }
    .plan-implementation-details {
      max-width: 400px;
      margin: auto;
    }
  }

  // To prevent UI to move when the price are changed from US$ to €
  @media (min-width: 1200px) {
    .plan-implementation-header {
      grid-template-columns: 40% 60%;
    }
  }

  @media (min-width: 1024px) {
    .plan-implementation-header {
      grid-template-rows: 50% 50%;
    }
  }

  @media (max-width: 1023px) {
    .plan-implementation-header {
      grid-template-columns: 40% 60%;
    }
  }

  .plan-footer {
    padding: 0 20px;
    display: grid;
    width: 100%;
  }

  @media (max-width: 1200px) {
    margin-bottom: 20px;
    grid-template-rows: 20% 70% 10%;
  }
`;

const OnePlanComponent = ({
  isCurrentPlan,
  isAnnuallyPricingSelected,
  plan,
  selectPlan,
  currentCurrency,
}: {
  isCurrentPlan: Boolean;
  isAnnuallyPricingSelected: Boolean;
  plan: PlanInterface;
  selectPlan: (plan: string) => void;
  currentCurrency: string;
}) => {
  const {
    title,
    annualDollarPrice,
    monthlyDollarPrice,
    annualEuroPrice,
    monthlyEuroPrice,
    features,
    premiumFeaturesTitle,
    premiumFeatures,
    implementationDollarPrice,
    implementationEuroPrice,
    implementationDetails,
  } = plan;

  function displayPrice() {
    if (currentCurrency === "$") {
      return isAnnuallyPricingSelected ? annualDollarPrice : monthlyDollarPrice;
    } else {
      return isAnnuallyPricingSelected ? annualEuroPrice : monthlyEuroPrice;
    }
  }

  return (
    <StyledOnePlanComponent borderColor={isCurrentPlan ? "#eaaa00" : "#f1f1f1"}>
      <div className="plan-header">
        {isCurrentPlan && (
          <div className="your-plan-header">
            <StyledButton color={"#eaaa00"}>Your plan</StyledButton>
          </div>
        )}
        <h1 className="plan-title">{title}</h1>
        <div className="plan-price">
          <div>
            <div className="plan-price-devise">{currentCurrency}</div>
            <h1 className="plan-price-highlight">{displayPrice()}</h1>/ month
          </div>
          <div className="plan-price-text">
            {isAnnuallyPricingSelected ? "Billed annually" : "Billed monthly"}
          </div>
        </div>
      </div>
      <div className="plan-content">
        <h2 className={"plan-content-title"}>{title} Features</h2>

        <div className="plan-price-details">
          <StyledUL listCheckColor={isCurrentPlan ? "#eaaa00" : "#3fc6c9"}>
            {features.map((feature, i) => (
              <li key={`${title}-feature-${i}`}>{feature}</li>
            ))}
          </StyledUL>
          {premiumFeaturesTitle && (
            <HideDataComponent
              title={premiumFeaturesTitle}
              textColor={isCurrentPlan ? "#eaaa00" : "#3fc6c9"}
              moreDataLabel="Show More Premium Features"
              lessDataLabel="Show Less Premium Features"
              listData={premiumFeatures}
            />
          )}
        </div>

        <h3 className="free-trial-text">1 Month Free Trial</h3>
      </div>
      <div className="plan-implementation-content">
        <div className=" plan-implementation-header">
          <h3 className="plan-title">{`${title} Implementation`}</h3>
          <div className="plan-price">
            <div>
              <div className="plan-price-devise">{currentCurrency}</div>
              <h1 className="plan-price-highlight">
                {currentCurrency === "$"
                  ? implementationDollarPrice
                  : implementationEuroPrice}
              </h1>
              / one-off
            </div>
          </div>
        </div>
        <div className="plan-implementation-details">
          <HideDataComponent
            textColor={isCurrentPlan ? "#eaaa00" : "#3fc6c9"}
            moreDataLabel="Show More implementations details"
            lessDataLabel="Show Less implementations details"
            listData={implementationDetails}
          />
        </div>
      </div>
      <div className="plan-footer">
        {!isCurrentPlan && (
          <StyledButton onClick={() => selectPlan(plan.title)}>
            Choose this plan
          </StyledButton>
        )}
      </div>
      <h3>1 Month Free Trial</h3>
    </StyledOnePlanComponent>
  );
};

export default OnePlanComponent;
