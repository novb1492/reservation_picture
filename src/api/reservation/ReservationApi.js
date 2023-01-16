import { instance, setInterceptors } from "../request";

export function getFloorInfo(floor) {
    return instance.get(`/api/auth/${floor}/seat`);
}