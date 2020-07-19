import React from "react";
import styled from "styled-components/macro";
import { LoadingBarCreator } from "./ResultList";
import { connect } from "react-redux";

//const res = await axios.get(`https://forkify-api.herokuapp.com/api/get?rId`);

function recipe({ state }) {
  const { recipesData, loading } = state.recipesInfo;
  console.log(state);
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
