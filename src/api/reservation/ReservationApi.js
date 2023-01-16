import { instance, setInterceptors } from "../request";

export function getFloorInfo(floor) {
    return instance.get(`/api/auth/${floor}/seat`);
}
export function getProductsAndSeatInfo(seatId,kindId,page) {
    return instance.get(`/api/auth/product/${kindId}/list/${seatId}/time?page=${page}`);
}