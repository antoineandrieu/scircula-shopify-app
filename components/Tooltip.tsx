import React from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

const StyledTooltip = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;

  .place-top::after {
    border-left: 13px solid transparent !important;
    border-right: 13px solid transparent !important;
    bottom: -13px !important;
    margin-left: -13px !important;
    border-top-color: #bebebe !important;
    border-top-width: 13px !important;
  }

  .place-right::after {
    border-top: 13px solid transparent !important;
    border-bottom: 13px solid transparent !important;
    left: -13px !important;
    margin-top: -13px !important;
    border-right-width: 13px !important;
  }

  .place-bottom::after {
    border-left: 13px solid transparent !important;
    border-right: 13px solid transparent !important;
    top: -13px !important;
    margin-left: -13px !important;
    border-bottom-width: 13px !important;
  }

  .place-left::after {
    border-top: 13px solid transparent !important;
    border-bottom: 13px solid transparent !important;
    right: -13px !important;
    margin-top: -13px !important;
    border-left-width: 13px !important;
  }

  .tooltip {
    padding: 0;
    display: flex;
    flex-direction: column;
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 5px;
    opacity: 1;

    header {
      border-bottom: 1px solid lightgray;
      background-color: #f0f0f0;
      width: 100%;
      padding: 10px;
    }

    .content {
      width: 100%;
      padding: 10px;
    }
  }
`;

export enum places {
  left = "left",
  right = "right",
  top = "top",
  bottom = "bottom",
}

const Tooltip = ({
  id,
  title,
  content,
  place,
}: {
  id: string;
  title: string;
  content: string;
  place: places;
}) => {
  let tooltipContent = content
    .split("\n")
    .map((item, index) => <div key={index}>{item}</div>);
  return (
    <StyledTooltip>
      <ToolTipIcon data-tip data-for={id} />

      {/*https://www.npmjs.com/package/react-tooltip */}
      <ReactTooltip
        place={place}
        id={id}
        type="light"
        effect="solid"
        className="tooltip"
        arrowColor="#bebebe"
      >
        <header>{title}</header>
        <div className="content">{tooltipContent}</div>
      </ReactTooltip>
    </StyledTooltip>
  );
};

export default Tooltip;

const StyledToolTipIcon = styled.div`
  height: 30px;
  width: 30px;
`;

function ToolTipIcon(props) {
  return (
    <StyledToolTipIcon {...props}>
      <svg viewBox="0 0 16 16" fill="none">
        <path
          d="M8 1.33333C11.676 1.33333 14.6667 4.324 14.6667 8C14.6667 11.676 11.676 14.6667 8 14.6667C4.324 14.6667 1.33333 11.676 1.33333 8C1.33333 4.324 4.324 1.33333 8 1.33333ZM8 0C3.582 0 0 3.582 0 8C0 12.418 3.582 16 8 16C12.418 16 16 12.418 16 8C16 3.582 12.418 0 8 0ZM8.66667 12H7.33333V6.66667H8.66667V12ZM8 3.83333C8.46 3.83333 8.83333 4.20667 8.83333 4.66667C8.83333 5.12667 8.46 5.5 8 5.5C7.54 5.5 7.16667 5.12667 7.16667 4.66667C7.16667 4.20667 7.54 3.83333 8 3.83333Z"
          fill="#6a7984"
        />
      </svg>
    </StyledToolTipIcon>
  );
}
