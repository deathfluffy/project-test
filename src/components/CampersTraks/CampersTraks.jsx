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
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

export const CampersTraks = ({
  selectedCategory,
  selectedLocation,
  setSelectedCategory,
}) => {
  const dispatch = useDispatch();
  const adverts = useSelector(selectAdverts);
  const favoriteAdverts = useSelector(selectFavorites);
  const [totalAdverts, setTotalAdverts] = useState(0);
  const [advertsPerPage] = useState(4);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);
  const [visibleAdverts, setVisibleAdverts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch(fetchAdverts());
  }, [dispatch]);

  useEffect(() => {
    const selectedCategoryKeys = Object.keys(selectedCategory).filter(
      (key) => selectedCategory[key]
    );

    const filteredAdverts = adverts.filter((advert) => {
      const locationMatch = selectedLocation
        ? advert.location === selectedLocation
        : true;

      const categoryMatch = selectedCategoryKeys.every((key) => {
        if (key === "automatic") {
          return advert.transmission === "automatic";
        } else if (key === "alcove") {
          return advert.form === "alcove";
        } else if (key === "fullyIntegrated") {
          return advert.form === "fullyIntegrated";
        } else if (key === "AC") {
          return advert.details["Air conditioner"] > 0;
        } else {
          return advert.details[key] > 0;
        }
      });

      return locationMatch && categoryMatch;
    });

    if (selectedCategoryKeys.length > 0 && filteredAdverts.length === 0) {
      toast.error(
        "No campers match your selected criteria. Resetting all categories."
      );
      setSelectedCategory({
        AC: false,
        automatic: false,
        kitchen: false,
        TV: false,
        bathroom: false,
        van: false,
        fullyIntegrated: false,
        alcove: false,
      });
    }

    setTotalAdverts(filteredAdverts.length);
    setVisibleAdverts(filteredAdverts.slice(0, advertsPerPage));
    setShowLoadMoreButton(filteredAdverts.length > advertsPerPage);
  }, [
    adverts,
    selectedLocation,
    selectedCategory,
    advertsPerPage,
    setSelectedCategory,
  ]);

  const addFavoriteAdvert = (advert) => {
    const favoriteAdvertsString = localStorage.getItem("favoriteAdverts");
    let favoriteAdverts = favoriteAdvertsString
      ? JSON.parse(favoriteAdvertsString)
      : [];
    favoriteAdverts.push(advert);
    localStorage.setItem("favoriteAdverts", JSON.stringify(favoriteAdverts));
    dispatch(addToFavorites(advert));
  };

  const removeFavoriteAdvert = (advertId) => {
    const favoriteAdvertsString = localStorage.getItem("favoriteAdverts");
    if (favoriteAdvertsString) {
      let favoriteAdverts = JSON.parse(favoriteAdvertsString);
      favoriteAdverts = favoriteAdverts.filter(
        (advert) => advert._id !== advertId
      );
      localStorage.setItem("favoriteAdverts", JSON.stringify(favoriteAdverts));
      dispatch(removeFromFavorites(advertId));
    }
  };

  const toggleFavorite = (advert) => {
    if (favoriteAdverts.find((fav) => fav._id === advert._id)) {
      toast.success("Track was successfully deleted");
      removeFavoriteAdvert(advert._id);
    } else {
      toast.success("Track was successfully added to favorites");
      addFavoriteAdvert(advert);
    }
  };

  const loadMoreAdverts = () => {
    const nextPage = currentPage + 1;
    const startIndex = nextPage * advertsPerPage;
    const endIndex = Math.min(startIndex + advertsPerPage, totalAdverts);
    const nextAdverts = adverts.slice(startIndex, endIndex);
    setVisibleAdverts((prev) => [...prev, ...nextAdverts]);
    setCurrentPage(nextPage);
    setShowLoadMoreButton(endIndex < totalAdverts);
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
    const startIndex = selectedPage * advertsPerPage;
    const endIndex = Math.min(startIndex + advertsPerPage, totalAdverts);
    setVisibleAdverts(adverts.slice(startIndex, endIndex));
    setShowLoadMoreButton(endIndex < totalAdverts);
  };

  const pageCount = Math.ceil(totalAdverts / advertsPerPage);

  return (
    <div className={css.container}>
      <ul className={css.advertList}>
        {visibleAdverts.map((advert) => (
          <li key={advert._id} className={css.advertItem}>
            <div className={css.boxContainer}>
              <img
                src={advert.gallery[0]}
                alt="campers"
                className={css.imgBox}
              />
              <div className={css.descBox}>
                <div className={css.boxName}>
                  <span className={css.nameProduct}>{advert.name}</span>
                  <div className={css.iconBox}>
                    <span className={css.priceProduct}>€{advert.price}</span>
                    <button
                      className={css.iconHeart}
                      onClick={() => toggleFavorite(advert)}
                    >
                      <Icon
                        width="24px"
                        height="24px"
                        id="icon-heart"
                        className={
                          favoriteAdverts.find((fav) => fav._id === advert._id)
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
                    />
                    {advert.rating}(Reviews {advert.reviews.length})
                  </Link>
                  <span className={css.locationProduct}>
                    <Icon
                      width="16"
                      height="16"
                      id="icon-map"
                      className={css.iconLocation}
                    />
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
          </li>
        ))}
      </ul>
      <div className={css.buttonBox}>
        {showLoadMoreButton && (
          <button onClick={loadMoreAdverts} className={css.buttonLoad}>
            Load More
          </button>
        )}
      </div>
      {pageCount > 0 && (
        <ReactPaginate
          previousLabel={<Icon id="icon-arrow-left" width="25" height="25" />}
          nextLabel={<Icon id="icon-arrow-right" width="25" height="25" />}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={css.pagination}
          subContainerClassName={"pages pagination"}
          pageClassName={css.pageItem}
          pageLinkClassName={css.pageLink}
          activeClassName={css.active}
          previousClassName={css.pageItem}
          nextClassName={css.pageItem}
          disabledClassName={css.disabled}
          forcePage={currentPage}
        />
      )}
    </div>
  );
};
