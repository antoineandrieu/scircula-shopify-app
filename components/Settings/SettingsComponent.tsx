import React, { useState } from "react";
import styled from "styled-components";
import { StyledButton } from "../SearchFiltersComponent";
import SettingsMenu from "./SettingsMenu";

const StyledSettingsSVG = styled.svg`
  margin-right: 10px;
  fill: white;
  height: 100%;
  path {
    fill: white;
  }
`;

const SettingsSVG = () => (
  <StyledSettingsSVG viewBox="0 0 9.8 9.8">
    <path d="M9.8,4.47a.35.35,0,0,0-.09-.23.36.36,0,0,0-.24-.09H9a.58.58,0,0,1-.49-.36l-.26-.64a.55.55,0,0,1,.09-.59l.36-.36a.34.34,0,0,0,0-.46l-.6-.61A.37.37,0,0,0,7.83,1a.36.36,0,0,0-.23.09l-.35.36a.53.53,0,0,1-.6.09L6,1.32A.54.54,0,0,1,5.66.83V.33A.33.33,0,0,0,5.56.1.3.3,0,0,0,5.33,0H4.48a.33.33,0,0,0-.24.1.32.32,0,0,0-.09.23v.5a.54.54,0,0,1-.36.49l-.63.26a.53.53,0,0,1-.6-.09L2.2,1.14a.31.31,0,0,0-.46,0l-.6.6a.31.31,0,0,0,0,.46l.35.36a.53.53,0,0,1,.09.6l-.26.63a.54.54,0,0,1-.49.36H.33a.32.32,0,0,0-.23.09.33.33,0,0,0-.1.24v.85a.3.3,0,0,0,.1.23.33.33,0,0,0,.23.1h.5A.54.54,0,0,1,1.32,6l.26.63a.53.53,0,0,1-.09.6l-.35.35a.33.33,0,0,0-.1.23.35.35,0,0,0,.1.24l.6.6a.34.34,0,0,0,.46,0l.36-.36a.55.55,0,0,1,.6-.08l.63.26A.54.54,0,0,1,4.15,9v.5a.31.31,0,0,0,.33.33h.85a.33.33,0,0,0,.23-.09.37.37,0,0,0,.1-.24V9A.54.54,0,0,1,6,8.49l.63-.26a.55.55,0,0,1,.6.08l.35.36a.32.32,0,0,0,.23.09.34.34,0,0,0,.24-.09l.6-.6a.34.34,0,0,0,.09-.24.32.32,0,0,0-.09-.23l-.36-.35a.57.57,0,0,1-.09-.6L8.48,6A.56.56,0,0,1,9,5.66h.5a.37.37,0,0,0,.24-.1.33.33,0,0,0,.09-.23V4.47ZM7,4.89a2.1,2.1,0,1,1-2.1-2.1A2.09,2.09,0,0,1,7,4.89" />
  </StyledSettingsSVG>
);

const StyledSettingsComponent = styled.div`
  .app-settings-button {
    display: flex;
    place-items: center;
  }
  .loading {
    background-color: Grey;
    border: 1px solid Grey;
  }
`;

function SettingsComponent({
  isLoading,
  onSettingsButttonMenuClick,
}: {
  isLoading: Boolean;
  onSettingsButttonMenuClick: () => void;
}) {
  return (
    <StyledSettingsComponent>
      <StyledButton
        className={`app-settings-button ${isLoading ? "loading" : ""}`}
        onClick={onSettingsButttonMenuClick}
      >
        <SettingsSVG />
        App settings
      </StyledButton>
    </StyledSettingsComponent>
  );
}

export default SettingsComponent;
