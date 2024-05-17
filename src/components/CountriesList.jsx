import styles from "./CountriesList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";
function CityList() {
  const { cities, isLoading } = useCities();

  console.log(cities);
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first country by clicking on a country on the map" />
    );

  const country = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else return arr;
  }, []);
  return (
    <ul className={styles.countriesList}>
      {country.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CityList;
