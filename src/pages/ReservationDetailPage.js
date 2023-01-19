import "../assets/css/common.css";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { consoleLog } from "../assets/js/jslib";
import { getReservationDetail } from "../api/reservation/ReservationApi";
import { ReserAction } from "../reducers/ReserReducers"
import TimeTableCompo from "../component/reservation/detail/TimeTableCompo";
import CproductCompo from "../component/reservation/detail/CproductCompo";
import ReserInfoCompo from "../component/reservation/detail/ReserInfoCompo";

/**
 * 예약페이지 
 * @returns page
 */
function ReservationDetailPage() {
  const dispatch = useDispatch();
  const params = useParams();
  let request = async (reId) => {
    try {
      let response = await getReservationDetail(reId);
      consoleLog(response);
      let data = response.data;
      dispatch(ReserAction.setChoiceProducts2({ products: data.products }));
      dispatch(ReserAction.setChoiceTimes2({ times: data.times }));
      dispatch(ReserAction.setChoiceSeat({ seat: data.seat }));
      dispatch(ReserAction.setReservationInfo({ totalPrice: data.totalPrice, minPrice: data.minPrice, refund: data.refund, totalTime: data.totalTime }));
    } catch (error) {
      consoleLog(error);
      alert('예약 상세내역을 불러오는데 실패 했습니다');
    }
  }
  /**
  * 해당 예약번호로 조회
  */
  useEffect(() => {
    request(params.reservationId);
  }, []);
  return (
    <div>
      <hr></hr>
      <h2>예약시간</h2>
      <hr></hr>
      <TimeTableCompo />
      <hr></hr>
      <h2>선택한 상품</h2>
      <hr></hr>
      <CproductCompo />
      <hr></hr>
      <h2>예약 정보</h2>
      <hr></hr>
      <ReserInfoCompo />
      <hr></hr>
    </div>
  );
}

export default ReservationDetailPage;