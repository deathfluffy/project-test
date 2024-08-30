import { useEffect, useState } from "react";
import { Icon } from "../Icon/Icon";
import css from "./Filters.module.css";

export const Filters = ({ setSelectedCategory }) => {
  const [filterParams, setFilterParams] = useState({});

  useEffect(() => {
    setSelectedCategory(filterParams);
  }, [filterParams, setSelectedCategory]);

  const handleFilterChange = (param) => {
    setFilterParams((prevParams) => ({
      ...prevParams,
      [param]: !prevParams[param],
    }));
  };

  const handleSearchClick = () => {
    setSelectedCategory(filterParams);
  };
  return (
    <div className={css.container}>
      <div className={css.boxContainer}>
        <span className={css.filterTitle}>Filters</span>
        <h2 className={css.titleVehicle}>Vehicle equipment</h2>
        <hr />
        <div className={css.containerFilter}>
          <ul className={css.boxEqu}>
            <li>
              <button
                className={`${css.buttonItem} ${filterParams.AC ? css.active : ''}`}
                onClick={() => handleFilterChange("AC")}
              >
                <Icon
                  className={css.itemIcon}
                  style={{ fill: "black" }}
                  width="32"
                  height="32"
                  id="icon-AC"
                />
                <span className={css.filterItems}>AC</span>
              </button>
            </li>
            <li>
              <button
                className={`${css.buttonItem} ${filterParams.automatic ? css.active : ''}`}
                onClick={() => handleFilterChange("automatic")}
              >
                <Icon
                  style={{ fill: "transparent", stroke: "black" }}
                  className={css.itemIcon}
                  width="32"
                  height="32"
                  id="icon-automatic"
                />
                <span className={css.filterItems}>Automatic</span>
              </button>
            </li>
            <li>
              <button
                className={`${css.buttonItem} ${filterParams.kitchen ? css.active : ''}`}
                onClick={() => handleFilterChange("kitchen")}
              >
                <Icon
                  style={{ fill: "transparent", stroke: "black" }}
                  className={css.itemIcon}
                  width="32"
                  height="32"
                  id="icon-kitchen"
                />
                <span className={css.filterItems}>Kitchen</span>
              </button>
            </li>
            <li>
              <button
                className={`${css.buttonItem} ${filterParams.TV ? css.active : ''}`}
                onClick={() => handleFilterChange("TV")}
              >
                <Icon
                  style={{ fill: "transparent", stroke: "black" }}
                  className={css.itemIcon}
                  width="32"
                  height="32"
                  id="icon-TV"
                />
                <span className={css.filterItems}>TV</span>
              </button>
            </li>
            <li>
              <button
                className={`${css.buttonItem} ${filterParams.bathroom ? css.active : ''}`}
                onClick={() => handleFilterChange("bathroom")}
              >
                <Icon
                  style={{ fill: "transparent", stroke: "black" }}
                  className={css.itemIcon}
                  width="32"
                  height="32"
                  id="icon-showerWC"
                />
                <span className={css.filterItems}>Shower/WC</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <h2 className={css.titleVehicle}>Vehicle type</h2>
      <hr />
      <div className={css.containerFilter}>
        <ul className={css.boxEqu}>
          <li className={css.liItem}>
            <button
              className={`${css.buttonItem} ${filterParams.van ? css.active : ''}`}
              onClick={() => handleFilterChange("van")}
            >
              <span>Van</span>
              <Icon
                className={css.iconTrack}
                width="40"
                height="28"
                id="icon-van"
              />
            </button>
          </li>
          <li className={css.liItem}>
            <button
              className={`${css.buttonItem} ${filterParams.fullyIntegrated ? css.active : ''}`}
              onClick={() => handleFilterChange("fullyIntegrated")}
            >
              <span className={css.inButton}>Fully Integrated</span>
              <Icon
                className={css.iconTrack}
                width="40"
                height="28"
                id="icon-fully-integrated"
              />
            </button>
          </li>
          <li className={css.liItem}>
            <button
              className={`${css.buttonItem} ${filterParams.alcove ? css.active : ''}`}
              onClick={() => handleFilterChange("alcove")}
            >
              <span>Alcove</span>
              <Icon
                className={css.iconTrack}
                width="40"
                height="28"
                id="icon-alcove"
              />
            </button>
          </li>
        </ul>
      </div>
      <div className={css.boxSearch} onClick={handleSearchClick}>
        <button className={css.buttonSearch}>Search</button>
      </div>
    </div>
  );
};
