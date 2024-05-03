import { useState } from "react";
import { Filters } from "../Filters/Filters";
import css from "./Searcher.module.css";
import { Icon } from "../Icon/Icon";

export const Searcher = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);

  const options = [
    "Ukraine, Kyiv",
    "Ukraine, Poltava",
    "Ukraine, Dnipro",
    "Ukraine, Odesa",
    "Ukraine, Kharkiv",
    "Ukraine, Sumy",
    "Ukraine, Lviv",
  ];

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);

    const filtered = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);

    setIsDropdownOpen(!!value);
  };

  const handleOptionClick = (option) => {
    setSelectedLocation(option);
    setSelectedOption(option);
    setSearchInput(option);
    setIsDropdownOpen(false);
  };

  const handleSearchClear = () => {
    setSearchInput("");
    setSelectedOption(null);
    setIsDropdownOpen(false);
  };

  return (
    <div className={css.catalogPage}>
      <span className={css.locationTitle}>Location</span>
      <div className={css.searchContainer}>
        <div className={css.dropdown}>
          <div className={css.containerList}>
            <input
              type="text"
              className={css.searchInput}
              placeholder="Search..."
              value={searchInput}
              onChange={handleInputChange}
            />
            <Icon width="18" height="20" id="icon-map" className={css.icon} />
            {selectedOption && (
              <button className={css.clearSearch} onClick={handleSearchClear}>
                <Icon width="18" height="20" id="icon-x-close"></Icon>
              </button>
            )}
          </div>
          {isDropdownOpen && filteredOptions.length > 0 && (
            <ul className={css.dropdownMenu}>
              {filteredOptions.map((option, index) => (
                <li
                  key={index}
                  className={css.dropdownMenuItem}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Filters selectedLocation={selectedLocation} />
    </div>
  );
};
