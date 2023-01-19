import "../assets/css/common.css";
import { Link, useParams, useSearchParams } from 'react-router-dom';
function Main() {
  return (
    <div>
        <Link to={"/mypage?page=1"}>mypage</Link>
    </div>
  );
}

export default Main;