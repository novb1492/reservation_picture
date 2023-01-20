import { useSelector } from "react-redux";
import { priceComma } from "../../../assets/js/jslib";

function ReserInfoCompo() {
  const state = useSelector((state) => state);

  return (
    <div>
      {
        state.ReserReducers.choiceSeat.seatName !== null && state.ReserReducers.choiceSeat.seatName !== undefined ? <p>{state.ReserReducers.choiceSeat.seatName}좌석</p> : null
      }
      <p>결제 완료 금액: {priceComma(state.ReserReducers.reservationInfo.totalPrice)}원</p>
      <p>이용시간:{state.ReserReducers.reservationInfo.totalTime}시간</p>
      <p>최소 결제 금액:{priceComma(state.ReserReducers.reservationInfo.minPrice)}원</p>
    </div>
  );
}

export default ReserInfoCompo;