import css from "./HomePage.module.css";
export const HomePage = () => {
  return (
    <section className={css.sectionHome}>
      <div className={css.container}>
        <h1 className={css.titleHome}>Welcome to Campers Tracks!</h1>
        <p className={css.descHome}>
          Welcome to Campers Tracks! This is the place where you can go on an
          exciting trip around the world with the help of our cars. We have
          prepared for you the best cars that will allow you to discover the
          most beautiful corners of nature, enjoy the diversity of cultural
          experiences and take a break from the city bustle.
        </p>
      </div>
    </section>
  );
};
