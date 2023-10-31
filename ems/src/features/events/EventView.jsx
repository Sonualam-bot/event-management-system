import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import "../../Css/EForm.css";
import { useEffect, useState } from "react";
import { EventForm } from "./EventForm";
import { deleteEventAsync, fetchEvents, setEventInput } from "./EventSlice";

export const EventView = () => {
  const events = useSelector((state) => state.events.events);
  const status = useSelector((state) => state.events.status);
  const dispatch = useDispatch();

  const [editStatus, setEditStatus] = useState(false);

  const handleEditEvent = (eventData) => {
    dispatch(setEventInput(eventData));
    setEditStatus(true);
  };

  const deleteEvent = (id) => {
    dispatch(deleteEventAsync(id));
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  return (
    <>
      <div className="patient-Main">
        <EventForm editStatus={editStatus} setEditStatus={setEditStatus} />

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
                <th scope="col">Date</th>
                <th scope="col">Location</th>
                <th scope="col">Description</th>
                <th scope="col">Roles Required</th>
                <th scope="col">Edit</th>
                <th scope="col">Update</th>
              </tr>
            </thead>
            <tbody>
              {events?.map((event, index) => {
                return (
                  <tr className="table-primary" key={event._id}>
                    <th scope="row"> {index + 1} </th>
                    <td>
                      {" "}
                      <Link className="link" to={`/details/${event?._id}`}>
                        {event?.name}
                      </Link>{" "}
                    </td>
                    <td> {new Date(event.date).toLocaleDateString()} </td>
                    <td> {event?.location} </td>
                    <td> {event?.description} </td>
                    <td> {event?.requiredVolunteerRoles} </td>
                    <td
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={() => handleEditEvent(event)}
                    >
                      Edit
                    </td>
                    <td onClick={() => deleteEvent(event?._id)}>Delete</td>
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
