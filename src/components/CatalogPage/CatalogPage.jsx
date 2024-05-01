import { CampersTraks } from "../CampersTraks/CampersTraks";
import { Filters } from "../Filters/Filters";
import { Searcher } from "../Searcher/Searcher";

export const CatalogPage = () => {
  return (
    <>
      <Searcher />
      <Filters />
      <CampersTraks />
    </>
  );
};
