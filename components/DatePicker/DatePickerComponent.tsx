import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchFiltersContext } from "../../contexts/SearchFiltersContext";
import { DateFiltersContextProvider } from "./DateFiltersContext";
import DatePickerContentComponent from "./DatePickerContentComponent";

const StyledDateSVG = styled.svg`
  height: 85%;
  margin-right: 10px;
  fill: white;
`;

const DateSVG = () => (
  <StyledDateSVG viewBox="0 0 448 512">
    <svg xmlns="http://www.w3.org/2000/svg">
      <path d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h96c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-96zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z" />
    </svg>
  </StyledDateSVG>
);

const StyledDatePickerComponent = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  position: relative;

  .date-picker-opening-button {
    width: 100%;
    height: 30px;
    background-color: #4ab7c3;
    color: white;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 5px 5px 5px 5px;
    display: flex;
    border: 1px solid #4ab9c3c3;
    border-radius: 6px;
    overflow: hidden;
    white-space: nowrap;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  .down-arrow-icon {
    width: 20px;
    height: 20px;
  }
  @media screen and (max-width: 1500px) {
    .date-picker-opening-button {
    }
  }
`;

const StyledLoaderGreyedButton = styled.div`
  width: 100%;
  height: 30px;
  background-color: Grey;
  color: white;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 5px 5px 5px 5px;
  display: flex;
  border: 1px solid Grey;
  border-radius: 6px;
  overflow: hidden;
  white-space: nowrap;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  pointer-events: none;
`;

const DatePickerComponent = ({
  applySearch,
  loaderState,
}: {
  reset?: boolean;
  applySearch: () => void;
  loaderState: Boolean;
}) => {
  const [datePickerIsOpened, setPickerIsOpenedState] = useState(false);

  // Prevent scrolling when datePickerIsOpened
  useEffect(() => {
    // if (datePickerIsOpened) {
    //   document.body.style.position = "fixed";
    //   document.body.style.top = `-${window.scrollY}px`;
    // } else {
    //   document.body.style.position = "";
    //   document.body.style.top = "";
    // }
  }, [datePickerIsOpened]);

  const { dateFitlerToDisplay } = useSearchFiltersContext();

  if (loaderState === true) {
    return (
      <StyledLoaderGreyedButton>
        {" "}
        <DateSVG />
        {dateFitlerToDisplay}
      </StyledLoaderGreyedButton>
    );
  } else
    return (
      <StyledDatePickerComponent>
        <DateFiltersContextProvider>
          <div
            className="date-picker-opening-button"
            onClick={() => setPickerIsOpenedState(!datePickerIsOpened)}
          >
            <DateSVG />
            {dateFitlerToDisplay}
          </div>
          {datePickerIsOpened && (
            <DatePickerContentComponent
              setPickerIsOpenedState={setPickerIsOpenedState}
              datePickerIsOpened={datePickerIsOpened}
              applySearch={applySearch}
            />
          )}
        </DateFiltersContextProvider>
      </StyledDatePickerComponent>
    );
};

export default DatePickerComponent;
