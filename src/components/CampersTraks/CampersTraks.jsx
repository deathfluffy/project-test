import { useEffect, useState } from "react";
import {
  fetchAllAdverts,
  fetchDetailsFromServer,
} from "../../operations/axios.js";
import css from "./CampersTraks.module.css";
import { Icon } from "../Icon/Icon.jsx";
import { Link } from "react-router-dom";

export const CampersTraks = () => {
  const [adverts, setAdverts] = useState([]);
  const [visibleAdverts, setVisibleAdverts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [advertsPerPage] = useState(4);

  useEffect(() => {
    fetchAllAdverts()
      .then((advertsData) => {
        setAdverts(advertsData);
        setVisibleAdverts(advertsData.slice(0, advertsPerPage));
      })
      .catch((error) => {
        console.error("Error fetching adverts:", error);
      });

    fetchDetailsFromServer()
      .then(() => {})
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [advertsPerPage]);

  const loadMoreAdverts = () => {
    const nextPage = currentPage + 1;
    const nextAdverts = adverts.slice(
      currentPage * advertsPerPage,
      nextPage * advertsPerPage
    );
    setVisibleAdverts((prev) => [...prev, ...nextAdverts]);
    setCurrentPage(nextPage);
  };

  return (
    <div className={css.container}>
      {visibleAdverts.map((advert) => (
        <div key={advert._id} className={css.boxContainer}>
          <img src={advert.gallery[0]} alt="campers" className={css.imgBox} />
          <div className={css.descBox}>
            <div className={css.boxName}>
              <span className={css.nameProduct}>{advert.name}</span>
              <div className={css.iconBox}>
                <span className={css.priceProduct}>
                  €{advert.price}.00
                  <Icon width="24px" height="24px" id="icon-heart" />
                </span>
              </div>
            </div>
            <div className={css.containerLocal}>
              <Link className={css.rateBox}>
                <Icon
                  width="16"
                  height="16"
                  id="icon-star"
                  className={css.iconReview}
                ></Icon>
                {advert.rating}(Reviews {advert.reviews.length})
              </Link>
              <span className={css.locationProduct}>
                <Icon
                  width="16"
                  height="16"
                  id="icon-map"
                  className={css.iconLocation}
                ></Icon>
                {advert.location}
              </span>
            </div>
            <span className={css.descProduct}>
              {advert.description.length > 55
                ? `${advert.description.slice(0, 55)}...`
                : advert.description}
            </span>
            <div className={css.detailsButtonsContainer}>
              {Object.entries(advert.details)
                .sort(() => Math.random() - 0.7)
                .slice(0, 7)
                .map(([category, value]) => (
                  <button key={category} className={css.detailsButton}>
                    {category}: {value}
                  </button>
                ))}
            </div>
          </div>
        </div>
      ))}
      <div className={css.buttonBox}>
        {visibleAdverts.length < adverts.length && (
          <button onClick={loadMoreAdverts} className={css.buttonLoad}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};
