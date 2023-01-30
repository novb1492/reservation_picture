import "../assets/css/common.css";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { consoleLog, priceComma } from "../assets/js/jslib";
import { getReservationDetail } from "../api/reservation/ReservationApi";
import { ReserAction } from "../reducers/ReserReducers"
import TimeTableCompo from "../component/reservation/detail/TimeTableCompo";
import ReserInfoCompo from "../component/reservation/detail/ReserInfoCompo";
import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";
import CproductCompo from "../component/reservation/CproductCompo";
/**
 * 예약페이지 
 * @returns page
 */
function ReservationDetailPage() {
  const [slideCount, setSlideCount] = useState(3);
  SwiperCore.use([Navigation, Pagination]);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const params = useParams();
  const [choiceProducts,setChoiceProducts]=useState();
  const [times,setTimes]=useState([]);
  let request = async (reId) => {
    try {
      let response = await getReservationDetail(reId);
      consoleLog(response);
      let data = response.data;
      setChoiceProducts(data.products);
      setTimes(data.times);
      dispatch(ReserAction.setChoiceSeat({ seat: data.seat }));
      dispatch(ReserAction.setReservationInfo({ totalPrice: data.totalPrice, minPrice: data.minPrice, refund: data.refund, totalTime: data.totalTime }));
    } catch (error) {
      consoleLog(error);
      alert('예약 상세내역을 불러오는데 실패 했습니다');
    }
  }
  /**
  * 해당 예약번호로 조회
  */
  useEffect(() => {
    request(params.reservationId);
  }, []);
  let windowResize = () => {
    if (window.innerWidth <= 555) {
      setSlideCount(3);
    }
    setSlideCount(6);
  };
  useEffect(() => {
    window.addEventListener("resize", windowResize);
  }, []);
  useEffect(() => {
    windowResize();
  }, []);
  function cancel(paymentId) {
    consoleLog(params.reservationId);
    consoleLog(paymentId);
  }
  return (
    <div>
      <hr></hr>
      <h2>예약시간</h2>
      <hr></hr>
      <TimeTableCompo choiceTimes={times} />
      <hr></hr>
      <h2>선택한 상품</h2>
      <hr></hr>
      <Swiper
            slidesPerView={slideCount}>
            {choiceProducts !==null && choiceProducts !== undefined ? choiceProducts.map(product => {
                return (
                    <SwiperSlide key={`${product.id}sw`} className='c_product_box2'>
                        <CproductCompo product={product} />
                        <p>수량 :{product.count}</p>
                        <p>결제금액:{priceComma(product.price)}</p>
                        {
                            product.refund === true ? <p key={`${product.id}cc`} disabled>취소불가</p> : <button key={`${product.id}cc`} onClick={() => { cancel(product.paymentId) }}>취소</button>
                        }
                    </SwiperSlide>
                );
            }) : null}
            <SwiperSlide><Link to={`/product/${params.reservationId}/plus?k=1`}>제품추가</Link></SwiperSlide>
        </Swiper>
      <hr></hr>
      <h2>예약 정보</h2>
      <hr></hr>
      <ReserInfoCompo />
      <p>상품 주문 접수완료시 취소 불가</p>
      <p>가장 빠른 예약 시간 30분전 부터 취소불가</p>
      {state.ReserReducers.reservationInfo.refund === true ? <button >예약 전체 취소</button> : <p>예약 취소 불가</p>}
      <hr></hr>
    </div>
  );
}

export default ReservationDetailPage;