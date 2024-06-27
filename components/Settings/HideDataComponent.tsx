import React, { useState } from "react";
import styled from "styled-components";
import { StyledUL } from "./SettingsStyledComponents";

const StyledHideDataComponent = styled.div<{ textColor }>`
  height: 100%;
  width: 100%;
  /* padding: 17px 20px 17px 40px; */

  .opened {
    display: block;
  }

  .closed {
    display: none;
  }

  .button-more-data:before {
    content: "+";
  }

  .button-less-data:before {
    content: "-";
  }

  .button {
    position: relative;
    color: ${props => props.textColor};
    font-size: 14px;
    width: 100%;
    line-height: 16px;
    cursor: pointer;
    transition: all 0.4s ease;
    font-weight: 600;
    position: relative;
    margin: 20px;
  }

  .button::before {
    border-right-color: ${props => props.textColor};
    border-bottom-color: ${props => props.textColor};
    display: block;
    position: absolute;
    height: 14px;
    width: 14px;
    text-align: center;
    font-size: 14px;
    border: 1px solid;
    line-height: 12px;
    font-weight: 500;
    border-radius: 3px;
    top: 0px;
    left: -25px;
  }

  .hide-data-title {
    margin-bottom: 15px !important;
  }
`;

function HideDataComponent({
  title,
  listData,
  moreDataLabel,
  lessDataLabel,
  textColor,
}: {
  title?: String;
  listData: Array<String>;
  moreDataLabel: String;
  lessDataLabel: String;
  textColor: String;
}) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <StyledHideDataComponent textColor={textColor}>
      <div className={isOpened ? "opened" : "closed"}>
        {title && <h2 className="hide-data-title">{title}</h2>}
        {listData && (
          <StyledUL listCheckColor={textColor}>
            {listData.map((data, i) => (
              <li key={`${data}-list-${i}`}>{data}</li>
            ))}
          </StyledUL>
        )}
      </div>
      <div
        className={`button ${
          isOpened ? "button-less-data" : "button-more-data"
        }`}
        onClick={() => setIsOpened(!isOpened)}
      >
        {isOpened ? lessDataLabel : moreDataLabel}
      </div>
    </StyledHideDataComponent>
  );
}

export default HideDataComponent;
