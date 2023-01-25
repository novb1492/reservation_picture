import { instance, setInterceptors } from "../request";

export function kLogin(code) {
    return instance.post(`/api/auth/kakao/${code}/login`, null);
}