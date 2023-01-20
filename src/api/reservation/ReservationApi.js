import { instance, setInterceptors } from "../request";

export function getFloorInfo(floor) {
    return instance.get(`/api/auth/${floor}/seat`);
}
export function getProductsAndSeatInfo(seatId,kindId) {
    return instance.get(`/api/auth/product/${kindId}/list/${seatId}/time`);
}
export function saveReservation(body) {
    return instance.post('/api/auth/save/reservation',body);
}
export function getReservationDetail(reservationId) {
    return instance.get(`/api/auth/${reservationId}/reservation`);
}
export function getReservationAndProduct(reservationId,kindId) {
    return instance.get(`/api/auth/${reservationId}/${kindId}/product/list`);
}
export function plusProduct(reservationId,data) {
    return instance.put(`/api/auth/${reservationId}/product`,data);

}