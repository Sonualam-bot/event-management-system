import "./App.css";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import { Routes, Route } from "react-router-dom";
import { EventView } from "./features/events/EventView";
import { EventDetail } from "./features/events/EventDetail";
import { Homepage } from "./pages/Homepage";
import { Header } from "./components/Header";
import { VolunteerView } from "./features/volunteer/VolunteerView";
import { VolunteerDetail } from "./features/volunteer/VolunteerDetail";

function App() {
  return (
    <>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/events" element={<EventView />} />
          <Route path="/details/:eventId" element={<EventDetail />} />
          <Route path="/volunteer" element={<VolunteerView />} />
          <Route path="/details/:volunteerId" element={<VolunteerDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
