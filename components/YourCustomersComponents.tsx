import React, { useState } from "react";
import styled from "styled-components";

import UnitCalculatorComponent from "./UnitCalculatorComponent";
import { upperCase } from "../lib/textUtils";
import SmallLoader from "./SmallLoader";

const StyledYourCustomersComponents = styled.div`
  width: 100%;
  height: 100%;

  .mainRectangle {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 7px;
  }

  .titleUnitsRectangle {
    display: flex;
    width: 95%;
    height: 100%;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .sizesRectangle {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: space-evenly;
    padding-bottom: 10px;
    flex-direction: row;
  }

  .component-title {
    display: flex;
  }

  @media screen and (max-width: 660px) and (min-width: 500px) {
    .component-title {
      padding-bottom: 15px;
    }
  }

  @media screen and (max-width: 500px) {
    .titleUnitsRectangle {
      padding-bottom: 20px;
      margin-top: -10px;
      flex-direction: column;
      width: 90%;
    }

    .sizesRectangle {
      flex-direction: column;
    }
  }
`;

const StyledCategorySquare = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;

  div {
    margin: 0;
    color: #6a7984;
    font-size: 1em;
  }

  div:nth-child(2) {
    margin: 0;
    color: #1f2833;
    font-size: 1em;
    line-height: 14px;
    font-weight: bold;
  }

  @media screen and (max-width: 500px) {
    flex-direction: row;
    justify-content: space-around;
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 5px;
    margin-bottom: 5px;
    height: 40px;

    div {
      display: flex;
      justify-content: flex-start;
      width: 25%;
      padding-bottom: 5px;
      padding-top: 5px;
    }

    div:nth-child(2) {
      display: flex;
      justify-content: flex-start;
      width: 25%;
    }
  }
`;

interface CustomerProps {
  title: string;
  data: {
    bust: number;
    waist: number;
    hips: number;
    thigh: number;
    inseam: number;
  };
  loading: boolean;
}

const YourCustomersComponent = ({ data, title, loading }: CustomerProps) => {
  const [type, settype] = useState("cm");
  const noDatasCase: Array<{ title: string; value: number }> = [
    { title: "Bust", value: 0 },
    { title: "Waist", value: 0 },
    { title: "Hips", value: 0 },
    { title: "Thigh", value: 0 },
    { title: "Inseam", value: 0 },
  ];
  //To add units, add the unit calculation here
  function calculateUnit(value: number): number {
    switch (type) {
      case "cm":
        return value;
      case "in":
        return value / 2.54;
    }
  }

  if (loading) {
    return (
      <StyledYourCustomersComponents>
        <h1 className="component-title">{title}</h1>
        <SmallLoader />
      </StyledYourCustomersComponents>
    );
  }

  return (
    <StyledYourCustomersComponents>
      <div className="mainRectangle">
        <div className="titleUnitsRectangle">
          <h1 className="component-title">{title}</h1>
          <UnitCalculatorComponent settype={settype} type={type} />
        </div>
        <div className="sizesRectangle">
          {data &&
            Object.keys(data).map(key => (
              <CategorySquare
                key={key}
                title={key}
                value={calculateUnit(data[key])}
              />
            ))}
          {!data &&
            noDatasCase.map(element => (
              <CategorySquare
                title={element.title}
                value={element.value}
                key={element.title}
              />
            ))}
        </div>
      </div>
    </StyledYourCustomersComponents>
  );
};

interface CategorySquareProps {
  title: string;
  value: number;
}

const CategorySquare = (props: CategorySquareProps) => {
  const { title, value } = props;

  return (
    <StyledCategorySquare>
      <h2>{upperCase(title)}</h2>
      <div>{(value && value.toFixed(2)) || "-"}</div>
    </StyledCategorySquare>
  );
};

export default YourCustomersComponent;
