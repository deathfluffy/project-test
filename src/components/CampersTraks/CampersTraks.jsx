import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "./CampersTraks.module.css";
import { Icon } from "../Icon/Icon.jsx";
import { Link } from "react-router-dom";
import CategoryIcon from "../GetCategoryIcon/GetCategoryIcon.jsx";
import { fetchAdverts } from "../../redux/thunkApi/thunkApi.js";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/actions/actions.js";
import { selectAdverts, selectFavorites } from "../../redux/selectors.js";
import { CatalogAdverts } from "../CatalogAdverts/CatalogAdverts.jsx";

export const CampersTraks = ({ selectedLocation, selectedCategory }) => {
  const dispatch = useDispatch();
  const adverts = useSelector(selectAdverts);
  const favoriteAdverts = useSelector(selectFavorites);
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

  const toggleFavorite = (advertId) => {
    if (favoriteAdverts && favoriteAdverts.includes(advertId)) {
      dispatch(removeFromFavorites(advertId));
    } else {
      dispatch(addToFavorites(advertId));
    }
  };

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
  useEffect(() => {
    const favoriteIdsString = localStorage.getItem("favoriteAdverts");
    if (favoriteIdsString && favoriteIdsString) {
      const favoriteIds = JSON.parse(favoriteIdsString);
      dispatch({ type: "SET_FAVORITES", payload: favoriteIds });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("favoriteAdverts", JSON.stringify(favoriteAdverts));
  }, [favoriteAdverts]);

  useEffect(() => {
    const filteredAdverts = adverts.filter((advert) => {
      if (selectedLocation && selectedCategory) {
        return (
          advert.location === selectedLocation &&
          advert.category === selectedCategory
        );
      } else if (selectedLocation) {
        return advert.location === selectedLocation;
      } else if (selectedCategory) {
        return advert.category === selectedCategory;
      } else {
        return true;
      }
    });

    setTotalAdverts(filteredAdverts.length);
    setVisibleAdverts(filteredAdverts.slice(0, advertsPerPage));
  }, [adverts, advertsPerPage, selectedLocation, selectedCategory]);

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
                <button
                  className={css.iconHeart}
                  onClick={() => toggleFavorite(advert._id)}
                >
                  <Icon
                    width="24px"
                    height="24px"
                    id="icon-heart"
                    className={
                      favoriteAdverts && favoriteAdverts.includes(advert._id)
                        ? css.iconFavorite
                        : css.icon
                    }
                  />
                </button>
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
              <CatalogAdverts selectedAdvert={advert} />
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
