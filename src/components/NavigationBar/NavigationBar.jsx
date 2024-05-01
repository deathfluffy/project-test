import { Link, NavLink } from "react-router-dom";
import { CATALOG_ROUTE, FAVORITE_ROUTE, HOME_ROUTE } from "../../routes/routes";
import css from "./NavigationBar.module.css";
import Logo from "../../images/logo.svg?react";

export const NavigationBar = () => {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <nav className={css.navBar}>
          <Link to={HOME_ROUTE}>
            <Logo height="60" width="160" />
          </Link>
          <ul className={css.listOptions}>
            <li className={css.listItems}>
              <NavLink to={CATALOG_ROUTE} className={css.linkItem}>
                Catalog
              </NavLink>
            </li>
            <li className={css.listItems}>
              <NavLink to={FAVORITE_ROUTE} className={css.linkItem}>
                Favorite
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
