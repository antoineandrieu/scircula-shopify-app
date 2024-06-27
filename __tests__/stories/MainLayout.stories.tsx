import React from "react";
import styled from "styled-components";
import Index from "../../pages";
import { StyledMainLayout } from "../../styles/MainLayout";

const StyledMainLayoutStory = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
`;

export const MainLayoutStory = () => (
  <StyledMainLayoutStory>
    <StyledMainLayout>
      <Index
        showDemo={false}
        bannerText={"Demo mode only"}
        integratedAt={new Date("2021-06-09")}
        genders={["women", "men"]}
        categories={["Top", "Jeans"]}
      />
    </StyledMainLayout>
  </StyledMainLayoutStory>
);

export default {
  title: "MainLayout",
  component: MainLayoutStory,
};
