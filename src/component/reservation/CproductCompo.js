import { useDispatch, useSelector } from "react-redux";
import { ReserAction } from "../../reducers/ReserReducers"

function CproductCompo() {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
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
    return (
        <div>
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
        </div>
    );
}

export default CproductCompo;