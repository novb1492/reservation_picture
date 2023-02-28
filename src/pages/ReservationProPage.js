import "../assets/css/common.css";

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useParams } from 'react-router-dom';
import { getProductsAndSeatInfo, saveReservation } from '../api/reservation/ReservationApi';
import { ReserAction } from "../reducers/ReserReducers"
import PaymentCompo from "../component/payment/PaymentCompo";
import ProductCompo from "../component/reservation/ProductCompo";
import TimeTableCompo from "../component/reservation/TimeTableCompo";
import { checkContinueTime, consoleLog, priceComma, sortAsc } from "../assets/js/jslib";
import ChoiceProductCompo from "../component/reservation/ChoiceProductCompo";
/**
 * 예약 시도 페이지 
 * @returns page
 */
function ReservationProPage() {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const paymentRef = useRef();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  /**
   * 해당 좌석의 메뉴 예약내역 api 요청함수
   * @param {int} kindId 
   */
  let request = async (kindId) => {
    try {
      let response = await getProductsAndSeatInfo(params.seatId, kindId,params.mid);
      let data = response.data;
      consoleLog(response);
      dispatch(ReserAction.setProducts({ products: data.products }));
      dispatch(ReserAction.setTimes({ times: data.times }));
    } catch (error) {
      consoleLog(error);
      alert('해당좌석의 시간/메뉴 불러오는데 실패 했습니다');
    }
  }
  /**
   * 페이지/혹은 제품 변경시 감지
   */
  useEffect(() => {
    request(searchParams.get('k'))
  }, [searchParams.get('k')]);
  /**
   * 예약 하기 버튼 클릭시
   */
  let order = async () => {
    try {
      let arr = state.ReserReducers.choiceTimes;
      arr=sortAsc([...arr]);
      if (!checkContinueTime(arr)) {
        alert(`예약시간은 연속되게 선택가능합니다\n현재선택시간${arr}`);
        return;
      }
      let response = await saveReservation(JSON.stringify({ "choiceProducts": state.ReserReducers.choiceProducts, "choiceTimes": arr }));
      consoleLog(response);
      let data = response.data;
      paymentRef.current.on_pay(data);
    } catch (error) {
      consoleLog(error);
      alert('예약에 실패했습니다');
    }
  }
  return (
    <div>
      <hr></hr>
      <h2>시간선택</h2>
      <hr></hr>
      <TimeTableCompo />
      <ProductCompo />
      <hr></hr>
      <h2>선택한 상품</h2>
      <ChoiceProductCompo />
      <div>
        <p>{state.ReserReducers.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
      </div>
      <hr></hr>
      <PaymentCompo ref={paymentRef} />
      <button onClick={order}>예약 하기</button>
    </div>
  );
}

export default ReservationProPage;