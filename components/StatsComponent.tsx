import React from "react";
import styled from "styled-components";
import Loader from "./Loader";
import SmallLoader from "./SmallLoader";

const StyledMainContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex;
  flex-direction: column;
  min-height: 100px;

  .main-container-wrapper {
    width: 100%;
    height: 100%;
    border-width: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 6px;
    min-height: 60px;
    border-radius: 6px;
    @media screen and (max-width: 600px) {
      flex-direction: column;
    }
  }

  .main-list-item-wrapper {
    height: 90%;
    width: 100%;
    display: grid;
    margin: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    box-shadow: rgba(150, 150, 171, 0.1) 4px 7px 20px 0px;
    border-radius: 6px;
    grid-template-rows: minmax(auto, 30%) minmax(auto, 20%) minmax(auto, 20%) minmax(
        auto,
        20%
      );
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    .sub-title-div {
      grid-row: 1;
      height: 100%;
      width: 100%;
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 6px;
    }

    .evolution-div {
      grid-row: 2;
      height: 90%;
      width: 90%;
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      border-radius: 6px;
    }

    .percentage-div {
      grid-row: 3;
      height: 80%;
      width: 80%;
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      border-radius: 6px;
      overflow: hidden;
      margin-left: 20px;
    }

    .total-div {
      grid-row: 4;
      height: 90%;
      width: 90%;
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      border-radius: 6px;
      overflow: hidden;
      margin-top: 3px;
    }
  }

  .component-title {
    display: flex;
    padding-bottom: 4px;
    align-items: center;
    justify-content: space-between;
    margin-right: 40px;
  }

  .big-data {
    font-size: 1.4em;
  }

  .small-data {
    font-size: 1.2em;
    color: #6a7984;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    overflow: hidden;
  }

  .small-data-neutral {
    color: black;
  }

  .small-data-negative {
    color: red;
  }

  .small-data-positive {
    color: green;
  }
`;

interface StatsProps {
  title: string;
  currency: string;
  loading?: boolean;
  content: Array<{
    title: string;
    bigData?: string | number;
    smallData?: string | number;
    smallData2?: string | number;
  }>;
}

const StatsComponent = ({ title, content, currency, loading }: StatsProps) => {
  const calculateCurrency = (value: number): string => {
    switch (currency) {
      case "EUR":
        return value.toLocaleString("fr-FR", {
          style: "currency",
          currency: "EUR",
        });
      case "USD":
        return value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      case "AUD":
        return value.toLocaleString("en-AU", {
          style: "currency",
          currency: "AUD",
        });
      case "CAD":
        return value.toLocaleString("en-CA", {
          style: "currency",
          currency: "CAD",
        });
      case "DKK":
        return value.toLocaleString("da-DK", {
          style: "currency",
          currency: "DKK",
        });
      case "HKD":
        return value.toLocaleString("zh-HK", {
          style: "currency",
          currency: "HKD",
        });
      case "JPY":
        return value.toLocaleString("ja-JP", {
          style: "currency",
          currency: "JPY",
        });
      case "NZD":
        return value.toLocaleString("en-NZ", {
          style: "currency",
          currency: "NZD",
        });
      case "SGD":
        return value.toLocaleString("zh-CN", {
          style: "currency",
          currency: "SGD",
        });
      case "SEK":
        return value.toLocaleString("sv-SE", {
          style: "currency",
          currency: "SEK",
        });
      case "GPB":
        return value.toLocaleString("en-GB", {
          style: "currency",
          currency: "GPB",
        });
    }
  };

  const checkPositive = (value?: string | number) => {
    if (typeof value === "string") return value[0] == "-" ? false : true;
  };

  const checkPercentage = (data: string | number) => {
    if (data.toString() != "=") return "+" + data.toString();
    else return data;
  };

  return (
    <StyledMainContainer>
      <h1 className="component-title">{title}</h1>

      <div className="main-container-wrapper">
        {content &&
          content.map(({ title, bigData, smallData, smallData2 }) => (
            <div
              key={title + bigData + smallData}
              className="main-list-item-wrapper"
            >
              <h2>{title && title}</h2>
              {loading ? (
                <SmallLoader />
              ) : (
                <>
                  <div className="percentage-div">
                    <p className="big-data">
                      {bigData && bigData.toLocaleString()}
                    </p>
                  </div>
                  <div className="evolution-div">
                    {typeof smallData === "number" ||
                    (typeof smallData === "string" && smallData != "-") ? (
                      checkPositive(smallData) ? (
                        <div className="small-data small-data-positive">
                          {checkPercentage(smallData)}
                        </div>
                      ) : (
                        <div className="small-data small-data-negative">
                          {smallData && smallData}
                        </div>
                      )
                    ) : (
                      <div className="small-data">{smallData}</div>
                    )}
                  </div>
                  <div className="total-div">
                    {typeof smallData2 === "number" &&
                    title === "Find My Fit Sales" ? (
                      <div className="small-data">
                        {calculateCurrency(smallData2)}
                      </div>
                    ) : (
                      <div className="small-data">
                        {smallData2 && smallData2.toLocaleString()}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </StyledMainContainer>
  );
};

export default StatsComponent;
