import { useState } from "react";
import { CampersTraks } from "../CampersTraks/CampersTraks";
import { Searcher } from "../Searcher/Searcher";
import css from "./CatalogPage.module.css";

export const CatalogPage = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <section className={css.mainContainer}>
      <Searcher
        setSelectedLocation={setSelectedLocation}
        setSelectedCategory={setSelectedCategory}
      />
      <CampersTraks
        selectedLocation={selectedLocation}
        selectedCategory={selectedCategory}
      />
    </section>
  );
};
