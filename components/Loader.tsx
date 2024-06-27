import styled from "styled-components";

const StyledResetSVG = styled.svg`
  height: 100%;
  width: 100%;
`;

const ResetSVG = () => (
  <StyledResetSVG viewBox="0 0 352 512">
    <svg xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
      />
    </svg>
  </StyledResetSVG>
);
const StyledLoader = styled.div`
  z-index: 200;
  position: absolute;
  display: grid;
  grid-template-rows: minmax(auto, 10%) minmax(auto, 90%);
  top: 0px;
  bottom: 0;
  width: 99%;
  height: 100%;
  background-color: rgba(177, 177, 177, 0.9);

  .loader-container {
    height: 100%;
    width: 100%;
    grid-row: 2;
    display: flex;
    place-items: center;
  }

  .close-div {
    grid-row: 1;
    width: 100%;
    height: 100%;
  }

  .close-button {
    width: 50px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loader,
  .loader:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
  .loader {
    margin: 60px auto;
    font-size: 10px;
    text-indent: -9999em;
    border-top: 1.1em solid rgba(255, 255, 255, 0.2);
    border-right: 1.1em solid rgba(255, 255, 255, 0.2);
    border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
    border-left: 1.1em solid #4ab9c3;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
  }
  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  /* @media screen and (max-width: 500px) {
    top: 150px;
    width: 99%;
  } */
`;

interface LoaderProps {
  setIsTimedOut: Function;
  isTimedOut: Boolean;
  setLoader: Function;
}

function Loader({ setIsTimedOut, isTimedOut, setLoader }: LoaderProps) {
  return (
    <StyledLoader>
      {isTimedOut && (
        <div className="close-div">
          <button className="close-button" onClick={() => setLoader(false)}>
            <ResetSVG />
          </button>
        </div>
      )}
      <div className="loader-container">
        <div className="loader">Loading...</div>
      </div>
    </StyledLoader>
  );
}

export default Loader;
