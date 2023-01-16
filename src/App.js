import "./assets/common.css";
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { ReserAction } from "./reducers/ReserReducers"
import { getFloorInfo } from "./api/reservation/ReservationApi";
function App() {
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
      if (floor === 1) {
        let floorArr = [];
        for (var i = 0; i < data.floor; i++) {
          floorArr[i] = i + 1;
        }
        dispatch(ReserAction.setFloor({ floor: floorArr }));
      }
    } catch (error) {
        console.log(error);
        alert('도면을 불러오는데 실패 했습니다');
    }
  }
  /**
     * 초기 층별 도면 요청
     */
  useEffect(() => {
    request(1);
  }, []);
  function zoomIn(event) {
    event.target.style.transform = "scale(1.2)"; //1.2배 확대
    event.target.style.zIndex = 1;
    event.target.style.transition = "all 0.5s";// 속도
  }
  function zoomOut(event) {
    event.target.style.transform = "scale(1)";
    event.target.style.zIndex = 0;
    event.target.style.transition = "all 0.5s";
  }
  return (
    <div>
      <div className="drawing" >
        <img style={{opacity:0.9}} className="seat" src={state.ReserReducers.drawing} alt="random photo" />
        {
            	state.ReserReducers.counter !== null && state.ReserReducers.counter !== undefined
                ? <img style={{ left: state.ReserReducers.counter.left+'rem', top: state.ReserReducers.counter.top+'rem' }} onMouseEnter={(event) => zoomIn(event)} onMouseLeave={(event) => { zoomOut(event) }} className="seat" src={state.ReserReducers.counter.url} alt="counter" />
                : null
        }
        {state.ReserReducers.seatInfoArr.map(info => {
          if (info.soldOut === true) {
            return <img style={{ left: info.left + 'rem', top: info.top + 'rem',opacity:0.5 }} key={info.id} className="seat" src={info.url} alt="seat" />
          }
          return <img style={{ left: info.left + 'rem', top: info.top + 'rem' }} onMouseEnter={(event) => zoomIn(event)} onMouseLeave={(event) => { zoomOut(event) }} key={info.id} className="seat" src={info.url} alt="seat" />
        })}
      </div>
      <div>
        {state.ReserReducers.floor.map((num) => (
          <button key={num} onClick={() => request(num)}>{num}층</button>
        ))}
      </div>
    </div>
  );
}

export default App;
