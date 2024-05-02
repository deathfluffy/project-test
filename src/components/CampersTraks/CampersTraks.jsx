import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "./CampersTraks.module.css";
import { Icon } from "../Icon/Icon.jsx";
import { Link } from "react-router-dom";
import { selectAdverts } from "../../redux/adverts/adverts.js";
import { fetchAdverts } from "../../redux/actions/actions.js";

export const CampersTraks = () => {
  const dispatch = useDispatch();
  const adverts = useSelector(selectAdverts);

  // Змінні для контролю кількості оголошень та кнопки завантаження
  const [totalAdverts, setTotalAdverts] = useState(0);
  const [advertsPerPage] = useState(4);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);

  // Змінні для відображення оголошень
  const [visibleAdverts, setVisibleAdverts] = useState([]);

  useEffect(() => {
    // Запит на сервер за списком оголошень
    dispatch(fetchAdverts());
  }, [dispatch]);

  useEffect(() => {
    // Оновлення загальної кількості оголошень
    setTotalAdverts(adverts.length);
    // Оновлення відображених оголошень при кожній зміні загального списку оголошень
    setVisibleAdverts(adverts.slice(0, advertsPerPage));
  }, [adverts, advertsPerPage]);

  // Завантажує наступні оголошення
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
        {showLoadMoreButton && (
          <button onClick={loadMoreAdverts} className={css.buttonLoad}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};
