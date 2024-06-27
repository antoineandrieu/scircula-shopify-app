import React from "react";
import styled from "styled-components";
import PlansComponent from "../../components/Settings/PlansComponent";
import { ScirculaPlanTitle } from "../../components/Settings/PlansComponent";

const StyledPlansComponentStory = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #e5e5e5;
`;

export const PlansComponentStory = () => {
  return (
    <StyledPlansComponentStory>
      <PlansComponent plan={ScirculaPlanTitle.FIRST_PLAN} />
    </StyledPlansComponentStory>
  );
};

export default {
  title: "PlansComponent",
  component: PlansComponentStory,
};
