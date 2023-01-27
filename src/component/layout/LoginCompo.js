import { useEffect, useState } from "react";
import { consoleLog, initKakaoLogin } from "../../assets/js/jslib";

function LoginCompo() {
    const [loginFlag,setLoginFlag]=useState(sessionStorage.getItem('login'));
    useEffect(()=>{
        initKakaoLogin();
    },[]);
    function loginWithKakao() {
        window.Kakao.Auth.authorize({
            redirectUri: 'http://localhost:3000/login',
        });
    }
    function logOut() {
        sessionStorage.setItem('login',false);
        window.location.href='/';
    }
    return (
        <div>
            {
                loginFlag === "true" ? <p style={{ cursor: "pointer" }} onClick={() => {logOut()}}>로그아웃</p> : <p style={{ cursor: "pointer" }} onClick={() => { loginWithKakao() }}>로그인</p>
            }
        </div>

    )
}
export default LoginCompo;