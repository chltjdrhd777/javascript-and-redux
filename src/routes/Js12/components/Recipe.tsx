import React from "react";
import styled from "styled-components/macro";
import { LoadingBarCreator } from "./ResultList";
import { connect } from "react-redux";

function recipe({ state }) {
  const { loading, recipesData } = state.recipesInfo;
  const { image_url, title } = state.recipesInfo.recipeOriginal;
  console.log(state);
  return (
    <Recipe>
      {loading ? <LoadingBarCreator /> : null}
      {recipesData.length > 0 && loading === false ? (
        <Figure>
          <RecipeImage src={image_url} alt="" />
          <RecipeTitle>
            <span>{title}</span>
          </RecipeTitle>
        </Figure>
      ) : null}
    </Recipe>
  );
}

///redux///
function mapStateToProps(state: any) {
  return { state };
}

export default connect(mapStateToProps)(recipe);

const Recipe = styled.div`
  background: #f9f5f3;
  border-top: 1px solid #fff;
`;

const Figure = styled.figure`
  height: 30rem;
  position: relative;
  transform: scale(1.03) translateY(-5px);
  transform-origin: top;
  &::before {
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(to right bottom, #fbdb89, #f48982);
    opacity: 0.6;
  }
`;
const RecipeImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const RecipeTitle = styled.h1`
  position: absolute;
  bottom: 0%;
  left: 50%;
  transform: translate(-50%, 20%) skewY(-6deg);
  color: white;
  font-weight: 700;
  font-size: 2.75rem;
  text-transform: uppercase;
  width: 70%;
  line-height: 1.95;
  text-align: center;
  & span {
    padding: 1.3rem 2rem;
    background-image: linear-gradient(to right bottom, #fbdb89, #f48982);
  }
`;
