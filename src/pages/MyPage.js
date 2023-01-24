import "../assets/css/common.css";
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { consoleLog } from "../assets/js/jslib";
import { getReservationsByPeriod } from "../api/reservation/ReservationApi";
function MyPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [contents, setContent] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [last, setLast] = useState(true);
    const [first, setFirst] = useState(true);
    const [nowPage, setNowPage] = useState(1);
    let request = async (page, start, end) => {
        try {
            let period = new Object;
            period.start = start;
            period.end = end;
            let response = await getReservationsByPeriod(page, period);
            consoleLog(response);
            let data = response.data;
            setContent(data.content);
            setTotalPage(data.totalPages);
            setLast(data.last);
            setFirst(data.first);
            setNowPage(data.number * 1 + 1);
        } catch (error) {
            consoleLog(error);
            alert('예약 내역을 불러오는데 실패했습니다');
        }
    }
    /**
     * 페이징 위해 url변경감지
     */
    useEffect(() => {
        request(searchParams.get('page'), searchParams.get('start'), searchParams.get('end'));
    }, [searchParams.get('page'), searchParams.get('start'), searchParams.get('end')]);
    /**
     * 페이징 버튼 함수
     * @param {int} num 
     */
    let changePage = (num) => {
        searchParams.set("page", searchParams.get('page') * 1 + num)
        setSearchParams(searchParams);
    }
    /**
     * 기간선택함수
     * @param {string} date 
     * @param {string} kind 
     */
    let changeDate=(date,kind)=>{
        if(kind==='start'){
            searchParams.set("start", date);
        }else{
            searchParams.set("end", date);
        }
        setSearchParams(searchParams);

    }
    return (
        <div>
            <div>
                {contents.map(content => {
                    return (
                        <div key={content.reservationId} className="reservation_box">
                            <Link to={`/${content.reservationId}/reservationDetailPage`}>
                                <p>예약번호 :{content.reservationId}</p>
                                <p>좌석: {content.seat}</p>
                                <p>사용날짜 :{content.reservationDate}</p>
                                <p>결제날짜 :{content.insertDate}</p>
                                <div className="r_t_box">
                                    시간:
                                    {
                                        content.times.map(time => {
                                            return <p key={time}>{time}시 ,</p>
                                        })
                                    }
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
            <div>
                <div className="p_n_box">
                    <p>{nowPage}</p><p>/</p><p>{totalPage}</p>
                </div>
                <div>
                    <button onClick={() => { changePage(1) }} disabled={last}>다음</button>
                    <button onClick={() => { changePage(-1) }} disabled={first}>이전</button>
                </div>
                <div>
                    <p>날짜 선택</p>
                    <div>
                        <p>시작일</p>
                        <input type="date" onChange={(event)=>{changeDate(event.target.value,'start')}}></input>
                    </div>
                    <div>
                        <p>종료일</p>
                        <input type="date"  onChange={(event)=>{changeDate(event.target.value,'end')}}></input>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default MyPage;