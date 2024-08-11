import { createContext, useContext, useState } from "react";
import { useLocalStorageState } from "../hooks/localStorage";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useLocalStorageState([], "cities");
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
  const [error, setError] = useState("");

  const getCity = (id) => {
    const city = cities.find((city) => city.id === Number(id));
    if (city) {
      setCurrentCity(city);
    } else {
      setError("City not found");
    }
  };

  const createCity = (newCity) => {
    setIsLoading(true);

    // Generate a unique ID based on the current timestamp
    const cityWithId = { ...newCity, id: Date.now() };

    const updatedCities = [...cities, cityWithId];
    setCities(updatedCities);
    setCurrentCity(cityWithId);
    setIsLoading(false);
  };

  const deleteCity = (id) => {
    setIsLoading(true);

    const updatedCities = cities.filter((city) => city.id !== id);
    if (updatedCities.length !== cities.length) {
      setCities(updatedCities);
      setCurrentCity({});
    } else {
      setError("City not found. No cities were deleted.");
    }
    setIsLoading(false);
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
