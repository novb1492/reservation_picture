import { Route,BrowserRouter as Router, Routes } from "react-router-dom";
import ReservationPage from "./pages/ReservationPage";
import ReservationProPage from "./pages/pop/ReservationProPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/seat/:floor/floor" element={<ReservationPage/>}></Route>
        <Route path="/pro/:seatId" element={<ReservationProPage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
