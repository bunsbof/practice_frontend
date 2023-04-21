import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [color, setColor] = useState("");
  const [answer, setAnswer] = useState([]);
  const [isWrong, setIsWrong] = useState(null);

  function getRandomColor(isReget) {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    if (isReget) return color;
    setColor(color);
    setAnswer(
      [color, getRandomColor(true), getRandomColor(true)].sort(
        () => 0.5 - Math.random()
      )
    );
  }

  useEffect(() => {
    // TODO: generate a random color here
    getRandomColor();
  }, []);

  const handleAnswer = (answer) => {
    if (answer === color) {
      setIsWrong(false);
      getRandomColor();
    } else {
      setIsWrong(true);
    }
  };

  return (
    <div className="App">
      <div>
        <div className="guess-me" style={{ background: color }}></div>
        {answer.map((answer) => (
          <button key={answer} onClick={() => handleAnswer(answer)}>
            {answer}
          </button>
        ))}
        {isWrong && <div className="wrong">Wrong Answer</div>}
        {isWrong === false && <div className="correct">Correct!</div>}
      </div>
    </div>
  );
}
