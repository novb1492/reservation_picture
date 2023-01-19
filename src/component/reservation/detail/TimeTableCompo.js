import { useDispatch, useSelector } from "react-redux";

function TimeTableCompo() {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    
    return (
        <div className="time_table_container">
        {
          state.ReserReducers.choiceTimes.map(time => {
            return (
              <div key={`div${time.time}`} className={`time_table_box2 ${time.cancel === true ? "time_can" : "time_cant"} `}>
                <p key={`p${time.time}`}>{time.time}시~{time.time * 1 + 1}시</p>
                {
                  time.cancel === true ? <button >취소</button> : <p key={`${time.time}cc`} disabled>취소불가</p>
                }
              </div>
            )
          })
        }
        <div className={`time_table_box `}>
          <p>시간추가</p>
        </div>
      </div>
    );
}

export default TimeTableCompo;