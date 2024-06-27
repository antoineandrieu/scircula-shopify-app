import React from "react";
import styled from "styled-components";
import StyledContainer from "./StyledContainer";
import { useState } from "react";

const StyledDropDown = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 40px;
  font-weight: bold;
  font-size: 20px;
`;

const BigCategoryContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #4ab7c3;
  border-radius: 4px;
  position: relative;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IntermediateContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 110%;
  left: 0px;
  min-height: 40px;

  .choseUnitSquare {
    width: 100%;
    height: 100%;
    background: #4ab7c3;
    border-radius: 4px;
    border: none;
    color: white;
    margin-bottom: 2px;
    font-weight: bold;
    font-size: 20px;
  }
`;

interface GenderCatProps {
  title: string;
  options: Array<string>;
  selectedOption: string;
  color: string;
  onChange: (value: string) => void;
}

const GenderCatComponent = ({
  title,
  options,
  selectedOption,
  color,
  onChange,
}: GenderCatProps) => {
  const [type, settype] = useState(selectedOption);
  return (
    <StyledDropDown>
      <OpenUnitSlider settype={settype} type={type} options={options} />
    </StyledDropDown>
  );
};

interface typeProps {
  settype: Function;
  type: string;
  options: Array<string>;
}

function OpenUnitSlider(props: typeProps) {
  const [buttonState, setButtonState] = useState(false);

  return (
    <BigCategoryContainer onClick={() => setButtonState(!buttonState)}>
      {props.type}
      {buttonState && (
        <IntermediateContainer>
          {props.options
            .filter(elem => elem != props.type)
            .map(unit => (
              <button
                className="choseUnitSquare"
                onClick={() => props.settype(unit)}
              >
                {unit}
              </button>
            ))}
        </IntermediateContainer>
      )}
    </BigCategoryContainer>
  );
}

export default GenderCatComponent;
