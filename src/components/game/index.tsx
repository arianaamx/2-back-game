import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

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
        if (i < 15) {
          setDisplayedLetter(gameArray[i]);
          i++;
        } else {
          clearInterval(interval);
          setGameInPlay(false);
        }
      }, 2000);
    }
  }, [gameInPlay]);

  return (
    <div>
      <div>
        SOLUTION:
        {solution.map((element) => {
          return <span>{element.toString()} </span>;
        })}
      </div>
      <div>
        ANSWER:
        {answer.map((element) => {
          return (
            <span>
              {element.timePassed.toString()} {element.letter} {element.indexOfLetter}{" "}
              {element.isAnswerGood?.toString()}
            </span>
          );
        })}
      </div>

      <h2> Press SPACE to start</h2>
      {gameInPlay === true && <h1>GAME PLAYING: {displayedLetter}</h1>}
      {gameInPlay === false && answer.length > 0 && (
        <div>
          <h1> Game over</h1>
          <h3> Statistics</h3>
          <p>
            Array of given letters:
            {gameArray.map((element) => {
              return <span>{element} </span>;
            })}
          </p>
          <table>
            <th>Index of letter</th>
            <th>Letter</th>
            <th>Time passed</th>
            <th>Answer</th>
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
        </div>
      )}
    </div>
  );
};

export default Game;
