import { instance, setInterceptors } from "../request";

export function getFloorInfo(floor) {
    return instance.get(`/api/auth/${floor}/seat`);
}
export function getProductsAndSeatInfo(seatId,kindId) {
    return instance.get(`/api/auth/product/${kindId}/list/${seatId}/time`);
}