import React from "react";
import styled from "styled-components/macro";
import { LoadingBarCreator } from "./ResultList";
import { connect } from "react-redux";

//const res = await axios.get(`https://forkify-api.herokuapp.com/api/get?rId`);

function recipe({ state }) {
  const { loading } = state.recipesInfo;
  const { ingredients } = state.recipesInfo.recipesData;
  console.log(state);
  //units unification
  const testArr = [1, 2, 3, 4, 5, 6, 7];
  const criteria = [11, 12, 13, 14, 15, 16, 7];
  const result = testArr.findIndex((el) => criteria.includes(el));
  console.log(result);
  return <Recipe>{loading ? <LoadingBarCreator /> : null}</Recipe>;
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
