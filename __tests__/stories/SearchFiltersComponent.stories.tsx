import React, { useState } from "react";
import styled from "styled-components";

import SearchFiltersComponent from "../../components/SearchFiltersComponent";

const StyledSearchFiltersComponentStory = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #e5e5e5;
`;

export const SearchFiltersComponentStory = () => {
  return (
    <StyledSearchFiltersComponentStory>
      <SearchFiltersComponent />
    </StyledSearchFiltersComponentStory>
  );
};

export default {
  title: "SearchFiltersComponent",
  component: SearchFiltersComponentStory,
};
