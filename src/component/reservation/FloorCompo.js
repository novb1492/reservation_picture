import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

function FloorCompo() {
    const state = useSelector((state) => state);
    return (
        <div className="floor_btn_container">
            {state.ReserReducers.floor.map((num) => {
                return <button key={num} ><Link to={`/seat/${num}/floor`}>{num}층</Link></button>
            })}
        </div>
    );
}

export default FloorCompo;