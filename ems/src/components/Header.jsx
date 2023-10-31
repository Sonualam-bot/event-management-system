import { Link, NavLink } from "react-router-dom";
import "../Css/Header.css";

export const Header = () => {
  return (
    <>
      <div className="header-parent">
        <h3>
          {" "}
          <Link className="links" to="/">
            Event
          </Link>{" "}
        </h3>
        <div className="header-special">
          <NavLink className="links" to="/">
            Home
          </NavLink>
          <NavLink className="links" to="/events">
            Event
          </NavLink>
          <NavLink className="links" to="/volunteer">
            Volunteer
          </NavLink>
        </div>
      </div>
    </>
  );
};
