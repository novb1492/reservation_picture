import "../assets/css/common.css";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { consoleLog } from "../assets/js/jslib";
import { getReservationAndProduct, getReservationDetail } from "../api/reservation/ReservationApi";
import { ReserAction } from "../reducers/ReserReducers"
import ProductCompo from "../component/reservation/ProductCompo";
import CproductCompo from "../component/reservation/CproductCompo";
import ReserInfoCompo from "../component/reservation/detail/ReserInfoCompo";

/**
 * 예약페이지 
 * @returns page
 */
function PlusProductPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  let request = async (reId,kindId) => {
    try {
      let response = await getReservationAndProduct(reId,kindId);
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
    request(params.reservationId,searchParams.get('k'));
  }, [searchParams.get('k')]);
  return (
    <div>
      <ProductCompo />
      <hr></hr>
      <h2>선택한 상품</h2>
      <CproductCompo />
      <hr></hr>
      <h2>기존 예약 정보</h2>
      <hr></hr>
      <ReserInfoCompo />
      <hr></hr>
      <button>추가 제품 결제하기</button>
      <Link to={`/${params.reservationId}/reservationDetailPage`}>예약 상세 내역</Link>
    </div>
  );
}

export default PlusProductPage;