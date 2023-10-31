import { useDispatch, useSelector } from "react-redux";
import "../../Css/EForm.css";
import {
  addEventAsync,
  resetEventInput,
  setEventInput,
  updateEventAsync,
} from "./EventSlice";

export const EventForm = ({ editStatus, setEditStatus }) => {
  const dispatch = useDispatch();
  const eventDetails = useSelector((state) => state.events.eventDetails);

  const handleEventInputForm = (e) => {
    const { name, value } = e.target;
    console.log({ ...eventDetails, [name]: value });
    dispatch(setEventInput({ ...eventDetails, [name]: value }));
  };

  const handleAddNewEvent = (e) => {
    e.preventDefault();

    if (editStatus) {
      dispatch(
        updateEventAsync({
          id: eventDetails._id,
          updatedEvent: eventDetails,
        })
      );
      setEditStatus(false);
      dispatch(resetEventInput());
    } else {
      dispatch(addEventAsync(eventDetails));
      setEditStatus(false);
      dispatch(dispatch(resetEventInput()));
    }
  };

  const handleEventFormClose = () => {
    dispatch(dispatch(resetEventInput()));
  };

  const roles = [
    "Stage Crew",
    "Security Team",
    "Exhibit Guide",
    "Information Desk",
    "Activity Supervisor",
    "Ticketing",
    "Usher",
    "Public Relations",
    "Campaign Promoter",
    "Health Advisor",
    "Assistant Instructor",
    "Choreographer",
    "Technical Support",
    "Event Management",
  ];

  return (
    <>
      <button
        type="button"
        className="btn bg-success text-white"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Add Event
      </button>

      <div
        className="modal bg-transparent  "
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
                Event Entry Form
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleEventFormClose}
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
                    value={eventDetails?.name}
                    className="form-control "
                    id="exampleFormControlInput1"
                    placeholder="Enter your name here"
                    onChange={handleEventInputForm}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={eventDetails?.date}
                    className="form-control "
                    id="exampleFormControlInput1"
                    placeholder="Enter your age here"
                    onChange={handleEventInputForm}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={eventDetails?.location}
                    className="form-control  "
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                    onChange={handleEventInputForm}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Desription
                  </label>
                  <textarea
                    className="form-control "
                    name="description"
                    value={eventDetails?.description}
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Enter history here"
                    onChange={handleEventInputForm}
                  ></textarea>
                </div>
                <select
                  className="form-select "
                  name="requiredVolunteerRoles"
                  value={eventDetails?.requiredVolunteerRoles}
                  aria-label="Default select example"
                  onChange={handleEventInputForm}
                >
                  <option selected>Select Roles</option>
                  {roles?.map((role, index) => {
                    return (
                      <option key={index} value={role}>
                        {" "}
                        {role}{" "}
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
                onClick={handleEventFormClose}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn bg-success text-white"
                onClick={handleAddNewEvent}
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
