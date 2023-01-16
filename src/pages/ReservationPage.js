import "../assets/css/common.css";
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { ReserAction } from "../reducers/ReserReducers"
import { getFloorInfo } from "../api/reservation/ReservationApi";
import { useParams } from 'react-router-dom';
import SeatCompo from "../component/reservation/SeatCompo";
import FloorCompo from "../component/reservation/FloorCompo";

function ReservationPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let request = async (floor) => {
    try {
      let response = await getFloorInfo(floor);
      let data = response.data;
      dispatch(ReserAction.setDrawing({ drawing: data.drawing }));
      dispatch(ReserAction.setSeatInfoArr({ seatInfoArr: data.seats }));
      dispatch(ReserAction.setCounter({ counter: data.counter }));
      console.log(response);

      let floorArr = [];
      for (var i = 0; i < data.floor; i++) {
        floorArr[i] = i + 1;
      }
      dispatch(ReserAction.setFloor({ floor: floorArr }));

    } catch (error) {
      console.log(error);
      alert('도면을 불러오는데 실패 했습니다');
    }
  }
  /**
  * 층별 도면 요청
  */
  useEffect(() => {
    request(params.floor);
  }, [params.floor]);
  return (
    <div>
      <div className="drawing_container" >
        <img style={{ opacity: 0.9 }} className="seat" src={state.ReserReducers.drawing} alt="random photo" />
        <SeatCompo />
      </div>
      <FloorCompo />
    </div>
  );
}

export default ReservationPage;