import { useEffect, useState } from "react";
import { fetchAllAdverts } from "../../operations/axios.js";
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
                <span className={css.priceProduct}>€{advert.price}.00</span>
                <Icon width="24px" height="24px" id="icon-heart"></Icon>
              </div>
            </div>
            <div className={css.containerLocal}>
              <Link className={css.rateBox}>
                <Icon width="16" height="16" id="icon-star"></Icon>
                {advert.rating}(Reviews {advert.reviews.length})
              </Link>
              <Icon width="16" height="16" id="icon-map"></Icon>
              <span className={css.locationProduct}>{advert.location}</span>
            </div>
            <span className={css.descProduct}>
              {advert.description.length > 55
                ? `${advert.description.slice(0, 55)}...`
                : advert.description}
            </span>
          </div>
        </div>
      ))}
      {visibleAdverts.length < adverts.length && (
        <button onClick={loadMoreAdverts}>Load More</button>
      )}
    </div>
  );
};
