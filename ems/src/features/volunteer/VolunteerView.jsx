import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import "../../Css/EForm.css";
import { useEffect, useState } from "react";
import { VolunteerForm } from "./VolunteerForm";
import {
  deleteVolunteerAsync,
  fetchVolunteers,
  setVolunteerInput,
} from "./VolunteerSlice";

export const VolunteerView = () => {
  const volunteer = useSelector((state) => state.volunteers.volunteers);
  const status = useSelector((state) => state.volunteers.status);
  const dispatch = useDispatch();
  console.log("from view", volunteer);

  const [editVolunteerStatus, setEditVolunteerStatus] = useState(false);

  const handleEditVolunteer = (eventData) => {
    dispatch(setVolunteerInput(eventData));
    setEditVolunteerStatus(true);
  };

  const deleteVolunteer = (id) => {
    dispatch(deleteVolunteerAsync(id));
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVolunteers());
    }
  }, [status, dispatch]);

  return (
    <>
      <div className="patient-Main">
        <VolunteerForm
          editVolunteerStatus={editVolunteerStatus}
          setEditVolunteerStatus={setEditVolunteerStatus}
        />

        {status === "loading" ? (
          <div className="m-lg-3 ">
            <h2>Loading....</h2>
          </div>
        ) : (
          <table className="table w-50 mt-5">
            <thead>
              <tr className="table-success">
                <th scope="col">Sn. No</th>
                <th scope="col">Name</th>
                <th scope="col">Contact</th>
                <th scope="col">Skills</th>
                <th scope="col">Availability</th>
                <th scope="col">Areas Of Interest</th>
                <th scope="col">Events</th>
                <th scope="col">Edit</th>
                <th scope="col">Update</th>
              </tr>
            </thead>
            <tbody>
              {volunteer?.map((volunteer, index) => {
                return (
                  <tr className="table-primary" key={volunteer._id}>
                    <th scope="row"> {index + 1} </th>
                    <td>
                      {" "}
                      <Link className="link" to={`/details/${volunteer?._id}`}>
                        {volunteer?.name}
                      </Link>{" "}
                    </td>
                    <td> {volunteer?.contact} </td>
                    <td> {volunteer?.skills} </td>
                    <td> {volunteer?.availability.toString()} </td>
                    <td> {volunteer?.areasOfInterest} </td>
                    <td> {volunteer?.events.name} </td>
                    <td
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={() => handleEditVolunteer(volunteer)}
                    >
                      Edit
                    </td>
                    <td onClick={() => deleteVolunteer(volunteer?._id)}>
                      Delete
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
