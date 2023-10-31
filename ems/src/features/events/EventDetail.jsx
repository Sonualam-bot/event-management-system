import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "../../Css/EForm.css";

export const EventDetail = () => {
  const { eventId } = useParams();
  const events = useSelector((state) => state.events.events);

  const selectedEvent = events?.find((event) => event._id === eventId);

  const { name, date, location, description, requiredVolunteerRoles } =
    selectedEvent;

  return (
    <>
      <div className="card">
        <div className="card-header">{name}</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"> Age: {date} </li>
          <li className="list-group-item"> Gender: {location}</li>
          <li className="list-group-item"> History: {description}</li>
          <li className="list-group-item">
            {" "}
            Contact Info: {requiredVolunteerRoles}
          </li>
        </ul>
      </div>
    </>
  );
};
