import { useEffect, useId, useRef, useState } from "react";
import css from "./Reviews.module.css";
import { Icon } from "../Icon/Icon";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

export const Reviews = ({ reviews }) => {
  const inputId = useId();
  const dayPickerRef = useRef(null);
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userDate: "",
    userComment: "",
    reviewerName: "",
  });
  const [month, setMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [showDayPicker, setShowDayPicker] = useState(false);

  const handleInputClick = () => {
    setShowDayPicker(true);
  };

  const handleOutsideClick = (event) => {
    if (dayPickerRef.current && !dayPickerRef.current.contains(event.target)) {
      setShowDayPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleDayPickerSelect = (date) => {
    if (!date) {
      setFormData((prevData) => ({
        ...prevData,
        userDate: "",
      }));
      setSelectedDate(undefined);
    } else {
      const formattedDate = format(date, "MM/dd/yyyy");
      setFormData((prevData) => ({
        ...prevData,
        userDate: formattedDate,
      }));
      setSelectedDate(date);
      setMonth(date);
    }
    setShowDayPicker(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const getInitialLetter = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.userName || !formData.userEmail || !formData.userDate) {
      alert("Please fill in all required fields");
      return;
    }

    setFormData({
      userName: "",
      userEmail: "",
      userDate: "",
      userComment: "",
      reviewerName: "",
    });
  };
  return (
    <div className={css.boxContainer}>
      <div className={css.leftColumn}>
        {reviews.map((review, index) => (
          <div key={index}>
            <div className={css.boxButton}>
              <ul className={css.detailsButtonsContainer}>
                <li className={css.detailsButton}>
                  <div className={css.iconBox}>
                    <span className={css.iconName}>
                      {getInitialLetter(review.reviewer_name)}
                    </span>
                  </div>
                </li>
                <li>
                  <p className={css.reviewerName}>{review.reviewer_name}</p>
                  <div className={css.reviewerRating}>
                    <ul className={css.reviewRating}>
                      {[...Array(5)].map((_, index) => {
                        let iconColorClass;
                        if (index < review.reviewer_rating) {
                          iconColorClass = "good";
                        } else if (index === review.reviewer_rating - 1) {
                          iconColorClass = "average";
                        } else {
                          iconColorClass = "bad";
                        }

                        return (
                          <li key={index} className={css.itemReview}>
                            <Icon
                              width="16"
                              height="16"
                              className={`${css.iconRating} ${css[iconColorClass]}`}
                              id="icon-star"
                            >
                              {review.reviewer_rating}
                            </Icon>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

            <div className={css.reviewContent}>
              <p className={css.comment}>{review.comment}</p>
            </div>
          </div>
        ))}
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
                required
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
                required
              />
            </div>
          </div>
          <div className={css.datePickerContainer} ref={dayPickerRef}>
            <input
              id={inputId}
              type="text"
              name="userDate"
              className={css.modalInput}
              value={formData.userDate}
              placeholder="Booking Date"
              onClick={handleInputClick}
              readOnly
            />
            {showDayPicker && (
              <DayPicker
                classNames={{
                  table: css.dayPickerTable,
                  caption: css.dayPickerHeader,
                  root: css.dayPicker,
                  nav: css.dayPickerNav,
                  month: css.dayPickerMonth,
                  week: css.dayPickerWeek,
                  day: css.dayPickerDay,
                  selected: css.dayPickerDaySelected,
                  today: css.dayPickerDayToday,
                }}
                month={month}
                onMonthChange={setMonth}
                mode="single"
                selected={selectedDate}
                onSelect={handleDayPickerSelect}
              />
            )}
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
  );
};
