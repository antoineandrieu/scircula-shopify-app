import React from "react";
import styled from "styled-components";

const SyledCrossComponent = styled.svg`
  position: absolute;
  left: 20px;
  top: 20px;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

function CrossComponent({ onClick }: { onClick: () => void }) {
  return (
    <SyledCrossComponent onClick={onClick}>
      <path d="M14.409,13.055,25.83,1.634A.957.957,0,1,0,24.477.28L13.055,11.7,1.634.28A.957.957,0,1,0,.28,1.634L11.7,13.055.28,24.476A.957.957,0,1,0,1.634,25.83L13.055,14.408,24.477,25.83a.957.957,0,1,0,1.353-1.354Z" />
    </SyledCrossComponent>
  );
}

export default CrossComponent;
