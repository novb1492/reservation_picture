import { useEffect } from "react";

function LoginCompo() {
    useEffect(()=>{
        window.Kakao.init('ec6b5c5e681c307d9d1576ee7fbf2edf');
    },[]);
    function loginWithKakao() {
        window.Kakao.Auth.authorize({
            redirectUri: 'http://localhost:3000/login',
        });
    }
    return (
        <div>
            <p style={{ cursor: "pointer" }} onClick={() => { loginWithKakao() }}>로그인</p>
        </div>

    )
}
export default LoginCompo;