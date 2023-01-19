import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore, { Navigation, Pagination } from "swiper";
import { ReserAction } from "../../reducers/ReserReducers"
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";
import { isMobile } from "../../assets/js/jslib";
import { useEffect, useState } from "react";

function ProductCompo() {
    const [slideCount, setSlideCount] = useState(6);
    SwiperCore.use([Navigation, Pagination]);
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    /**
   * 모바일/데스크톱 슬라이드 제어
   * @returns 
   */
    function getNum() {
        if (isMobile()) {
            return 3;
        }
        return 6;
    }
    let windowResize = () => {
        console.log(window.innerWidth);
        if(window.innerWidth<=555){
          setSlideCount(3);
          return;
        }
        setSlideCount(6);
      };
    useEffect(() => {
        window.addEventListener("resize", windowResize);
    }, []);
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
    return (
        <Swiper
            slidesPerView={slideCount}>
            {state.ReserReducers.products.map(product => {
                return (
                    <SwiperSlide className="product_box" key={`${product.id}sw`} style={{ opacity: product.soldOut === true ? 0.5 : 1 }} onClick={() => { choice(product) }}>
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
    );
}

export default ProductCompo;