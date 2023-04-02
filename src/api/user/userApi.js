import { instance, setInterceptors } from "../request";

export function kLogin(code) {
    setInterceptors(instance);
    return instance.post(`/api/auth/user/kakao/${code}/login`, null);
}
export function requestlogOut() {
    setInterceptors(instance);
    return instance.post(`/api/user/out/log`, null);
}