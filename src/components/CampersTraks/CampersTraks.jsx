import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "./CampersTraks.module.css";
import { Icon } from "../Icon/Icon.jsx";
import { Link } from "react-router-dom";
import { selectAdverts } from "../../redux/adverts/adverts.js";
import { fetchAdverts } from "../../redux/actions/actions.js";
import CategoryIcon from "../GetCategoryIcon/GetCategoryIcon.jsx";

export const CampersTraks = () => {
  const dispatch = useDispatch();
  const adverts = useSelector(selectAdverts);

  const [totalAdverts, setTotalAdverts] = useState(0);
  const [advertsPerPage] = useState(4);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);

  const [visibleAdverts, setVisibleAdverts] = useState([]);

  useEffect(() => {
    dispatch(fetchAdverts());
  }, [dispatch]);

  useEffect(() => {
    setTotalAdverts(adverts.length);

    setVisibleAdverts(adverts.slice(0, advertsPerPage));
  }, [adverts, advertsPerPage]);

  const loadMoreAdverts = () => {
    const nextPage = Math.ceil(visibleAdverts.length / advertsPerPage) + 1;
    const startIndex = (nextPage - 1) * advertsPerPage;
    const endIndex = Math.min(startIndex + 4, totalAdverts);
    const nextAdverts = adverts.slice(startIndex, endIndex);
    setVisibleAdverts((prev) => [...prev, ...nextAdverts]);
    if (endIndex >= totalAdverts) {
      setShowLoadMoreButton(false);
    }
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
                .slice(0, 7)
                .map(([category, value]) => (
                  <button key={category} className={css.detailsButton}>
                    <CategoryIcon
                      category={category}
                      className={css.iconDetail}
                    />
                    {value} {category}
                  </button>
                ))}
            </div>
            <div className={css.boxShow}>
              <button className={css.buttonShow}>Show More</button>
            </div>
          </div>
        </div>
      ))}
      <div className={css.buttonBox}>
        {showLoadMoreButton && (
          <button onClick={loadMoreAdverts} className={css.buttonLoad}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};
