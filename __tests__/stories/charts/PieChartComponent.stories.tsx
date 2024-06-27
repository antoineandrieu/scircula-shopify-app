import React from "react";
import styled from "styled-components";
import PieChartComponent from "../../../components/charts/PieChartComponent";

const StyledPieChartComponentStory = styled.div`
  height: 100vh;
  width: 100vw;
`;

const data = new Map([
  ["L", 87],
  ["M", 44],
  ["S", 32],
  ["XL", 22],
  ["XS", 18],
  ["XXL", 4],
  ["NoMatch", 2],
]);

export const PieChartComponentStory = () => (
  <StyledPieChartComponentStory>
    <PieChartComponent
      title={"Recommended sizes"}
      data={data}
      showLegend={false}
    />
  </StyledPieChartComponentStory>
);

export default {
  title: "Charts",
  component: PieChartComponentStory,
};
