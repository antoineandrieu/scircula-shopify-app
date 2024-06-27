import React from "react";
import styled from "styled-components";
import { useState } from "react";

const StyledUnitSVG = styled.svg`
  height: 80%;
  margin-left: 4px;
  margin-top: 2px;
  fill: white;
`;

const UnitSVG = () => (
  <StyledUnitSVG viewBox="0 0 640 512">
    <svg xmlns="http://www.w3.org/2000/svg">
      <path d="M635.7 167.2L556.1 31.7c-8.8-15-28.3-20.1-43.5-11.5l-69 39.1L503.3 161c2.2 3.8.9 8.5-2.9 10.7l-13.8 7.8c-3.8 2.2-8.7.9-10.9-2.9L416 75l-55.2 31.3 27.9 47.4c2.2 3.8.9 8.5-2.9 10.7l-13.8 7.8c-3.8 2.2-8.7.9-10.9-2.9L333.2 122 278 153.3 337.8 255c2.2 3.7.9 8.5-2.9 10.7l-13.8 7.8c-3.8 2.2-8.7.9-10.9-2.9l-59.7-101.7-55.2 31.3 27.9 47.4c2.2 3.8.9 8.5-2.9 10.7l-13.8 7.8c-3.8 2.2-8.7.9-10.9-2.9l-27.9-47.5-55.2 31.3 59.7 101.7c2.2 3.7.9 8.5-2.9 10.7l-13.8 7.8c-3.8 2.2-8.7.9-10.9-2.9L84.9 262.9l-69 39.1C.7 310.7-4.6 329.8 4.2 344.8l79.6 135.6c8.8 15 28.3 20.1 43.5 11.5L624.1 210c15.2-8.6 20.4-27.8 11.6-42.8z" />
    </svg>
  </StyledUnitSVG>
);

const StyledUnitMenu = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 110%;
  left: 0px;

  .choseUnitSquare {
    width: 100%;
    height: 100%;
    background: #4ab7c3;
    border-radius: 4px;
    border: none;
    color: white;
    margin-bottom: 2px;
    min-height: 23px;
  }
`;
const StyledUnitSquare = styled.button`
  width: 100px;
  height: 30px;
  background: #4ab7c3;
  border-radius: 4px;
  position: relative;
  border: none;
  color: white;
  display: grid;
  grid-template-columns: minmax(auto, 10%) minmax(auto, 90%);

  .img-properties-container {
    height: 100%;
    width: 100%;
    grid-column: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* left: 50px; */
  }
  .datas-properties {
    grid-column: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
  .img-properties {
    height: 20px;
    width: 20px;
  }

  @media screen and (max-width: 1300px) {
    margin-right: 20px;
    width: 80px;
  }

  p {
    font-size: 0.5em;
  }
`;
interface CustomerProps {
  settype: Function;
  type: string;
}

const UnitCalculatorComponent = (props: CustomerProps) => {
  return <OpenUnitSlider settype={props.settype} type={props.type} />;
};

interface typeProps {
  settype: Function;
  type: string;
}

function OpenUnitSlider(props: typeProps) {
  const [buttonState, setButtonState] = useState(false);
  //To add units, add the unit name here
  let types: string[] = ["euro", "dollar"];

  return (
    <StyledUnitSquare onClick={() => setButtonState(!buttonState)}>
      <UnitSVG />

      <div className="datas-properties">{props.type}</div>
      {buttonState && (
        <StyledUnitMenu>
          {types
            .filter(elem => elem != props.type)
            .map(unit => (
              <button
                className="choseUnitSquare"
                onClick={() => props.settype(unit)}
              >
                {unit}
              </button>
            ))}
        </StyledUnitMenu>
      )}
    </StyledUnitSquare>
  );
}

export default UnitCalculatorComponent;
