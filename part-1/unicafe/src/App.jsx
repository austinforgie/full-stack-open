import { useState } from "react";

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  const statistics = [
    { text: "good", value: good },
    { text: "neutral", value: neutral },
    { text: "bad", value: bad },
    { text: "all", value: all },
    { text: "average", value: average || 0 },
    { text: "positive", value: positive ? `${positive} %` : 0 },
  ];

  const statisticElements = statistics.map(({ text, value }) => (
    <StatisticLine key={text} text={text} value={value} />
  ));

  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>{statisticElements}</tbody>
      </table>
    </>
  );
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [gathered, setGathered] = useState(false);

  const handleClick = (event) => {
    const buttonText = event.target.textContent;
    if (buttonText === "good") setGood(good + 1);
    else if (buttonText === "neutral") setNeutral(neutral + 1);
    else if (buttonText === "bad") setBad(bad + 1);

    setGathered(true);
  };

  return (
    <div>
      <h2>give feedback</h2>

      <Button text="good" handleClick={handleClick} />
      <Button text="neutral" handleClick={handleClick} />
      <Button text="bad" handleClick={handleClick} />
      {gathered && <Statistics good={good} neutral={neutral} bad={bad} />}
    </div>
  );
};

export default App;
