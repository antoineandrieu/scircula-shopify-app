import React from "react";
import styled from "styled-components";

const StyledToggleComponent = styled.div<{
  firstOptionColor?: string;
  secondOptionColor?: string;
}>`
  height: 100%;
  width: 80%;

  .prctgl {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;

    max-width: 100%;
    margin: 0 auto;
    position: relative;
    border-radius: 220px;
    text-align: center;
    color: #000;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.08);
  }
  .prctgl:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 50%;
    border-radius: 220px;
    background-color: ${props =>
      props.firstOptionColor ? props.firstOptionColor : "#3fc6c9"};
    transition: all 0.4s ease-in-out;
  }

  .prctgl[data-billing-selection="second-option"]:before {
    left: 50%;
    width: 50%;
    background-color: ${props =>
      props.secondOptionColor ? props.secondOptionColor : "#3fc6c9"};
  }
  .prctgl-item,
  .prctgl-item:active {
    padding: 10px;
    line-height: 100%;
    cursor: pointer;
    position: relative;
    text-align: center;
    font-weight: 700;
    font-size: 15px;
    color: #000;
    transition: all 0.3s ease;
    letter-spacing: 1px;
    text-decoration: none;
  }

  .prctgl-first-option {
    width: 100%;
  }
  .prctgl-second-option {
    width: 100%;
  }

  .prctgl-item * {
    cursor: pointer;
  }

  .prctgl-first-option span {
    display: inline-block;
    vertical-align: middle;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0;
    line-height: 20px;
    margin-left: 8px;
    border-radius: 4px;
    padding: 0 0 0 5px;
    transition: all 0.3s ease;
    margin-top: -3px;
  }

  .prctgl-item.active {
    font-weight: 700;
    color: #fff;
  }

  .prctgl-first-option.active111 span {
    color: rgba(0, 0, 0, 0.6);
    background-color: #fff;
  }

  .disabled * {
    cursor: not-allowed;
    color: grey !important;
  }

  .disabled.prctgl[data-billing-selection="second-option"]:before,
  .disabled.prctgl:before {
    background-color: lightgrey;
  }
`;

export function ToggleComponent({
  firstOption,
  firstOptionColor,
  secondOption,
  secondOptionColor,
  firstOptionSelectedCallBack,
  secondOptionSelectedCallBack,
  isDisabled,
  isFirstActiveDefault,
}: {
  firstOption: any;
  firstOptionColor?: string;
  secondOption: any;
  secondOptionColor?: string;
  firstOptionSelectedCallBack?: () => void;
  secondOptionSelectedCallBack?: () => void;
  isDisabled?: Boolean;
  isFirstActiveDefault: Boolean;
}) {
  const [isFirstActive, setIsFirstActive] = React.useState(
    isFirstActiveDefault,
  );

  return (
    <StyledToggleComponent
      firstOptionColor={firstOptionColor}
      secondOptionColor={secondOptionColor}
    >
      <div
        className={`pricing-toggle prctgl ${isDisabled ? "disabled" : ""}`}
        data-billing-selection={
          isFirstActive ? "first-option" : "second-option"
        }
      >
        <a
          className={`prctgl-item prctgl-first-option ${
            isFirstActive ? "active" : ""
          }`}
          onClick={() => {
            if (isDisabled) return false;

            if (!isFirstActive) {
              setIsFirstActive(!isFirstActive);
              firstOptionSelectedCallBack();
            }
          }}
        >
          {firstOption}
        </a>
        <a
          className={`prctgl-item prctgl-second-option ${
            !isFirstActive ? "active" : ""
          }`}
          onClick={() => {
            if (isDisabled) return false;

            if (isFirstActive) {
              setIsFirstActive(!isFirstActive);
              secondOptionSelectedCallBack();
            }
          }}
        >
          {secondOption}
        </a>
      </div>
    </StyledToggleComponent>
  );
}
