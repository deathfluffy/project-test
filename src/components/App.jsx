import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { NavigationBar } from "./NavigationBar/NavigationBar";
import { HOME_ROUTE } from "../routes/routes";
import { PageLoader } from "./PageLoader/PageLoader";

export const App = () => {
  const HomePage = lazy(() => import("../pages/Home"));

  return (
    <>
      <NavigationBar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path={HOME_ROUTE} element={<HomePage />} />
            <Route path="*" element={<Navigate to={HOME_ROUTE} />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
};
