import React from "react";
import styled from "styled-components";
import StyledContainer from "./StyledContainer";

const StyledGeneralStats = styled(StyledContainer)`
  display: grid;
  place-items: center;
  grid-template-rows: 25% 75%;
  height: 100%;
  width: 100%;

  .container-content {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-evenly;
  }
`;

function GeneralStatsComponent({
  title,
  content,
}: {
  title: string;
  content: Array<{
    title: string;
    bigData: string | number;
    smallData?: string | number;
  }>;
}) {
  return (
    <StyledGeneralStats>
      <div className="container-header">
        <h2>{title}</h2>
      </div>
      <div className="container-content">
        {content.map((content, i) => (
          <SmallContainer key={content.title + "-" + i} {...content} />
        ))}
      </div>
    </StyledGeneralStats>
  );
}

export default GeneralStatsComponent;

const StyledSmallContainer = styled.div`
  .data-column {
    width: 100%;
    display: grid;
    place-items: center;
    grid-template-columns: 1fr 1fr;
  }
`;

function SmallContainer({
  title,
  bigData,
  smallData,
}: {
  title: string;
  bigData: string | number;
  smallData?: string | number;
}) {
  return (
    <StyledSmallContainer>
      <h2>{title}</h2>
      <div className="data-column">
        <div>{bigData}</div>
        <div>{smallData}</div>
      </div>
    </StyledSmallContainer>
  );
}
