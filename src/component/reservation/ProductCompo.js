import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore, { Navigation, Pagination } from "swiper";
import { ReserAction } from "../../reducers/ReserReducers"
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function ProductCompo() {
    const [slideCount, setSlideCount] = useState(6);
    SwiperCore.use([Navigation, Pagination]);
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    let windowResize = () => {
        if (window.innerWidth <= 555) {
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
    /**
   * 품목 카테고리 변경
   * @param {int} kindId 
   */
    function changeKind(kindId) {
        searchParams.set('k', kindId);
        setSearchParams(searchParams);
    }
    return (
        <div>
            <hr></hr>
            <h2>상품</h2>
            <hr></hr>
            <div>
                <button onClick={() => { changeKind(1) }}>kind1</button>
                <button onClick={() => { changeKind(2) }}>kind2</button>
            </div>
            <hr></hr>
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
        </div>
    );
}

export default ProductCompo;