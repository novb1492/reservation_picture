import "../assets/css/common.css";
import { Link, useParams, useSearchParams } from 'react-router-dom';
import ReservationPage from "./ReservationPage";
function Main() {
  return (
    <div>
        <ReservationPage/>
    </div>
  );
}

export default Main;