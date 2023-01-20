import "../assets/css/common.css";
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { consoleLog } from "../assets/js/jslib";
import { getReservationAndProduct, getReservationDetail, plusProduct } from "../api/reservation/ReservationApi";
import { ReserAction } from "../reducers/ReserReducers"
import ProductCompo from "../component/reservation/ProductCompo";
import CproductCompo from "../component/reservation/CproductCompo";
import ReserInfoCompo from "../component/reservation/detail/ReserInfoCompo";
import PaymentCompo from "../component/payment/PaymentCompo";
import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";
/**
 * 예약페이지 
 * @returns page
 */
function PlusProductPage() {
    const state = useSelector((state) => state);
    const [slideCount, setSlideCount] = useState(6);
    const dispatch = useDispatch();
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const paymentRef = useRef();
    let request = async (reId, kindId) => {
        try {
            let response = await getReservationAndProduct(reId, kindId);
            consoleLog(response);
            let data = response.data;
            dispatch(ReserAction.setProducts({ products: data.products }));
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
        request(params.reservationId, searchParams.get('k'));
    }, [searchParams.get('k')]);

    let order = async () => {
        try {
            let response = await plusProduct(params.reservationId, JSON.stringify({ "choiceProducts": state.ReserReducers.choiceProducts }));
            consoleLog(response);
            let data = response.data;
            paymentRef.current.on_pay(data);
        } catch (error) {
            consoleLog(error);
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
     * 상품 취소시
     * @param {int} productId 
     */
    function cancel(productId) {
        dispatch(ReserAction.removeProduct({ productId: productId }));
    }
    let windowResize = () => {
        if (window.innerWidth <= 555) {
            setSlideCount(3);
        }
        setSlideCount(6);
    };
    useEffect(() => {
        window.addEventListener("resize", windowResize);
    }, []);
    return (
        <div>
            <ProductCompo />
            <hr></hr>
            <h2>선택한 상품</h2>
            <Swiper slidesPerView={slideCount}>
                {state.ReserReducers.choiceProducts.map(product => {
                    return (
                        <SwiperSlide key={`${product.id}cdiv`} className='c_product_box'>
                            <CproductCompo product={product} />
                            <input className="count_in" key={`${product.id}cn`} min="1" type="number" onChange={(event) => changeCount({ productId: product.id, event: event })} />
                            <button key={`${product.id}cc`} onClick={() => { cancel(product.id) }}>취소</button>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <div>
                <p>{state.ReserReducers.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
            </div>
            <hr></hr>
            <h2>기존 예약 정보</h2>
            <hr></hr>
            <ReserInfoCompo />
            <hr></hr>
            <PaymentCompo ref={paymentRef} />
            <button onClick={order}>추가 제품 결제하기</button>
            <Link to={`/${params.reservationId}/reservationDetailPage`}>예약 상세 내역</Link>
        </div>
    );
}

export default PlusProductPage;