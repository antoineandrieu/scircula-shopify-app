import { gql, useMutation } from "@apollo/client";
import React from "react";
import styled from "styled-components";

import { useSessionContext } from "../../contexts/SessionContext";
import PlansComponent from "./PlansComponent";
import PopIn from "./Popin";

const StyledSettingsPopin = styled.div`
  color: black;

  .pop-in-body {
    height: 100vh;
    width: 100vw;
    display: grid;
    overflow-y: auto;
    border-radius: unset;
  }
`;

function SettingsPopin({
  shouldDisplayPopin,
  hidePopinCallBack,
}: {
  shouldDisplayPopin: Boolean;
  hidePopinCallBack: () => void;
}) {
  if (!shouldDisplayPopin) return <></>;

  const { plan } = useSessionContext();

  return (
    <StyledSettingsPopin>
      <PopIn closeCallBack={hidePopinCallBack}>
        <PlansComponent plan={plan} />
      </PopIn>
    </StyledSettingsPopin>
  );
}

export default SettingsPopin;
