import { useSelector } from "react-redux";
import { priceComma } from "../../../assets/js/jslib";

function ReserInfoCompo() {
  const state = useSelector((state) => state);
  console.log(state.ReserReducers.reservationInfo.totalPrice);
  return (
    <div>
      {
        state.ReserReducers.choiceSeat.seatName !== null && state.ReserReducers.choiceSeat.seatName !== undefined ? <p>{state.ReserReducers.choiceSeat.seatName}좌석</p> : null
      }
      <p>결제 완료 금액: {priceComma(state.ReserReducers.reservationInfo.totalPrice)}원</p>
      <p>이용시간:{state.ReserReducers.reservationInfo.totalTime}시간</p>
    </div>
  );
}

export default ReserInfoCompo;