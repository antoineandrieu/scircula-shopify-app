import { startOfDay, subDays } from "date-fns";
import React, { useState } from "react";
import { SelectedProductType } from "../Types";
import subMonths from "date-fns/subMonths";
import startOfMonth from "date-fns/startOfMonth";
import endOfDay from "date-fns/endOfDay";
import endOfMonth from "date-fns/endOfMonth";

export type SearchFiltersContextType = {
  defaultStartDate: number;
  defaultEndDate: number;
  defaultCompareStartDate: number;
  defaultCompareEndDate: number;
  gendersData: Array<string>;
  setGendersData: (genders: Array<string>) => void;
  categoriesData: Array<string>;
  setCategoriesData: (categories: Array<string>) => void;
  searchProductsData: Array<{ externalId: string; name: string }>;
  setSearchProductsData: (
    products: Array<{ externalId: string; name: string }>,
  ) => void;
  gender: string;
  setGender: (string) => void;
  category: string;
  setCategory: (string) => void;
  selectedProduct: SelectedProductType;
  setSelectedProduct: (SelectedProductType) => void;
  searchedProductName: string;
  setSearchedProductName: (string) => void;
  minDate: Date;
  setMinDate: (minDate: Date) => void;
  resetFilters: () => void;
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
export const SearchFiltersContext = React.createContext<SearchFiltersContextType>();

function useSearchFiltersContext() {
  const context = React.useContext(SearchFiltersContext);
  if (!context) {
    throw new Error(
      `useSearchFiltersContext must be used within a SearchFiltersContextProvider`,
    );
  }
  return context;
}

function SearchFiltersContextProvider(props) {
  const [gendersData, setGendersData] = useState(null);
  const [categoriesData, setCategoriesData] = useState(null);
  const [minDate, setMinDate] = useState(null);
  const [searchProductsData, setSearchProductsData] = useState(null);

  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [searchedProductName, setSearchedProductName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Dates Filter data
  const defaultStartDate = startOfDay(startOfMonth(subMonths(new Date(), 1)));
  const defaultEndDate = endOfMonth(subMonths(new Date(), 1));
  const defaultCompareStartDate = subMonths(defaultStartDate, 1);
  const defaultCompareEndDate = subMonths(defaultEndDate, 1);

  const [dateFitlerToDisplay, setDateFitlerToDisplay] = useState("Last month");

  const [dates, setDates] = useState({
    startDate: defaultStartDate,
    endDate: defaultEndDate,
    compareStartDate: defaultCompareStartDate,
    compareEndDate: defaultCompareEndDate,
  });

  function resetFilters() {
    setGender("");
    setCategory("");
    setSearchedProductName("");
    setSelectedProduct(null);
    setDateFitlerToDisplay("Last month");

    setDates({
      startDate: defaultStartDate,
      endDate: defaultEndDate,
      compareStartDate: defaultCompareStartDate,
      compareEndDate: defaultCompareEndDate,
    });
  }

  const filtersValue = {
    defaultStartDate,
    defaultEndDate,
    defaultCompareStartDate,
    defaultCompareEndDate,
    gendersData,
    setGendersData,
    categoriesData,
    setCategoriesData,
    searchProductsData,
    setSearchProductsData,
    gender,
    setGender,
    category,
    setCategory,
    searchedProductName,
    setSearchedProductName,
    selectedProduct,
    setSelectedProduct,
    resetFilters,
    minDate,
    setMinDate,
    dateFitlerToDisplay,
    setDateFitlerToDisplay,
    dates,
    setDates,
  };

  return <SearchFiltersContext.Provider value={filtersValue} {...props} />;
}

export { SearchFiltersContextProvider, useSearchFiltersContext };
