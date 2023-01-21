import "../assets/css/common.css";
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { ReserAction } from "../reducers/ReserReducers"
import { getFloorInfo } from "../api/reservation/ReservationApi";
import { useParams } from 'react-router-dom';
import SeatCompo from "../component/reservation/SeatCompo";
import FloorCompo from "../component/reservation/FloorCompo";
import { consoleLog } from "../assets/js/jslib";
/**
 * 예약페이지 
 * @returns page
 */
function ReservationPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  /**
   * 층별 도면 요청 함수
   * @param {int} floor 
   */
  let request = async (floor) => {
    try {
      let response = await getFloorInfo(floor);
      let data = response.data;
      dispatch(ReserAction.setDrawing({ drawing: data.drawing }));
      dispatch(ReserAction.setSeatInfoArr({ seatInfoArr: data.seats }));
      dispatch(ReserAction.setCounter({ counter: data.counter }));
      consoleLog(response);

      let floorArr = [];
      for (var i = 0; i < data.floor; i++) {
        floorArr[i] = i + 1;
      }
      dispatch(ReserAction.setFloor({ floor: floorArr }));

    } catch (error) {
      consoleLog(error);
      alert('도면을 불러오는데 실패 했습니다');
    }
  }
  /**
  * 층별 도면 요청
  * params.floor 변경감지
  */
  useEffect(() => {
    request(params.floor);
  }, [params.floor]);
  return (
    <div>
      <FloorCompo />
      <div className="drawing_container" >
        <img style={{ opacity: 0.9 }} className="seat" src={state.ReserReducers.drawing} alt="random photo" />
        <SeatCompo />
      </div>
    </div>
  );
}

export default ReservationPage;