import { useSelector } from "react-redux";
import css from "./Features.module.css";
import { selectAdverts } from "../../redux/selectors";
import CategoryIcon from "../GetCategoryIcon/GetCategoryIcon";
import { useState } from "react";

export const Features = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userNumber: "",
    userEmail: "",
    userComment: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const adverts = useSelector(selectAdverts);
  const advert = adverts[0];

  return (
    <div className={css.container}>
      <div key={advert._id} className={css.boxContainer}>
        <div className={css.leftColumn}>
          <div className={css.boxButton}>
            <ul className={css.detailsButtonsContainer}>
              {Object.entries(advert.details)
                .slice(0, 10)
                .map(([category, value]) => (
                  <button key={category} className={css.detailsButton}>
                    <CategoryIcon
                      category={category}
                      className={css.iconDetail}
                    />
                    {value} {category}
                  </button>
                ))}
            </ul>
          </div>
          <div className={css.boxDetails}>
            <div>
              <h2 className={css.titleDetails}>Vehicle details</h2>
              <hr></hr>
              <ul className={css.listDetails}>
                <li className={css.itemDetails}>
                  <div className={css.key}>Form</div>
                  <div className={css.value}>{advert.form}</div>
                </li>
                <li className={css.itemDetails}>
                  <div className={css.key}>Length</div>
                  <div className={css.value}>{advert.length}</div>
                </li>
                <li className={css.itemDetails}>
                  <div className={css.key}>Width</div>
                  <div className={css.value}>{advert.width}</div>
                </li>
                <li className={css.itemDetails}>
                  <div className={css.key}>Height</div>
                  <div className={css.value}>{advert.height}</div>
                </li>
                <li className={css.itemDetails}>
                  <div className={css.key}>Tank</div>
                  <div className={css.value}>{advert.tank}</div>
                </li>
                <li className={css.itemDetails}>
                  <div className={css.key}>Consumption</div>
                  <div className={css.value}>{advert.consumption}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={css.rightColumn}>
          <h2 className={css.formBook}>Book your campervan now</h2>
          <p className={css.reviewsForm}>
            Stay connected! We are always ready to help you.
          </p>
          <form onSubmit={handleSubmit} className={css.form}>
            <div className={css.dataFormContainer}>
              <div className={css.containerModal}>
                <input
                  placeholder="Name"
                  id="user-name"
                  name="userName"
                  type="text"
                  className={css.modalInput}
                  value={formData.userName}
                  onChange={handleChange}
                />
              </div>
              <div className={css.containerModal}>
                <input
                  id="user-email"
                  name="userEmail"
                  placeholder="Email"
                  type="email"
                  className={css.modalInput}
                  value={formData.userEmail}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={css.dataFormContainer}>
              <div className={css.containerModal}>
                <input
                  placeholder="Booking Date"
                  id="user-date"
                  name="userDate"
                  type="date"
                  className={css.modalInput}
                  value={formData.userDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={css.dataFormTextarea}>
              <textarea
                className={css.textareaModal}
                name="userComment"
                placeholder="Comment"
                id="user-comment"
                value={formData.userComment}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className={css.buttonModal}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
