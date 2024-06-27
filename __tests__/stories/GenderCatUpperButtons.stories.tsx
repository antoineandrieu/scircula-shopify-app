import React, { StrictMode } from "react";
import styled from "styled-components";
import { useState } from "react";
import GenderCatComponent from "../../components/GenderCatComponent";

const StyledGenderCatStory = styled.div`
  height: 100vh;
  width: 100vw;
`;

export const GenderCatComponentStory = () => {
  return (
    <StyledGenderCatStory>
      <GenderCatComponent
        title={"Gender"}
        options={["Apache helicopter", "Woman", "Man"]}
        selectedOption={"Woman"}
        onChange={gender => {
          null;
        }}
        color="#4ab7c3"
      />
    </StyledGenderCatStory>
  );
};

export default {
  title: "GenderCatComponent",
  component: GenderCatComponentStory,
};
