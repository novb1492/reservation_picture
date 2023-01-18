import { useDispatch, useSelector } from "react-redux";
import { ReserAction } from "../../reducers/ReserReducers"

function TimeTableCompo() {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    /**
   * 시간 선택시
   * @param {int} time 
   * @param {boolean} can 
   * @returns 
   */
    function choiceTime(time, can) {
        if (!can) {
            alert('예약 할 수 없는 시간 입니다');
            return;
        }
        dispatch(ReserAction.setChoiceTime({ time: time }));
    }
    return (
        <div className="time_table_container">
            {
                state.ReserReducers.times.map(time => {
                    return (
                        <div key={`div${time.time}`} className={`time_table_box ${time.can === true ? "time_can" : "time_cant"} ${state.ReserReducers.choiceTimes.indexOf(time.time) === -1 ? null : "time_on"}`} onClick={() => { choiceTime(time.time, time.can) }} >
                            <p key={`p${time.time}`}>{time.time}시~{time.time * 1 + 1}시</p>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default TimeTableCompo;