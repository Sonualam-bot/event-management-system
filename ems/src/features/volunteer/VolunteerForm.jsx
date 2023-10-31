import { useDispatch, useSelector } from "react-redux";
import "../../Css/EForm.css";
import {
  addVolunteerAsync,
  resetVolunteerInput,
  setVolunteerInput,
  updatedVolunteerAsync,
} from "./VolunteerSlice";
import { useEffect } from "react";
import { fetchEvents } from "../events/EventSlice";

export const VolunteerForm = ({
  editVolunteerStatus,
  setEditVolunteerStatus,
}) => {
  const dispatch = useDispatch();
  const volunteerDetails = useSelector(
    (state) => state.volunteers.volunteerDetails
  );
  const events = useSelector((state) => state.events.events);

  const handleVolunteerInputForm = (e) => {
    const { name, value } = e.target;
    dispatch(setVolunteerInput({ ...volunteerDetails, [name]: value }));
  };

  const handleAddNewVolunteer = (e) => {
    e.preventDefault();

    if (editVolunteerStatus) {
      dispatch(
        updatedVolunteerAsync({
          id: volunteerDetails._id,
          updatedVolunteer: volunteerDetails,
        })
      );
      setEditVolunteerStatus(false);
      dispatch(resetVolunteerInput());
    } else {
      dispatch(addVolunteerAsync(volunteerDetails));
      setEditVolunteerStatus(false);
      dispatch(dispatch(resetVolunteerInput()));
    }
  };

  const handleVolunteerCloseForm = () => {
    dispatch(dispatch(resetVolunteerInput()));
  };

  useEffect(() => {
    if (events.length === 0) {
      dispatch(fetchEvents());
    }
  }, [dispatch, events]);

  return (
    <>
      <button
        type="button"
        className="btn bg-success text-white"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Add Volunteer
      </button>

      <div
        className="modal bg-transparent "
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Volunteer Entry Form
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleVolunteerCloseForm}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={volunteerDetails?.name}
                    className="form-control "
                    id="exampleFormControlInput1"
                    placeholder="Enter your name here"
                    onChange={handleVolunteerInputForm}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Contact
                  </label>
                  <input
                    type="number"
                    name="contact"
                    value={volunteerDetails?.contact}
                    className="form-control "
                    id="exampleFormControlInput1"
                    placeholder="Enter your phone number here"
                    onChange={handleVolunteerInputForm}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Skills
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={volunteerDetails?.skills}
                    className="form-control  "
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                    onChange={handleVolunteerInputForm}
                  />
                </div>
                <select
                  className="form-select "
                  name="availability"
                  value={volunteerDetails?.availability}
                  aria-label="Default select example"
                  onChange={handleVolunteerInputForm}
                >
                  <option selected>Select Availability</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Areas of Interest
                  </label>
                  <textarea
                    className="form-control "
                    name="areasOfInterest"
                    value={volunteerDetails?.areasOfInterest}
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Enter your areas of interest here"
                    onChange={handleVolunteerInputForm}
                  ></textarea>
                </div>
                <select
                  className="form-select "
                  name="events"
                  value={volunteerDetails?.events}
                  aria-label="Default select example"
                  onChange={handleVolunteerInputForm}
                >
                  <option selected>Select Roles</option>
                  {events?.map((event) => {
                    return (
                      <option key={event?._id} value={event?._id}>
                        {" "}
                        {event?.name}{" "}
                      </option>
                    );
                  })}
                </select>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary "
                data-bs-dismiss="modal"
                onClick={handleVolunteerCloseForm}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn bg-success text-white"
                onClick={handleAddNewVolunteer}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
