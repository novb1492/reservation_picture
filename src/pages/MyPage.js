import "../assets/css/common.css";
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, useSearchParams } from 'react-router-dom';
import { consoleLog, isMobile } from "../assets/js/jslib";
import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getReservationDetail } from "../api/reservation/ReservationApi";
import { ReserAction } from "../reducers/ReserReducers"

/**
 * 예약페이지 
 * @returns page
 */
function MyPage() {
  SwiperCore.use([Navigation, Pagination]);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [searchParams, setSearchParams] = useSearchParams();
  let request = async (reId) => {
    try {
      let response = await getReservationDetail(reId);
      consoleLog(response);
      let data = response.data;
      dispatch(ReserAction.setChoiceProducts2({ products: data.products }));
      dispatch(ReserAction.setChoiceTimes2({ times: data.times }));
    } catch (error) {
      consoleLog(error);
      alert('예약 상세내역을 불러오는데 실패 했습니다');
    }
  }
  /**
  * 기간별 예약 내역 
  * 조회 페이징/기간 감지
  */
  useEffect(() => {
    request(searchParams.get('reId'));
  }, []);
  function getNum() {
    if (isMobile()) {
      return 3;
    }
    return 6;
  }
  function cancel(productId) {
    consoleLog(searchParams.get('reId'));
    consoleLog(productId);
  }
  return (
    <div>
      <hr></hr>
      <h2>선택한 상품</h2>
      <hr></hr>
      <Swiper
        slidesPerView={getNum()}>
        {state.ReserReducers.choiceProducts.map(product => {
          return (
            <SwiperSlide key={`${product.id}sw`} className='c_product_box2'>
              <img key={`${product.id}cimg`} className="c_product_img" src={product.img} />
              <p key={`${product.id}cp`}>{product.name}</p>
              <p>수량 :{product.count}</p>
              {
                product.refund === true ? <p key={`${product.id}cc`} disabled>취소불가</p> : <button key={`${product.id}cc`} onClick={() => { cancel(product.id) }}>취소</button>
              }
            </SwiperSlide>
          );
        })}
        <SwiperSlide><Link to={`/product/${searchParams.get('reId')}/plus`}>제품추가</Link></SwiperSlide>
      </Swiper>
      <hr></hr>
      <h2>예약시간</h2>
      <hr></hr>
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
      <hr></hr>
    </div>
  );
}

export default MyPage;