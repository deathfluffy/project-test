import { useSelector } from "react-redux";
import css from "./Features.module.css";
import { selectAdverts } from "../../redux/selectors";
import CategoryIcon from "../GetCategoryIcon/GetCategoryIcon";
import { useState, useId, useEffect, useRef } from "react";
import { format, isValid, parse } from "date-fns";
import { DayPicker } from "react-day-picker";

export const Features = () => {
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

    if (name === "userDate") {
      const parsedDate = parse(value, "MM/dd/yyyy", new Date());

      if (isValid(parsedDate)) {
        setSelectedDate(parsedDate);
        setMonth(parsedDate);
      } else {
        setSelectedDate(undefined);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.userName || !formData.userEmail || !formData.userDate) {
      alert("Please fill in all required fields");
      return;
    }

   
    console.log("Form submitted with data:", formData);

    setFormData({
      userName: "",
      userEmail: "",
      userDate: "",
      userComment: "",
      reviewerName: "",
    });
  };

  const adverts = useSelector(selectAdverts);
  const advert = adverts[0];

  return (
    <div className={css.container}>
      {advert && (
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
                <hr />
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
                />
              </div>
              <button type="submit" className={css.buttonModal}>
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
