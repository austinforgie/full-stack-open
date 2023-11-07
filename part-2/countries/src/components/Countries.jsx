const Countries = ({ countries, handleShowClick }) =>
  countries.map((country, index) => (
    <section key={index}>
      {country.name.common}{" "}
      <button onClick={() => handleShowClick(country)}>show</button>
    </section>
  ));

export default Countries;
