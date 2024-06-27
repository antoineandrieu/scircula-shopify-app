import styled from "styled-components";

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  padding: 15px;
  background-color: #ffffff;
  box-shadow: rgba(150, 150, 171, 0.2) 0px 7px 20px 0px;

  @media screen and (max-width: 1024px) {
    min-height: 200px;
  }
`;

export default StyledContainer;
