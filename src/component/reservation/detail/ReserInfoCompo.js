import { useSelector } from "react-redux";
import { priceComma } from "../../../assets/js/jslib";

function ReserInfoCompo() {
  const state = useSelector((state) => state);

  return (
    <div>
      <p>{state.ReserReducers.choiceSeat.seatName}좌석</p>
      <p>결제금액: {priceComma(state.ReserReducers.reservationInfo.totalPrice)}원</p>
      <p>이용시간:{state.ReserReducers.reservationInfo.totalTime}시간</p>
      <p>최소결제금액:{priceComma(state.ReserReducers.reservationInfo.minPrice)}원</p>
      <p>상품 주문 접수완료시 취소 불가</p>
      <p>가장 빠른 예약 시간 30분전 부터 취소불가</p>
      {state.ReserReducers.reservationInfo.refund === true ? <button >전체 취소</button> : <p>취소 불가</p>}
    </div>
  );
}

export default ReserInfoCompo;