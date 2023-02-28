import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore, { Navigation, Pagination } from "swiper";
import { ReserAction } from "../../reducers/ReserReducers"
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function KindBtn(props) {
    const [slideCount, setSlideCount] = useState(3);
    SwiperCore.use([Navigation, Pagination]);
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
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
            <button onClick={() => { changeKind(props.id) }}>{props.txt}</button>
        </div>
    );
}

export default KindBtn;