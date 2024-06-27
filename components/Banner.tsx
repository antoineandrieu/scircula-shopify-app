import React from "react";
import styled from "styled-components";

const StyledBanner = styled.div`
  background: white;
  text-align: center;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 8px;
  padding: 1%;

  .banner-title {
    padding-bottom: 10px;
  }
`;

const Banner = ({ title, content }: { title: string; content: string }) => {
  const splittedContent = content
    .split("\n")
    .map((item, index) => <div key={index}>{item}</div>);

  return (
    <StyledBanner>
      <h1 className="banner-title">{title}</h1>
      <div>{splittedContent}</div>
    </StyledBanner>
  );
};

export default Banner;
