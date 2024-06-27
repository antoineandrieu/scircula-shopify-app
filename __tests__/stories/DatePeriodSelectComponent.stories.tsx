import React from "react";
import styled from "styled-components";
import DatePeriodSelectComponent from "../../components/DatePicker/DatePeriodSelectComponent";

const StyledDatePeriodSelectComponentStory = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
`;

export const DatePeriodSelectComponentStory = () => (
  <StyledDatePeriodSelectComponentStory>
    <StyledDatePeriodSelectComponentStory>
      <DatePeriodSelectComponent />
    </StyledDatePeriodSelectComponentStory>
  </StyledDatePeriodSelectComponentStory>
);

export default {
  title: "DatePeriodSelectComponent",
  component: DatePeriodSelectComponentStory,
};
