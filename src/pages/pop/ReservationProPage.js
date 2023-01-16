import "../../assets/css/common.css";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useParams } from 'react-router-dom';
import { getProductsAndSeatInfo } from '../../api/reservation/ReservationApi';
import { ReserAction } from "../../reducers/ReserReducers"

/**
 * 예약 시도 페이지 
 * @returns page
 */
function ReservationProPage() {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  let request = async (page, kindId) => {
    try {
      let response = await getProductsAndSeatInfo(params.seatId, kindId, page);
      let data = response.data;
      console.log(response);
      dispatch(ReserAction.setProducts({ products: data.products }));
    } catch (error) {
      console.log(error);
      alert('해당좌석의 시간/메뉴 불러오는데 실패 했습니다');
    }
  }
  /**
   * 페이지/혹은 제품 변경시 감지
   */
  useEffect(() => {
    request(searchParams.get('kp'), searchParams.get('k'))
  }, [searchParams.get('kp'), searchParams.get('k')]);
  /**
   * 품목페이지 변경 
   * @param {int} page 
   * @returns 
   */
  function changePage(page) {
    let newPage = searchParams.get('kp') * 1 + page;
    if (newPage > 0) {
      searchParams.set('kp', newPage);
      setSearchParams(searchParams);
      return;
    }
    searchParams.set('kp', 1);
    setSearchParams(searchParams);
  }
  /**
   * 품목 카테고리 변경
   * @param {int} kindId 
   */
  function changeKind(kindId) {
    searchParams.set('k', kindId);
    searchParams.set('kp', 1);
    setSearchParams(searchParams);
  }
  function choice(product) {
    dispatch(ReserAction.setChoiceProducts({ product: product }));
  }
  
  console.log(state.ReserReducers);
  return (
    <div>
      <div className="product_container">
        {state.ReserReducers.products.map(product => {
          return (
            <div key={`${product.id}div`} className='product_box' onClick={()=>{choice(product)}}>
              <img key={`${product.id}img`} className="product_img" src={product.img} />
              <p key={`${product.id}p`}>{product.name}</p>
              {product.count <= 0 ? <p>품절</p> : null}
            </div>
          );

        })}
      </div>
      <button onClick={() => { changePage(-1) }}>donw</button>
      <button onClick={() => { changePage(1) }}>up</button>
      <button onClick={() => { changeKind(1) }}>kind1</button>
      <button onClick={() => { changeKind(2) }}>kind2</button>

    </div>
  );
}

export default ReservationProPage;