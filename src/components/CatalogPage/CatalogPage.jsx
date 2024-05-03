import { CampersTraks } from "../CampersTraks/CampersTraks";
import { Searcher } from "../Searcher/Searcher";
import css from "./CatalogPage.module.css";

export const CatalogPage = () => {
  return (
    <>
      <div className={css.mainContainer}>
        <Searcher />
        <CampersTraks />
      </div>
    </>
  );
};
