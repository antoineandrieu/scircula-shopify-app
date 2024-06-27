import React from "react";
import styled from "styled-components";

import { useSearchFiltersContext } from "../contexts/SearchFiltersContext";
import DatePickerComponent from "./DatePicker/DatePickerComponent";
import DropDownComponent from "./DropDownComponent";
import SearchBarComponent from "./SearchBarComponent";
import SettingsComponent from "./Settings/SettingsComponent";

const StyledResetSVG = styled.svg`
  height: 100%;
  margin-right: 10px;
  fill: white;
`;

const ResetSVG = () => (
  <StyledResetSVG viewBox="0 0 352 512">
    <path
      fillRule="evenodd"
      d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
    />
  </StyledResetSVG>
);

export const StyledButton = styled.div<{ color?: String }>`
  width: 100%;
  height: 30px;
  background-color: ${props => (props.color ? props.color : "#4ab7c3")};
  color: white;
  justify-content: center;
  text-align: center;
  align-items: center;
  cursor: pointer;
  padding: 5px 5px 5px 5px;
  background-color: ${props => (props.color ? props.color : "#4ab7c3")};
  border-radius: 6px;
`;

const StyledSearchFiltersComponents = styled.div`
  width: 100%;
  height: 100%;
  grid-row: 1;
  grid-column-start: 1;
  grid-column-end: 3;
  color: white;
  margin-top: 5px;
`;

const StyledSearchFiltersComponent = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 12% 25% 35% 10% 15%;
  justify-content: center;
  align-items: flex-start;
  margin-top: 5px;
  grid-column-gap: 10px;
  /* position: relative; */

  .date-picker-div {
    grid-column: 1;
    width: 100%;
    grid-row: 1;
  }

  .filters-container {
    grid-column: 2;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    grid-row: 1;
  }

  .searchbar-container {
    grid-column: 3;
    grid-row: 1;
    width: 100%;
  }

  .reset-button-container {
    grid-column: 4;
    width: 100%;
    grid-gap: 10px;
    grid-row: 1;
  }

  .reset-button {
    width: 100%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 5px 5px 5px 5px;
    display: flex;
    background-color: #eaaa00;
    border: 1px solid #eaaa00;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 8px;
    border: 1px solid #eaac005c;
  }
  .greyed-reset-button {
    width: 100%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 5px 5px 5px 5px;
    display: flex;
    background-color: Grey;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 8px;
    border: 1px solid Grey;
    pointer-events: none;
  }

  .app-settings-container {
    grid-column: 5;
    width: 100%;
    grid-gap: 10px;
    grid-row: 1;
  }

  @media screen and (max-width: 1250px) {
    grid-template-columns: 24% 20% 20% 10% 18%;
    grid-template-rows: minmax(auto, 45%) minmax(auto, 45%);

    .date-picker-div {
      grid-row: 2;
      grid-column: 1;
      display: flex;
      justify-content: center;
    }

    .filters-container {
      grid-row: 2;
      grid-column-start: 2;
      grid-column-end: 4;
      display: flex;
      justify-content: center;
    }

    .searchbar-container {
      grid-row: 1;
      grid-column-start: 1;
      grid-column-end: 6;
    }

    .reset-button-container {
      grid-row: 2;
      grid-column: 4;
      display: flex;
      justify-content: center;
    }

    .app-settings-container {
      grid-column: 5;
      width: 100%;
      grid-gap: 10px;
      grid-row: 2;
    }
  }

  @media screen and (max-width: 1000px) {
    grid-template-columns: 49% 49%;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    grid-row-gap: 10px;

    .date-picker-div {
      grid-row: 3;
      grid-column: 1;
      display: flex;
      justify-content: center;
    }

    .filters-container {
      grid-row: 2;
      grid-column-start: 1;
      grid-column-end: 3;
      display: flex;
      justify-content: center;
    }

    .searchbar-container {
      grid-row: 1;
      grid-column-start: 1;
      grid-column-end: 3;
    }

    .reset-button-container {
      grid-row: 3;
      grid-column: 2;
      display: flex;
      justify-content: center;
    }

    .app-settings-container {
      grid-column: 1;
      grid-row: 4;
      width: 100%;
      grid-gap: 10px;
    }
  }
`;

function SearchFiltersComponents({
  className,
  applySearch,
  loaderState,
  onSettingsButttonMenuClick,
}: {
  className?: string;
  applySearch: () => void;
  loaderState: Boolean;
  onSettingsButttonMenuClick: () => void;
}) {
  const {
    gendersData,
    categoriesData,
    searchProductsData,
    gender,
    setGender,
    category,
    setCategory,
    selectedProduct,
    setSelectedProduct,
    searchedProductName,
    setSearchedProductName,
    resetFilters,
  } = useSearchFiltersContext();

  return (
    <StyledSearchFiltersComponents>
      <StyledSearchFiltersComponent className={className}>
        <div className="date-picker-div">
          <DatePickerComponent
            applySearch={applySearch}
            loaderState={loaderState}
          />
        </div>
        <div className="filters-container">
          <DropDownComponent
            title={"Gender"}
            options={gendersData}
            selectedOption={gender}
            onChange={gender => {
              setGender(gender);
            }}
            color="#4ab7c3"
            type="Gender"
            loaderState={loaderState}
          />
          <DropDownComponent
            title={"Category"}
            options={categoriesData}
            selectedOption={category}
            onChange={type => {
              setCategory(type);
            }}
            color="#4ab7c3"
            type="Category"
            loaderState={loaderState}
          />
        </div>
        <div className="searchbar-container">
          <SearchBarComponent
            data={searchProductsData}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            searchedProduct={searchedProductName}
            setSearchedProduct={setSearchedProductName}
            loaderState={loaderState}
          />
        </div>
        <div className="reset-button-container">
          {loaderState === true ? (
            <StyledButton className="greyed-reset-button">
              <ResetSVG />
              Reset
            </StyledButton>
          ) : (
            <StyledButton
              className="reset-button"
              onClick={() => {
                resetFilters();
              }}
            >
              <ResetSVG />
              Reset
            </StyledButton>
          )}
        </div>
        <div className="app-settings-container">
          <SettingsComponent
            isLoading={loaderState}
            onSettingsButttonMenuClick={onSettingsButttonMenuClick}
          />
        </div>
      </StyledSearchFiltersComponent>
    </StyledSearchFiltersComponents>
  );
}

export default SearchFiltersComponents;
