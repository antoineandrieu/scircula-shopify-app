import React from "react";
import styled from "styled-components";

const StyledSearchBarComponent = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 30px 1fr;
  border-radius: 4px;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  .search-icon {
    display: grid;
    place-items: center;
    padding: 5px;
  }

  input {
    width: 100%;
    border: none;
    background: none;
    outline: none;
    font-size: 17px;
    font-family: inherit;
  }
`;

const StyledGreyedSearchBar = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 30px 1fr;
  border-radius: 4px;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  pointer-events: none;
  background-color: grey;
  color: white;

  .search-icon {
    display: grid;
    place-items: center;
    padding: 5px;
  }

  input {
    width: 100%;
    border: none;
    background: none;
    outline: none;
    font-size: 17px;
    font-family: inherit;
    pointer-events: none;
  }
`;

interface SearchBarProps {
  data: Array<{
    externalId: string;
    name: string;
  }>;
  selectedProduct: { externalId: string; name: string; image: string };
  setSelectedProduct: Function;
  searchedProduct: string;
  setSearchedProduct: Function;
  nFirstData?: number;
  loaderState: Boolean;
}

const SearchBarComponent = ({
  data,
  selectedProduct,
  setSelectedProduct,
  searchedProduct,
  setSearchedProduct,
  nFirstData = 10,
  loaderState,
}: SearchBarProps) => {
  const handleChandedEvent = event => {
    setSelectedProduct(null);
    setSearchedProduct(event.target.value);
  };

  if (loaderState === true) {
    return (
      <StyledGreyedSearchBar>
        <div className="search-icon">
          <WhiteSearchIcon />
        </div>
        <input></input>
      </StyledGreyedSearchBar>
    );
  } else
    return (
      <StyledSearchBarComponent>
        <div className="search-icon">
          <SearchIcon />
        </div>
        <input
          value={searchedProduct}
          onChange={e => handleChandedEvent(e)}
          placeholder="Search a product"
        ></input>
        {searchedProduct && !selectedProduct && (
          <DisplayProductsList
            data={data}
            setSelectedProduct={setSelectedProduct}
            selectedProduct={selectedProduct}
            nFirstData={nFirstData}
            searchedProduct={searchedProduct}
            setSearchedProduct={setSearchedProduct}
          />
        )}
      </StyledSearchBarComponent>
    );
};

const StyledDisplayProductList = styled.div`
  width: 100%;
  height: auto;
  position: absolute;
  top: 30px;
  background: #ffffff;
  border-radius: 4px;
  border: 2px solid grey;
  border-top: none;
  z-index: 100;

  .product-result {
    padding-left: 20px;
    width: 100%;
    height: 50px;
    align-items: center;
    display: flex;
    justify-content: flex-start;
    cursor: pointer;
    background: #ffffff;
    color: black;
  }

  .product-result:last-child {
    border-radius: 4px;
  }

  .product-result:first-child {
    border-top: 1px solid black;
  }

  .product-result:hover {
    background-color: #dad6d6;
  }
`;

interface ProductsProps {
  data: Array<{
    externalId: string;
    name: string;
  }>;
  nFirstData: number;
  selectedProduct: { externalId: string; name: string; image: string };
  setSelectedProduct: Function;
  searchedProduct: string;
  setSearchedProduct: Function;
}

const DisplayProductsList = (props: ProductsProps) => {
  let remainingItems = props?.data?.filter(elem =>
    elem.name.toLowerCase().includes(props.searchedProduct.toLowerCase()),
  );

  return (
    <StyledDisplayProductList>
      {remainingItems?.length < 1 && (
        <div className="product-result">No results found</div>
      )}
      {remainingItems?.map(
        (product, index) =>
          index < props.nFirstData && (
            <div
              key={"Product-" + product.name}
              className="product-result"
              onClick={() => (
                props.setSelectedProduct(product),
                props.setSearchedProduct(product.name)
              )}
            >
              {product.name}
            </div>
          ),
      )}
    </StyledDisplayProductList>
  );
};

export default SearchBarComponent;

const StyledSearchIcon = styled.svg`
  height: 100%;
  width: 100%;
`;

const SearchIcon = () => (
  <StyledSearchIcon viewBox="0 0 15 14">
    <path
      d="M14.796 12.1039L11.8749 9.37799C11.743 9.25496 11.5643 9.1866 11.3768 9.1866H10.8992C11.7079 8.22146 12.1884 7.00752 12.1884 5.68694C12.1884 2.54545 9.46065 0 6.0942 0C2.72774 0 0 2.54545 0 5.68694C0 8.82843 2.72774 11.3739 6.0942 11.3739C7.50934 11.3739 8.81021 10.9255 9.84447 10.1709V10.6165C9.84447 10.7915 9.91772 10.9583 10.0496 11.0813L12.9707 13.8072C13.2461 14.0643 13.6914 14.0643 13.9639 13.8072L14.7931 13.0335C15.0685 12.7765 15.0685 12.3609 14.796 12.1039ZM6.0942 9.1866C4.02276 9.1866 2.34392 7.62269 2.34392 5.68694C2.34392 3.75393 4.01983 2.18729 6.0942 2.18729C8.16564 2.18729 9.84447 3.7512 9.84447 5.68694C9.84447 7.61996 8.16857 9.1866 6.0942 9.1866Z"
      fill="#6A7984"
    />
  </StyledSearchIcon>
);

const StyledWhiteSearchIcon = styled.svg`
  height: 100%;
  width: 100%;
`;

const WhiteSearchIcon = () => (
  <StyledWhiteSearchIcon viewBox="0 0 15 14">
    <path
      d="M14.796 12.1039L11.8749 9.37799C11.743 9.25496 11.5643 9.1866 11.3768 9.1866H10.8992C11.7079 8.22146 12.1884 7.00752 12.1884 5.68694C12.1884 2.54545 9.46065 0 6.0942 0C2.72774 0 0 2.54545 0 5.68694C0 8.82843 2.72774 11.3739 6.0942 11.3739C7.50934 11.3739 8.81021 10.9255 9.84447 10.1709V10.6165C9.84447 10.7915 9.91772 10.9583 10.0496 11.0813L12.9707 13.8072C13.2461 14.0643 13.6914 14.0643 13.9639 13.8072L14.7931 13.0335C15.0685 12.7765 15.0685 12.3609 14.796 12.1039ZM6.0942 9.1866C4.02276 9.1866 2.34392 7.62269 2.34392 5.68694C2.34392 3.75393 4.01983 2.18729 6.0942 2.18729C8.16564 2.18729 9.84447 3.7512 9.84447 5.68694C9.84447 7.61996 8.16857 9.1866 6.0942 9.1866Z"
      fill="White"
    />
  </StyledWhiteSearchIcon>
);
