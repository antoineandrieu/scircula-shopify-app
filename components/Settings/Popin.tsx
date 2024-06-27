import styled from "styled-components";
import React from "react";
import CrossComponent from "./CrossComponent";

const StyledPopIn = styled.div`
  top: 0;
  left: 0;
  z-index: 1000000;
  background: rgba(0, 0, 0, 0.34);
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;

  .pop-in-body {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background: white;
    width: 90vw;
    border-radius: 1vw;
    padding: 1vw;
    position: relative;

    .cross {
      position: absolute;
      right: 16px;
      top: 3.5vh;
      font-size: 60px;
      height: 13vh;
      width: 8vw;
      text-align: center;
      cursor: pointer;
    }
  }
`;

interface PopInProps {
  closeCallBack?: () => any;
  children: React.ReactNode;
  datacy?: string;
}

const stopEventPropagation = (event: any) => {
  event.preventDefault();
  event.stopPropagation();
  return false;
};

const PopIn = ({ closeCallBack, children }: PopInProps) => (
  <StyledPopIn id="pop-in" onClick={closeCallBack}>
    <div className="pop-in-body" onClick={stopEventPropagation}>
      <div className="cross" onClick={closeCallBack}>
        <CrossComponent onClick={closeCallBack} />
      </div>
      {children}
    </div>
  </StyledPopIn>
);

export default PopIn;
