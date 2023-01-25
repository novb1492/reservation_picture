import { Link } from "react-router-dom";
import LoginCompo from "./LoginCompo";

function HeaderCompo() {

    return (
        <header>
            <nav className="nav">
                <Link to={"/"}>Eleven-Fifty</Link>
                <ul className="nav_ul">
                    <li><Link to={"/seat/1/floor"}>예약</Link></li>
                    <li><Link to={"/mypage?page=1"}>마이페이지</Link></li>
                    <li><LoginCompo/></li>
                    <li><Link to={"/role"}>이용 약관</Link></li>
                </ul>
            </nav>
            <hr></hr>
        </header>

    )
}
export default HeaderCompo;