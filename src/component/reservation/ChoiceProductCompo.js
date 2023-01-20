import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import CproductCompo from "./CproductCompo";
import { useDispatch, useSelector } from "react-redux";
import { ReserAction } from "../../reducers/ReserReducers"

function ChoiceProductCompo() {
    const state = useSelector((state) => state);
    const [slideCount, setSlideCount] = useState(6);
    const dispatch = useDispatch();
    SwiperCore.use([Navigation, Pagination]);

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
    /**
     * 제일 처음 입장시 리덕스 리셋
     */
    useEffect(() => {
        dispatch(ReserAction.resetChoiceInfo([]));
    }, []);
    return (
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
    );
}

export default ChoiceProductCompo;