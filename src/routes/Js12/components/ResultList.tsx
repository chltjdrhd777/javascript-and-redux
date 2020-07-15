import React from "react";
import styled from "styled-components/macro";
import { connect } from "react-redux";
import { State } from "../ReduxStore";

//I changed the previous code with a much easier way.
function textSplit(text: string) {
  if (text.split(" ").length >= 2) {
    const renewedText = text.split(" ", 2).join(" ");
    return `${renewedText} ...`;
  }
  return text;
}

function resultList({ state }) {
  const { result } = state;
  console.log(result);

  return (
    <Result>
      <ResultList>
        {result.map((each: any) => (
          <li key={each.recipe_id}>
            <ResultLink href={`#${each.recipe_id}`}>
              <Figure>
                <img src={each.image_url} alt="" />
              </Figure>

              <ResultData>
                <ResultName>{textSplit(each.title)}</ResultName>
                <ResultAuthor>{each.publisher}</ResultAuthor>
              </ResultData>
            </ResultLink>
          </li>
        ))}
      </ResultList>
      <ResultPage></ResultPage>
    </Result>
  );
}

///Finally, I can use "state" from redux. it is cooler than I use the isolated useState.
function mapStateToProps(state: State) {
  return { state };
}

export default connect(mapStateToProps)(resultList);

//////? styled component ////////

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

const ResultLink = styled.a`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    padding: 1.5rem 3rem;
    transition: all 0.3s;
    border-right: 1px solid #fff;
    text-decoration: none;
    &:hover {
      background-color: #f9f5f3;
      transform: translateY(-2px);
    }
  }
`;

const Figure = styled.figure`
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
const ResultData = styled.div``;
const ResultName = styled.h4`
  font-size: 1.3rem;
  color: #f59a83;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 0.3rem;
`;
const ResultAuthor = styled.p`
  font-size: 1.1rem;
  color: #968b87;
  text-transform: uppercase;
  font-weight: 600;
`;
