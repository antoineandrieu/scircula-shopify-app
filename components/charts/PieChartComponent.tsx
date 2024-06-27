import dataLabelsPlugin from "chartjs-plugin-datalabels";
import "chartjs-plugin-labels";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";

import autoColors from "../../lib/colors";

/**
 * Github Source
 * https://github.com/reactchartjs/react-chartjs-2/blob/react16/example/src/charts/Pie.js
 *
 * Documentation :
 *
 * https://www.chartjs.org/docs/latest/charts/doughnut.html
 *
 * plugins usage :
 *
 * https://jsfiddle.net/simonbrunel/9ezggxx5/
 * https://chartjs-plugin-datalabels.netlify.app/samples/charts/line.html
 */

/**
 *
 * TODO :
 *
 *  - If nFirstData is passed, only display the n first data,
 *  - Use context theme colors
 *  - Change the style of the datalabel : https://chartjs-plugin-datalabels.netlify.app/samples/advanced/custom-labels.html
 *  - Change the style of the tooltip : https://github.com/nagix/chartjs-plugin-style & https://nagix.github.io/chartjs-plugin-style/
 *
 */

const StyledPieChart = styled.div`
  height: 85%;
  width: 85%;
  display: grid;
  grid-template-rows: 12.5% 87.5%;

  .component-title {
    font-weight: lighter;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    grid-row: 1;
  }
  .pie-chart {
    grid-row: 2;
    height: 100%;
    width: 100%;
  }

  @media screen and (max-width: 600px) {
    grid-template-rows: 20% 80%;

    .pie-chart {
      grid-row: 2;
      height: 80%;
      width: 100%;
    }
  }
  @media screen and (max-width: 1250px) and (min-width: 1000px) {
    height: 20%;
    width: 65%;
    grid-template-rows: 40% 60%;
  }
  @media screen and (min-width: 2000px) {
    .pie-chart {
      grid-row: 2;
      height: 40%;
      width: 70%;
    }
  }
`;

interface PieChartProps {
  data: Map<string, number>;
  title: string;
  nFirstData?: number;
  showLegend?: boolean;
  getDatasetAtEvent?: (e: any) => void;
  getElementAtEvent?: (e: any) => void;
  getElementsAtEvent?: (e: any) => void;
}

const PieChart = ({ data, title, nFirstData = 6 }: PieChartProps) => {
  if (!data) {
    return (
      <>
        <h1 className="component-title">{title}</h1>
      </>
    );
  }

  const parseArray = (array: any[], index: number) => {
    let tmp: string[] = [];
    let position: number = 0;
    let resCumul: number = 0;

    if (index > array.length) {
      index = array.length;
    }

    for (position; position + 1 < index; position++) {
      tmp.push(array[position]);
    }

    for (position; position < array.length; position++) {
      resCumul += Number(array[position]);
    }
    tmp.push(String(resCumul));
    return tmp;
  };

  const parseArrayLabels = (array: any[], index: number) => {
    let tmp: string[] = [];
    let position: number = 0;

    if (array != undefined && array.length != 0) {
      if (index > array.length) {
        index = array.length;
      }

      for (position; position + 1 < index; position++) {
        tmp.push(array[position]);
      }

      tmp.push(String("Others"));
    }
    return tmp;
  };

  const backgroundColor = autoColors(
    "#42bdb4",
    nFirstData <= data.size ? nFirstData : data.size,
  );

  const chartData = {
    labels: parseArrayLabels(Array.from(data.keys()), nFirstData),
    datasets: [
      {
        label: "# of Votes",
        data: parseArray(Array.from(data.values()), nFirstData),
        backgroundColor,
        hoverBorderWidth: 12,
        hoverBorderColor: "white",
      },
    ],
  };
  return (
    <StyledPieChart>
      <h1 className="component-title">{title}</h1>
      <div className="pie-chart">
        <Doughnut
          plugins={[dataLabelsPlugin]}
          data={chartData}
          options={{
            tooltips: {
              cornerRadius: 5,
              bodyFontFamily: "Lexend",
              xPadding: 20,
              yPadding: 10,
              bodyFontSize: 14,
              displayColors: false,
            },
            legend: {
              display: true,
              position: "right",
              labels: {
                fontColor: "#1f283",
                usePointStyle: true,
                fontSize: 15,
                fontFamily: "Lexend",
              },
            },
            plugins: {
              datalabels: {
                display: false,
              },
              labels: {
                display: true,
                render: "percentage",
                fontColor: "white",
                fontSize: 16,
                fontFamily: "Lexend",
              },
            },
          }}
        />
      </div>
    </StyledPieChart>
  );
};

export default PieChart;
