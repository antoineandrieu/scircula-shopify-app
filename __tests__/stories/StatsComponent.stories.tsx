import React, { StrictMode } from "react";
import styled from "styled-components";
import { useState } from "react";
import StatsComponent from "../../components/StatsComponent";

const StyledStatsStory = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #e5e5e5;
`;

export const StatsComponentStory = () => {
  return (
    <StyledStatsStory>
      <StatsComponent
        title={"General"}
        currency={"€"}
        content={[
          {
            title: "Find My Fit Users",
            bigData: (30 / 50) * 100 + "%",
            smallData2: 30,
          },
          {
            title: "Returns Rate",
            bigData: "50%",
            smallData: "-30%",
            smallData2: "40%",
          },
          {
            title: "Find My Fit Sales",
            bigData: "60€",
            smallData: "30%",
            smallData2: "40%",
          },
        ]}
      />
    </StyledStatsStory>
  );
};

export default {
  title: "StatsComponent",
  component: StatsComponentStory,
};
