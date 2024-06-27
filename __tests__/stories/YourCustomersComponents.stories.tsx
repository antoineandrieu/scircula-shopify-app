import React, { StrictMode } from "react";
import styled from "styled-components";
import YourCustomersComponent from "../../components/YourCustomersComponents";

const StyledYourCustomersComponentsStory = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #e5e5e5;
`;

const dataMap: Array<{ title: string; value: number }> = [
  { title: "Bust", value: 98 },
  { title: "Waist", value: 82 },
  { title: "Hips", value: 98 },
  { title: "Thigh", value: 98 },
  { title: "Inseam", value: 98 },
];

export const YourCustomersComponentsStory = () => (
  <StyledYourCustomersComponentsStory>
    <YourCustomersComponent data={dataMap} />
  </StyledYourCustomersComponentsStory>
);

export default {
  title: "YourCustomersComponents",
  component: YourCustomersComponentsStory,
};
