import React from "react";

import styled from "styled-components";
import Tooltip, { places } from "../../components/Tooltip";
import ReactTooltip from "react-tooltip";

const StyledTooltipStory = styled.div`
  height: 100vh;

  display: grid;
  place-items: center;
`;

export const TooltipStory = () => {
  return (
    <StyledTooltipStory>
      <Tooltip
        id="test1"
        place={places.top}
        title="Popover title"
        content="And here's some amazing content. It's very engaging. Right ?"
      />

      <Tooltip
        id="test2"
        place={places.right}
        title="Popover title"
        content="And here's some amazing content. It's very engaging. Right ?"
      />
      <Tooltip
        id="test3"
        place={places.bottom}
        title="Popover title"
        content="And here's some amazing content. It's very engaging. Right ?"
      />
      <Tooltip
        id="test4"
        place={places.left}
        title="Popover title"
        content="And here's some amazing content. It's very engaging. Right ?"
      />
    </StyledTooltipStory>
  );
};

export default {
  title: "Tooltip",
  component: TooltipStory,
};
