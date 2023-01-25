import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LayoutCompo from "./component/layout/LayoutCompo";
import LoginPage from "./pages/LoginPage";
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";
import PlusProductPage from "./pages/PlusProductPage";
import PlusTimePage from "./pages/PlusTimePage";
import ReservationDetailPage from "./pages/ReservationDetailPage";
import ReservationPage from "./pages/ReservationPage";
import ReservationProPage from "./pages/ReservationProPage";
import RolePage from "./pages/RolePage";

function App() {
  return (

    <Router>
      <Routes>
        <Route path={"/"} element={<LayoutCompo />} >
          <Route path="seat/:floor/floor" element={<ReservationPage />}></Route>
          <Route path="pro/:seatId" element={<ReservationProPage />}></Route>
          <Route path=":reservationId/reservationDetailPage" element={<ReservationDetailPage />}></Route>
          <Route path="" element={<Main />}></Route>
          <Route path="product/:reservationId/plus" element={<PlusProductPage />}></Route>
          <Route path="time/:reservationId/plus" element={<PlusTimePage />}></Route>
          <Route path="mypage" element={<MyPage />}></Route>
          <Route path="role" element={<RolePage />}></Route>
        </Route>
        <Route path="/login" element={<LoginPage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
