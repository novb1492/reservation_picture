import { useSelector } from "react-redux";
import { zoomIn, zoomOut } from "../../assets/js/jslib";
function SeatCompo() {
  const state = useSelector((state) => state);
  return (
    <div>
      {
          state.ReserReducers.counter !== null && state.ReserReducers.counter !== undefined
            ? <img style={{ left: state.ReserReducers.counter.left + 'rem', top: state.ReserReducers.counter.top + 'rem' }} onMouseEnter={(event) => zoomIn(event)} onMouseLeave={(event) => { zoomOut(event) }} className="seat" src={state.ReserReducers.counter.url} alt="counter" />
            : null
      }
      {state.ReserReducers.seatInfoArr.map(info => {
        if (info.soldOut === true) {
          return <img style={{ left: info.left + 'rem', top: info.top + 'rem', opacity: 0.5 }} key={info.id} className="seat" src={info.url} alt="seat" />
        }
        return <img style={{ left: info.left + 'rem', top: info.top + 'rem' }} onMouseEnter={(event) => zoomIn(event)} onMouseLeave={(event) => { zoomOut(event) }} key={info.id} className="seat" src={info.url} alt="seat" />
      })}
    </div>
  );
}

export default SeatCompo;