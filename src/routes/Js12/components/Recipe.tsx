import React from "react";
import styled from "styled-components/macro";
import { LoadingBarCreator } from "./ResultList";
import { connect } from "react-redux";
import icons from "../img/icons.svg";

function recipe({ state, changeServingAmount, sendDataToShoppingUI }) {
  const { loading, recipesData } = state.recipesInfo;
  const { servingAmount, updatedArr } = state.recipesInfo.serving;
  const {
    image_url,
    title,
    publisher,
    source_url,
  } = state.recipesInfo.recipeOriginal;

  return (
    <Recipe>
      {loading ? <LoadingBarCreator /> : null}
      {recipesData.length > 0 && loading === false ? (
        <>
          <Figure>
            <RecipeImage src={image_url} alt="" />
            <RecipeTitle>
              <span>{title}</span>
            </RecipeTitle>
          </Figure>

          <CountingPart />
          <ListingPart />
        </>
      ) : null}
    </Recipe>
  );

  function recipeTimeCal(arr: []) {
    const time = arr.length * 10;
    return time;
  }

  function CountingPart() {
    return (
      <RecipeCal>
        <Minutes>
          <TimerSVG>
            <use xlinkHref={`${icons}#icon-stopwatch`}></use>
          </TimerSVG>
          <TimingInfo>{recipeTimeCal(recipesData) * servingAmount}</TimingInfo>
          <TimingText>minutes</TimingText>
        </Minutes>

        <Serving>
          <ServingSVG>
            <use xlinkHref={`${icons}#icon-man`}></use>
          </ServingSVG>
          <ServingInfo>{servingAmount}</ServingInfo>
          <ServingText>servings</ServingText>

          <ServingButtonPart>
            <Minus onClick={() => changeServingAmount("dec")}>
              <svg>
                <use xlinkHref={`${icons}#icon-circle-with-minus`}></use>
              </svg>
            </Minus>
            <Plus onClick={() => changeServingAmount("inc")}>
              <svg>
                <use xlinkHref={`${icons}#icon-circle-with-plus`}></use>
              </svg>
            </Plus>
          </ServingButtonPart>
        </Serving>

        <LikeItPart>
          <LikeItSVG>
            <use xlinkHref={`${icons}#icon-heart-outlined`}></use>
          </LikeItSVG>
        </LikeItPart>
      </RecipeCal>
    );
  }

  function ListingPart() {
    return (
      <ListContainer>
        <ListUl>
          {updatedArr.map((el: any) => (
            <ItemLi key={updatedArr.indexOf(el)}>
              <CheckSVG>
                <svg>
                  <use xlinkHref={`${icons}#icon-check`}></use>
                </svg>
              </CheckSVG>

              <Count>{el.count}</Count>
              <Ingredient>
                <Unit>{el.unit}</Unit>
                {el.ingredient}
              </Ingredient>
            </ItemLi>
          ))}
        </ListUl>
        <SendDataToShoppingButton
          onClick={() => sendDataToShoppingUI(updatedArr)}
        >
          <svg>
            <use xlinkHref={`${icons}#icon-shopping-cart`}></use>
          </svg>
          <span>Add to shopping list</span>
        </SendDataToShoppingButton>

        <ReferencePart>
          <Heading>How to cook it</Heading>
          <Paragraph>
            Try this by yourself. this recipe is designed by{" "}
            <Author>{publisher}</Author>. please check out the website.
          </Paragraph>
        </ReferencePart>
        <ReferenceLink href={source_url} target={"_blank"}>
          <span>Directions</span>
          <svg>
            <use xlinkHref={`${icons}#icon-triangle-right`}></use>
          </svg>
        </ReferenceLink>
      </ListContainer>
    );
  }
}

///redux///
function mapStateToProps(state: any) {
  return { state };
}

function mapDispatchToProps(dispatch: any) {
  return {
    changeServingAmount: (btn: string) => {
      dispatch({ type: "servingController", btn });
    },
    sendDataToShoppingUI: (updatedArr: []) => {
      dispatch({ type: "receiveThisShoppingList", updatedArr });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(recipe);

const ServingButtonPart = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1.5rem;
  width: 40px;
  justify-content: space-between;
  opacity: 0;
  transition: opacity 0.5s;
`;

const Recipe = styled.div`
  background: #f9f5f3;
  border-top: 1px solid #fff;
  &:hover {
    ${ServingButtonPart} {
      opacity: 1;
    }
  }
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

const RecipeCal = styled.div`
  display: flex;
  align-items: center;
  padding: 6rem 3rem 3rem 3rem;
`;

const Minutes = styled.div`
  font-size: 1.5rem;
  text-transform: uppercase;
  display: flex;
  align-items: center;
`;
const TimerSVG = styled.svg`
  height: 2rem;
  width: 2rem;
  fill: #f59a83;
  margin-right: 1rem;
`;
const TimingInfo = styled.span`
  margin-right: 0.4rem;
  font-weight: 600;
`;
const TimingText = styled.span``;

const Serving = styled(Minutes)``;
const ServingSVG = styled(TimerSVG)`
  margin-left: 10px;
`;
const ServingInfo = styled(TimingInfo)``;
const ServingText = styled(TimingText)``;

export const Plus = styled.button`
  height: 1.75rem;
  width: 1.75rem;
  border: none;
  background: none;
  cursor: poiunter;
  & svg {
    height: 100%;
    width: 100%;
    fill: #f59a83;
    transition: all 0.3s;
  }
  &:focus {
    outline: none;
  }
  &:hover svg {
    fill: #f48982;
    transform: translateY(-1px);
  }
  &:active svg {
    fill: #f48982;
    transform: translateY(0);
  }
`;
const Minus = styled(Plus)``;

const LikeItPart = styled.button`
  background-image: linear-gradient(to right bottom, #fbdb89, #f48982);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  height: 4.5rem;
  width: 4.5rem;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.07);
  }
  &:focus {
    outline: none;
  }
  & svg {
    height: 2.75rem;
    width: 2.75rem;
    fill: #fff;
  }
`;
const LikeItSVG = styled.svg``;

const ListContainer = styled.div`
  padding: 4rem 5rem;
  font-size: 1.5rem;
  line-height: 1.4;
  background-color: #f2efee;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ListUl = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1.5rem;
  grid-row-gap: 2.5rem;
  list-style: none;
  margin-bottom: 3rem;
`;

const ItemLi = styled.li`
  display: flex;
  & svg {
    height: 1.6rem;
    width: 1.6rem;
    fill: #f59a83;
    border: 1px solid #f59a83;
    border-radius: 50%;
    padding: 2px;
    margin-right: 1rem;
  }
`;
const CheckSVG = styled.div`
  width: 2rem;
  height: 2rem;
`;

const Count = styled.div`
  margin-right: 0.5rem;
`;
const Unit = styled.span`
  margin-right: 0.5rem;
`;
const Ingredient = styled.div``;

const SendDataToShoppingButton = styled.button`
  padding: 1.3rem 3rem;
  font-size: 1.4rem;
  background-image: linear-gradient(to right bottom, #fbdb89, #f48982);
  border-radius: 10rem;
  border: none;
  text-transform: uppercase;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: translateY(1px);
  }
  &:focus {
    outline: none;
  }
  & svg {
    height: 1.8rem;
    width: 1.8rem;
    fill: white;
    margin-right: 1rem;
  }
`;

const ReferencePart = styled.div`
  padding: 4rem;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Heading = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #f59a83;
  text-transform: uppercase;
  margin-bottom: 2.5rem;
  text-align: center;
  transform: skewY(-3deg);
`;
const Paragraph = styled.p`
  font-size: 1.5rem;
  text-align: center;
  width: 90%;
  margin-bottom: 3rem;
  color: #968b87;
`;
const Author = styled.span`
  font-weight: 700;
`;

const ReferenceLink = styled(SendDataToShoppingButton.withComponent("a"))`
  text-decoration: none;
`;
