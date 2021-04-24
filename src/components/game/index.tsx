import { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import * as colors from "../../utils/theme";

const letters = ["A", "B", "C", "D", "E", "H"];
const gameArray = Array.from(Array(15), (x) => letters[Math.floor(Math.random() * letters.length)]);

type Answer = {
  timePassed: number;
  letter?: string;
  indexOfLetter?: number;
  isAnswerGood?: boolean;
};

const Game = () => {
  const solution = Array.from(gameArray, (x, index) => (gameArray[index] === gameArray[index - 2] ? true : false));

  const [gameInPlay, setGameInPlay] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [displayedLetter, setDisplayedLetter] = useState<string>(gameArray[0]);
  const displayedLetterRef = useRef<string>(displayedLetter);
  displayedLetterRef.current = displayedLetter;

  const [answer, setAnswer] = useState<Answer[]>([]);
  const answerRef = useRef<Answer[]>(answer);
  answerRef.current = answer;

  useEffect(() => {
    const spaceHandler = ({ key }: KeyboardEvent) => {
      if (key === " ") {
        if (answerRef.current.length === 0) {
          setAnswer([{ timePassed: Date.now() }]);
          setGameInPlay(true);
        } else {
          const time = Date.now() - answerRef.current[0].timePassed;
          const indexOfLetter = Math.floor(time / 2000);
          setAnswer([
            ...answerRef.current,
            {
              timePassed: Date.now() - answerRef.current[0].timePassed,
              letter: displayedLetterRef.current,
              indexOfLetter,
              isAnswerGood: solution[indexOfLetter - 1],
            },
          ]);
        }
      }
    };

    window.addEventListener("keydown", spaceHandler);

    return () => {
      window.removeEventListener("keydown", spaceHandler);
    };
  }, []);

  useEffect(() => {
    let i = 0;
    if (gameInPlay === true) {
      const interval = setInterval(() => {
        i++;
        if (i < 15) {
          setDisplayedLetter(gameArray[i]);
        } else {
          clearInterval(interval);
          setGameInPlay(false);
          setGameOver(true);
        }
      }, 2000);
    }
  }, [gameInPlay]);

  return (
    <div>
      {gameInPlay === false && gameOver === false && <h2> Press SPACE to start</h2>}
      {gameInPlay === true && (
        <div>
          Array of given letters:
          {gameArray.map((element) => {
            return <span>{element} </span>;
          })}
          GAME PLAYING:<DisplayedLetter gameBegins={gameInPlay}> {displayedLetter} </DisplayedLetter>
        </div>
      )}
      {gameInPlay === false && answer.length > 0 && (
        <Statistics>
          <h1> Game over</h1>
          <h2> Statistics</h2>
          <GameArray>
            Array of given letters:
            {gameArray.map((element) => {
              return <span>{element} </span>;
            })}
          </GameArray>
          <h3>Solution</h3>
          <table>
            <thead>
              <tr>
                {gameArray.map((element) => {
                  return <th>{element}</th>;
                })}
              </tr>
            </thead>
            <tr>
              {solution.map((element) => {
                return <SolutionCell needsToBeClicked={element}></SolutionCell>;
              })}
            </tr>
          </table>
          <h3>Your answers:</h3>
          <table>
            <thead>
              <tr>
                <th>Index letter</th>
                <th>Letter</th>
                <th>Time passed</th>
                <th>Answer</th>
              </tr>
            </thead>
            {answer.map((element, index) => {
              return (
                index !== 0 && (
                  <tr>
                    <td>{element.indexOfLetter}</td>
                    <td>{element.letter}</td>
                    <td>{element.timePassed - element.indexOfLetter! * 2000}</td>
                    <td>{element.isAnswerGood ? "GOOD" : "WRONG"}</td>
                  </tr>
                )
              );
            })}
          </table>
        </Statistics>
      )}
    </div>
  );
};

export default Game;

interface DisplayLetterProps {
  gameBegins: boolean;
}

const DisplayedLetter = styled.div<DisplayLetterProps>`
  ${(props) =>
    props.gameBegins
      ? css`
          animation-delay: 0.5s;
          animation: blinker 2s step-end infinite;
          font-size: 100px;

          @keyframes blinker {
            50% {
              opacity: 0;
            }
          }
        `
      : css``}
`;

const GameArray = styled.div`
  padding: 20px 0;
  font-size: 18px;

  span {
    padding: 0 5px;
    font-weight: 600;
    font-size: 24px;
  }
`;

const Statistics = styled.div`
  h1 {
    padding-bottom: 30px;
    text-align: center;
  }

  h3 {
    padding: 20px;
  }

  table {
    border: 1px solid ${colors.lilac};
    border-radius: 15px;
    padding: 20px;
    margin: 0 20px;
  }

  th {
    padding-right: 20px;
    padding-bottom: 5px;
    border-bottom: 1px solid ${colors.lightLilac};
  }

  td {
    padding: 5px;
    text-align: center;
  }
`;

interface SolutionCellInterface {
  needsToBeClicked: boolean;
}

const SolutionCell = styled.td<SolutionCellInterface>`
  ${(props) =>
    props.needsToBeClicked
      ? css`
          background-color: ${colors.pastelGreen};
        `
      : css`
          background-color: ${colors.pastelRed};
        `}
`;
