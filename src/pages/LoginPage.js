import "../assets/css/common.css";
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from "react";
import { kLogin } from "../api/user/userApi";
import { consoleLog, initKakaoLogin } from "../assets/js/jslib";
import LoginCompo from "../component/layout/LoginCompo";
function LoginPage() {
    return (
        <div>
            <p>버튼을 눌러 카카오 로그인을 진행해 주세요</p>
            <LoginCompo/>
        </div>
    )
}

export default LoginPage;