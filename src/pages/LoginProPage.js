import "../assets/css/common.css";
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from "react";
import { kLogin } from "../api/user/userApi";
import { consoleLog } from "../assets/js/jslib";
function LoginProPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    let request = async () => {
        try {
            let response = await kLogin(searchParams.get('code'));
            consoleLog(response);
            let nurl=sessionStorage.getItem('nextUrl');
            sessionStorage.setItem('login',true);
            if(nurl!==undefined && nurl !==null){
                sessionStorage.removeItem('nextUrl');
                navigate(nurl);
                return;
            }
            navigate("/");
        } catch (error) {
            consoleLog(error);
            alert('로그인에 실패했습니다');
        }
    }
    useEffect(()=>{
        request();
    },[]);
    return (
        <div>
            로그인을 처리중입니다
        </div>
    );
}

export default LoginProPage;