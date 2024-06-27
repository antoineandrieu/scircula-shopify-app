import React from "react";
import styled from "styled-components";
import { ToggleComponent } from "../../components/Settings/ToggleComponent";



const StyledToggleStory = styled.div`
  height: 40px;
  width: 150px;

  display: grid;
  place-items: center;
`;

export const ToggleStory = () => {
  return (
    <StyledToggleStory>
     <ToggleComponent
          isFirstActiveDefault={true}
          firstOption={"$"}
          secondOption={"€"}
          firstOptionSelectedCallBack={() => {
          }}
          secondOptionSelectedCallBack={() => {
          }}
        />
    </StyledToggleStory>
  );
};

export default {
  title: "Toggle",
  component: ToggleStory,
};