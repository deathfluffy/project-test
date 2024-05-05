import { useState } from "react";
import { SimpleModal } from "../Modal/Modal.jsx";
import css from "./CatalogAdverts.module.css";
import { Icon } from "../Icon/Icon.jsx";
import { Link } from "react-router-dom";
import { Features } from "../Features/Features.jsx";
import { Reviews } from "../Reviews/Reviews.jsx";

export const CatalogAdverts = ({ selectedAdvert }) => {
  const [selected, setSelected] = useState("Features");
  const [modalIsOpen, setModalOpen] = useState(false);

  const handleShowMore = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {selectedAdvert && (
        <>
          <button onClick={handleShowMore} className={css.buttonShow}>
            Show More
          </button>

          <SimpleModal isOpen={modalIsOpen} onClose={handleCloseModal}>
            <div className={css.containerModal}>
              <h2 className={css.titleModal}>{selectedAdvert.name}</h2>
              <div className={css.modalLocal}>
                <Link className={css.rateBox}>
                  <Icon
                    width="16"
                    height="16"
                    id="icon-star"
                    className={css.iconReview}
                  ></Icon>
                  {selectedAdvert.rating}(Reviews{" "}
                  {selectedAdvert.reviews.length})
                </Link>
                <span className={css.locationProduct}>
                  <Icon
                    width="16"
                    height="16"
                    id="icon-map"
                    className={css.iconLocation}
                  ></Icon>
                  {selectedAdvert.location}
                </span>
              </div>

              <div className={css.modalPrice}>
                <span className={css.priceProduct}>
                  €{selectedAdvert.price}.00
                </span>
              </div>

              <div className={css.containerLoot}>
                {selectedAdvert.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index + 1}`}
                    className={css.imgContainer}
                  />
                ))}
              </div>
              <div className={css.descriptionContainer}>
                <p>{selectedAdvert.description}</p>
              </div>
              <div className={css.modalBox}>
                <ul className={css.listModals}>
                  <li
                    className={`${css.itemModals} ${
                      selected === "Features" ? css.selected : ""
                    }`}
                    onClick={() => setSelected("Features")}
                  >
                    <span className={css.modalFeatures}>Features</span>
                  </li>
                  <li
                    className={`${css.itemModals} ${
                      selected === "Reviews" ? css.selected : ""
                    }`}
                    onClick={() => setSelected("Reviews")}
                  >
                    <span className={css.modalReviews}>Reviews</span>
                  </li>
                </ul>
                {selected === "Features" ? (
                  <Features />
                ) : (
                  <Reviews reviews={selectedAdvert.reviews} />
                )}
              </div>
            </div>
          </SimpleModal>
        </>
      )}
    </>
  );
};
