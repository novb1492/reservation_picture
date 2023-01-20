import "../assets/css/common.css";
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { consoleLog, priceComma } from "../assets/js/jslib";
import { getReservationAndProduct, getReservationDetail, getTimesByReservationId, plusProduct, plusTime } from "../api/reservation/ReservationApi";
import { ReserAction } from "../reducers/ReserReducers"
import TimeTableCompo from "../component/reservation/TimeTableCompo";

/**
 * 예약페이지 
 * @returns page
 */
function PlusTimePage() {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const params = useParams();
    const [totalPrice, setTotalPrice] = useState(0);
    const [time, setTime] = useState(0);
    const [minPrice, setMinPrice] = useState(0);
    let request = async () => {
        try {
            let response = await getTimesByReservationId(params.reservationId);
            console.log(response);
            let data = response.data;
            dispatch(ReserAction.setTimes({ times: data.times }));
            setTotalPrice(data.totalPrice);
            setTime(data.totalTime);
            setMinPrice(data.minPrice);
        } catch (error) {
            consoleLog(error);
            alert('시간표를 가져오는데 실패했습니다');
        }
    }
    /**
    * 해당 예약번호로 조회
    */
    useEffect(() => {
        request();
    }, []);
    /**
   * 예약 하기 버튼 클릭시
   */
    let order = async () => {
        try {
            let response = await plusTime(params.reservationId, JSON.stringify({ "choiceTimes": state.ReserReducers.choiceTimes }));
            consoleLog(response);
            window.location.href = '';
        } catch (error) {
            consoleLog(error);
            alert('예약에 실패했습니다');
        }
    }
    return (
        <div>
            <hr></hr>
            <h2>예약시간</h2>
            <hr></hr>
            <TimeTableCompo />
            <hr></hr>
            <div>
                <p>결제 완료 금액:{priceComma(totalPrice)}원</p>
                <p>결제 완료 시간:{time}시간</p>
                <p>추가 요청 시간:{state.ReserReducers.choiceTimes.length}시간</p>
                <p>총 사용 시간:{state.ReserReducers.choiceTimes.length * 1 + time * 1}시간</p>
                <p>최소 결제 금액이 결제 완료 금액 보다 크다면 상품 추가 구매후 다시 시도해주세요</p>
                <Link to={`/product/${params.reservationId}/plus?k=1`}>추가 구매 링크</Link>
                <button onClick={order}>예약 시간 추가</button>
            </div>
        </div>
    );
}

export default PlusTimePage;