import React, { useState } from "react";
import styled from "styled-components";

import SearchBarComponent from "../../components/SearchBarComponent";

const StyledSearchBarStory = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #e5e5e5;
`;

const dataMap: Array<{ name: string; externalId: string }> = [
  {
    name: "Casablanca Jumpsuit",
    externalId: "Casablanca Jumpsuit",
  },
  {
    name: "Distressed Denim Jacket",
    externalId: "Distressed Denim Jacket",
  },
  {
    name: "Dreamer Midi Dress",
    externalId: "Dreamer Midi Dress",
  },
  {
    name: "Boyfriend Blazer",
    externalId: "Boyfriend Blazer",
  },
  {
    name: "Flared Jeans",
    externalId: "Flared Jeans",
  },
  {
    name: "Palazzo Pants",
    externalId: "Palazzo Pants",
  },
  {
    name: "Tangalle Wrap Dress",
    externalId: "Tangalle Wrap Dress",
  },
  {
    name: "Tangerine Camisole",
    externalId: "Tangerine Camisole",
  },
  {
    name: "Military Jacket",
    externalId: "Military Jacket",
  },
  {
    name: "Skinny Jeans",
    externalId: "Skinny Jeans",
  },
];

export const SearchBarComponentStory = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchedProduct, setSearchedProduct] = useState(null);

  return (
    <StyledSearchBarStory>
      <SearchBarComponent
        data={dataMap}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        searchedProduct={searchedProduct}
        setSearchedProduct={setSearchedProduct}
      />
    </StyledSearchBarStory>
  );
};

export default {
  title: "SearchBar",
  component: SearchBarComponentStory,
};
