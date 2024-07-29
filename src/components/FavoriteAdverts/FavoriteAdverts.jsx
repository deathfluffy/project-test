import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import css from "./FavoriteAdverts.module.css";
import { Icon } from "../Icon/Icon.jsx";
import CategoryIcon from "../GetCategoryIcon/GetCategoryIcon.jsx";
import { removeFromFavorites } from "../../redux/actions/actions.js";
import { selectFavorites } from "../../redux/selectors.js";
import { toast } from "react-toastify";

export const FavoriteAdverts = () => {
  const dispatch = useDispatch();
  const favoriteAdverts = useSelector(selectFavorites);
  const [visibleAdverts, setVisibleAdverts] = useState([]);
  const [advertsPerPage] = useState(4);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);

  const removeFavoriteAdvert = (advertId) => {
    const favoriteAdvertsString = localStorage.getItem("favoriteAdverts");
    if (favoriteAdvertsString) {
      let favoriteAdverts = JSON.parse(favoriteAdvertsString);
      favoriteAdverts = favoriteAdverts.filter((advert) => advert._id !== advertId);
      localStorage.setItem("favoriteAdverts", JSON.stringify(favoriteAdverts));
      dispatch(removeFromFavorites(advertId));
      setVisibleAdverts(favoriteAdverts.slice(0, visibleAdverts.length)); 
    }
  };

  const toggleFavorite = (advert) => {
    if (favoriteAdverts.find((fav) => fav._id === advert._id)) {

      toast.success("Track was successfully deleted")
      removeFavoriteAdvert(advert._id)
    } 
  };
 
  useEffect(() => {
    const favoriteAdvertsString = localStorage.getItem("favoriteAdverts");
    if (favoriteAdvertsString) {
      const favoriteAdverts = JSON.parse(favoriteAdvertsString);
      setVisibleAdverts(favoriteAdverts.slice(0, advertsPerPage));
      setShowLoadMoreButton(favoriteAdverts.length > advertsPerPage);
    }
  }, [advertsPerPage]);

  const loadMoreAdverts = () => {
    const favoriteAdvertsString = localStorage.getItem("favoriteAdverts");
    if (favoriteAdvertsString) {
      const favoriteAdverts = JSON.parse(favoriteAdvertsString);
      const nextPage = Math.ceil(visibleAdverts.length / advertsPerPage) + 1;
      const startIndex = (nextPage - 1) * advertsPerPage;
      const endIndex = Math.min(startIndex + advertsPerPage, favoriteAdverts.length);
      setVisibleAdverts((prev) => [...prev, ...favoriteAdverts.slice(startIndex, endIndex)]);
      if (endIndex >= favoriteAdverts.length) {
        setShowLoadMoreButton(false);
      }
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
              <img src={advert.gallery[0]} alt="campers" className={css.imgBox} />
              <div className={css.descBox}>
                <div className={css.boxName}>
                  <span className={css.nameProduct}>{advert.name}</span>
                  <div className={css.iconBox}>
                    <span className={css.priceProduct}>€{advert.price}</span>
                    <button className={css.iconHeart} onClick={() => toggleFavorite(advert)}>
                      <Icon
                        width="24px"
                        height="24px"
                        id="icon-heart"
                        className={favoriteAdverts.some((fav) => fav._id === advert._id) ? css.iconFavorite : css.icon}
                      />
                    </button>
                  </div>
                </div>
                <div className={css.containerLocal}>
                  <Link to={`/catalog`} className={css.rateBox}>
                    <Icon width="16" height="16" id="icon-star" className={css.iconReview} />
                    {advert.rating}(Reviews {advert.reviews.length})
                  </Link>
                  <span className={css.locationProduct}>
                    <Icon width="16" height="16" id="icon-map" className={css.iconLocation} />
                    {advert.location}
                  </span>
                </div>
                <p className={css.descProduct}>
                  {advert.description.length > 55 ? `${advert.description.slice(0, 55)}...` : advert.description}
                </p>
                <div className={css.detailsButtonsContainer}>
                  {Object.entries(advert.details)
                    .slice(0, 7)
                    .map(([category, value]) => (
                      <button key={category} className={css.detailsButton}>
                        <CategoryIcon category={category} className={css.iconDetail} />
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
