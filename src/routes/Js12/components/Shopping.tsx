import React from "react";
import styled from "styled-components/macro";

export default () => {
  return (
    <Shopping>
      <Heading2>My shopping List</Heading2>
      <ShoppingList>
        <li>hi everybody</li>
      </ShoppingList>
      <Copyright>
        &copy; by Jonas Schmedtmann. Powered by
        <Link href="http://food2fork.com" target="_blank">
          Food2Fork.com
        </Link>
      </Copyright>
    </Shopping>
  );
};

const Shopping = styled.div`
  padding: 3rem 4rem;
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

const ShoppingList = styled.ul`
  list-style: none;
  max-height: 77rem;
`;
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
