import { useSelector } from "react-redux";
import css from "./Features.module.css";
import { selectAdverts } from "../../redux/selectors";
import CategoryIcon from "../GetCategoryIcon/GetCategoryIcon";

export const Features = () => {
  const adverts = useSelector(selectAdverts);
  const advert = adverts[0];

  return (
    <div className={css.container}>
      <div key={advert._id} className={css.boxContainer}>
        <hr />
        <div>
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
        <div style={{ width: "483px" }}>
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
  );
};
