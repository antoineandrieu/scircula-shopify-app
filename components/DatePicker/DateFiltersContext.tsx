import React, { useState } from "react";
import { useSearchFiltersContext } from "../../contexts/SearchFiltersContext";

export type DateFiltersContextType = {
  minDate: Date;
  setMinDate: (minDate: Date) => void;
  resetFilters: () => void;
  compareTo: string;
  setCompareTo: (string) => void;
  dateFitlerToDisplay: string;
  setDateFitlerToDisplay: (string) => void;
  dates: {
    startDate: Date;
    endDate: Date;
    compareStartDate: Date;
    compareEndDate: Date;
  };
  setDates: (dates: {
    startDate: Date;
    endDate: Date;
    compareStartDate: Date;
    compareEndDate: Date;
  }) => void;
};

export enum compareToPeriodPossibilities {
  previousPeriod = "previousPeriod",
  previousYear = "previousYear",
}

// @ts-ignore
export const DateFiltersContext = React.createContext<DateFiltersContextType>();

function useDateFiltersContext() {
  const context = React.useContext(DateFiltersContext);
  if (!context) {
    throw new Error(
      `useDateFiltersContext must be used within a DateFiltersContextProvider`,
    );
  }
  return context;
}

function DateFiltersContextProvider(props) {
  const {
    defaultStartDate,
    defaultEndDate,
    defaultCompareStartDate,
    defaultCompareEndDate,
  } = useSearchFiltersContext();

  // Dates Filter data
  const [dates, setDates] = useState({
    startDate: defaultStartDate,
    endDate: defaultEndDate,
    compareStartDate: defaultCompareStartDate,
    compareEndDate: defaultCompareEndDate,
  });

  const [compareTo, setCompareTo] = useState(
    compareToPeriodPossibilities.previousPeriod,
  );
  const [dateFitlerToDisplay, setDateFitlerToDisplay] = useState("Last Month");

  function resetFilters() {
    setDates({
      startDate: defaultStartDate,
      endDate: defaultEndDate,
      compareStartDate: defaultCompareStartDate,
      compareEndDate: defaultCompareEndDate,
    });
    setDateFitlerToDisplay("Last Month");
  }

  const filtersValue = {
    resetFilters,
    dates,
    setDates,
    compareTo,
    setCompareTo,
    dateFitlerToDisplay,
    setDateFitlerToDisplay,
  };

  return <DateFiltersContext.Provider value={filtersValue} {...props} />;
}

export { DateFiltersContextProvider, useDateFiltersContext };
