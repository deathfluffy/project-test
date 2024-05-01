import { Link } from "react-router-dom";
import { HOME_ROUTE } from "../../routes/routes";
import css from "./NavigationBar.module.css";

export const NavigationBar = () => {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link to={HOME_ROUTE}>{/* <Logo height="48" /> */}</Link>
      </div>
    </header>
  );
};
