import { useState, useEffect } from "react";
import css from "./Searcher.module.css";
export const Searcher = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/population/cities")
      .then((response) => response.json())
      .then((data) => {
        const citiesAndCountries = data.data.map((entry) => ({
          city: entry.city,
          country: entry.country,
        }));
        setOptions(citiesAndCountries);
      })
      .catch((error) => console.error("Error fetching options:", error));
  }, []);

  const filteredOptions = options.filter(
    (option) =>
      option.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (option) => {
    setSelectedOption(`${option.city} - ${option.country}`);
    setIsOpen(false);
    setSearchTerm("");
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={css.catalogPage}>
      <div className={css.searchContainer}>
        <input
          type="text"
          value={selectedOption || ""}
          onChange={handleInputChange}
          onFocus={toggleModal}
          placeholder="Search town or country..."
        />
      </div>
      {isOpen && (
        <div className={css.modal}>
          <div className={css.modalContent}>
            <span className={css.close} onClick={toggleModal}>
              &times;
            </span>
            <ul className={css.optionsList}>
              {filteredOptions.map((option, index) => (
                <li key={index} onClick={() => handleOptionClick(option)}>
                  {`${option.city} - ${option.country}`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
