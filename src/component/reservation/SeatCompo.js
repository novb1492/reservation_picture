import { useSelector } from "react-redux";
import { zoomIn, zoomOut } from "../../assets/js/jslib";
import { useNavigate, useParams } from 'react-router-dom';

function SeatCompo() {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const params = useParams();
  function goProPage(seatId) {
    navigate(`/pro/${seatId}?k=1`);
  }
  return (
    <div>
      {
        state.ReserReducers.counter !== null && state.ReserReducers.counter !== undefined
          ? <img style={{ left: state.ReserReducers.counter.left + 'rem', top: state.ReserReducers.counter.top + 'rem' }} onMouseEnter={(event) => zoomIn(event)} onMouseLeave={(event) => { zoomOut(event) }} className="seat" src={state.ReserReducers.counter.url} alt="counter" />
          : null
      }
      {state.ReserReducers.seatInfoArr.map(info => {
        return <img style={{ left: info.left + 'rem', top: info.top + 'rem', cursor: 'pointer',opacity: info.soldOut === true ? 0.5 : 1 }} onClick={() => { if(info.soldOut){alert('예약 할 수 없는 좌석입니다'); return;} goProPage(info.id) }} onMouseEnter={(event) => zoomIn(event)} onMouseLeave={(event) => { zoomOut(event) }} key={info.id} className="seat" src={info.url} alt="seat" />
      })}
    </div>
  );
}

export default SeatCompo;