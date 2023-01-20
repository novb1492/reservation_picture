import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";
import { consoleLog, priceComma } from "../../../assets/js/jslib";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function CproductCompo() {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    SwiperCore.use([Navigation, Pagination]);
    const [slideCount, setSlideCount] = useState(6);
    const params = useParams();

    let windowResize = () => {
        if (window.innerWidth <= 555) {
            setSlideCount(3);
        }
        setSlideCount(6);
    };
    useEffect(() => {
        window.addEventListener("resize", windowResize);
    }, []);
    function cancel(paymentId) {
        consoleLog(params.reservationId);
        consoleLog(paymentId);
    }
    return (
        <Swiper
            slidesPerView={slideCount}>
            {state.ReserReducers.choiceProducts.map(product => {
                return (
                    <SwiperSlide key={`${product.id}sw`} className='c_product_box2'>
                        <img key={`${product.id}cimg`} className="c_product_img" src={product.img} />
                        <p key={`${product.id}cp`}>{product.name}</p>
                        <p>수량 :{product.count}</p>
                        <p>결제금액:{priceComma(product.price)}</p>
                        {
                            product.refund === true ? <p key={`${product.id}cc`} disabled>취소불가</p> : <button key={`${product.id}cc`} onClick={() => { cancel(product.paymentId) }}>취소</button>
                        }
                    </SwiperSlide>
                );
            })}
            <SwiperSlide><Link to={`/product/${params.reservationId}/plus?k=1`}>제품추가</Link></SwiperSlide>
        </Swiper>
    );
}

export default CproductCompo;