import React from "react";
import styled from "styled-components";

import { useSessionContext } from "../../contexts/SessionContext";
import {
  loadScriptTag,
  unloadScriptTag,
  updateVendor,
} from "../../lib/backendMethods";
import CrossComponent from "./CrossComponent";
import { ToggleComponent } from "./ToggleComponent";

const StyledSettingsMenu = styled.div`
  position: fixed;
  background: white;
  box-shadow: rgb(0 0 0 / 15%) 0px 3px 8px;
  height: 100vh;
  width: 400px;
  top: 0;
  right: 0;
  z-index: 111;
  text-align: center;
  color: #1f2833;

  h1 {
    margin-bottom: 50px;
  }

  .grid {
    margin-top: 30px;
    display: grid;
    width: 100%;
    grid-template-columns: 60% 40%;
  }
  .plan-settings {
    line-height: 30px;
  }
`;

const StyledButton = styled.div<{ color?: String }>`
  width: 80%;
  height: 30px;
  background-color: ${props => (props.color ? props.color : "#4ab7c3")};
  color: white;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 5px 5px 5px 5px;
  display: flex;
  border: 1px solid ${props => (props.color ? props.color : "#4ab7c3")};
  border-radius: 6px;
  overflow: hidden;
  white-space: nowrap;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const SettingsMenu = ({
  shouldDisplayMenu,
  hideMenuCallBack,
  showPlansPopin,
}: {
  shouldDisplayMenu: Boolean;
  hideMenuCallBack: () => void;
  showPlansPopin: () => void;
}) => {
  if (!shouldDisplayMenu) return <></>;

  const goToChangePlan = () => {
    showPlansPopin();
  };

  const {
    isDemo,
    buttonUrl,
    plan,
    shop,
    scirculaAccessToken,
    scriptTagId,
    setScriptTagId,
  } = useSessionContext();

  const enableFmf = async () => {
    const scriptTagId = await loadScriptTag(shop, {
      src: buttonUrl,
      displayScope: "ONLINE_STORE",
    });
    if (scriptTagId) {
      setScriptTagId(scriptTagId);
      await updateVendor(scirculaAccessToken, shop, {
        scriptExternalId: scriptTagId,
      });
    }
  };

  const disableFmf = async () => {
    const scriptTag = await unloadScriptTag(shop, {
      id: scriptTagId,
    });
    if (scriptTag) {
      await updateVendor(scirculaAccessToken, shop, {
        scriptExternalId: null,
      });
    }
  };

  // TODO: check if is demo to disable fmf {isDemo || (buttonUrl ? false : true)}
  return (
    <StyledSettingsMenu>
      <CrossComponent onClick={hideMenuCallBack} />
      <h1>Settings</h1>
      <div className="grid">
        <div> Enable Find My Fit widget</div>
        <ToggleComponent
          isDisabled={buttonUrl ? false : true}
          firstOption={"Yes"}
          secondOption={"No"}
          firstOptionColor={"green"}
          secondOptionColor={"red"}
          firstOptionSelectedCallBack={enableFmf}
          secondOptionSelectedCallBack={disableFmf}
          isFirstActiveDefault={scriptTagId ? true : false}
        />
      </div>
      <div className="grid">
        <div className="plan-settings">Current plan : {plan}</div>
        <StyledButton onClick={goToChangePlan}>Change plan</StyledButton>
      </div>
    </StyledSettingsMenu>
  );
};

export default SettingsMenu;
