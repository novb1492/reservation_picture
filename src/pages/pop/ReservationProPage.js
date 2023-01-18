import "../../assets/css/common.css";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useParams } from 'react-router-dom';
import { getProductsAndSeatInfo, saveReservation } from '../../api/reservation/ReservationApi';
import { ReserAction } from "../../reducers/ReserReducers"
import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";
/**
 * 예약 시도 페이지 
 * @returns page
 */
function ReservationProPage() {
  SwiperCore.use([Navigation, Pagination]);
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let request = async (kindId) => {
    try {
      let response = await getProductsAndSeatInfo(params.seatId, kindId);
      let data = response.data;
      console.log(response);
      dispatch(ReserAction.setProducts({ products: data.products }));
      dispatch(ReserAction.setTimes({ times: data.times }));
    } catch (error) {
      console.log(error);
      alert('해당좌석의 시간/메뉴 불러오는데 실패 했습니다');
    }
  }
  /**
   * 페이지/혹은 제품 변경시 감지
   */
  useEffect(() => {
    request(searchParams.get('k'))
  }, [searchParams.get('k')]);
  /**
   * 품목 카테고리 변경
   * @param {int} kindId 
   */
  function changeKind(kindId) {
    searchParams.set('k', kindId);
    searchParams.set('kp', 1);
    setSearchParams(searchParams);
  }
  /**
   * 상품 클릭시
   * @param {object} product 
   * @returns 
   */
  function choice(product) {
    if (product.soldOut) {
      alert('품절된 상품입니다');
      return;
    }
    let p = { ...product, count: "1" };
    dispatch(ReserAction.setChoiceProducts({ product: p }));
  }
  /**
   * 상품 취소시
   * @param {int} productId 
   */
  function cancel(productId) {
    dispatch(ReserAction.removeProduct({ productId: productId }));
  }
  /**
   * 예약 하기 버튼 클릭시
   */
  async function order() {
    console.log(state.ReserReducers.choiceProducts);
    console.log(state.ReserReducers.choiceTimes);
    try {
      let response = await saveReservation(JSON.stringify({"choiceProducts":state.ReserReducers.choiceProducts,"choiceTimes":state.ReserReducers.choiceTimes}));
      console.log(response);
      alert('예약 성공');
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert('예약에 실패했습니다');
    }
  }
  /**
   * 수량변경시
   * @param {object} params 
   */
  function changeCount(params) {
    let e = params.event;
    dispatch(ReserAction.changeCount({ productId: params.productId, count: e.target.value }));
  }
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
   * 모바일/데스크톱 슬라이드 제어
   * @returns 
   */
  function getNum() {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      return 3;
    }
    return 6;
  }
  function getBetween() {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      return 0;
    }
    return 100;
  }
  //-------------------------------------

  return (
    <div>
      <hr></hr>
      <h2>상품</h2>
      <hr></hr>
      <div>
        <button onClick={() => { changeKind(1) }}>kind1</button>
        <button onClick={() => { changeKind(2) }}>kind2</button>
      </div>
      <Swiper
      spaceBetween={getBetween()}
        slidesPerView={getNum()}>
        {state.ReserReducers.products.map(product => {
          return (
            <SwiperSlide className="product_box" key={`${product.id}sw`} style={{opacity:product.soldOut === true ? 0.5 : 1}} onClick={() => { choice(product) }}>
              <img key={`${product.id}img`} className="product_img" src={product.img} />
              <p key={`${product.id}n`}>{product.name}</p>
              <p key={`${product.id}p`}>{product.price}원</p>
              {
                product.soldOut === true ? <p>품절</p> : null
              }
            </SwiperSlide>
          );
        })}
      </Swiper>
      <hr></hr>
      <h2>선택한 상품</h2>
      <div className="c_product_container">
        {state.ReserReducers.choiceProducts.map(product => {
          return (
            <div key={`${product.id}cdiv`} className='c_product_box'>
              <img key={`${product.id}cimg`} className="c_product_img" src={product.img} />
              <p key={`${product.id}cp`}>{product.name}</p>
              <p>수량</p>
              <input className="count_in" key={`${product.id}cn`} min="1" type="number" onChange={(event) => changeCount({ productId: product.id, event: event })} />
              <button key={`${product.id}cc`} onClick={() => { cancel(product.id) }}>취소</button>
            </div>
          );
        })}
      </div>
      <div>
        <p>{state.ReserReducers.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
      </div>
      <hr></hr>
      <h2>시간선택</h2>
      <hr></hr>
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
      <hr></hr>
      <button onClick={() => { order() }}>예약 하기</button>


    </div>
  );
}

export default ReservationProPage;