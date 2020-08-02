import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]); // Empty array as we'll be requesting all breeds corresponding to an animal from the api
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });
    setPets(animals || []);
  }

  useEffect(() => {
    setBreeds([]);
    setBreed("");
    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    });
  }, [animal, setBreed, setBreeds]);

  return (
    <div className="search-params">
      <div className="Form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            requestPets();
          }}
        >
          <label htmlFor="location">
            Location
            <input
              id="location"
              value={location}
              placeholder="Location"
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
          <AnimalDropdown />
          <BreedDropdown />
          <label htmlFor="location">
            Theme
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              onBlur={(e) => setTheme(e.target.value)}
            >
              <option value="#EE6352">Fire Opal</option>
              <option value="#16262E">Gunmetal</option>
              <option value="#FF9B42">Deep Saffron</option>
              <option value="#00A7E1">Cerulean Crayola</option>
              <option value="#157A6E">Pine Green</option>
            </select>
          </label>
          <button className="formButton" style={{ backgroundColor: theme }}>
            <i className="fa fa-send"></i>
          </button>
        </form>
      </div>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
