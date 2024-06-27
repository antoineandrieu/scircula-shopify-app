import React, { useState } from "react";
import styled from "styled-components";

import { upperCase } from "../lib/textUtils";
import { Product } from "../Types";
import SmallLoader from "./SmallLoader";
import UnitCalculatorComponent from "./UnitCalculatorComponent";
import noData from "../public/nodata.png";

const StyledNoDataSVG = styled.svg`
  display: block;
  margin: auto;
  text-align: center;
`;

const NoDataSVG = () => (
  <StyledNoDataSVG viewBox="0 0 512 512">
    <svg
      id="Capa_1"
      enable-background="new 0 0 512 512"
      height="512"
      width="512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="m13.162 498.845c17.532 17.53 46.084 17.549 63.633 0l116.254-116.25c-25.243-16.734-46.91-38.401-63.644-63.644l-116.243 116.261c-17.549 17.549-17.549 46.084 0 63.633z" />
        <path d="m317 90c-57.891 0-105 47.109-105 105s47.109 105 105 105 105-47.109 105-105-47.109-105-105-105zm40.605 124.395c5.859 5.859 5.859 15.352 0 21.211s-15.352 5.859-21.211 0l-19.394-19.395-19.395 19.395c-5.859 5.859-15.352 5.859-21.211 0s-5.859-15.352 0-21.211l19.395-19.395-19.395-19.395c-5.859-5.859-5.859-15.352 0-21.211s15.352-5.859 21.211 0l19.395 19.395 19.395-19.395c5.859-5.859 15.352-5.859 21.211 0s5.859 15.352 0 21.211l-19.395 19.395z" />
        <path d="m317 0c-107.52 0-195 87.48-195 195s87.48 195 195 195 195-87.48 195-195-87.48-195-195-195zm0 330c-74.443 0-135-60.557-135-135s60.557-135 135-135 135 60.557 135 135-60.557 135-135 135z" />
      </g>
    </svg>
  </StyledNoDataSVG>
);

const StyledLastRecommendationsComponent = styled.div`
  width: 100%;
  height: 96%;
  display: grid;
  align-items: center;
  grid-template-rows: 10% 90%;

  h1 {
    margin: unset;
  }

  table {
    border-collapse: collapse;
    thead {
      height: 35px;
    }

    tbody {
      border-collapse: separate;
      border-spacing: 4px;

      tr {
        height: 35px;
      }
    }
  }

  .title-div {
    height: 100%;
    width: 95%;
    grid-row: 1;
    display: flex;
    flex-direction: row;
    z-index: 1;
    justify-content: space-between;
    align-items: flex-start;
  }

  .main-div {
    height: 100%;
    width: 100%;
    padding-right: 10px;
    grid-row: 2;
    overflow-x: auto;
    overflow-y: auto;
  }

  thead {
    color: #6a7984;
  }

  .left-titles {
    width: 20%;
    text-align: left;
    position: sticky;
    top: 0;
    background-color: white;
    border-collapse: separate;
  }

  .right-titles {
    text-align: right;
    width: 10%;
    position: sticky;
    top: 0;
    background-color: white;
    border-collapse: separate;
  }

  .left-datas {
    text-align: left;
  }

  .right-datas {
    text-align: right;
    max-height: 5px;
  }

  table {
    width: 100%;
    height: 100%;
    grid-row: 2;

    tbody tr:nth-of-type(even) {
      background: white;
    }

    tbody tr:nth-of-type(odd) {
      background: white;
    }
  }
  @media screen and (max-width: 1450px) {
    min-height: 700px;
  }
  @media screen and (max-width: 450px) {
    grid-template-rows: 20% 80%;
    .title-div {
      width: 95%;
      height: 95%;
      flex-direction: column;
      align-items: flex-start;
      padding-bottom: 10px;
    }
  }
`;

const ImageDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #6a7984;

  .img-properties {
    width: 150px;
    height: 150px;
  }

  .img-text {
    margin-top: 30px;
  }

  @media screen and (max-width: 1300px) {
    .img-properties {
      height: 100px;
      width: 100px;
    }
  }
`;

const StyledTitleDiv = styled.div`
  color: #6a7984;
  font-size: 1.5em;
  font-weight: 100;
`;

const LastRecommendationsComponent = ({
  lastRecommendations,
  currentSize,
  title,
  loading,
}: {
  lastRecommendations: Array<Product>;
  currentSize: string;
  title: string;
  loading: boolean;
}) => {
  if (loading) {
    return (
      <>
        <StyledTitleDiv>{title}</StyledTitleDiv>
        <SmallLoader />
      </>
    );
  }

  if (!lastRecommendations || !lastRecommendations.length) {
    return (
      <>
        <StyledTitleDiv>{title}</StyledTitleDiv>
        <ImageDiv>
          <img className="img-properties" src={noData.src} alt="no data img" />
          <p className="img-text"> There are no data by this time </p>
        </ImageDiv>
      </>
    );
  }
  const [type, settype] = useState("cm");

  const calculateUnit = (value: number): number | string => {
    switch (type) {
      case "cm":
        return value ? value.toFixed(0) : "-";
      case "in":
        return value ? (value / 2.54).toFixed(0) : "-";
    }
  };

  return (
    <StyledLastRecommendationsComponent>
      <div className="title-div">
        <h1 className="component-title">{title}</h1>
        <UnitCalculatorComponent settype={settype} type={type} />
      </div>
      <div className="main-div">
        {lastRecommendations && lastRecommendations[0] && (
          <table>
            <thead>
              <tr>
                <th className="left-titles">Product </th>
                <th className="right-titles">Size </th>
                <th className="right-titles">Bust </th>
                <th className="right-titles">Waist </th>
                <th className="right-titles">Hips</th>
                <th className="right-titles">Thigh </th>
                <th className="right-titles">Inseam</th>
              </tr>
            </thead>
            <tbody>
              {lastRecommendations
                .filter(recommendation => {
                  if (!currentSize) return recommendation;

                  if (currentSize && recommendation.sizeName === currentSize)
                    return recommendation;
                })
                .filter((recommendation, i) => {
                  if (i < 10) return recommendation;
                })
                .map(
                  (
                    { sizeName, prodName, bust, waist, hips, thigh, inseam },
                    i,
                  ) => (
                    <tr key={"td" + i}>
                      <td>{upperCase(prodName)}</td>
                      <td className="right-datas">
                        {sizeName && sizeName}
                        {!sizeName && "N/A"}
                      </td>
                      <td className="right-datas">{calculateUnit(bust)} </td>
                      <td className="right-datas">{calculateUnit(waist)} </td>
                      <td className="right-datas">{calculateUnit(hips)}</td>
                      <td className="right-datas">{calculateUnit(thigh)} </td>
                      <td className="right-datas">{calculateUnit(inseam)}</td>
                    </tr>
                  ),
                )}
            </tbody>
          </table>
        )}
      </div>
      {!lastRecommendations ||
        (!lastRecommendations[0] && (
          <ImageDiv>
            <NoDataSVG />
          </ImageDiv>
        ))}
    </StyledLastRecommendationsComponent>
  );
};

export default LastRecommendationsComponent;
