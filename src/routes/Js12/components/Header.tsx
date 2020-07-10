import React from "react";
import styled from "styled-components/macro";
import logo from "../img/logo.png";
import icons from "../img/icons.svg";

export default () => {
  return (
    <Header>
      <Logo src={logo} />
      <Form>
        <SearchBar type="text" placeholder="Search your recipes" />
        <SearchButton>
          {/* //PLEASE REMEMBER// it is the way how to import svg REALLY
          SUCxxxxxxxxxxxxxxx */}
          <Icons
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <use xlinkHref={`${icons}#icon-magnifying-glass`}></use>
          </Icons>
          <span>Search</span>
        </SearchButton>
      </Form>
    </Header>
  );
};

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
