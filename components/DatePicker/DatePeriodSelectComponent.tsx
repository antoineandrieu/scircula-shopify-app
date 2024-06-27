import React, { useState } from "react";
import styled from "styled-components";
import subDays from "date-fns/subDays";
import subWeeks from "date-fns/subWeeks";
import subMonths from "date-fns/subMonths";
import subYears from "date-fns/subYears";
import subQuarters from "date-fns/subQuarters";

import setQuarter from "date-fns/setQuarter";
import endOfQuarter from "date-fns/endOfQuarter";
import getYear from "date-fns/getYear";

import startOfQuarter from "date-fns/startOfQuarter";
import isAfter from "date-fns/isAfter";

import startOfDay from "date-fns/startOfDay";
import endOfDay from "date-fns/endOfDay";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import startOfYear from "date-fns/startOfYear";
import endOfYear from "date-fns/endOfYear";
import startOfWeek from "date-fns/startOfWeek";
import {
  useSearchFiltersContext,
  compareToPeriodPossibilities,
} from "../../contexts/SearchFiltersContext";
import { useDateFiltersContext } from "./DateFiltersContext";

const StyledDatePeriodSelectComponent = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  align-items: center;

  select {
    height: 30px;
    font-family: "Lexend", sans-serif;
  }
`;

interface DatePeriodSelectComponentProps {
  isCustom?: boolean;
  setIsCustom?: Function;
}

function DatePeriodSelectComponent({
  isCustom,
  setIsCustom,
}: DatePeriodSelectComponentProps) {
  const {
    compareTo,
    setDateFitlerToDisplay,
    dates,
    setDates,
  } = useDateFiltersContext();

  const [startDate, setStartDate] = useState(dates.startDate);
  const [endDate, setEndDate] = useState(dates.endDate);

  React.useEffect(() => {
    let compareStartDateTemp = new Date();
    let compareEndDateTemp = new Date();

    switch (compareTo) {
      case compareToPeriodPossibilities.previousYear:
        compareStartDateTemp = startOfDay(subYears(startDate, 1));
        compareEndDateTemp = endOfDay(subYears(endDate, 1));
        break;
      case compareToPeriodPossibilities.previousPeriod:
        switch (currentSelectKey) {
          case "today":
          case "yesterday":
            compareStartDateTemp = startOfDay(subDays(startDate, 1));
            compareEndDateTemp = endOfDay(subDays(endDate, 1));
            break;
          case "last7days":
            compareStartDateTemp = startOfDay(subDays(startDate, 6));
            compareEndDateTemp = endOfDay(subDays(endDate, 6));
            break;
          case "last30days":
            compareStartDateTemp = startOfDay(subDays(startDate, 30));
            compareEndDateTemp = endOfDay(subDays(endDate, 30));
            break;

          case "last90days":
            compareStartDateTemp = startOfDay(subDays(startDate, 90));
            compareEndDateTemp = endOfDay(subDays(endDate, 90));
            break;

          case "lastMonth":
            compareStartDateTemp = startOfDay(
              startOfMonth(subMonths(startDate, 1)),
            );
            compareEndDateTemp = endOfDay(endOfMonth(subMonths(endDate, 1)));
            break;

          case "lastYear":
            compareStartDateTemp = startOfDay(
              subYears(startOfYear(startDate), 1),
            );
            compareEndDateTemp = endOfDay(subYears(endOfYear(endDate), 1));
            break;

          case "weekToDate":
            compareStartDateTemp = startOfDay(subWeeks(startDate, 1));
            compareEndDateTemp = endOfDay(subWeeks(endDate, 1));
            break;

          case "monthToDate":
            compareStartDateTemp = startOfDay(subMonths(startDate, 1));
            compareEndDateTemp = endOfDay(subMonths(endDate, 1));
            break;

          case "quarterToDate":
            compareStartDateTemp = startOfDay(
              startOfQuarter(subQuarters(startDate, 1)),
            );
            compareEndDateTemp = endOfDay(subQuarters(endDate, 1));
            break;

          case "quarter1":
          case "quarter2":
          case "quarter3":
          case "quarter4":
            compareStartDateTemp = subMonths(startDate, 3);
            compareEndDateTemp = subMonths(endDate, 3);
            break;

          case "yearToDate":
            compareStartDateTemp = startOfDay(subYears(startDate, 1));
            compareEndDateTemp = endOfDay(subYears(endDate, 1));
            break;

          default:
            compareStartDateTemp = startOfDay(
              startOfMonth(subMonths(startDate, 1)),
            );
            compareEndDateTemp = endOfDay(endOfMonth(subMonths(endDate, 1)));
            break;
        }

      default:
        break;
    }

    setDates({
      startDate,
      endDate,
      compareStartDate: compareStartDateTemp,
      compareEndDate: compareEndDateTemp,
    });
  }, [startDate, endDate, compareTo]);
  const today = new Date();
  const selectData = new Map([
    [
      "custom",
      {
        key: "custom",
        displayedTitle: "Custom",
        startDate: null,
        endDate: null,
      },
    ],

    [
      "today",
      {
        key: "today",
        displayedTitle: "Today",
        startDate: startOfDay(today),
        endDate: today,
      },
    ],
    [
      "yesterday",
      {
        key: "yesterday",
        displayedTitle: "Yesterday",
        startDate: startOfDay(subDays(today, 1)),
        endDate: endOfDay(subDays(today, 1)),
      },
    ],
    [
      "last7days",
      {
        key: "last7days",
        displayedTitle: "Last 7 days",
        startDate: startOfDay(subDays(today, 7)),
        endDate: today,
      },
    ],
    [
      "last30days",
      {
        key: "last30days",
        displayedTitle: "Last 30 days",
        startDate: startOfDay(subDays(today, 30)),
        endDate: today,
      },
    ],
    [
      "last90days",
      {
        key: "last90days",
        displayedTitle: "Last 90 days",
        startDate: startOfDay(subDays(today, 90)),
        endDate: today,
      },
    ],
    [
      "lastMonth",
      {
        key: "lastMonth",
        displayedTitle: "Last month",
        startDate: startOfDay(startOfMonth(subMonths(today, 1))),
        endDate: endOfDay(endOfMonth(subMonths(today, 1))),
      },
    ],
    [
      "lastYear",
      {
        key: "lastYear",
        displayedTitle: "Last year",
        startDate: startOfDay(subYears(startOfYear(today), 1)),
        endDate: endOfDay(subYears(endOfYear(today), 1)),
      },
    ],
    [
      "weekToDate",
      {
        key: "weekToDate",
        displayedTitle: "Week to date",
        startDate: startOfDay(startOfWeek(today, { weekStartsOn: 1 })),
        endDate: today,
      },
    ],
    [
      "monthToDate",
      {
        key: "monthToDate",
        displayedTitle: "Month to date",
        startDate: startOfDay(startOfMonth(today)),
        endDate: today,
      },
    ],
    [
      "quarterToDate",
      {
        key: "quarterToDate",
        displayedTitle: "Quarter to date",
        startDate: startOfDay(startOfQuarter(today)),
        endDate: today,
      },
    ],
    [
      "yearToDate",
      {
        key: "yearToDate",
        displayedTitle: "Year to date",
        startDate: startOfDay(startOfYear(today)),
        endDate: today,
      },
    ],
    [
      "quarter1",
      {
        key: "quarter1",
        displayedTitle:
          "1st Quarter (" +
          getYear(checkQuarter(today, startOfQuarter(setQuarter(today, 1)))) +
          ")",
        startDate: startOfDay(
          checkQuarter(today, startOfQuarter(setQuarter(today, 1))),
        ),
        endDate: endOfDay(
          checkQuarter(today, endOfQuarter(setQuarter(today, 1))),
        ),
      },
    ],
    [
      "quarter2",
      {
        key: "quarter2",
        displayedTitle:
          "2nd Quarter (" +
          getYear(checkQuarter(today, startOfQuarter(setQuarter(today, 2)))) +
          ")",
        startDate: startOfDay(
          checkQuarter(today, startOfQuarter(setQuarter(today, 2))),
        ),
        endDate: endOfDay(
          checkQuarter(today, endOfQuarter(setQuarter(today, 2))),
        ),
      },
    ],
    [
      "quarter3",
      {
        key: "quarter3",
        displayedTitle:
          "3rd Quarter (" +
          getYear(checkQuarter(today, startOfQuarter(setQuarter(today, 3)))) +
          ")",
        startDate: startOfDay(
          checkQuarter(today, startOfQuarter(setQuarter(today, 3))),
        ),
        endDate: endOfDay(
          checkQuarter(today, endOfQuarter(setQuarter(today, 3))),
        ),
      },
    ],
    [
      "quarter4",
      {
        key: "quarter4",
        displayedTitle:
          "4rth Quarter (" +
          getYear(checkQuarter(today, startOfQuarter(setQuarter(today, 4)))) +
          ")",
        startDate: startOfDay(
          checkQuarter(today, startOfQuarter(setQuarter(today, 4))),
        ),
        endDate: endOfDay(
          checkQuarter(today, endOfQuarter(setQuarter(today, 4))),
        ),
      },
    ],
  ]);

  const [currentSelectKey, setCurrentSelectKey] = useState("custom");
  const [refreshCustom, setRefreshCustom] = useState(false);

  if (isCustom === true && refreshCustom === false) {
    setCurrentSelectKey("custom");
    setRefreshCustom(true);
  }

  return (
    <StyledDatePeriodSelectComponent>
      <select
        onChange={event => {
          setIsCustom(false);
          setRefreshCustom(false);
          const key = event.target.value;
          const { startDate, endDate, displayedTitle } = selectData.get(key);
          setCurrentSelectKey(key);
          setStartDate(startDate);
          setEndDate(endDate);
          // if (key !== "Custom") {
          //   setDateFitlerToDisplay(displayedTitle);
          // } else {
          //   setDateFitlerToDisplay(
          //     `${new Date(compareStartDate).toLocaleDateString()} - ${new Date(
          //       compareEndDate,
          //     ).toLocaleDateString()}`,
          //   );
          // }
          setDateFitlerToDisplay(displayedTitle);
        }}
        value={currentSelectKey}
      >
        {Array.from(selectData).map(([key, { displayedTitle }]) => {
          return (
            <option key={key} value={key}>
              {displayedTitle}
            </option>
          );
        })}
      </select>
    </StyledDatePeriodSelectComponent>
  );
}

function checkQuarter(today: Date, quarterDate: Date) {
  var returnDate;

  isAfter(today, quarterDate) === true &&
  isAfter(today, endOfQuarter(quarterDate)) === true
    ? (returnDate = quarterDate)
    : (returnDate = subYears(quarterDate, 1));
  return returnDate;
}

export default DatePeriodSelectComponent;
