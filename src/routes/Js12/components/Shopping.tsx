import React from "react";
import styled from "styled-components/macro";
import { connect } from "react-redux";
import icons from "../img/icons.svg";
import { Plus } from "./Recipe";

function shopping({ state, deleteList }) {
  console.log(state);
  const { items } = state.shoppingList;

  return (
    <Shopping>
      <Heading2>My shopping List</Heading2>
      <ShoppingUl>
        {items.length >= 1 ? (
          <>
            {items.map((el: any) => (
              <ShoppingLi key={el.id}>
                <ShoppingCount>
                  <input
                    type="number"
                    defaultValue={el.count}
                    onChange={(e: any) => console.log(e.target.value)}
                    step={el.count}
                    min={0}
                  ></input>
                  <p>{el.unit}</p>
                </ShoppingCount>
                <ShoppingIngredient>{el.ingredient}</ShoppingIngredient>
                <ShoppingDelete onClick={() => deleteList(el.id)}>
                  <svg>
                    <use xlinkHref={`${icons}#icon-circle-with-cross`}></use>
                  </svg>
                </ShoppingDelete>
              </ShoppingLi>
            ))}
          </>
        ) : null}
      </ShoppingUl>
      <Copyright>
        &copy; by Jonas Schmedtmann. Powered by
        <Link href="http://food2fork.com" target="_blank">
          Food2Fork.com
        </Link>
      </Copyright>
    </Shopping>
  );
}

function mapStateToProps(state: any) {
  return { state };
}
function mapDispatchToProps(dispatch: any) {
  return {
    deleteList: (id: string) => {
      dispatch({ type: "deleteList", id });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(shopping);

const Shopping = styled.div`
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
`;
const Heading2 = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #f59a83;
  text-transform: uppercase;
  margin-bottom: 2.5rem;
  text-align: center;
  transform: skewY(-3deg);
`;

const ShoppingUl = styled.ul`
  list-style: none;
  max-height: 77rem;
`;

const ShoppingDelete = styled(Plus)`
  opacity: 0;
  transition: opacity 0.2s;
  margin-top: 1.5px;
  margin-left: 5px;
  & svg {
    width: 15px;
    height: 15px;
  }
`;

const ShoppingLi = styled.li`
  padding: 1.3rem 0;
  border-bottom: 1px solid #f2efee;
  position: relative;
  display: flex;
  flex-direction: row;
  width: 200px;
  height: auto;

  &:hover {
    ${ShoppingDelete} {
      opacity: 1;
    }
  }
`;

const ShoppingCount = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 1rem;
  justify-content: center;
  align-items: center;
  height: 30px;
  flex: 0 0 7.5rem;
  padding: 0.4rem 0.5rem;
  border: 1px solid #f2efee;
  border-radius: 3px;
  margin-right: 5px;
  & input {
    font-size: 1.3rem;
    border: 1px solid #f2efee;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    text-align: center;
    width: 50px;
  }
  & input:focus {
    outline: none;
    background: #f2efee;
  }

  & p {
    font-size: 1.3rem;
    vertical-align: middle;
    height: 21px;
    margin-left: 2px;
    margin-right: 3.5px;
    position: relative;
  }
`;

const ShoppingIngredient = styled.p``;

const Copyright = styled.div`
  color: #968b87;
  font-size: 1.2rem;
  margin-top: auto;
`;
const Link = styled.a`
  &:link,
  &:visited {
    color: #968b87;
  }
`;
