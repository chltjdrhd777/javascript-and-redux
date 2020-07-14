import React from "react";
import styled from "styled-components/macro";
import { connect } from "react-redux";
import { State } from "../ReduxStore";

function resultList({ state }) {
  console.log(state);
  return (
    <Result>
      <ResultList></ResultList>
      <ResultPage></ResultPage>
    </Result>
  );
}

///Finally, I can use "state" from redux. it is cooler than I use the isolated useState.
function mapStateToProps(state: State) {
  return { state };
}

export default connect(mapStateToProps)(resultList);

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
