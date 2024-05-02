import css from "./Searcher.module.css";
export const Searcher = () => {
  return (
    <div className={css.catalogPage}>
      <div className={css.searchContainer}>
        <input type="text" placeholder="Search town or country..." />
      </div>
    </div>
  );
};
