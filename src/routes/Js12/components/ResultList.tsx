import React from "react";
import styled from "styled-components/macro";

export default () => {
  return (
    <Result>
      <ResultList></ResultList>
      <ResultPage></ResultPage>
    </Result>
  );
};

const Result = styled.div`
  padding: 3rem 0;
`;
const ResultList = styled.ul`
  list-style: none;
`;
const ResultPage = styled.div`
  margin-top: 3rem;
  padding: 0 3rem;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
`;
