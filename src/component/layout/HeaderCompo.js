import { useRef } from "react";
import { Link } from "react-router-dom";
import { consoleLog } from "../../assets/js/jslib";
import LoginCompo from "./LoginCompo";

function HeaderCompo() {
    const navUlRef = useRef();
    /**
     * 모바일시 네비바 햄버거 버튼으로
     * nav_ul 영역 제어
     */
    function mobileNavShowAndHide() {
        let classList=navUlRef.current.classList;
        consoleLog(classList);
        let flag=false;
        for(var i in classList){
            if(classList[i]==='displayNone'){
                flag=true;
                break;
            }
        }
        if(flag){
            navUlRef.current.classList.remove('displayNone');
            return;
        }
        navUlRef.current.classList.add('displayNone');
    }
    return (
        <header>
            <nav className="nav">
                <div className="nav_main">
                    <Link to={"/"}>Eleven-Fifty</Link>
                    <div className="nav_bars">
                        <i className="fa-solid fa-bars fa-lg" onClick={()=>{mobileNavShowAndHide()}}></i>
                    </div>
                </div>
                <ul className="nav_ul" ref={navUlRef}>
                    <li  className="nav_ul_li" ><Link to={"/seat/1/floor"}>예약</Link></li>
                    <li className="nav_ul_li" ><Link to={"/mypage?page=1"}>마이페이지</Link></li>
                    <li className="nav_ul_li" ><LoginCompo /></li>
                    <li className="nav_ul_li" ><Link to={"/role"}>이용 약관</Link></li>
                </ul>
            </nav>
            <hr></hr>
        </header>

    )
}
export default HeaderCompo;