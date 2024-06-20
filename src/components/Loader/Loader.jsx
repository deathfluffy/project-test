import { Hourglass } from "react-loader-spinner";

export const Loader = (props) => {
  return (
    <section>
      <div>
        <Hourglass
          wrapperStyle={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          visible={true}
          height="80"
          width="80"
          {...props}
          ariaLabel="hourglass-loading"
          wrapperClass=""
          colors={["#306cce", "#72a1ed"]}
        />
      </div>
    </section>
  );
};
