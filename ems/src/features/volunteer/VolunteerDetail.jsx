import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "../../Css/EForm.css";

export const VolunteerDetail = () => {
  const { volunteerId } = useParams();
  const volunteers = useSelector((state) => state.volunteers.volunteers);

  const selectedVolunteer = volunteers?.find(
    (volunteer) => volunteer._id === volunteerId
  );
  // console.log(selectedVolunteer);

  const { name, contact, skills, availability, areasOfInterest, events } =
    selectedVolunteer;

  return (
    <>
      <div className="card">
        <div className="card-header">{name}</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"> Contact: {contact} </li>
          <li className="list-group-item"> Skills: {skills}</li>
          <li className="list-group-item"> Availability: {availability}</li>
          <li className="list-group-item">
            {" "}
            Areas Of Interest: {areasOfInterest}
          </li>
          <li className="list-group-item"> Events: {events}</li>
        </ul>
      </div>
    </>
  );
};
