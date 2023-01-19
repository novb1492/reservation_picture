import { Route,BrowserRouter as Router, Routes } from "react-router-dom";
import Main from "./pages/Main";
import ReservationDetailPage from "./pages/ReservationDetailPage";
import ReservationPage from "./pages/ReservationPage";
import ReservationProPage from "./pages/ReservationProPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/seat/:floor/floor" element={<ReservationPage/>}></Route>
        <Route path="/pro/:seatId" element={<ReservationProPage/>}></Route>
        <Route path="/ReservationDetailPage" element={<ReservationDetailPage/>}></Route>
        <Route path="/" element={<Main/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
