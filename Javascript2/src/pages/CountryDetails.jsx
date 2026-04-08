import { useParams } from "react-router-dom";

function CountryDetails() {
  const { name } = useParams();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{name}</h1>
      <p>Här kommer mer info senare...</p>
    </div>
  );
}

export default CountryDetails;