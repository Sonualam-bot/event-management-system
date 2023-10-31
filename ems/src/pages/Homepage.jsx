import "../Css/Home.css";
import { Link } from "react-router-dom";

export const Homepage = () => {
  return (
    <>
      <div className="homepage">
        <h1> Welcome to Your Event Management Application</h1>
        <h3>
          {" "}
          <Link
            className="homeLink"
            to="https://github.com/Sonualam-bot/event-management-system"
            target="_blank"
          >
            Github
          </Link>{" "}
        </h3>
      </div>
    </>
  );
};
