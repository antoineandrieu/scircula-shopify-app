import React, { useEffect } from "react";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";

import { upperCase } from "../../lib/textUtils";
import SmallLoader from "../SmallLoader";
import noData from "../../public/nodata.png";

const StyledMainDiv = styled.div`
  height: 100%;
  width: 100%;

  .upper-div {
    width: 100%;
    height: auto;

    .component-title {
      grid-column: 1;
      grid-row: 1;
      height: 100%;
      width: 80%;
    }

    .legends-div {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      grid-row: 1;
      font-weight: lighter;
    }
  }

  .legends-style {
    padding-left: 5px;
  }

  .title-box-div {
    width: auto;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .recommendations-box {
    width: 24px;
    height: 24px;
    background: #a7e7ed;
    border-radius: 12px;
  }

  .added-cart-box {
    width: 24px;
    height: 24px;
    background: #4ab9c3;
    border-radius: 12px;
  }

  .purchased-box {
    width: 24px;
    height: 24px;
    background: #0c8c98;
    border-radius: 12px;
  }

  @media screen and (max-width: 1550px) {
    .upper-div {
      grid-template-columns: none;
      grid-template-rows: 50% 50%;

      .legends-div {
        grid-row: 2;
        align-items: flex-start;
        justify-content: space-between;
      }
    }
  }
  @media screen and (max-width: 750px) {
    .upper-div {
      grid-template-columns: none;
      grid-template-rows: 25% 25% 25% 25%;

      .legends-div {
        display: flex;
        grid-row-start: 2;
        grid-row-end: 5;
        align-items: flex-start;
        // justify-content: space-between;
        flex-direction: column;
      }
    }
  }
`;

const StyledRecommandedDiv = styled.div<any>`
  width: 90%;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .article-title-div {
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .total-style {
    font-size: 18px;
    padding-right: 5px;
    padding-left: 7px;
    position: absolute;
    left: 100%;
    font-weight: 500;
    overflow: hidden;
  }

  .sub-main-container {
    position: relative;
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .recommendations-bar {
    position: absolute;
    min-width: 80px;
    max-width: 750px;
    height: 30px;
    width: ${props => props.maxTotal};
    background-color: #a7e7ed;
    border-radius: 12px;
    z-index: 110;
    justify-content: space-between;
    flex-direction: row-reverse;
    align-items: center;
    display: flex;
    padding-right: 3px;
  }

  .added-to-cart-bar {
    position: absolute;
    min-width: 77px;
    max-width: 650px;
    height: 30px;
    width: ${props => props.addedcart};
    background-color: #4ab9c3;
    border-radius: 12px;
    z-index: 120;
    justify-content: space-between;
    flex-direction: row-reverse;
    align-items: center;
    display: flex;
    padding-right: 3px;
    color: white;
  }

  .added-to-cart-bar-full {
    position: absolute;
    min-width: 77px;
    max-width: 650px;
    height: 30px;
    width: ${props => props.addedcart};
    background-color: #4ab9c3;
    border-radius: 12px;
    z-index: 120;
    justify-content: space-between;
    flex-direction: row-reverse;
    align-items: center;
    display: flex;
    padding-right: 3px;
    color: white;
  }

  .purchased-bar {
    position: absolute;
    min-width: 40px;
    max-width: 550px;
    height: 30px;
    width: ${props => props.purchased};
    background-color: #0c8c98;
    border-radius: 12px;
    z-index: 130;
    justify-content: space-between;
    flex-direction: row-reverse;
    align-items: center;
    display: flex;
    padding-right: 5px;
    color: white;
  }

  .added-to-cart-bar:hover {
    transform: scaleY(1.2);
  }

  .added-to-cart-bar:hover div {
    transform: scaleY(0.8);
  }

  .purchased-bar:hover {
    transform: scaleY(1.2);
  }

  .purchased-bar:hover div {
    transform: scaleY(0.8);
  }

  @media screen and (max-width: 500px) {
    .recommendations-bar {
      max-width: 300px;
    }
    .added-to-cart-bar {
      max-width: 250px;
    }
    .purchased-bar {
      max-width: 150px;
    }
  }

  @media screen and (max-width: 420px) {
    .recommendations-bar {
      max-width: 220px;
    }
    .added-to-cart-bar {
      max-width: 150px;
    }
    .purchased-bar {
      max-width: 100px;
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
  color: grey;

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

interface NewHorizontalBarProps {
  loading: boolean;
  title: string;
  data: Array<{
    externalId: string;
    name: string;
    total: number;
    addedToCart: number;
    purchased: number;
  }>;
}

const HorizontalBarChart = ({
  data,
  title,
  loading,
}: NewHorizontalBarProps) => {
  const maxTotal = data && data[0] && data[0].total;

  const computePercentage = (total: number, value: number) =>
    (value / total) * 100;

  const displayTitle = () => {
    if (!chartHasData() || loading) {
      return <></>;
    }
    return (
      <div className="legends-div">
        <div className="title-box-div">
          <div className="purchased-box"></div>
          <p className="legends-style">Purchased</p>
        </div>
        <div className="title-box-div">
          <div className="added-cart-box"></div>
          <p className="legends-style">Added to Cart</p>
        </div>
        <div className="title-box-div">
          <div className="recommendations-box"></div>
          <p className="legends-style">Total Fit Recommendations</p>
        </div>
      </div>
    );
  };

  const chartHasData = () => {
    return data && data.length;
  };

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  if (loading) {
    return (
      <StyledMainDiv>
        <div className="upper-div">
          <h1 className="component-title">{title}</h1>
          {displayTitle()}
        </div>
        <SmallLoader />
      </StyledMainDiv>
    );
  }

  return (
    <StyledMainDiv>
      <div className="upper-div">
        <h1 className="component-title">{title}</h1>
        {displayTitle()}
      </div>

      {!chartHasData() && (
        <ImageDiv>
          <img className="img-properties" src={noData.src} alt="no data img" />
          <p className="img-text"> There are no data by this time </p>
        </ImageDiv>
      )}

      {data?.map(({ total, addedToCart, purchased, name }, i) => (
        <StyledRecommandedDiv
          key={total + "-" + name + "-" + i}
          maxTotal={computePercentage(maxTotal, total) + "%"}
          addedcart={
            (total / maxTotal) * computePercentage(total, addedToCart) + "%"
          }
          purchased={
            (total / maxTotal) * computePercentage(total, purchased) + "%"
          }
        >
          <div className="article-title-div">
            <p>{upperCase(name)}</p>
          </div>

          <div className="sub-main-container">
            {total != 0 && (
              <div className="recommendations-bar">
                <div className="total-style">{total.toLocaleString()}</div>
              </div>
            )}
            {addedToCart != 0 && purchased != 0 && (
              <div
                data-tip={"Added to Cart: " + addedToCart.toLocaleString()}
                data-for="tooltip"
                className="added-to-cart-bar"
              >
                <div className="bar-text">
                  {computePercentage(total, addedToCart).toFixed(0) + "%"}
                </div>
              </div>
            )}
            {addedToCart != 0 && purchased === 0 && (
              <div
                data-tip={"Added to Cart: " + addedToCart.toLocaleString()}
                data-for="tooltip"
                className="added-to-cart-bar-full"
              >
                <div>
                  {computePercentage(total, addedToCart).toFixed(0) + "%"}
                </div>
              </div>
            )}
            {purchased != 0 && (
              <div
                data-tip={"Purchased: " + purchased.toLocaleString()}
                data-for="tooltip"
                className="purchased-bar"
              >
                <div>
                  {computePercentage(total, purchased).toFixed(0) + "%"}
                </div>
              </div>
            )}
          </div>
        </StyledRecommandedDiv>
      ))}
      <ReactTooltip
        id="tooltip"
        place="right"
        effect="solid"
        offset={{ right: 0 }}
      />
    </StyledMainDiv>
  );
};

export default HorizontalBarChart;
