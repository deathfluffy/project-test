import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import css from "./FavoriteAdverts.module.css";
import { Icon } from "../Icon/Icon.jsx";
import CategoryIcon from "../GetCategoryIcon/GetCategoryIcon.jsx";
import { removeFromFavorites } from "../../redux/actions/actions.js";
import { selectAdverts, selectFavorites } from "../../redux/selectors.js";

export const FavoriteAdverts = () => {
  const dispatch = useDispatch();
  const allAdverts = useSelector(selectAdverts);
  const favoriteAdverts = useSelector(selectFavorites);
  const [visibleAdverts, setVisibleAdverts] = useState([]);
  const [advertsPerPage] = useState(4);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);

  useEffect(() => {
    const limitedFavoriteAdverts = favoriteAdverts.slice(0, advertsPerPage);
    setVisibleAdverts(
      allAdverts.filter((advert) => limitedFavoriteAdverts.includes(advert._id))
    );
    setShowLoadMoreButton(favoriteAdverts.length > advertsPerPage);
  }, [allAdverts, favoriteAdverts, advertsPerPage]);

  const toggleFavorite = (advertId) => {
    if (favoriteAdverts && favoriteAdverts.includes(advertId)) {
      dispatch(removeFromFavorites(advertId));
    }
  };

  const loadMoreAdverts = () => {
    const nextPage = Math.ceil(visibleAdverts.length / advertsPerPage) + 1;
    const startIndex = (nextPage - 1) * advertsPerPage;
    const endIndex = Math.min(
      startIndex + advertsPerPage,
      favoriteAdverts.length
    );
    const nextAdverts = allAdverts
      .filter((advert) => favoriteAdverts.includes(advert._id))
      .slice(startIndex, endIndex);
    setVisibleAdverts((prev) => [...prev, ...nextAdverts]);
    if (endIndex >= favoriteAdverts.length) {
      setShowLoadMoreButton(false);
    }
  };

  return (
    <div className={css.container}>
      {visibleAdverts.length === 0 ? (
        <p>No favorite adverts yet</p>
      ) : (
        <>
          {visibleAdverts.map((advert) => (
            <div key={advert._id} className={css.boxContainer}>
              <img
                src={advert.gallery[0]}
                alt="campers"
                className={css.imgBox}
              />
              <div className={css.descBox}>
                <div className={css.boxName}>
                  <span className={css.nameProduct}>{advert.name}</span>
                  <div className={css.iconBox}>
                    <span className={css.priceProduct}>€{advert.price}.00</span>
                    <button
                      className={css.iconHeart}
                      onClick={() => toggleFavorite(advert._id)}
                    >
                      <Icon
                        width="24px"
                        height="24px"
                        id="icon-heart"
                        className={
                          favoriteAdverts &&
                          favoriteAdverts.includes(advert._id)
                            ? css.iconFavorite
                            : css.icon
                        }
                      />
                    </button>
                  </div>
                </div>
                <div className={css.containerLocal}>
                  <Link to={`/catalog/${advert._id}`} className={css.rateBox}>
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
                <p className={css.descProduct}>
                  {advert.description.length > 55
                    ? `${advert.description.slice(0, 55)}...`
                    : advert.description}
                </p>
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
                  <Link to={`/catalog`} className={css.buttonShow}>
                    Go to Catalog
                  </Link>
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
        </>
      )}
    </div>
  );
};
