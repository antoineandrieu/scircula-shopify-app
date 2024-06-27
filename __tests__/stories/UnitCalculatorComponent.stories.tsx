import React, { StrictMode } from "react";
import styled from "styled-components";
import UnitCalculatorComponent from "../../components/UnitCalculatorComponent";
import YourCustomersComponent from "../../components/UnitCalculatorComponent";
import { useState } from "react";
const StyledUnitCalculatorStory = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #e5e5e5;
`;

const [type, settype] = useState("cm");

export const UnitCalculatorComponentStory = () => (
  <StyledUnitCalculatorStory>
    <UnitCalculatorComponent type={type} settype={settype} />
  </StyledUnitCalculatorStory>
);

export default {
  title: "UnitCalculatorComponent",
  component: UnitCalculatorComponentStory,
};
