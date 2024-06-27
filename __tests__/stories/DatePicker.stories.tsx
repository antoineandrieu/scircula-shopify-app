import React, { StrictMode } from "react";
import styled from "styled-components";
import { useState } from "react";
import DatePickerComponent from "../../components/DatePicker/DatePickerComponent";
import { DateFiltersContextProvider } from "../../components/DatePicker/DateFiltersContext";

const StyledDatePickerStory = styled.div`
  height: 100vh;
  width: 100vw;
`;

export const DatePickerComponentStory = () => {
  return (
    <StyledDatePickerStory>
      <DateFiltersContextProvider>
        <DatePickerComponent applySearch={() => {}} reset={false} />
      </DateFiltersContextProvider>
    </StyledDatePickerStory>
  );
};

export default {
  title: "DatePickerComponent",
  component: DatePickerComponentStory,
};
