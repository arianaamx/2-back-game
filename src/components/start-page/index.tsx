import styled from "styled-components";
import * as colors from "../../utils/theme";

import { useHistory } from "react-router-dom";

const StartPage = () => {
  const history = useHistory();

  const handlePlayClick = () => {
    history.push("/game");
  };

  return (
    <div>
      <h1>Hi, today you will be playing a little game called 2-back-game.</h1>
      <Description>
        <p>There are going to be 15 letters displayed one after another.</p>
        <p>
          Your task is to press <b>SPACE</b> if a letter was shown <b>2 letters</b> before.
        </p>
        <div>
          <button onClick={handlePlayClick}>Let's play it.</button>
          <button>Can I see an example?</button>
        </div>
      </Description>
    </div>
  );
};

export default StartPage;

const Description = styled.div`
  padding: 20px 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 1px solid ${colors.lightLilac};
  border-radius: 15px;

  p {
    padding-bottom: 20px;
    font-size: 18px;
  }
`;
