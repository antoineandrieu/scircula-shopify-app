import styled from "styled-components";

export const StyledUL = styled.ul<{
  listCheckColor;
}>`
  margin: unset;
  list-style: none;
  padding-left: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  li {
    margin-bottom: 15px;
    position: relative;
  }
  li:before {
    content: "";
    position: absolute;
    top: 6px;
    left: -25px;
    height: 6px;
    width: 12px;
    transform: rotate(-50deg);
    border: 2px solid ${props => props.listCheckColor};
    border-width: 0 0 2px 2px;
  }
`;
