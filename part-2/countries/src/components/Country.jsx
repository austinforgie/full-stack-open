import Weather from "./Weather";

const Country = ({
  country: {
    name: { common },
    capital,
    area,
    languages,
    flags: { svg },
  },
}) => (
  <section>
    <h1>{common}</h1>
    <p>capital {capital[0]}</p>
    <p>area {area}</p>
    <h3>languages:</h3>
    <ul>
      {Object.values(languages).map((language, index) => (
        <li key={index}>{language}</li>
      ))}
    </ul>
    <img src={svg} alt={`${common} flag`} width="150" height="150" />
    <Weather capital={capital.toString()} />
  </section>
);

export default Country;
