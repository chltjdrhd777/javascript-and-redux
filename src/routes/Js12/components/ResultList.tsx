import React from "react";
import styled from "styled-components/macro";
import { connect } from "react-redux";
import { State } from "../ReduxStore";
import icons from "../img/icons.svg";

//I changed the previous code with a much easier way.
function textSplit(text: string) {
  if (text.split(" ").length >= 2) {
    const renewedText = text.split(" ", 2).join(" ");
    return `${renewedText} ...`;
  }
  return text;
}

function resultList({ state }) {
  const { result } = state;

  const newArray: any[] = [];
  for (let i = 0; i < Math.floor(result.length / 7 + 1); i++) {
    const slicing = result.slice(i * 7, (i + 1) * 7);
    if (slicing.length <= 7 && slicing.length > 0) {
      newArray.push(slicing);
    }
  }

  console.log(newArray);

  return (
    <Result>
      {state.loading ? (
        <NowLoading>
          <LoadingSVG
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <use xlinkHref={`${icons}#icon-cw`} />
          </LoadingSVG>
        </NowLoading>
      ) : null}

      {newArray.length > 0 ? (
        <>
          <ResultList>
            {newArray[0].map((each: any) => (
              <li key={each.recipe_id}>
                <ResultLink href={`#${each.recipe_id}`}>
                  <Figure>
                    <img src={each.image_url} alt="" />
                  </Figure>

                  <ResultData>
                    <ResultName>{textSplit(each.title)}</ResultName>
                    <ResultAuthor>{each.publisher}</ResultAuthor>
                  </ResultData>
                </ResultLink>
              </li>
            ))}
          </ResultList>

          <ChangePage>
            <Prev>
              <ButtonIcon
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <use xlinkHref={`${icons}#icon-triangle-left`} />
              </ButtonIcon>
            </Prev>

            <Next>
              <ButtonIcon
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <use xlinkHref={`${icons}#icon-triangle-right`} />
              </ButtonIcon>
            </Next>
          </ChangePage>
        </>
      ) : null}
    </Result>
  );
}

///Finally, I can use "state" from redux. it is cooler than I use the isolated useState.
function mapStateToProps(state: State) {
  return { state };
}

export default connect(mapStateToProps)(resultList);

//////? styled component ////////

const NowLoading = styled.div`
  margin: 5rem auto;
  text-align: center;
`;
const LoadingSVG = styled.svg`
  @keyframes rotateThis {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  height: 5.5rem;
  width: 5.5rem;
  fill: #f59a83;
  transform-origin: 45% 50%;
  animation: rotateThis 1.5s infinite linear;
`;

const Result = styled.div`
  padding: 3rem 0;
`;
const ResultList = styled.ul`
  list-style: none;
`;
const ChangePage = styled.div`
  margin-top: 3rem;
  padding: 0 3rem;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
`;

const ResultLink = styled.a`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    padding: 1.5rem 3rem;
    transition: all 0.3s;
    border-right: 1px solid #fff;
    text-decoration: none;
    &:hover {
      background-color: #f9f5f3;
      transform: translateY(-2px);
    }
  }
`;

const Figure = styled.figure`
  flex: 0 0 5.5rem;
  border-radius: 50%;
  overflow: hidden;
  height: 5.5rem;
  margin-right: 2rem;
  position: relative;
  backface-visibility: hidden;
  &::before {
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(to right bottom, #fbdb89, #f48982);
    opacity: 0.4;
  }
  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s;
  }
`;
const ResultData = styled.div``;
const ResultName = styled.h4`
  font-size: 1.3rem;
  color: #f59a83;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 0.3rem;
`;
const ResultAuthor = styled.p`
  font-size: 1.1rem;
  color: #968b87;
  text-transform: uppercase;
  font-weight: 600;
`;

const Prev = styled.button``;
const ButtonIcon = styled.svg``;
const Next = styled(Prev)``;
