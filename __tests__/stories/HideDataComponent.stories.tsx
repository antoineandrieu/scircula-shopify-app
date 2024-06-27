import React from "react";
import styled from "styled-components";
import HideDataComponent from "../../components/Settings/HideDataComponent";

const StyledHideDataComponentStory = styled.div`
  height: 100vh;
  width: 100vw;
`;

export const HideDataComponentStory = () => {
  return (
    <StyledHideDataComponentStory>
      <HideDataComponent
        title="Premium Data Analytics"
        textColor="#eaaa00"
        moreDataLabel="Show More Premium Features"
        lessDataLabel="Show Less Premium Features"
        listData={[
          "Customer Size + Fit Analytics",
          "Garment Returns Analytics",
          "Garment Sales Analytics",
        ]}
      />
    </StyledHideDataComponentStory>
  );
};

export default {
  title: "HideDataComponent",
  component: HideDataComponentStory,
};
