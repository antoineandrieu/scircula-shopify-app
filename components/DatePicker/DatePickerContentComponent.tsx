import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import DatePeriodSelectComponent from "./DatePeriodSelectComponent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import StyledContainer from "../StyledContainer";
import {
  useSearchFiltersContext,
  compareToPeriodPossibilities,
} from "../../contexts/SearchFiltersContext";
import { useDateFiltersContext } from "./DateFiltersContext";
import subMonths from "date-fns/subMonths";
import startOfDay from "date-fns/startOfDay";
import endOfDay from "date-fns/endOfDay";

const StyledDatePickerContentComponent = styled(StyledContainer)`
  height: 500px;
  width: 600px;
  z-index: 10000;
  display: grid;
  position: absolute;
  top: 35px;
  padding: 0;
  grid-template-rows: 1fr 60px;

  .content {
    padding: 10px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;

    .input-title {
      margin-top: 10px;
      margin-bottom: 5px;
      font-style: normal;
      font-weight: normal;
      color: #6a7984;
      display: flex;
    }
    .dates-inputs-container {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 10px;
      margin-top: 20px;

      input {
        width: 100%;
        height: 30px;
        font-family: "Lexend", sans-serif;
      }
    }

    .dates-calendars-container {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 10px;
      place-items: center;

      // START hack to enlarge date picker calendar
      > div {
        width: 100%;
      }
      .react-datepicker__month-container {
        float: unset;
      }

      .react-datepicker__day-names,
      .react-datepicker__week {
        display: flex;
        justify-content: space-around;
      }

      .react-datepicker {
        width: 100%;
      }

      // END hack to enlarge date picker calendar

      // hack to change some default style
      .react-datepicker__header {
        background-color: white;
      }

      .react-datepicker__header {
        border-bottom: none;
      }

      .react-datepicker {
        border: none;
      }

      .react-datepicker__current-month {
        font-weight: normal;
        font-family: "Lexend", sans-serif;
      }
      .react-datepicker__day-names {
        font-family: "Lexend", sans-serif;
      }

      // hack to change the style of todays date on the calendar
      .react-datepicker__day--keyboard-selected,
      .react-datepicker__month-text--keyboard-selected,
      .react-datepicker__quarter-text--keyboard-selected,
      .react-datepicker__year-text--keyboard-selected {
        border-radius: 0.3rem;
        background-color: white;
        color: black;
      }
      .react-datepicker__day--selected {
        background-color: #a7e7ed;
      }
      .react-datepicker__day {
        font-family: "Lexend", sans-serif;
      }
    }

    .main-compare-div {
      margin-top: 10px;
      padding-top: 10px;

      .compare-option-div {
        display: grid;
        grid-template-columns: 0.5fr 9fr;
        place-items: left;
      }
      .compare-text {
        margin-right: auto;
        color: #6a7984;
      }
      .compare-text-bottom-spacing {
        margin-right: auto;
        color: #6a7984;
        margin-bottom: 10px;
        font-size: 15px;
      }
      .compare-text-container {
        margin-top: 10px;
        padding-top: 10px;
        color: #6a7984;
      }
      .compare-text-container-grey {
        margin-top: 10px;
        padding-top: 10px;
        color: #6a7984;
        opacity: 0.4;
        pointer-events: none;
      }
      select {
        width: 100%;
        height: 30px;
      }
    }
  }

  .footer {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    margin: auto 0;
    height: 100%;
    width: 100%;
    button {
      border: 1px solid lightgrey;
      border-radius: 6px;
      padding: 10px;
    }

    .cancel-button {
      background-color: white;
      cursor: pointer;
      font-family: "Lexend", sans-serif;
      border-color: white;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      height: 80%;
      display: flex;
      place-items: center;
    }
    .apply-button {
      background-color: #4ab7c3;
      cursor: pointer;
      color: white;
      font-family: "Lexend", sans-serif;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      border-color: #4ab7c3;
      height: 80%;
      display: flex;
      place-items: center;
    }
  }
  .light-grey-titles {
    font-style: normal;
    font-weight: normal;
    color: #6a7984;
    display: flex;
  }
  @media screen and (max-width: 600px) {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;

    .content {
      .dates-inputs-container {
        grid-template-columns: unset;
        grid-template-rows: 1fr 1fr;
      }
      .dates-calendars-container {
        grid-template-columns: unset;
        grid-template-rows: 1fr 1fr;
      }
    }
  }
`;

function DatePickerContentComponent({
  datePickerIsOpened,
  setPickerIsOpenedState,
  applySearch,
}: {
  setPickerIsOpenedState: Function;
  datePickerIsOpened: boolean;
  applySearch: () => void;
}) {
  // Local Data
  const {
    setCompareTo,
    resetFilters,
    dateFitlerToDisplay,
    setDateFitlerToDisplay,
    dates,
    setDates,
  } = useDateFiltersContext();

  const { startDate, endDate, compareStartDate, compareEndDate } = dates;

  // Global Data
  const {
    setDateFitlerToDisplay: setDateFitlerToDisplayGlobal,
    setDates: setDatesGlobal,
  } = useSearchFiltersContext();

  const [isCustom, setIsCustom] = useState(false);

  // useEffect(() => {
  //   if (!startDateGlobal && !endDateGlobal) resetFilters();
  // }, [startDateGlobal, endDateGlobal]);

  const handleChangedCalendarStartDateEvent = date => {
    setDates({
      ...dates,
      startDate: date,
      compareStartDate: startOfDay(subMonths(date, 1)),
    });

    setDateFitlerToDisplay("Custom");

    setIsCustom(true);
  };
  const handleChangedCalendarEndingDateEvent = date => {
    setDates({
      ...dates,
      endDate: date,
      compareEndDate: endOfDay(subMonths(date, 1)),
    });

    setDateFitlerToDisplay("Custom");

    setIsCustom(true);
  };

  return (
    <StyledDatePickerContentComponent>
      <div className="content">
        <div className="date-main-container">
          <div className="light-grey-titles">Date range</div>
          <DatePeriodSelectComponent
            isCustom={isCustom}
            setIsCustom={setIsCustom}
          />
        </div>
        <div className="dates-inputs-container">
          <div className="starting-date-container">
            <div className="input-title">Starting</div>
            <input
              placeholder="Select a starting date below"
              disabled
              value={startDate ? formatDate(new Date(startDate)) : ""}
            />
          </div>
          <div className="ending-date-container">
            <div className="input-title">Ending</div>
            <input
              placeholder="Select a ending date below"
              disabled
              value={endDate ? formatDate(new Date(endDate)) : ""}
            />
          </div>
        </div>
        <div className="dates-calendars-container">
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={startDate}
            onChange={date => handleChangedCalendarStartDateEvent(date)}
            maxDate={endDate}
            inline
            calendarStartDay={1}
          />
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={endDate}
            onChange={date => handleChangedCalendarEndingDateEvent(date)}
            // minDate={startDate}
            maxDate={new Date()}
            inline
            calendarStartDay={1}
          />
        </div>
      </div>
      <div className="footer">
        <button
          className="cancel-button"
          onClick={() => {
            resetFilters();
            setPickerIsOpenedState(!datePickerIsOpened);
          }}
        >
          Cancel
        </button>
        <button
          className="apply-button"
          onClick={() => {
            setPickerIsOpenedState(!datePickerIsOpened);
            setDateFitlerToDisplayGlobal(dateFitlerToDisplay);

            setDatesGlobal({
              startDate,
              endDate,
              compareStartDate,
              compareEndDate,
            });

            applySearch();
          }}
        >
          Apply
        </button>
      </div>
    </StyledDatePickerContentComponent>
  );

  function formatDate(date: Date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  function formatDateForDateButton(date: Date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = (d.getFullYear() + "").substr(2, 4);

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
}

export default DatePickerContentComponent;
