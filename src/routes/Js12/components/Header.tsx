import React from "react";
import styled from "styled-components/macro";
import logo from "../img/logo.png";
import icons from "../img/icons.svg";

import { connect } from "react-redux";
import { mapDispatchToProps as inherit } from "./ResultList";

import axios from "axios";

async function getAPI(query: string) {
  try {
    const res = await axios.get(
      `https://forkify-api.herokuapp.com/api/search?q=${query}`
    );
    return res.data.recipes;
  } catch (error) {
    alert("Sorry, there is no recipe for your search");
  }
}

function header({ state, textChange, textSubmitted, nowLoading, inherited }) {
  const { likesArr } = state.recipesInfo;
  const sendSearchValue = (e: any) => {
    e.preventDefault();
    if (state.reducer.value === "") {
      alert("input something");
    } else {
      //! Behold. getAPI is asynchronous
      //! Whenever you make codes, take into account that getAPI() returns value later.
      nowLoading();
      getAPI(state.reducer.value).then((res) => textSubmitted(res));
      textChange("");
    }
  };

  async function getRecipe(id: string) {
    try {
      inherited.makeRecipeLoading();
      const res = await axios.get(
        `https://forkify-api.herokuapp.com/api/get?rId=${id}`
      );
      inherited.sendRecipeInfo(res.data.recipe);
      inherited.makeRecipeLoading();
    } catch (error) {
      console.log(error);
    }
  }

  /* //! don't want to type "pizza" redundantly
  const test = (e: any) => {
    e.preventDefault();
    nowLoading();
    getAPI("pizza").then((res) => textSubmitted(res));
    textChange("");
  };
  window.addEventListener("load", (e) => test(e));
  ////////////! ////////////////////////////////////////////// */
  ///////previous mistacke//////////////////
  /* const [state, setState] = useState({ value: "", result: [] });
  const handleChange = (e: any) => {
    setState({ ...state, value: e.target.value });
  };

  //! NOTE//
  //? If you don't put "await" infront of the result.getResults()
  //? you would see that your "console.log" shows empty array because, it is asynchronous function so that console.log(state) is runned befor we get axios information

  //? "await" is like = "hey, you should wait for processing this like synchronous function"
  //? "async" is like = "hey, this function's EC is all asynchronous."
  const summitted = async (e: any) => {
    e.preventDefault();
    const result = new Search(state.value);
    await result.getResults();
    setState({ value: "", result: result.result });
  };
  console.log(state); */
  ////////////////////////////////////////////////

  //! you know what?
  //? I figured out this way was worse because I have to suffer from dealing with state in the other module.
  //? to avoid this fuxx shit, I am gonna use "redux"
  return (
    <Header>
      <Logo src={logo} />
      <Form onSubmit={sendSearchValue}>
        <SearchBar
          type="text"
          value={state.reducer.value}
          onChange={(e) => {
            textChange(e.target.value);
          }}
          placeholder="Search your recipes"
        />
        <SearchButton>
          <Icons
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <use xlinkHref={`${icons}#icon-magnifying-glass`}></use>
          </Icons>
          <span>Search</span>
        </SearchButton>
      </Form>

      <Likes>
        <LikesField>
          <LikesIcon
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <use xlinkHref={`${icons}#icon-heart`}></use>
          </LikesIcon>
        </LikesField>

        <LikesPanel>
          <LikesUl>
            {likesArr.length > 0
              ? likesArr.map((el) => (
                  <LikesLi key={el.recipe_id}>
                    <LikesA
                      href={`#${el.recipe_id}`}
                      onClick={(e: any) => {
                        e.preventDefault();
                        getRecipe(el.recipe_id);
                      }}
                    >
                      <LikesFigure>
                        <img src={el.image_url} alt="img" />
                      </LikesFigure>
                      <LikesData>
                        <LikesH4>{el.title}</LikesH4>
                        <LikesP>{el.publisher}</LikesP>
                      </LikesData>
                    </LikesA>
                  </LikesLi>
                ))
              : null}
          </LikesUl>
        </LikesPanel>
      </Likes>
    </Header>
  );
}

//////? redux part //////
function mapStateToProps(state: any) {
  return { state };
}

function mapDispatchToProps(dispatch: any) {
  return {
    textChange: (typing: string) => {
      dispatch({ type: "searchList", typing });
    },
    textSubmitted: (result: any) => {
      dispatch({ type: "submitted", submittedResult: result });
    },
    nowLoading: () => {
      dispatch({ type: "nowLoading" });
    },
    inherited: inherit(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(header);

//? styled component////

const Header = styled.header`
  grid-area: head;
  background-color: #f9f5f3;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  margin-left: 4rem;
  height: 4.5rem;
  display: block;
`;

const Form = styled.form`
  background: #fff;
  border-radius: 10rem;
  display: flex;
  align-items: center;
  padding-left: 3rem;
  transition: all 0.3s;
  &:focus-within {
    transform: translateY(-2px);
    box-shadow: 0 0.7rem 3rem rgba(101, 90, 86, 0.08);
  }
`;
const SearchBar = styled.input`
  border: none;
  background: none;
  font-family: inherit;
  color: inherit;
  font-size: 1.7rem;
  width: 30rem;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #dad0cc;
  }
`;

const Button = styled.button`
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
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled(Button)``;

interface IconProps {
  xmlns: string;
  xmlnsXlink: string;
}
const Icons = styled.svg<IconProps>`
  height: 2rem;
  width: 2rem;
  fill: white;
`;

//align-self : how to modulate each component in the grid sector
//note : align-self only affects the target component

//align-self : center, strech, start, end ....
const Likes = styled.div`
  position: relative;
  align-self: stretch;
  padding: 0;
  transition: all 0.3s;
  &:hover {
    background-color: #f2efee;
  }
`;
const LikesField = styled.div`
  cursor: pointer;
  padding: 0 4rem;
  display: flex;
  align-items: center;
  height: 100%;
`;
const LikesPanel = styled.div`
  visibility: hidden;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 10rem;
  z-index: 10;
  padding: 2rem 0;
  width: 30rem;
  background-color: #fff;
  box-shadow: 0 0.8rem 5rem 2rem rgba(101, 90, 86, 0.1);
  transition: all 0.3s;
  ${Likes}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;
const LikesIcon = styled.svg`
  fill: #f59a83;
  height: 3.5rem;
  width: 3.5rem;
`;

const LikesUl = styled.ul`
  list-style: none;
`;

const LikesLi = styled.li``;
const LikesA = styled.a`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    padding: 1.5rem 3rem;
    transition: all 0.3s;
    border-right: 1px solid #fff;
    text-decoration: none;
  }
  &:hover {
    background: #f9f5f3;
    transform: translateY(-2px);
  }
`;
const LikesFigure = styled.figure`
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
const LikesData = styled.div``;
const LikesH4 = styled.h4`
  font-size: 1.3rem;
  color: #f59a83;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 0.3rem;
`;
const LikesP = styled.p`
  font-size: 1.1rem;
  color: #968b87;
  text-transform: uppercase;
  font-weight: 600;
`;
