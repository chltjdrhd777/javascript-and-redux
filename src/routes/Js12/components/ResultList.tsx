import React from "react";
import styled from "styled-components/macro";
import { connect } from "react-redux";
import icons from "../img/icons.svg";
import axios from "axios";

//I changed the previous code with a much easier way.
function textSplit(text: string) {
  if (text.split(" ").length >= 2) {
    const renewedText = text.split(" ", 2).join(" ");
    return `${renewedText} ...`;
  }
  return text;
}

export function LoadingBarCreator() {
  return (
    <NowLoading>
      <LoadingSVG
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <use xlinkHref={`${icons}#icon-cw`} />
      </LoadingSVG>
    </NowLoading>
  );
}

function resultList({
  state,
  incre,
  decre,
  sendRecipeInfo,
  makeRecipeLoading,
}) {
  const {
    resultPage: { presentPage, totalPage },
  } = state.reducer;

  const decrease = () => {
    if (presentPage > 0) {
      decre();
    }
  };

  const increase = () => {
    if (totalPage.length - 1 > presentPage) {
      incre();
    }
  };

  async function getRecipe(id: string) {
    try {
      makeRecipeLoading();
      const res = await axios.get(
        `https://forkify-api.herokuapp.com/api/get?rId=${id}`
      );
      sendRecipeInfo(res.data.recipe);
      makeRecipeLoading();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Result>
      {state.reducer.loading ? <LoadingBarCreator /> : null}

      {totalPage.length > 0 ? (
        <>
          <ResultList>
            {totalPage[presentPage].map((each: any) => (
              <li key={each.recipe_id}>
                <ResultLink
                  href={`#${each.recipe_id}`}
                  onClick={(e: any) => {
                    e.preventDefault();
                    getRecipe(each.recipe_id);
                  }}
                >
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
            {presentPage === 0 || totalPage.length === 1 ? null : (
              <Prev onClick={decrease}>
                <ButtonIcon
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <use xlinkHref={`${icons}#icon-triangle-left`} />
                </ButtonIcon>
              </Prev>
            )}

            {totalPage.length - 1 === presentPage ? null : (
              <Next onClick={increase}>
                <ButtonIcon
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <use xlinkHref={`${icons}#icon-triangle-right`} />
                </ButtonIcon>
              </Next>
            )}
          </ChangePage>
        </>
      ) : null}
    </Result>
  );
}

///Finally, I can use "state" from redux. it is cooler than I use the isolated useState.
function mapStateToProps(state: any) {
  return { state };
}

function mapDispatchToProps(dispatch: any) {
  return {
    incre: () => {
      dispatch({ type: "increasePage" });
    },
    decre: () => {
      dispatch({ type: "decreasePage" });
    },
    sendRecipeInfo: (resultRecipeObj: {}) => {
      dispatch({ type: "addRecipes", resultRecipeObj });
    },
    makeRecipeLoading: () => {
      dispatch({ type: "recipeLoading" });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(resultList);

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
  height: 500px;
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

const ChangePage = styled.div`
  width: 100%;
  margin-top: 3rem;
  padding: 0 3rem;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
`;

const Prev = styled.button`
  fill: #f59a83;
  font-size: 1.2rem;
  border: none;
  background: #f9f5f3;
  padding: 0.8rem 1.2rem;
  border-radius: 10px;
  cursor: pointer;
  float: left;
  transition: all 0.2s;
  &:hover {
    color: #f48982;
    background: #f2efee;
  }
  &:focus {
    outline: none;
  }
`;

const ButtonIcon = styled.svg`
  width: 2rem;
  height: 2rem;
`;
const Next = styled(Prev)`
  float: right;
`;
