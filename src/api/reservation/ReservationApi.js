import { instance, setInterceptors } from "../request";

export function getFloorInfo(floor,marketId) {
    return instance.get(`/api/auth/${floor}/seat/${marketId}`);
}
export function getProductsAndSeatInfo(seatId, kindId,mid) {
    return instance.get(`/api/auth/product/${kindId}/list/${seatId}/time/${mid}`);
}
export function saveReservation(body) {
    return instance.post('/api/reservation/save', body);
}
export function getReservationDetail(reservationId) {
    return instance.get(`/api/auth/${reservationId}/reservation`);
}
export function getReservationAndProduct(reservationId, kindId) {
    return instance.get(`/api/auth/${reservationId}/${kindId}/product/list`);
}
export function plusProduct(reservationId, data) {
    return instance.put(`/api/auth/${reservationId}/product`, data);

}
export function getTimesByReservationId(reservationId) {
    return instance.get(`/api/auth/${reservationId}/time/list`);
}
export function plusTime(reservationId, data) {
    return instance.put(`/api/auth/${reservationId}/time`, data);
}
export function getPriceByTime(timeArrSize,mid) {
    return instance.get(`/api/auth/time/${timeArrSize}/${mid}`);
}
export function getReservationsByPeriod(page,period) {
    return instance.get(`/api/auth/${period.start}/${period.end}/reservation/${page}/list`);
}