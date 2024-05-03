import { Filters } from "../Filters/Filters";
import css from "./Searcher.module.css";
export const Searcher = () => {
  return (
    <div className={css.catalogPage}>
      <span className={css.locationTitle}>Location</span>
      <div className={css.searchContainer}>
        <input type="text" className={css.searchInput} />
      </div>
      <Filters />
    </div>
  );
};
