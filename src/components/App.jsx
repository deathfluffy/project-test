import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { NavigationBar } from "./NavigationBar/NavigationBar";
import { CATALOG_ROUTE, HOME_ROUTE } from "../routes/routes";
import { PageLoader } from "./PageLoader/PageLoader";
import css from "./App.module.css";

export const App = () => {
  const HomePage = lazy(() => import("../pages/Home"));
  const CatalogPage = lazy(() => import("../pages/CatalogPage"));

  return (
    <>
      <NavigationBar />
      <main className={css.containerPage}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path={HOME_ROUTE} element={<HomePage />} />
            <Route path={CATALOG_ROUTE} element={<CatalogPage />} />
            <Route path="*" element={<Navigate to={HOME_ROUTE} />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
};
