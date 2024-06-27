import React, { useEffect, useState } from "react";
import styled from "styled-components";

import PieChartComponent from "./charts/PieChartComponent";
import SmallLoader from "./SmallLoader";
import noData from "../public/nodata.png";

const StyledNoDataSVG = styled.svg`
  height: 100%;
  width: 100%;
`;

const NoDataSVG = () => (
  <StyledNoDataSVG viewBox="0 0 512 512">
    <svg
      id="Capa_1"
      enable-background="new 0 0 512 512"
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

const StyledMostRecommendedSizesComponent = styled.div`
  width: 96%;
  height: 96%;
  display: grid;

  table {
    width: 100%;
    height: 100%;

    tbody tr:nth-of-type(even) {
      background: white;
    }
    tbody tr:nth-of-type(odd) {
      background: lightgray;
    }
  }
`;
const StyledTitleDiv = styled.div`
  font-size: 1.5em;
  font-weight: lighter;
`;

const StyledTitleDivGrey = styled(StyledTitleDiv)`
  color: grey;
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

function MostRecommendedSizesComponent({
  sizes,
  onSizeSelected,
  title,
  loading,
}: {
  sizes: Array<{ total: number; name: string }>;
  onSizeSelected: (size: string) => void;
  title: string;
  loading: boolean;
}) {
  const [recommendedSizesData, setRecommendedSizesData] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    if (sizes) {
      const dataTemp = {};

      sizes.forEach(({ total, name }) => {
        dataTemp[name] = total;
      });

      setData(
        Object.entries(dataTemp).sort(
          (
            a: [key: string, value: number],
            b: [key: string, value: number],
          ) => {
            return b[1] - a[1];
          },
        ),
      );

      setRecommendedSizesData(
        new Map(
          Object.entries(dataTemp).sort(
            (
              a: [key: string, value: number],
              b: [key: string, value: number],
            ) => {
              return b[1] - a[1];
            },
          ),
        ),
      );
      onSizeSelected(null);
    }
  }, [sizes]);

  if (loading) {
    return (
      <>
        <StyledTitleDiv>{title}</StyledTitleDiv>
        <SmallLoader />
      </>
    );
  }

  if (!sizes || !sizes.length) {
    return (
      <>
        <StyledTitleDivGrey>{title}</StyledTitleDivGrey>
        <ImageDiv>
          <img className="img-properties" src={noData.src} alt="no data img" />
          <p className="img-text"> There are no data by this time </p>
        </ImageDiv>
      </>
    );
  }

  if (!recommendedSizesData) {
    return <StyledTitleDivGrey>{title}</StyledTitleDivGrey>;
  }

  return (
    <StyledMostRecommendedSizesComponent>
      <PieChartComponent
        title={title}
        data={recommendedSizesData}
        showLegend={false}
        nFirstData={6}
        getElementAtEvent={element => {
          if (!element.length) return;

          const { _index: index } = element[0];

          onSizeSelected(data[index][0] || null);
        }}
      />
    </StyledMostRecommendedSizesComponent>
  );
}

export default MostRecommendedSizesComponent;
