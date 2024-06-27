import React from "react";
import styled from "styled-components";

const StyledSVG = styled.svg`
  height: 70%;
  margin-left: auto;
  fill: white;

  @media screen and (max-width: 1250px) {
    margin-left: 4px;
  }
  @media screen and (max-width: 1000px) {
    margin-left: auto;
  }
`;

const GenderSVG = () => (
  <StyledSVG viewBox="0 0 576 512">
    <path d="M564 0h-79c-10.7 0-16 12.9-8.5 20.5l16.9 16.9-48.7 48.7C422.5 72.1 396.2 64 368 64c-33.7 0-64.6 11.6-89.2 30.9 14 16.7 25 36 32.1 57.1 14.5-14.8 34.7-24 57.1-24 44.1 0 80 35.9 80 80s-35.9 80-80 80c-22.3 0-42.6-9.2-57.1-24-7.1 21.1-18 40.4-32.1 57.1 24.5 19.4 55.5 30.9 89.2 30.9 79.5 0 144-64.5 144-144 0-28.2-8.1-54.5-22.1-76.7l48.7-48.7 16.9 16.9c2.4 2.4 5.4 3.5 8.4 3.5 6.2 0 12.1-4.8 12.1-12V12c0-6.6-5.4-12-12-12zM144 64C64.5 64 0 128.5 0 208c0 68.5 47.9 125.9 112 140.4V400H76c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h36v36c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-36h36c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-36v-51.6c64.1-14.6 112-71.9 112-140.4 0-79.5-64.5-144-144-144zm0 224c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z" />
  </StyledSVG>
);

const CategorySVG = () => (
  <StyledSVG viewBox="0 0 640 512">
    <path d="M631.2 96.5L436.5 0C416.4 27.8 371.9 47.2 320 47.2S223.6 27.8 203.5 0L8.8 96.5c-7.9 4-11.1 13.6-7.2 21.5l57.2 114.5c4 7.9 13.6 11.1 21.5 7.2l56.6-27.7c10.6-5.2 23 2.5 23 14.4V480c0 17.7 14.3 32 32 32h256c17.7 0 32-14.3 32-32V226.3c0-11.8 12.4-19.6 23-14.4l56.6 27.7c7.9 4 17.5.8 21.5-7.2L638.3 118c4-7.9.8-17.6-7.1-21.5z" />
  </StyledSVG>
);

const StyledDropDown = styled.div`
  display: grid;
  grid-template-columns: 35% 1fr;
  width: 100%;
  height: 30px;
  font-size: 13px;
  background: #fff;
  background-color: ${props => props.color};
  border: 1px solid ${props => props.color};
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  place-items: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  .img-properties-container {
    height: 100%;
    width: 10%;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* left: 50px; */
  }

  .img-properties {
    height: 20px;
    width: 20px;
  }

  .down-arrow-icon {
    width: 20px;
    height: 20px;
  }

  .select-color {
    background-color: ${props => props.color};
  }

  .select {
    width: 100%;
    padding-left: 5px;

    select {
      color: white;
      background: transparent;
      cursor: pointer;
      border: 0;
      width: 100%;
      border-radius: 0;
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 10;
      font-size: 1.2em;
      font-family: inherit;
    }
  }
`;

function DropDownComponent({
  title,
  options,
  selectedOption,
  color,
  type,
  onChange,
  loaderState,
}: {
  title: string;
  options: Array<string>;
  selectedOption: string;
  color: string;
  type: string;
  onChange: (value: string) => void;
  loaderState: Boolean;
}) {
  return (
    <StyledDropDown color={loaderState ? "grey" : color}>
      {type === "Gender" ? <GenderSVG /> : <CategorySVG />}
      <div className="select">
        <select
          disabled={loaderState === true}
          name="search_categories"
          id="search_categories"
          value={selectedOption}
          onChange={event => {
            const value = event.target.value;

            // Reset the filter
            if (value.includes("...")) {
              return onChange("");
            }

            return onChange(event.target.value);
          }}
        >
          <option className="select-color" key={"resetFilter"} value={""}>
            {title}
          </option>
          {options &&
            options.map(option => (
              <option
                className="select-color"
                key={option || "na"}
                value={option}
              >
                {(option && option.charAt(0).toUpperCase() + option.slice(1)) ||
                  "N/A"}
              </option>
            ))}
        </select>
      </div>
    </StyledDropDown>
  );
}

export default DropDownComponent;
