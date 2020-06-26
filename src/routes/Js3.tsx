import React, { useState } from "react";
import styled, { css } from "styled-components";
import Bg from "../dice game/back.jpg";
import { createGlobalStyle } from "styled-components";
//import dice from "../dice game/dice-1.png";
//! comment : fuxx react requires "require(URL)" to import image if you want to utilize webpack.
//! only if you want to import image files only, just use "import ... from ..."

/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

export default () => {
  const [state, setState] = useState({
    diceNumber: 1,
    diceShow: false,
    current1: 0,
    getScore1: 0,
    current2: 0,
    getScore2: 0,
    playerChange: true,
  });
  console.log(state);

  const rollDice = () => {
    let dice = Math.floor(Math.random() * 6 + 1);
    if (state.playerChange) {
      setState({
        ...state,
        diceNumber: dice,
        diceShow: true,
        current1: state.current1 + dice,
      });
    } else {
      setState({
        ...state,
        diceNumber: dice,
        diceShow: true,
        current2: state.current2 + dice,
      });
    }
  };

  const hold = () => {
    if (state.playerChange) {
      setState({
        ...state,
        getScore1: state.getScore1 + state.current1,
        current1: 0,
        playerChange: !state.playerChange,
      });
    } else {
      setState({
        ...state,
        getScore2: state.getScore2 + state.current2,
        current2: 0,
        playerChange: !state.playerChange,
      });
    }

    if (state.getScore1 > 100) {
      alert("player1 win");
    } else if (state.getScore2 > 100) {
      alert("player2 win");
    }
  };

  const reset = () => {
    setState({
      diceNumber: 1,
      diceShow: false,
      current1: 0,
      getScore1: 0,
      current2: 0,
      getScore2: 0,
      playerChange: true,
    });
  };

  return (
    <>
      <Global />
      <Container>
        <Player1>
          <Player1Name>Player 1</Player1Name>
          <Player1Score>{state.getScore1}</Player1Score>
          <Player1Current>
            <Player1Label>current</Player1Label>
            <Player1CurrentScore>
              {state.playerChange ? state.current1 : 0}
            </Player1CurrentScore>
          </Player1Current>
        </Player1>

        <Icons>
          <NewGame onClick={reset}>new game</NewGame>
          <RollDice onClick={rollDice}>roll dice</RollDice>
          <Hold onClick={hold}>hold</Hold>
        </Icons>

        <Player2>
          <Player2Name>Player 2</Player2Name>
          <Player2Score>{state.getScore2}</Player2Score>
          <Player2Current>
            <Player2Label>current</Player2Label>
            <Player2CurrentScore>
              {state.playerChange ? 0 : state.current2}
            </Player2CurrentScore>
          </Player2Current>
        </Player2>
        <Dice
          alt="Dice"
          src={require(`../dice game/dice-${state.diceNumber}.png`)}
          show={state.diceShow}
        />
      </Container>
    </>
  );
};

//! Styled
const Global = createGlobalStyle`
  *{margin:0;
  padding:0;
  box-sizing:border-box;}
  
  body{ 
  background-image: linear-gradient(
      rgba(62, 20, 20, 0.4),
      rgba(62, 20, 20, 0.4)
    ),
    url(${Bg});
  background-size: cover;
  background-position: center;
  height: 100vh;
  font-weight: 300;
  position: relative;
  color: #555;
  }
  button{
  background: none;
  border: none;
  font-size: 12px;
  color: grey;
  cursor:pointer;
  outline:none;
  &:hover{
      color:#555;
      transform:translateY(-1px);
        transition: 0.3s ease-in-out;
    }
    &:active{
        color:#555;
        transform:translateY(1px);
        transition:0.3s ease-in-out;
    }
}
 
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

//? player 1
const Player1 = styled.section`
  position: relative;
`;
const Player1Name = styled.div`
  font-size: 40px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 100;
  margin-top: 20px;
  margin-bottom: 10px;
  position: relative;
`;
const Player1Score = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: 100;
  color: #eb4d4d;
  margin-bottom: 130px;
`;
const Player1Current = styled.div`
  background-color: #eb4d4d;
  color: #fff;
  width: 40%;
  text-align: center;
  position: absolute;
  top: 170px;
  left: 50px;
`;
const Player1Label = styled.div`
  text-transform: uppercase;
  margin-bottom: 10px;
  font-size: 12px;
  color: #222;
`;
const Player1CurrentScore = styled.div``;

//? player 2
const Player2 = styled.section`
  position: relative;
`;
const Player2Name = styled.div`
  font-size: 40px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 100;
  margin-top: 20px;
  margin-bottom: 10px;
  position: relative;
`;
const Player2Score = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: 100;
  color: #eb4d4d;
  margin-bottom: 130px;
`;
const Player2Current = styled.div`
  background-color: #eb4d4d;
  color: #fff;
  width: 40%;
  text-align: center;
  position: absolute;
  top: 170px;
  left: 50px;
`;
const Player2Label = styled.div`
  text-transform: uppercase;
  margin-bottom: 10px;
  font-size: 12px;
  color: #222;
`;
const Player2CurrentScore = styled.div``;

//? Icons(middle)
const Icons = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  margin: 0 13px;
`;
const NewGame = styled.button``;
const RollDice = styled.button`
  position: absolute;
  top: 190px;
`;
const Hold = styled.button``;

interface Show {
  show: boolean;
}
//? Dice (middle)
const Dice = styled.img<Show>`
  position: absolute;
  left: 50%;
  top: 110px;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
  ${(props) => {
    if (!props.show) {
      return css`
        display: none;
      `;
    }
  }}
`;
