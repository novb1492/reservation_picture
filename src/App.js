import { Route,BrowserRouter as Router, Routes } from "react-router-dom";
import ReservationPage from "./pages/ReservationPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/seat/:floor/floor" element={<ReservationPage></ReservationPage>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
