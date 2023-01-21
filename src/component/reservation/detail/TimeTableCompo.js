import { Link, useParams } from "react-router-dom";

function TimeTableCompo(props) {
  const params = useParams();
    return (
        <div className="time_table_container">
        {
          props.choiceTimes.map(time => {
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
          <Link to={`/time/${params.reservationId}/plus`}>시간 추가</Link>
        </div>
      </div>
    );
}

export default TimeTableCompo;