import React from "react";
import styled, { createGlobalStyle } from "styled-components/macro";
import Header from "./components/Header";

export default () => {
  return (
    <>
      <GlobalCSS />
      <Container>
        <Header />
      </Container>
    </>
  );
};
//////////!  BEHOLD ////////////////////
//? when you want to use styled components, and distribute each part into parent component,
//? it's definition (like const name = styled.div``) should be in the file
//? I don't know why this fuxxing error is made but, if you want to have children inside the component, you should follow this rule
//? this is WHY I set the <Container></Container> in this file not in the components foulder
const GlobalCSS = createGlobalStyle`
  * {
  margin: 0;
  padding: 0;
  /* 
  ::before, ::after
it is psuedo className
::before : if a component has this className, then add new content from the start part
::after : if a component has this className, then add new content from the end part

for this styling, it requires the css property called "content"
content can be like "string,image,counter,attr ...etc"

basic form
 <div className="li">hi<div>  ->show "hi"
.li {margin:0};
.li ::after {content:"|"} ->show "hi|"
  */
}

*,*::before,*::after {
  box-sizing: inherit;
}

// media query (for responsive web)//
/*  basic form
 @media (conditions) {execute this}

conditions
1. "and" = &&
2. "," = or // ex) @media (min-width:700px), print and (orientation:portrait) <--- means "if the width is more than 700px, or it is print device and the direction is vertical
3. not = except this condtion // ex) @media not screen <--- if it is not a screen environment,
4. only = this styling is only for screen like descktop,laptop,tablet,mobile etc
 */
html {
  box-sizing: border-box;
  font-size: 50%;
  @media only screen and (max-width: 68.75em) {
    html {
      font-size: 50%;
    }
  }
}

/* vh,vw,vmin,vmax = viewport units for responsive web
vh = refer to viewport's height (1vh = 1% of viewport height)
vw = refer to viewport's width
vmin = more smaller units between width and height of viewport(select)
vmax = more larger units ''
 calc = calculator for units (ex, width:calc(100%-8px) = means if width is 100px, then width is 100 -8px = 92px */
 body {
  font-family: "Nunito sans", sans-serif;
  font-weight: 400;
  line-height: 1.6;
  color: #655a56;
  background-image: linear-gradient(to right bottom, #fbdb89, #f48982);
  background-size: cover;
  background-repeat: no-repeat;
  min-height: calc(100vh - 8vw);
}`;

const Container = styled.div`
  max-width: 120rem;
  margin: 4vw auto;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2rem 6rem 0.5rem rgba(101, 90, 86, 0.2);
  display: grid;
  grid-template-rows: 10rem minmax(100rem, auto);
  grid-template-columns: 1.1fr 2fr 1.1fr;
  grid-template-areas:
    "head head head"
    "list recipe shopping";
  @media only screen and (max-width: 68.75em) {
    .SassComponent {
      width: 100%;
      margin: 0;
      border-radius: 0;
    }
  }
`;
