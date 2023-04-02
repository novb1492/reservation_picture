import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { priceComma } from "../../assets/js/jslib";
import { changeMinPrice, ReserAction } from "../../reducers/ReserReducers"

function TimeTableCompo() {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const params = useParams();

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
    /**
    * 시간표 초기화
    */
    useEffect(() => {
        dispatch(ReserAction.clearChoiceTime());
    }, []);
    useEffect(() => {
        dispatch(changeMinPrice(state.ReserReducers.choiceTimes.length,params.mid));
    }, [state.ReserReducers.choiceTimes.length]);
    return (
        <div>
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
            <p>예약 요청 시간:{state.ReserReducers.choiceTimes.length}시간</p>
            <p>최소금액:{priceComma(state.ReserReducers.reservationInfo.minPrice)}원</p>
        </div>
    );
}

export default TimeTableCompo;