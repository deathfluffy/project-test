import { Icon } from "../Icon/Icon";
import css from "./Filters.module.css";
export const Filters = () => {
  return (
    <div className={css.container}>
      <div className={css.boxContainer}>
        <span className={css.filterTitle}>Filters</span>
        <h2 className={css.titleVehicle}>Vehicle equipment</h2>
        <hr></hr>
        <div>
          <ul className={css.boxEqu}>
            <li>
              <button className={css.buttonItem}>
                AC
                <Icon
                  className={css.itemIcon}
                  style={{ fill: "black" }}
                  width="32"
                  height="32"
                  id="icon-AC"
                />
              </button>
            </li>
            <li>
              <button className={css.buttonItem}>
                Automatic
                <Icon
                  style={{ fill: "transparent", stroke: "black" }}
                  className={css.itemIcon}
                  width="32"
                  height="32"
                  id="icon-automatic"
                />
              </button>
            </li>
            <button className={css.buttonItem}>
              Kitchen
              <Icon
                style={{ fill: "transparent", stroke: "black" }}
                className={css.itemIcon}
                width="32"
                height="32"
                id="icon-kitchen"
              />
            </button>
            <li>
              <button className={css.buttonItem}>
                TV
                <Icon
                  style={{ fill: "transparent", stroke: "black" }}
                  className={css.itemIcon}
                  width="32"
                  height="32"
                  id="icon-TV"
                />
              </button>
            </li>
            <li>
              <button className={css.buttonItem}>
                Shower/WC
                <Icon
                  style={{ fill: "transparent", stroke: "black" }}
                  className={css.itemIcon}
                  width="32"
                  height="32"
                  id="icon-showerWC"
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <h2 className={css.titleVehicle}>Vehicle type</h2>
      <hr></hr>
      <div>
        <ul className={css.boxEqu}>
          <li className={css.liItem}>
            <button className={css.buttonItem}>
              Van
              <Icon
                className={css.itemIcon}
                width="40"
                height="28"
                id="icon-van"
              />
            </button>
          </li>
          <li className={css.liItem}>
            <button className={css.buttonItem}>
              Fully Integrated
              <Icon
                className={css.iconTrack}
                width="40"
                height="28"
                id="icon-fully-integrated"
              />
            </button>
          </li>
          <li className={css.liItem}>
            <button className={css.buttonItem}>
              Alcove
              <Icon
                className={css.itemIcon}
                width="40"
                height="28"
                id="icon-alcove"
              />
            </button>
          </li>
        </ul>
      </div>
      <div className={css.boxSeacrh}>
        <button className={css.buttonSearch}>Search</button>
      </div>
    </div>
  );
};
